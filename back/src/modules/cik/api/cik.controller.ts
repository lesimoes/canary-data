import { Router, Request, Response } from "express";
import { CikService } from "../application/cik.service";
import { edgarService } from "../application/edgar.service";

const router = Router();
const cikService = new CikService(edgarService);

router.get('/cik/:cikId', async (req: Request, res: Response) => {

  const { cikId } = req.params;
  const response = await cikService.findDocument({ cikId });

  res.status(200).send(response);
})


export default router;