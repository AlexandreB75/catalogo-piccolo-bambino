const CHANNELS = [
  {
    id: 'fisica',
    name: 'Loja Física',
    icon: '🏪',
    status: 'ativo',
    statusLabel: 'Operando',
    color: '#4CAF50',
    integrations: ['Bling ERP', 'NFC-e', 'CPlug'],
    notes: 'Caixa integrado, emissão de NF-e em dia',
  },
  {
    id: 'ml',
    name: 'Mercado Livre',
    icon: '🛒',
    status: 'ativo',
    statusLabel: 'Integrado',
    color: '#FFC107',
    integrations: ['Bling → ML', 'Estoque sync'],
    notes: 'Estoque atualizado pelo Bling automaticamente',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    status: 'ativo',
    statusLabel: '3 Atendentes',
    color: '#25D366',
    integrations: ['Equipe humana'],
    notes: 'Pré-venda, pós-venda e suporte manual',
  },
  {
    id: 'nuvemshop',
    name: 'Nuvemshop',
    icon: '🌐',
    status: 'planejado',
    statusLabel: 'Próximo passo',
    color: '#9E9E9E',
    integrations: ['Bling → NS (nativo)'],
    notes: 'Integração Bling já disponível. Decisão em avaliação.',
  },
]

const TEAM_METRICS = [
  { label: 'Atendentes WhatsApp', value: '3', sub: 'capacidade atual' },
  { label: 'Canais ativos', value: '3', sub: 'de 4 planejados' },
  { label: 'Novo canal (NS)', value: '+33%', sub: 'volume estimado' },
]

const CHECKLIST = [
  { done: true,  text: 'Bling ERP implantado e funcionando' },
  { done: true,  text: 'NFC-e com CPlug resolvido' },
  { done: true,  text: 'Mercado Livre integrado ao Bling' },
  { done: true,  text: 'Equipe WhatsApp de 3 pessoas operando' },
  { done: false, text: 'Avaliar capacidade de equipe para Nuvemshop' },
  { done: false, text: 'Definir fluxo de atendimento pós-site' },
  { done: false, text: 'Configurar Nuvemshop + integração Bling' },
]

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: 24,
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.65rem',
      color: 'var(--text-muted)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      marginBottom: 16,
    }}>
      {children}
    </p>
  )
}

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* ── Hero ── */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
          fontWeight: 600,
          marginBottom: 6,
        }}>
          Visão geral da operação
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Base sólida construída. Você fez a parte difícil — ERP em operação sem parar a loja. Agora a decisão é estratégica: quando e como abrir o 4º canal.
        </p>
      </div>

      {/* ── Métricas de equipe ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {TEAM_METRICS.map(m => (
          <Card key={m.label}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--gold)', fontWeight: 700, lineHeight: 1 }}>
              {m.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: 8 }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4 }}>{m.sub}</div>
          </Card>
        ))}
      </div>

      {/* ── Canais ── */}
      <div>
        <SectionLabel>Canais de venda</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {CHANNELS.map(ch => (
            <Card key={ch.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.4rem' }}>{ch.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{ch.name}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: ch.color,
                  background: `${ch.color}18`,
                  border: `1px solid ${ch.color}40`,
                  borderRadius: 6,
                  padding: '3px 10px',
                }}>
                  {ch.statusLabel}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ch.integrations.map(i => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '2px 8px',
                  }}>
                    {i}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {ch.notes}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Checklist ── */}
      <div>
        <SectionLabel>Progresso de implantação</SectionLabel>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHECKLIST.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: item.done ? 'var(--gold)' : 'var(--bg-secondary)',
                  border: item.done ? '1px solid var(--gold)' : '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  color: 'var(--bg-primary)',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  {item.done ? '✓' : ''}
                </span>
                <span style={{
                  fontSize: '0.875rem',
                  color: item.done ? 'var(--text-secondary)' : 'var(--text-primary)',
                  textDecoration: item.done ? 'line-through' : 'none',
                  lineHeight: 1.5,
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              flex: 1,
              height: 4,
              background: 'var(--bg-secondary)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(CHECKLIST.filter(c => c.done).length / CHECKLIST.length) * 100}%`,
                height: '100%',
                background: 'var(--gold)',
                borderRadius: 2,
                transition: 'width 0.4s ease',
              }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-dim)', whiteSpace: 'nowrap' }}>
              {CHECKLIST.filter(c => c.done).length}/{CHECKLIST.length} concluídos
            </span>
          </div>
        </Card>
      </div>

      {/* ── Alerta de capacidade ── */}
      <Card style={{ borderColor: 'rgba(255, 193, 7, 0.3)', background: 'rgba(255, 193, 7, 0.04)' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⚠️</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 6 }}>
              Ponto de atenção: capacidade de equipe
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Pedido pelo site gera dúvida pré-venda, troca, reclamação de frete e avaliação — atendimento novo chegando por canal diferente do WhatsApp.
              Use a aba <strong style={{ color: 'var(--gold)' }}>Nuvemshop</strong> para avaliar a prontidão antes de migrar,
              e a aba <strong style={{ color: 'var(--gold)' }}>Atendimento IA</strong> para escalar o time atual com menos esforço.
            </p>
          </div>
        </div>
      </Card>

    </div>
  )
}
