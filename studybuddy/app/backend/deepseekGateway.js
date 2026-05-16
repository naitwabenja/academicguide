const axios = require('axios')

const DEEPSEEK_API_BASE_URL = 'https://api.deepseek.com/v1'

function getApiKey() {
  const key = process.env.DEEPSEEK_API_KEY
  if (!key) throw new Error('Missing DEEPSEEK_API_KEY (server environment variable)')
  return key
}

function createDeepseekClient() {
  return axios.create({
    baseURL: DEEPSEEK_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json'
    },
    timeout: 60_000
  })
}

function assertTextInput(input) {
  if (typeof input === 'string') {
    const t = input.trim()
    if (!t) throw new Error('Input text is empty')
    return t
  }

  if (Array.isArray(input)) {
    if (input.length === 0) throw new Error('Input array is empty')
    return input.map((x) => {
      if (typeof x !== 'string') throw new Error('All inputs must be strings')
      const t = x.trim()
      if (!t) throw new Error('One of the input strings is empty')
      return t
    })
  }

  throw new Error('Invalid input: expected string or string[]')
}

async function deepseekChat({
  model = 'deepseek-chat',
  systemPrompt,
  userText,
  max_tokens = 4000,
  temperature = 0.7
}) {
  if (!systemPrompt || typeof systemPrompt !== 'string') {
    throw new Error('systemPrompt is required')
  }

  const text = assertTextInput(userText)
  const client = createDeepseekClient()

  const response = await client.post('/chat/completions', {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text }
    ],
    max_tokens,
    temperature
  })

  return response.data?.choices?.[0]?.message?.content
}

async function deepseekEmbeddings({
  model = 'deepseek-embedding',
  input
}) {
  const normalizedInput = assertTextInput(input)
  const client = createDeepseekClient()

  const response = await client.post('/embeddings', {
    model,
    input: normalizedInput
  })

  const data = response.data?.data
  if (!Array.isArray(data)) throw new Error('Unexpected embeddings response shape')

  return {
    embeddings: data.map((d) => d.embedding)
  }
}

module.exports = {
  deepseekChat,
  deepseekEmbeddings
}

