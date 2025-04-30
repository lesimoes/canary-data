import { Router, Request, Response } from "express";
import { CikService } from "../application/cik.service";
import { edgarService } from "../application/edgar.service";
import { DiffService } from "../../../libs/diff.service";
import { DocumentRepository } from "../infra/document.repository";
import { Result } from "../../../libs/result";

const router = Router();
const diffService = new DiffService();
const documentRepository = new DocumentRepository();
const cikService = new CikService(edgarService, diffService, documentRepository);

router.get('/cik/:cikId', async (req: Request, res: Response) => {

  const { cikId } = req.params;
  const response: Result<any> = await cikService.findDocument({ cikId });

  if (response.isFailure) {
    res.status(400).send('Failed!');
  }

  res.status(200).send(response.getValue());
})


export default router;