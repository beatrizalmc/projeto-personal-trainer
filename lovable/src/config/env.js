// Lê variáveis de ambiente UMA vez e exporta um objeto já validado.
// Assim o resto do código nunca acessa process.env diretamente.
import "dotenv/config";

const required = ["CORS_ORIGIN"];
for (const key of required) {
  if (!process.env[key] && process.env.NODE_ENV !== "test") {
    throw new Error(`Variável de ambiente ausente: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT ?? 3333),
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:8080",
};
