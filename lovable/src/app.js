// Monta o app Express SEM chamar listen().
// Separar app de server permite que os testes usem o app diretamente.
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(helmet()); // cabeçalhos de segurança HTTP
  app.use(cors({ origin: env.corsOrigin, credentials: true })); // só o front autorizado
  app.use(express.json({ limit: "100kb" })); // lê JSON e limita o tamanho

  app.use("/api/health", healthRouter);

  // A ordem importa: 404 e erros sempre por último.
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
