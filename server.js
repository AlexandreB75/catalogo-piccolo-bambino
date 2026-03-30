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

app.use(cors({
  origin: isProd ? false : 'http://localhost:5173',
}))
app.use(express.json())

// ─── Proxy para Anthropic API ────────────────────────────────────────────────

const SYSTEM_PROMPT = `Você é um especialista em prospecção imobiliária de alto padrão para o Lótus Business em Itapema, SC.

CONTEXTO DO NEGÓCIO:
- Produto: Salas comerciais alto padrão no Lótus Business
- Ticket médio: R$ 1.000.000
- Perfil do comprador ideal: Médico ou empresário que mora em Itapema mas ainda não tem espaço profissional próprio na cidade
- Diferencial: Endereço premium, infraestrutura de clínica/escritório, valorização imobiliária, independência do aluguel

INSTRUÇÃO:
Analise os dados do prospect fornecidos e retorne EXCLUSIVAMENTE um objeto JSON válido, sem markdown, sem explicações, sem texto adicional.

O JSON deve ter exatamente estas chaves:
{
  "score": <número inteiro de 0 a 100, probabilidade de conversão>,
  "categoria": <"Quente" | "Morno" | "Frio">,
  "justificativa_score": <string curta explicando o score>,
  "dor_principal": <string: dor específica identificada neste perfil>,
  "argumento_chave": <string: argumento mais persuasivo para este prospect>,
  "objecao_provavel": <string: principal objeção que este prospect vai levantar>,
  "como_contornar": <string: estratégia concreta para superar essa objeção>,
  "mensagem_personalizada": <string: mensagem pronta para enviar no canal preferido, tom consultivo, sem parecer venda forçada, máximo 4 parágrafos>
}

Critérios de score:
- 70-100 (Quente): Médico/empresário sem espaço próprio, alto interesse, renda compatível
- 40-69 (Morno): Perfil compatível mas interesse incerto ou situação atual ainda confortável
- 0-39 (Frio): Perfil inadequado, interesse baixo ou situação atual resolvida`

app.post('/api/analyze', async (req, res) => {
  const { prospect } = req.body

  if (!prospect) {
    return res.status(400).json({ error: 'Dados do prospect ausentes.' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analise este prospect e retorne o JSON:\n\n${JSON.stringify(prospect, null, 2)}`,
        },
      ],
    })

    const raw = message.content[0].text.trim()
    const jsonStart = raw.indexOf('{')
    const jsonEnd = raw.lastIndexOf('}')
    const jsonStr = raw.slice(jsonStart, jsonEnd + 1)
    const analysis = JSON.parse(jsonStr)

    res.json(analysis)
  } catch (err) {
    console.error('[analyze error]', err.message)
    res.status(500).json({ error: 'Falha ao analisar prospect. Verifique a API key e tente novamente.' })
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
})
