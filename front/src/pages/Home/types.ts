export type Change = {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export type DiffResult = {
  latestDocument: string;
  previousDocument: string;
  changes: Change[];
  latestDocumentId: string,
  previousDocumentId: string,
}

export type TextDiffViewerProps = {
  diffResult: DiffResult;
}