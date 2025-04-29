import axios from 'axios';
import { IEdgarService } from './edgar.interface';
import { EftsLatestDocumentRequest, EftsDocumentResponse, SecDocumentRequest, EftsDocument } from './types';

export class EdgarService implements IEdgarService {

  private secAxios = axios.create({
    baseURL: 'https://www.sec.gov',
    headers: {
      'User-Agent': 'bolinha@gmail.com',
      'Accept': '*/*',
    },
    timeout: 10_000
  });

  private efsAxios = axios.create({
    baseURL: 'https://efts.sec.gov',
    headers: {
      'User-Agent': 'bolinha@gmail.com',
      'Accept': '*/*',
    },
    timeout: 10_000
  });

  constructor() { }

  async getDocuments({ cik }: EftsLatestDocumentRequest): Promise<EftsDocument[]> {

    const url = `/LATEST/search-index?dateRange=custom&category=custom&ciks=${cik}&startdt=2020-04-24&enddt=2025-04-24&forms=10-K,10-Q`

    try {

      const response = await this.efsAxios.get(url) as { data: EftsDocumentResponse };

      return response.data.hits.hits.map((hit) => ({
        _id: hit._id,
        accessionNumber: hit._id.split(':')[0],
        fileName: hit._id.split(':')[1],
        form: hit._source.form,
        adsh: hit._source.adsh,
        fileDate: hit._source.file_date,
      }))

    } catch (error: any) {
      console.error('Erro ao buscar documento da SEC:', error.response?.status, error.message, error);
      throw error;
    }
  }

  async fetchSecDocument({ cik, accessionNumber, fileName }: SecDocumentRequest): Promise<string> {
    const cleanedCik = cik.replace(/^0+/, '');

    const cleanedAccession = accessionNumber.replace(/-/g, '');
    const url = `/Archives/edgar/data/${cleanedCik}/${cleanedAccession}/${fileName}`;

    try {
      const response = await this.secAxios.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar documento da SEC:', error.response?.status, error.message);
      throw error;
    }
  }
}


const edgarService = new EdgarService();
export { edgarService };

