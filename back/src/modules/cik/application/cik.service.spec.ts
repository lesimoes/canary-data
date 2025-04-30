import { CikService } from './cik.service';
import { EftsDocument, EDocumentType } from './types';

describe('CikService: private findPrevious10K', () => {
  const dummyEdgar = {} as any;
  const dummyDiff = {} as any;
  const dummyRepo = {} as any;
  const service = new CikService(dummyEdgar, dummyDiff, dummyRepo);

  it('returns the next 10-K after the current one', () => {

    const docs: EftsDocument[] = [
      { _id: 'A', accessionNumber: 'A', fileName: 'a', form: EDocumentType['10K'], adsh: 'X', fileDate: '2025-01-01' },
      { _id: 'B', accessionNumber: 'B', fileName: 'b', form: EDocumentType['10K'], adsh: 'Y', fileDate: '2024-01-01' },
    ];

    const prev = (service as any).findPrevious10K({ documents: docs });

    expect(prev).toEqual(docs[1]);
  });

  it('throws if there is no 10-K in the array', () => {
    const docs: EftsDocument[] = [
      { _id: 'Q1', accessionNumber: 'Q1', fileName: 'q1', form: EDocumentType['10Q'], adsh: 'Q', fileDate: '2025-04-01' },
    ];
    expect(() => (service as any).findPrevious10K({ documents: docs }))
      .toThrow('Nenhum 10-K encontrado');
  });
});
