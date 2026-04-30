import axios from 'axios'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY!

const deepseek = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
})

export async function analyzeAssignment(text: string) {
  const systemPrompt = `You are an expert teacher and academic guide.

[Full system prompt from your original spec - truncated for brevity]

INPUT:
${text}

OUTPUT:
(Structured response following all sections above)`

  const response = await deepseek.post('', {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text }
    ],
    max_tokens: 4000,
    temperature: 0.7,
  })

  return response.data.choices[0].message.content
}