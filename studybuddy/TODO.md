# TODO - DeepSeek API Gateway + Embeddings

## Step 1: Implement DeepSeek gateway module (server-side)
- Create `app/backend/deepseekGateway.js`
- Provide `deepseekChat` and `deepseekEmbeddings` helpers
- Use server env `DEEPSEEK_API_KEY`
- Add input normalization + basic validation

## Step 2: Add embeddings endpoint to Express backend
- Update `app/backend/server.js`
- Add `POST /api/embeddings`
- Accept `{ input: string | string[] }`
- Return normalized `{ embeddings: number[][] }`

## Step 3: Refactor `/api/analyze` to use gateway
- Replace inline DeepSeek call with gateway `deepseekChat`
- Keep OCR + Supabase write logic unchanged

## Step 4: Test
- Start backend and call:
  - `POST /api/analyze`
  - `POST /api/embeddings` with single string and with string[]

