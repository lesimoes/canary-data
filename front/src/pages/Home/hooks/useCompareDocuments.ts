import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type DiffResult = {
  latestDocument: string;
  previousDocument: string;
  latestDocumentId: string;
  previousDocumentId: string;
  changes: {
    value: string;
    added?: boolean;
    removed?: boolean;
  }[];
}

export function useCompareDocuments({ companyCik }: { companyCik: string | null }) {

  return useQuery<DiffResult>({
    queryKey: ['cikDocument', companyCik],
    queryFn: async () => {
      const response = await axios.get<DiffResult>(`http://localhost:3000/api/cik/${companyCik}`);
      return response.data;
    },
    enabled: !!companyCik,
    staleTime: 5 * 60 * 1_000,
  });
}