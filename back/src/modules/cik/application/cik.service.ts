import { diffLines } from 'diff';
import { IEdgarService } from "./edgar.interface";
import { EftsDocument, DocumentType, EDocumentType } from "./types";
import { getQuarterFromDate } from '../../../libs/time';

export class CikService {
  constructor(private edgarService: IEdgarService) {
    this.edgarService = edgarService;
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

  private async compareDocuments({ latestDocument, previousDocument }: { latestDocument: string, previousDocument: string }) {
    const changes = diffLines(previousDocument, latestDocument);

    return {
      latestDocument,
      previousDocument,
      changes: changes.map((v) => ({
        value: v.value,
        added: v.added,
        removed: v.removed,
      })),
    };
  }

  private findPreviousDocument({ documents, latestType }: { documents: EftsDocument[], latestType: DocumentType }) {

    const currentDocument = documents[0];
    const previousDocumentType = documents[1];

    if (latestType === EDocumentType['10K']) {
      return this.findPrevious10K({ documents })
    }

    if (latestType === EDocumentType['10Q'] && previousDocumentType.form === EDocumentType['10K']) {
      return this.findPrevious10K({ documents })
    }

    const currentQuarter = getQuarterFromDate(currentDocument.fileDate);
    if (latestType === EDocumentType['10Q'] && currentQuarter === 'Q1') {
      return this.findPrevious10K({ documents })
    }

    return this.findPrevious10Q({ documents })
  }

  async findDocument({ cikId }: { cikId: string }) {
    const documents = await this.edgarService.getDocuments({ cik: cikId })

    const lastDocument = documents[0];
    const previousDocument = this.findPreviousDocument({ documents, latestType: lastDocument.form });

    if (!previousDocument) {
      console.log('Não há documento para comparação');
      return false;
    }

    const lastDocumentHtml = await this.edgarService.fetchSecDocument({
      cik: cikId,
      accessionNumber: lastDocument.accessionNumber,
      fileName: lastDocument.fileName,
    })

    const previousDocumentHtml = await this.edgarService.fetchSecDocument({
      cik: cikId,
      accessionNumber: previousDocument.accessionNumber,
      fileName: previousDocument.fileName,
    })

    const response = await this.compareDocuments({
      latestDocument: lastDocumentHtml,
      previousDocument: previousDocumentHtml
    })


    return {
      ...response,
      latestDocumentId: lastDocument._id,
      previousDocumentId: lastDocument._id,
    };
  }

}