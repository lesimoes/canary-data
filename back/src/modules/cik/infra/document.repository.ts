import { db } from "../../../libs/database";
import { IDocumentRepository } from "./document.interface";
import { Document } from "./types";

export class DocumentRepository implements IDocumentRepository {
  constructor() { }

  async getContent({ documentId }: { documentId: string; }): Promise<string | null> {
    const query = `SELECT content FROM document WHERE document_id = $1;`;

    try {
      const response = await db.query(query, [documentId]);
      return response.rows[0]?.content ?? null;
    } catch (err) {
      console.error('Error ao buscar no banco. ', err)
      return null;
    }
  }

  async save({ document }: { document: Document }): Promise<void> {
    const query = `
      INSERT INTO document (
        document_id,
        accession_number,
        content,
        file_name,
        form,
        adsh,
        file_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;

    const values = [
      document.document_id.trim(),
      document.accession_number.trim(),
      document.content,
      document.file_name.trim(),
      document.form.trim(),
      document.adsh.trim(),
      document.file_date
    ];

    try {
      await db.query(query, values);
    } catch (err) {
      console.error('Error ao inserir o documento no banco. ', err)
    }
  }

}
