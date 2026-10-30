import { AppError } from "../utils/AppError.js";

// Executa quando nenhuma rota respondeu: vira um erro 404 padronizado.
export function notFound(req, _res, next) {
  next(new AppError(`Rota não encontrada: ${req.method} ${req.originalUrl}`, { status: 404, code: "NOT_FOUND" }));
}
