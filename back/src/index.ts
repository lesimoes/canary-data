import express from "express";
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import cors from "cors";
import { db } from "./libs/database";
import { setupRoute } from "./config/routes";
import swaggerFile from './config/swagger-output.json';

db.query('SELECT 1')
  .catch((err) => {
    console.error('Erro ao conectar com o banco! ', err)
    process.exit(1);
  });

const app = express();

app.use(compression());
app.use(cors({ credentials: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", async (req: express.Request, res: express.Response) => {
  res.send({
    status: {
      app: "ok",
    },
  });
});

setupRoute(app);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});