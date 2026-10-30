import { Router } from "express";

// Rota de "saúde": usada para saber se a API está no ar (útil no deploy).
export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", uptime: Math.round(process.uptime()), timestamp: new Date().toISOString() });
});
