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

// ─── Orientação por tarefa (Orquestrador) ────────────────────────────────────

const ORIENTAR_PROMPT = `Você é um consultor prático de e-commerce especializado em Nuvemshop e varejo de produtos infantis no Brasil.

CONTEXTO DA LOJA:
- Piccolo Bambino: loja física de produtos infantis (roupas, brinquedos e acessórios, bebês a 10 anos)
- Bling ERP já implantado com estoque e NFC-e funcionando
- Mercado Livre integrado ao Bling
- WhatsApp com 3 atendentes
- Objetivo atual: implantar Nuvemshop como 4º canal de vendas

INSTRUÇÃO:
O usuário está executando uma tarefa específica do setup da Nuvemshop. Forneça orientação PRÁTICA e DIRETA.
Retorne EXCLUSIVAMENTE um objeto JSON válido, sem markdown, sem texto adicional.

O JSON deve ter exatamente estas chaves:
{
  "orientacao": <string: explicação clara do que fazer nesta tarefa — máximo 3 parágrafos curtos>,
  "passos": <array de strings: lista de 3 a 6 passos numerados, acionáveis e específicos para esta tarefa>,
  "dica_piccolo": <string: dica específica para loja de produtos infantis — diferencial prático>,
  "cuidado": <string ou null: armadilha comum nesta etapa que deve evitar>,
  "tempo_estimado": <string: ex. "20 minutos", "1-2 horas", "meia tarde">
}`

app.post('/api/orientar', async (req, res) => {
  const { fase, tarefa, notas } = req.body

  if (!fase || !tarefa) {
    return res.status(400).json({ error: 'Fase e tarefa são obrigatórios.' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1000,
      system: ORIENTAR_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Fase do setup: ${fase}\nTarefa: ${tarefa}${notas ? `\nContexto adicional: ${notas}` : ''}\n\nRetorne a orientação em JSON.`,
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
    console.error('[orientar error]', err.message)
    res.status(500).json({ error: 'Falha ao gerar orientação. Verifique a API key.' })
  }
})

// ─── Bio Page (link-in-bio próprio) ──────────────────────────────────────────

let bioConfig = {
  nomeExibido:  'Piccolo Bambino',
  tagline:      'Moda e acessórios infantis com amor ❤️',
  corPrimaria:  '#C9A84C',
  corFundo:     '#0D0D0D',
  gtmId:        'GTM-PV837LX',
  links: [
    { id: 'site',      ativo: true,  icone: '🛒', rotulo: 'Loja online',          url: 'https://www.piccolobambino.com.br', cor: '#C9A84C' },
    { id: 'whatsapp',  ativo: true,  icone: '💬', rotulo: 'Comprar pelo WhatsApp', url: 'https://wa.me/5500000000000',        cor: '#25D366' },
    { id: 'ml',        ativo: true,  icone: '🛍️', rotulo: 'Mercado Livre',         url: 'https://www.mercadolivre.com.br',    cor: '#FFC107' },
    { id: 'loja',      ativo: true,  icone: '📍', rotulo: 'Como chegar na loja',   url: 'https://maps.google.com',            cor: '#4CAF50' },
    { id: 'instagram', ativo: false, icone: '📸', rotulo: 'Instagram',             url: 'https://instagram.com/piccolobambino', cor: '#E1306C' },
  ],
  rodape: 'Loja física aberta de seg a sáb, 9h–18h',
}

app.get('/api/bio-config', (_req, res) => {
  res.json(bioConfig)
})

app.put('/api/bio-config', (req, res) => {
  const update = req.body
  if (!update || typeof update !== 'object') {
    return res.status(400).json({ error: 'Payload inválido.' })
  }
  bioConfig = { ...bioConfig, ...update }
  res.json({ ok: true, config: bioConfig })
})

app.get('/bio', (_req, res) => {
  const activeLinks = bioConfig.links.filter(l => l.ativo)
  const gtmHead = bioConfig.gtmId
    ? `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${bioConfig.gtmId}');</script>
<!-- End Google Tag Manager -->`
    : ''

  const gtmBody = bioConfig.gtmId
    ? `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${bioConfig.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`
    : ''

  const linksHtml = activeLinks.map(l => `
    <a href="${l.url}" class="btn-link" style="--btn-cor:${l.cor}" target="_blank" rel="noopener"
       onclick="gtag && gtag('event','bio_click',{link_id:'${l.id}',link_label:'${l.rotulo}'})">
      <span class="btn-icone">${l.icone}</span>
      <span class="btn-rotulo">${l.rotulo}</span>
      <span class="btn-seta">→</span>
    </a>`).join('\n')

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${bioConfig.tagline}">
  <title>${bioConfig.nomeExibido}</title>
  ${gtmHead}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: ${bioConfig.corFundo};
      color: #F0EBE0;
      font-family: 'Inter', system-ui, sans-serif;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      width: 100%;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    /* ── Avatar / Logo ── */
    .avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${bioConfig.corPrimaria}40, ${bioConfig.corPrimaria}10);
      border: 2px solid ${bioConfig.corPrimaria}60;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.4rem;
      margin-bottom: 18px;
    }

    /* ── Nome e tagline ── */
    .nome {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: ${bioConfig.corPrimaria};
      text-align: center;
      line-height: 1.2;
      margin-bottom: 8px;
    }

    .tagline {
      font-size: 0.82rem;
      color: #9A9390;
      text-align: center;
      line-height: 1.5;
      margin-bottom: 32px;
      max-width: 280px;
    }

    /* ── Links ── */
    .links {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }

    .btn-link {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 16px 20px;
      background: #161616;
      border: 1px solid var(--btn-cor, ${bioConfig.corPrimaria})30;
      border-radius: 14px;
      color: #F0EBE0;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.18s ease;
      position: relative;
      overflow: hidden;
    }

    .btn-link::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--btn-cor, ${bioConfig.corPrimaria});
      opacity: 0;
      transition: opacity 0.18s ease;
    }

    .btn-link:hover::before, .btn-link:active::before { opacity: 0.08; }
    .btn-link:active { transform: scale(0.98); }

    .btn-icone { font-size: 1.25rem; flex-shrink: 0; position: relative; z-index: 1; }

    .btn-rotulo { flex: 1; position: relative; z-index: 1; }

    .btn-seta {
      font-size: 0.9rem;
      color: var(--btn-cor, ${bioConfig.corPrimaria});
      opacity: 0.7;
      position: relative;
      z-index: 1;
      transition: transform 0.15s;
    }
    .btn-link:hover .btn-seta { transform: translateX(3px); }

    /* ── Rodapé ── */
    .rodape {
      font-size: 0.72rem;
      color: #524E4A;
      text-align: center;
      line-height: 1.6;
    }

    .rodape strong { color: #8B7535; }
  </style>
</head>
<body>
  ${gtmBody}

  <div class="container">
    <div class="avatar">👶</div>

    <h1 class="nome">${bioConfig.nomeExibido}</h1>
    <p class="tagline">${bioConfig.tagline}</p>

    <div class="links">
      ${linksHtml}
    </div>

    <p class="rodape">
      ${bioConfig.rodape}<br>
      <strong>${bioConfig.nomeExibido}</strong>
    </p>
  </div>
</body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(html)
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
