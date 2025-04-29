import { SelectWrapper, Label, Select } from './styles';

type CompanySelectProps = {
  value: string | null;
  onChange: (value: string) => void;
};

const companies = [
  { name: 'Apple (AAPL)', cik: '0000320193' },
  { name: 'Microsoft (MSFT)', cik: '0000789019' },
  { name: 'Amazon (AMZN)', cik: '0001018724' },
  { name: 'Alphabet (GOOGL)', cik: '0001652044' },
  { name: 'Meta (META)', cik: '0001326801' },
  { name: 'Tesla (TSLA)', cik: '0001318605' },
  { name: 'Netflix (NFLX)', cik: '0001065280' },
];

export const CompanySelect = ({ value, onChange }: CompanySelectProps) => {
  return (
    <SelectWrapper>
      <Label htmlFor="company">Select Company:</Label>
      <Select
        id="company"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {companies.map((company) => (
          <option key={company.cik} value={company.cik}>
            {company.name} - {company.cik}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};
