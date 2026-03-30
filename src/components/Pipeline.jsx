const STAGES = [
  {
    n: 1, name: 'Identificação',
    desc: 'Lead identificado e registrado no HubSpot.',
    sources: ['LinkedIn Sales Navigator', 'CFM / CRM de médicos', 'Indicação de clientes'],
    leads: 800, color: '#6B8CAE',
  },
  {
    n: 2, name: 'Qualificação',
    desc: 'Análise automática via Claude API — score, categoria e dor principal.',
    sources: ['N8N + Claude API', 'Score ≥ 40 avança'],
    leads: 480, color: '#7B9BAE', highlight: true,
  },
  {
    n: 3, name: 'Primeiro Contato',
    desc: 'Mensagem personalizada enviada pelo canal preferido do prospect.',
    sources: ['WhatsApp via Chatwoot', 'LinkedIn DM', 'Email'],
    leads: 240, color: '#9CA8B4',
  },
  {
    n: 4, name: 'Apresentação',
    desc: 'Reunião, tour virtual ou visita presencial ao empreendimento.',
    sources: ['Google Meet', 'Visita presencial', 'Vídeo institucional'],
    leads: 96, color: '#C9A84C',
  },
  {
    n: 5, name: 'Proposta',
    desc: 'Proposta comercial personalizada entregue com simulação financeira.',
    sources: ['PDF premium', 'Simulação de financiamento', 'Condições especiais'],
    leads: 48, color: '#C4A04A',
  },
  {
    n: 6, name: 'Negociação',
    desc: 'Ajustes de condições, aprovação jurídica e análise de permuta.',
    sources: ['Assessoria jurídica', 'Financiamento / permuta', 'Contrapropostas'],
    leads: 28, color: '#BF9848',
  },
  {
    n: 7, name: 'Fechamento',
    desc: 'Contrato assinado, promessa de compra registrada, pós-venda ativo.',
    sources: ['Cartório', 'Banco / financiadora', 'Pós-venda Lótus'],
    leads: 24, color: '#BA9046',
  },
]

const META = [
  { label: 'Unidades / ano', value: '24' },
  { label: 'VGV 2028',       value: 'R$ 24M' },
  { label: 'Ticket médio',   value: 'R$ 1M' },
  { label: 'Conversão',      value: '3%' },
  { label: 'Leads / ano',    value: '800' },
]

export default function Pipeline() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: 6 }}>
          Funil de Prospecção
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          7 estágios · Projeção anual · Meta 2028
        </p>
      </div>

      {/* ── Funil ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {STAGES.map((s, i) => {
          const widthPct = 100 - i * 7
          return (
            <div key={s.n} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: `${widthPct}%`,
                background: s.highlight ? `${s.color}22` : `${s.color}14`,
                border: `1px solid ${s.color}${s.highlight ? '55' : '30'}`,
                borderRadius: 8,
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: s.color,
                      opacity: 0.6,
                    }}>
                      {String(s.n).padStart(2, '0')}
                    </span>
                    <strong style={{
                      fontSize: '0.88rem',
                      color: s.highlight ? 'var(--gold)' : 'var(--text-primary)',
                    }}>
                      {s.name}
                    </strong>
                    {s.highlight && (
                      <span style={{
                        background: 'rgba(201,168,76,0.12)',
                        border: '1px solid rgba(201,168,76,0.35)',
                        color: 'var(--gold)',
                        fontSize: '0.62rem',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.06em',
                      }}>
                        Claude API
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.5 }}>
                    {s.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {s.sources.map(src => (
                      <span key={src} style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border)',
                        borderRadius: 4,
                        padding: '2px 8px',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: s.color,
                    lineHeight: 1,
                  }}>
                    {s.leads}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginTop: 3,
                  }}>
                    leads/ano
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Meta 2028 ── */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 18 }}>
          Meta 2028
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {META.map(m => (
            <div key={m.label} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--gold-border)',
              borderRadius: 'var(--radius)',
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--gold)',
                marginBottom: 7,
              }}>
                {m.value}
              </div>
              <div style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
