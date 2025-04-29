import { Loading } from '../../components/Loading';
import { CompanySelect } from './components/CompanySelect';
import { DiffViewer } from './components/DiffViewer';
import { useCompanySelect } from './hooks/useCompanySelect';
import { useCompareDocuments } from './hooks/useCompareDocuments';
import { DiffResult } from './types';

function Content({
  data,
  isLoading,
}: {
  data: DiffResult | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h4>Document comparison</h4>
      {data && <DiffViewer diffResult={data} />}
    </>
  );
}

function Home() {
  const { company, setCompany } = useCompanySelect();
  const { data, isLoading } = useCompareDocuments({ companyCik: company });

  console.log({
    data,
    isLoading,
  });
  return (
    <div>
      <div>
        <CompanySelect onChange={setCompany} value={company} />
        <Content data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Home;
