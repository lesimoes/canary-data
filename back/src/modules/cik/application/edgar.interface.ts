import { EftsDocument, EftsLatestDocumentRequest, SecDocumentRequest } from "./types"

export interface IEdgarService {
  fetchSecDocument({ cik, accessionNumber, fileName }: SecDocumentRequest): Promise<string>
  getDocuments({ cik }: EftsLatestDocumentRequest): Promise<EftsDocument[]>
}