import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";

const app = createApp();

describe("GET /api/health", () => {
  it("responde 200 com status ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("tratamento de erros", () => {
  it("rota inexistente retorna 404 no formato padrão", async () => {
    const res = await request(app).get("/api/nao-existe");
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });
  it("JSON malformado retorna 400 INVALID_JSON", async () => {
    const res = await request(app).post("/api/health").set("Content-Type", "application/json").send("{ruim");
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("INVALID_JSON");
  });
  it("CORS libera apenas a origem configurada", async () => {
    const res = await request(app).get("/api/health").set("Origin", "http://localhost:8080");
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:8080");
  });
});
