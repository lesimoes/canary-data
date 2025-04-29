import express from "express";
import cors from "cors";
import { setupRoute } from "./config/routes";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './config/swagger-output.json';

const app = express();
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