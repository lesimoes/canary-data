import { Express, Router } from "express"
import cikController from "../modules/cik/api/cik.controller";

export const setupRoute = (app: Express) => {
  const router: Router = Router();

  app.use('/api', router);
  router.use(cikController);
}