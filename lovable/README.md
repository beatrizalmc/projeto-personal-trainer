# Personal Trainer API (Etapa 2)

API REST em Node.js + Express. Por enquanto: rota de saúde, CORS, cabeçalhos de segurança e tratamento de erros padronizado.

## Rodar
```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:3333/api/health
npm test
```

## Estrutura
- `src/app.js` — monta o Express (middlewares → rotas → 404 → erros)
- `src/server.js` — inicia o servidor (listen)
- `src/config/env.js` — variáveis de ambiente centralizadas
- `src/middlewares/` — notFound e errorHandler
- `src/utils/AppError.js` — erro com status e código
- `tests/integration/` — testes com Supertest

## Formato de erro
`{ "error": { "code": "NOT_FOUND", "message": "...", "details": ... } }`
