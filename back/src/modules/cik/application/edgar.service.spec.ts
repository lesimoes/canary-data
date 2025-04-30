import { EdgarService } from './edgar.service';
import { EftsLatestDocumentRequest, SecDocumentRequest, EftsDocumentResponse, EftsDocument } from './types';

describe('EdgarService', () => {
  let service: EdgarService;

  beforeEach(() => {
    service = new EdgarService();
    (service as any).efsAxios.get = jest.fn();
    (service as any).secAxios.get = jest.fn();
  });

  describe('getDocuments', () => {
    it('should return Result.ok with mapped EftsDocument[] when successful', async () => {
      const mockResponse = {
        data: {
          hits: {
            hits: [
              {
                _id: '12345:report.html',
                _source: {
                  form: '10-K',
                  adsh: 'ADSH_TEST',
                  file_date: '2025-04-24'
                }
              }
            ]
          }
        }
      } as { data: EftsDocumentResponse };

      ((service as any).efsAxios.get as jest.Mock).mockResolvedValue(mockResponse);

      const req: EftsLatestDocumentRequest = { cik: '000123456' };
      const result = await service.getDocuments(req);

      expect((service as any).efsAxios.get).toHaveBeenCalledWith(
        '/LATEST/search-index?dateRange=custom&category=custom&ciks=000123456&startdt=2020-04-24&enddt=2025-04-24&forms=10-K,10-Q'
      );
      expect(result.isSuccess).toBe(true);

      const docs = result.getValue();
      expect(docs).toHaveLength(1);
      expect(docs[0]).toEqual<EftsDocument>({
        _id: '12345:report.html',
        accessionNumber: '12345',
        fileName: 'report.html',
        form: '10-K',
        adsh: 'ADSH_TEST',
        fileDate: '2025-04-24'
      });
    });

    it('should return Result.fail when axios request rejects', async () => {
      const error = new Error('Network error');
      ((service as any).efsAxios.get as jest.Mock).mockRejectedValue(error);

      const result = await service.getDocuments({ cik: '000' });
      expect(result.isFailure).toBe(true);

    });
  });

  describe('fetchSecDocument', () => {
    it('should return Result.ok with the document string and correct URL', async () => {
      const html = '<html>doc</html>';
      ((service as any).secAxios.get as jest.Mock).mockResolvedValue({ data: html });

      const req: SecDocumentRequest = {
        cik: '0000123',
        accessionNumber: '000-111-222',
        fileName: 'doc.html'
      };

      const result = await service.fetchSecDocument(req);

      expect((service as any).secAxios.get).toHaveBeenCalledWith(
        '/Archives/edgar/data/123/000111222/doc.html'
      );
      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toBe(html);
    });

    it('should return Result.fail when axios request rejects', async () => {
      const error = new Error('Timeout');
      ((service as any).secAxios.get as jest.Mock).mockRejectedValue(error);

      const result = await service.fetchSecDocument({
        cik: '0',
        accessionNumber: '1-2-3',
        fileName: 'file'
      });

      expect(result.isFailure).toBe(true);
    });
  });
});
