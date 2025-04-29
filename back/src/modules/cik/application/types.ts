export type SecDocumentRequest = { cik: string, accessionNumber: string, fileName: string }
export type EftsLatestDocumentRequest = { cik: string }


export type EftsDocument = {
  _id: string;
  accessionNumber: string;
  fileName: string;
  form: DocumentType;
  adsh: string;
  fileDate: string;
};
export type DocumentType = "10-Q" | "10-K";
export enum EDocumentType {
  "10Q" = "10-Q",
  "10K" = "10-K"
}
export type EftsDocumentResponse = {
  hits: {
    hits: {
      _id: string;
      _source: {
        file_date: string;
        adsh: string;
        form: DocumentType;
        [key: string]: any;
      };
    }[];
  };
}