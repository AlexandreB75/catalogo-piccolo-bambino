const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const Anthropic = require('@anthropic-ai/sdk')

const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const AGENT_ID = process.env.LOTUS_AGENT_ID

app.use(cors({
  origin: isProd ? false : 'http://localhost:5173',
}))
app.use(express.json())

// ─── Motor de Análise via Managed Agent ─────────────────────────────────────

app.post('/api/analyze', async (req, res) => {
  const { prospect } = req.body

  if (!prospect) {
    return res.status(400).json({ error: 'Dados do prospect ausentes.' })
  }

  if (!AGENT_ID) {
    return res.status(500).json({
      error: 'Agente não configurado. Execute: node setup-agents.js',
    })
  }

  try {
    const session = await client.beta.agents.sessions.create(AGENT_ID, {
      input: {
        role: 'user',
        content: `Analise este prospect e retorne o JSON:\n\n${JSON.stringify(prospect, null, 2)}`,
      },
    })

    let fullText = ''
    for await (const event of session) {
      if (event.type === 'text_delta') {
        fullText += event.delta
      }
    }

    const jsonStart = fullText.indexOf('{')
    const jsonEnd = fullText.lastIndexOf('}')
    const analysis = JSON.parse(fullText.slice(jsonStart, jsonEnd + 1))

    res.json(analysis)
  } catch (err) {
    console.error('[analyze error]', err.message)
    res.status(500).json({ error: 'Falha ao analisar prospect. Verifique a configuração e tente novamente.' })
  }
})

// ─── Servir build React em produção ─────────────────────────────────────────

if (isProd) {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Lótus Prospecting server rodando na porta ${PORT} [${isProd ? 'production' : 'development'}]`)
  if (!AGENT_ID) {
    console.warn('⚠️  LOTUS_AGENT_ID não definido. Execute: node setup-agents.js')
  } else {
    console.log(`   Agent: ${AGENT_ID}`)
  }
})
