import { Result } from "../../../libs/result"
import { EftsDocument, EftsLatestDocumentRequest, SecDocumentRequest } from "./types"

export interface IEdgarService {
  fetchSecDocument({ cik, accessionNumber, fileName }: SecDocumentRequest): Promise<Result<any>>
  getDocuments({ cik }: EftsLatestDocumentRequest): Promise<Result<EftsDocument[]>>
}