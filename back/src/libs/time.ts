export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export function getQuarterFromDate(dateStr: string): Quarter {
  const date = new Date(dateStr);
  const month = date.getUTCMonth();

  if (month <= 2) return 'Q1';
  if (month <= 5) return 'Q2';
  if (month <= 8) return 'Q3';
  return 'Q4';
}

export function getTodayIsoDate() {
  new Date().toISOString().split('T')[0]
}