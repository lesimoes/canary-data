import { IEdgarService } from "./edgar.interface";
import { EftsDocument, DocumentType, EDocumentType } from "./types";
import { getQuarterFromDate } from '../../../libs/time';
import { DiffService } from "../../../libs/diff.service";
import { IDocumentRepository } from "../infra/document.interface";
import { Document } from "../infra/types";
import { Result } from "../../../libs/result";

export class CikService {
  constructor(
    private edgarService: IEdgarService,
    private diffService: DiffService,
    private documentRepository: IDocumentRepository,

  ) {
    this.edgarService = edgarService;
    this.diffService = diffService;
    this.documentRepository = documentRepository;
  }

  private findPrevious10K({ documents }: { documents: EftsDocument[] }): EftsDocument | null {
    const current10K = documents.find(doc => doc.form === '10-K');

    if (!current10K) throw new Error('Nenhum 10-K encontrado');

    const currentIndex = documents.findIndex(doc => doc.adsh === current10K.adsh);
    if (currentIndex === -1) return null;

    for (let i = currentIndex + 1; i < documents.length; i++) {
      const doc = documents[i];
      if (doc.form === EDocumentType['10K']) {
        return doc;
      }
    }

    return null;
  }

  private findPrevious10Q({ documents }: { documents: EftsDocument[] }) {
    const current10Q = documents.find(doc => doc.form === '10-Q');

    if (!current10Q) throw new Error('Nenhum 10-Q encontrado');

    const currentIndex = documents.findIndex(doc => doc.adsh === current10Q.adsh);
    if (currentIndex === -1) return null;

    for (let i = currentIndex + 1; i < documents.length; i++) {
      const doc = documents[i];
      if (doc.form === EDocumentType['10Q']) {
        return doc;
      }
    }

    return null;
  }



  private findPreviousDocument({ documents, latestType }: { documents: EftsDocument[], latestType: DocumentType }) {

    const currentDocument = documents[0];
    const previousDocumentType = documents[1];

    if (latestType === EDocumentType['10K']) {
      return this.findPrevious10K({ documents })
    }

    if (latestType === EDocumentType['10Q'] && previousDocumentType.form === EDocumentType['10K']) {
      return previousDocumentType;
    }

    const currentQuarter = getQuarterFromDate(currentDocument.fileDate);
    if (latestType === EDocumentType['10Q'] && currentQuarter === 'Q1') {
      return this.findPrevious10K({ documents })
    }

    return this.findPrevious10Q({ documents })
  }

  private async fetchOrDownloadDocument({ cikId, document }: { cikId: string, document: EftsDocument }) {


    const documentSaved = await this.documentRepository.getContent({ documentId: document._id, });
    if (!documentSaved) {
      const documentHtml: Result<any> = await this.edgarService.fetchSecDocument({
        cik: cikId,
        accessionNumber: document.accessionNumber,
        fileName: document.fileName,
      });

      if (documentHtml.isFailure) {
        return Result.fail('Fetch document fail!');
      }

      const newDocument: Document = {
        accession_number: document.accessionNumber,
        adsh: document.adsh,
        content: documentHtml.getValue(),
        document_id: document._id,
        file_date: document.fileDate,
        file_name: document.fileName,
        form: document.form,
      }
      await this.documentRepository.save({ document: newDocument })

      return Result.ok(documentHtml, null);
    }

    return Result.ok(documentSaved, null);
  }

  async findDocument({ cikId }: { cikId: string }): Promise<Result<any>> {
    const resultDocuments: Result<EftsDocument[]> = await this.edgarService.getDocuments({ cik: cikId })

    if (resultDocuments.isFailure) {
      return Result.fail('Fetch document failed!');
    }
    const documents = resultDocuments.getValue();
    const latestDocument = documents[0];
    const previousDocument = this.findPreviousDocument({ documents, latestType: latestDocument.form });

    if (!previousDocument) {
      return Result.fail('There is no document for comparison')
    }

    const latestDocumentHtml: Result<any> = await this.fetchOrDownloadDocument({
      cikId,
      document: latestDocument
    })

    const previousDocumentHtml: Result<any> = await this.fetchOrDownloadDocument({
      cikId,
      document: previousDocument
    })

    if (latestDocumentHtml.isFailure || previousDocumentHtml.isFailure) {
      return Result.fail('Find document failed!');
    }


    const comparedHtml = await this.diffService.diff(
      latestDocumentHtml.getValue(),
      previousDocumentHtml.getValue()
    )

    return Result.ok({
      previousDocument: previousDocumentHtml.getValue(),
      latestDocument: comparedHtml,
      latestDocumentId: latestDocument._id,
      previousDocumentId: latestDocument._id,
    }, null);
  }

}