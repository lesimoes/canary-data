import { Document } from "./types"

export interface IDocumentRepository {
  save({ document }: { document: Document }): Promise<void>
  getContent({ documentId }: { documentId: string }): Promise<string | null>
}