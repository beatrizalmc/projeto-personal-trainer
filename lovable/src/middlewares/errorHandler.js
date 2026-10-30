import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

// Middleware de erro: o Express o reconhece por ter 4 parâmetros.
// Toda resposta de erro sai no formato { error: { code, message, details } }.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  // JSON malformado no corpo da requisição
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { code: "INVALID_JSON", message: "Corpo JSON inválido." } });
  }
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message, details: err.details } });
  }
  // Erro inesperado: registra no servidor, mas não vaza detalhes ao cliente.
  if (env.nodeEnv !== "test") console.error(err);
  return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Erro interno do servidor." } });
}
