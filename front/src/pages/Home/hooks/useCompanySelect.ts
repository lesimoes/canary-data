import { useState } from "react";
export function useCompanySelect() {
  const [company, setCompany] = useState<string | null>(null);

  return {
    company,
    setCompany
  }
}