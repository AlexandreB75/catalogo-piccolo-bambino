import { useState } from 'react'

const STACK = [
  {
    name: 'VPS Ubuntu',
    role: 'Servidor principal',
    desc: 'Infraestrutura base. Todos os serviços rodam aqui como containers ou processos.',
    color: '#E8A030',
    icon: '▣',
  },
  {
    name: 'N8N',
    role: 'Orquestrador',
    desc: 'Fluxos de automação. Recebe webhooks, processa regras, distribui para os serviços.',
    color: '#EA4560',
    icon: '⬡',
  },
  {
    name: 'Chatwoot',
    role: 'CRM / Atendimento',
    desc: 'Centraliza conversas de WhatsApp, Instagram e Email em uma inbox unificada.',
    color: '#1F93FF',
    icon: '◈',
  },
  {
    name: 'HubSpot Free',
    role: 'Pipeline comercial',
    desc: 'Gestão de deals, contatos e acompanhamento do funil de vendas.',
    color: '#FF7A59',
    icon: '◆',
  },
  {
    name: 'Telegram',
    role: 'Notificações',
    desc: 'Alertas em tempo real para o time comercial quando score ≥ 70.',
    color: '#2AABEE',
    icon: '◎',
  },
  {
    name: 'Claude API',
    role: 'Inteligência',
    desc: 'Diagnóstico, classificação e geração de mensagens. O único componente que pensa.',
    color: '#C9A84C',
    icon: '✦',
    highlight: true,
  },
]

const FLOW = [
  { label: 'Lead entra',   sub: 'WhatsApp / Form' },
  { label: 'Chatwoot',     sub: 'Webhook dispara' },
  { label: 'N8N',          sub: 'Orquestra fluxo' },
  { label: 'Proxy VPS',    sub: ':3001 /api/analyze' },
  { label: 'Claude API',   sub: 'JSON de diagnóstico', highlight: true },
  { label: 'N8N',          sub: 'Distribui resultado' },
  { label: 'HubSpot',      sub: 'Deal atualizado' },
  { label: 'Telegram',     sub: 'Time notificado' },
]

const N8N_SNIPPET = `// N8N — Code Node
// Chamada para o proxy Lótus Prospecting

const prospect = $input.first().json;

const response = await $http.request({
  method: 'POST',
  url: 'https://seu-vps.com:3001/api/analyze',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ prospect }),
  json: true,
});

// Resultado disponível nos próximos nós
return [{ json: response }];

// Exemplos de uso downstream:
// Score:     {{ $json.score }}
// Categoria: {{ $json.categoria }}
// Mensagem:  {{ $json.mensagem_personalizada }}`

export default function Architecture() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(N8N_SNIPPET)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: 6 }}>
          Arquitetura do Sistema
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          Stack atual · VPS · Onde o Claude API entra
        </p>
      </div>

      {/* ── Stack grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {STACK.map(item => (
          <div key={item.name} style={{
            background: item.highlight ? 'rgba(201,168,76,0.04)' : 'var(--bg-secondary)',
            border: `1px solid ${item.highlight ? 'var(--gold-border)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            padding: '20px 22px',
            position: 'relative',
          }}>
            {item.highlight && (
              <div style={{
                position: 'absolute',
                top: -1,
                right: 18,
                background: 'var(--gold)',
                color: '#0D0D0D',
                fontSize: '0.58rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '0 0 6px 6px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                cérebro
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: '1.15rem', color: item.color }}>{item.icon}</span>
              <div>
                <div style={{
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: item.highlight ? 'var(--gold)' : 'var(--text-primary)',
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: item.color,
                  opacity: 0.75,
                  marginTop: 2,
                }}>
                  {item.role}
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Fluxo de dados ── */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 18 }}>
          Fluxo de Dados
        </h3>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px 28px',
          overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 'max-content' }}>
            {FLOW.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  background: step.highlight ? 'rgba(201,168,76,0.1)' : 'var(--bg-elevated)',
                  border: `1px solid ${step.highlight ? 'var(--gold-border)' : 'var(--border)'}`,
                  borderRadius: 7,
                  padding: '10px 14px',
                  textAlign: 'center',
                  minWidth: 108,
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: step.highlight ? 'var(--gold)' : 'var(--text-primary)',
                    marginBottom: 3,
                  }}>
                    {step.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-muted)',
                  }}>
                    {step.sub}
                  </div>
                </div>

                {i < FLOW.length - 1 && (
                  <div style={{ position: 'relative', width: 20, height: 1, background: 'var(--gold-border)', flexShrink: 0 }}>
                    <div style={{
                      position: 'absolute',
                      right: -1,
                      top: -3,
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid rgba(201,168,76,0.35)',
                      borderTop: '3px solid transparent',
                      borderBottom: '3px solid transparent',
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Snippet N8N ── */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
            Snippet N8N
          </h3>
          <button
            onClick={copy}
            style={{
              background: copied ? 'rgba(201,168,76,0.15)' : 'var(--bg-elevated)',
              border: '1px solid var(--gold-border)',
              borderRadius: 6,
              padding: '6px 16px',
              color: copied ? 'var(--gold)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s',
            }}
          >
            {copied ? 'Copiado ✓' : 'Copiar código'}
          </button>
        </div>
        <pre style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px 28px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.85,
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}>
          {N8N_SNIPPET}
        </pre>
      </div>
    </div>
  )
}
