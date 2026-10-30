// Erro "esperado" da aplicação: carrega status HTTP e um código legível.
// Erros que NÃO são AppError são tratados como bugs (500).
export class AppError extends Error {
  constructor(message, { status = 400, code = "BAD_REQUEST", details } = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
