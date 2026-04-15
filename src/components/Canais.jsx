const INTEGRATIONS = [
  {
    canal: 'Loja Física',
    icon: '🏪',
    status: 'ativo',
    cor: '#4CAF50',
    ferramentas: [
      { nome: 'Bling ERP', funcao: 'Estoque, financeiro, NF-e', status: 'ok' },
      { nome: 'CPlug',     funcao: 'PDV e impressora fiscal',    status: 'ok' },
      { nome: 'NFC-e',     funcao: 'Nota fiscal consumidor',     status: 'ok' },
    ],
    fluxo: 'Venda no caixa → NFC-e emitida → Bling atualiza estoque automaticamente',
    atendimento: 'Presencial',
    volume: 'Principal canal',
  },
  {
    canal: 'Mercado Livre',
    icon: '🛒',
    status: 'ativo',
    cor: '#FFC107',
    ferramentas: [
      { nome: 'Bling → ML',     funcao: 'Sincroniza estoque em tempo real', status: 'ok' },
      { nome: 'ML Resposta',    funcao: 'Respostas em até 1h (reputação)',   status: 'atencao' },
      { nome: 'Bling Pedidos',  funcao: 'Pedidos ML entram no Bling',        status: 'ok' },
    ],
    fluxo: 'Pedido no ML → entra no Bling → geração NF-e → envio → atualização automática',
    atendimento: 'Chat ML (impacta reputação)',
    volume: '2º canal',
  },
  {
    canal: 'WhatsApp',
    icon: '💬',
    status: 'ativo',
    cor: '#25D366',
    ferramentas: [
      { nome: '3 Atendentes',   funcao: 'Pré-venda, pós-venda, suporte',    status: 'ok' },
      { nome: 'Catálogo WA',    funcao: 'Exibição de produtos',              status: 'ok' },
      { nome: 'Bling (manual)', funcao: 'Pedidos inseridos manualmente',     status: 'atencao' },
    ],
    fluxo: 'Cliente manda mensagem → atendente negocia → pedido manual no Bling → NF-e → entrega/retirada',
    atendimento: 'Humano (3 pessoas)',
    volume: '3º canal — alto esforço',
  },
  {
    canal: 'Nuvemshop',
    icon: '🌐',
    status: 'planejado',
    cor: '#9E9E9E',
    ferramentas: [
      { nome: 'Bling → NS',    funcao: 'Integração nativa disponível',       status: 'pendente' },
      { nome: 'Site próprio',  funcao: 'Catálogo + checkout profissional',    status: 'pendente' },
      { nome: 'Atendimento NS',funcao: 'Chat, e-mail, formulário',            status: 'pendente' },
    ],
    fluxo: 'Pedido NS → Bling (automático) → NF-e → envio → atualizações automáticas',
    atendimento: 'E-mail / chat / WhatsApp (canal novo)',
    volume: '4º canal — em avaliação',
  },
]

const STATUS_CONFIG = {
  ok:       { label: 'Ok',        color: '#4CAF50' },
  atencao:  { label: 'Atenção',   color: '#FFC107' },
  pendente: { label: 'Pendente',  color: '#9E9E9E' },
}

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

function ToolRow({ tool }) {
  const s = STATUS_CONFIG[tool.status] || STATUS_CONFIG.pendente
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{tool.nome}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{tool.funcao}</div>
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.06em',
        color: s.color,
        background: `${s.color}18`,
        border: `1px solid ${s.color}40`,
        borderRadius: 6,
        padding: '3px 9px',
        flexShrink: 0,
        marginLeft: 12,
      }}>
        {s.label}
      </span>
    </div>
  )
}

export default function Canais() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
          fontWeight: 600,
          marginBottom: 6,
        }}>
          Status dos canais
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Visão detalhada das integrações, fluxos e pontos de atenção em cada canal de venda.
        </p>
      </div>

      {/* ── Grid de canais ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {INTEGRATIONS.map(ch => (
          <Card key={ch.canal} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.5rem' }}>{ch.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>{ch.canal}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {ch.volume}
                  </div>
                </div>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.08em',
                color: ch.cor,
                background: `${ch.cor}18`,
                border: `1px solid ${ch.cor}40`,
                borderRadius: 6,
                padding: '4px 10px',
              }}>
                {ch.status === 'ativo' ? 'Ativo' : 'Planejado'}
              </span>
            </div>

            {/* Ferramentas */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}>
                Ferramentas
              </p>
              {ch.ferramentas.map(t => <ToolRow key={t.nome} tool={t} />)}
            </div>

            {/* Fluxo */}
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 8,
              padding: '10px 14px',
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                Fluxo operacional
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {ch.fluxo}
              </p>
            </div>

            {/* Atendimento */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Atendimento:</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{ch.atendimento}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Mapa de integrações ── */}
      <Card>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          Mapa de integrações — Bling como hub central
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {/* Bling central */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
            {/* Loja → Bling */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <NodeBox icon="🏪" label="Loja Física" color="#4CAF50" />
              <Arrow />
              <NodeBox icon="📦" label="Bling ERP" color="var(--gold)" central />
              <Arrow />
              <NodeBox icon="🛒" label="Mercado Livre" color="#FFC107" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <NodeBox icon="💬" label="WhatsApp" color="#25D366" dashed />
              <Arrow dashed />
              <NodeBox icon="📋" label="Pedido manual" color="var(--text-muted)" small />
              <Arrow />
              <NodeBox icon="🌐" label="Nuvemshop" color="#9E9E9E" planned />
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>
          WhatsApp ainda depende de lançamento manual no Bling. Nuvemshop terá integração nativa — eliminando esse gargalo no canal site.
        </p>
      </Card>
    </div>
  )
}

function NodeBox({ icon, label, color, central, planned, dashed, small }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      opacity: planned ? 0.5 : 1,
    }}>
      <div style={{
        width: central ? 64 : small ? 44 : 54,
        height: central ? 64 : small ? 44 : 54,
        borderRadius: central ? 16 : 12,
        background: 'var(--bg-secondary)',
        border: `${dashed ? '2px dashed' : '1px solid'} ${color}60`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: central ? '1.6rem' : small ? '1rem' : '1.2rem',
        boxShadow: central ? `0 0 20px ${color}30` : 'none',
      }}>
        {icon}
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: color,
        letterSpacing: '0.05em',
        textAlign: 'center',
        maxWidth: 70,
      }}>
        {label}
      </span>
    </div>
  )
}

function Arrow({ dashed }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      color: 'var(--border)',
      fontSize: '1rem',
      opacity: dashed ? 0.4 : 0.6,
    }}>
      →
    </div>
  )
}
