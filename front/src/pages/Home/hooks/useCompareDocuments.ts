import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


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

  const { data, isFetching, isError } = useQuery<DiffResult>({
    queryKey: ['cikDocument', companyCik],
    queryFn: async () => {
      const response = await axios.get<DiffResult>(`${API_URL}/api/cik/${companyCik}`);
      return response.data;
    },
    enabled: !!companyCik,
    staleTime: 5 * 60 * 1_000,
  });

  return { data, isError, isFetching }
}