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

// ─── Atendimento ao Cliente ───────────────────────────────────────────────────

const ATENDIMENTO_PROMPT = `Você é um assistente especializado em atendimento ao cliente para a Piccolo Bambino, uma loja física de produtos infantis (roupas, brinquedos e acessórios para bebês e crianças).

CONTEXTO DA LOJA:
- Loja física em operação com Bling ERP e emissão de NFC-e
- Vende também via Mercado Livre, WhatsApp e (em breve) Nuvemshop
- Equipe pequena de 3 atendentes no WhatsApp
- Foco em produtos de qualidade para bebês e crianças até 10 anos
- Tom: caloroso, próximo, sem exageros. Como uma mãe experiente ajudando outra mãe

CANAIS E SUAS PARTICULARIDADES:
- WhatsApp: tom mais informal, respostas curtas, pode usar emojis com moderação
- Mercado Livre: tom formal-neutro, foco em informações objetivas, prazo de resposta conta para reputação
- Loja Física: orientações para equipe presencial, foco na experiência
- Nuvemshop: tom profissional, SEO-friendly quando relevante

INSTRUÇÃO:
Analise a mensagem do cliente e o canal, então retorne EXCLUSIVAMENTE um objeto JSON válido, sem markdown, sem explicações.

O JSON deve ter exatamente estas chaves:
{
  "resposta_sugerida": <string: resposta pronta para copiar e enviar, adaptada ao tom do canal>,
  "tom": <"informal" | "neutro" | "formal">,
  "urgencia": <"baixa" | "media" | "alta">,
  "categoria": <"pre_venda" | "pos_venda" | "troca_devolucao" | "frete_entrega" | "reclamacao" | "outro">,
  "acoes_sugeridas": <array de strings com até 3 ações internas que a equipe deve tomar além de responder>,
  "alerta": <string ou null: se houver algo crítico para a equipe saber, como prazo ML ou risco de reclamação>
}`

app.post('/api/atendimento', async (req, res) => {
  const { canal, mensagem_cliente, contexto } = req.body

  if (!canal || !mensagem_cliente) {
    return res.status(400).json({ error: 'Canal e mensagem do cliente são obrigatórios.' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1200,
      system: ATENDIMENTO_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Canal: ${canal}\n\nMensagem do cliente:\n"${mensagem_cliente}"${contexto ? `\n\nContexto adicional: ${contexto}` : ''}\n\nRetorne o JSON de atendimento.`,
        },
      ],
    })

    const raw = message.content[0].text.trim()
    const jsonStart = raw.indexOf('{')
    const jsonEnd = raw.lastIndexOf('}')
    const jsonStr = raw.slice(jsonStart, jsonEnd + 1)
    const result = JSON.parse(jsonStr)

    res.json(result)
  } catch (err) {
    console.error('[atendimento error]', err.message)
    res.status(500).json({ error: 'Falha ao processar atendimento. Verifique a API key.' })
  }
})

// ─── Planejamento Nuvemshop ───────────────────────────────────────────────────

const NUVEMSHOP_PROMPT = `Você é um consultor especializado em e-commerce e operações de varejo pequeno/médio no Brasil.

CONTEXTO:
A Piccolo Bambino é uma loja física de produtos infantis que já opera com:
- Loja física com Bling ERP + NFC-e
- Mercado Livre (integrado ao Bling)
- WhatsApp com 3 atendentes
- Estoque gerenciado centralmente no Bling

Eles estão avaliando adicionar a Nuvemshop como 4º canal de vendas.

INSTRUÇÃO:
Com base nas respostas do questionário fornecido, faça uma análise realista e retorne EXCLUSIVAMENTE um objeto JSON válido.

O JSON deve ter exatamente estas chaves:
{
  "recomendacao": <"proceder_agora" | "aguardar" | "proceder_com_ressalvas">,
  "score_prontidao": <número inteiro de 0 a 100>,
  "resumo_executivo": <string: 2-3 frases diretas sobre a situação>,
  "riscos_principais": <array de até 3 strings descrevendo os maiores riscos>,
  "acoes_antes_de_migrar": <array de até 4 strings com o que fazer ANTES de abrir a Nuvemshop>,
  "acoes_apos_abertura": <array de até 4 strings com o que fazer NAS PRIMEIRAS 2 SEMANAS>,
  "impacto_na_equipe": <string: avaliação honesta do impacto nos 3 atendentes atuais>,
  "alternativa_ao_site": <string ou null: se não for hora de abrir loja, qual alternativa imediata usar>
}`

app.post('/api/nuvemshop', async (req, res) => {
  const { respostas } = req.body

  if (!respostas) {
    return res.status(400).json({ error: 'Respostas do questionário são obrigatórias.' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1500,
      system: NUVEMSHOP_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Questionário de prontidão para Nuvemshop:\n\n${JSON.stringify(respostas, null, 2)}\n\nRetorne o JSON de análise.`,
        },
      ],
    })

    const raw = message.content[0].text.trim()
    const jsonStart = raw.indexOf('{')
    const jsonEnd = raw.lastIndexOf('}')
    const jsonStr = raw.slice(jsonStart, jsonEnd + 1)
    const result = JSON.parse(jsonStr)

    res.json(result)
  } catch (err) {
    console.error('[nuvemshop error]', err.message)
    res.status(500).json({ error: 'Falha ao analisar prontidão. Verifique a API key.' })
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
  console.log(`Piccolo Bambino server rodando na porta ${PORT} [${isProd ? 'production' : 'development'}]`)
})
