require('dotenv').config()
const Anthropic = require('@anthropic-ai/sdk')
const fs = require('fs')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌  ANTHROPIC_API_KEY não encontrada no .env')
    process.exit(1)
  }

  if (process.env.LOTUS_AGENT_ID) {
    console.log(`⚠️  Agente já existe: ${process.env.LOTUS_AGENT_ID}`)
    console.log('   Para recriar, remova LOTUS_AGENT_ID do .env e execute novamente.')
    process.exit(0)
  }

  console.log('🔧 Criando agente Lótus Prospecting na Anthropic...')

  const agent = await client.beta.agents.create({
    model: 'claude-opus-4-8',
    name: 'Lótus Prospecting — Motor de Análise',
    instructions: SYSTEM_PROMPT,
  })

  console.log(`✓ Agente criado: ${agent.id}`)

  const envLine = `\n# Managed Agent — criado automaticamente, não altere\nLOTUS_AGENT_ID=${agent.id}\n`
  fs.appendFileSync('.env', envLine)

  console.log('✓ LOTUS_AGENT_ID salvo no .env')
  console.log('\n✅ Setup concluído! Execute agora: npm run dev')
}

main().catch(err => {
  console.error('❌ Erro no setup:', err.message)
  process.exit(1)
})
