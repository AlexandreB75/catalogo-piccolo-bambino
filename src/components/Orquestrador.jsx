import { useState, useEffect } from 'react'

// ─── Fases do setup ───────────────────────────────────────────────────────────

const FASES = [
  {
    id: 'conta',
    titulo: 'Conta e domínio',
    icone: '🏗️',
    descricao: 'Criar conta, apontar o domínio existente',
    alerta: 'Você já tem piccolobambino.com.br há 5 anos — use esse domínio.',
    tarefas: [
      { id: 'criar-conta',   texto: 'Criar conta na Nuvemshop (plano Impulso ou Turbos)' },
      { id: 'nome-loja',     texto: 'Configurar nome da loja: Piccolo Bambino' },
      { id: 'dominio',       texto: 'Apontar piccolobambino.com.br para a Nuvemshop (DNS)' },
      { id: 'ssl',           texto: 'Confirmar que o SSL (https) foi ativado automaticamente' },
      { id: 'dados-fiscais', texto: 'Preencher CNPJ, endereço e email da loja' },
    ],
  },
  {
    id: 'visual',
    titulo: 'Identidade visual',
    icone: '🎨',
    descricao: 'Tema, logo, cores e banner principal',
    tarefas: [
      { id: 'tema',    texto: 'Instalar tema — recomendado: Mimo ou Simple (gratuito, responsivo)' },
      { id: 'logo',    texto: 'Upload do logo da Piccolo Bambino em fundo transparente (PNG)' },
      { id: 'cores',   texto: 'Definir paleta: cor primária, secundária e texto' },
      { id: 'banner',  texto: 'Criar banner da home — foco em bebê/criança feliz, não produto' },
      { id: 'favicon', texto: 'Configurar favicon (ícone na aba do navegador)' },
      { id: 'footer',  texto: 'Preencher rodapé com WhatsApp, endereço e horário de funcionamento' },
    ],
  },
  {
    id: 'produtos',
    titulo: 'Catálogo de produtos',
    icone: '📦',
    descricao: 'Organizar categorias, fotos e descrições',
    tarefas: [
      { id: 'categorias',     texto: 'Criar categorias: Bebê 0-12m · 1-3 anos · 4-8 anos · Brinquedos · Acessórios' },
      { id: 'bling-sync',     texto: 'Verificar produtos importados via integração Bling (passo 5)' },
      { id: 'fotos',          texto: 'Garantir mínimo 2 fotos por produto — fundo branco converte melhor' },
      { id: 'descricoes',     texto: 'Revisar descrições: escrever para mães, não para catálogo técnico' },
      { id: 'precos',         texto: 'Confirmar preços site vs. ML (pode ter preço diferente no site)' },
      { id: 'produtos-top',   texto: 'Destacar 3-5 produtos na home ("mais vendidos")' },
      { id: 'estoque-minimo', texto: 'Configurar estoque mínimo para exibir (ex: ocultar com estoque 0)' },
    ],
  },
  {
    id: 'pagamento-frete',
    titulo: 'Pagamento e frete',
    icone: '💳',
    descricao: 'Meios de pagamento e opções de entrega',
    tarefas: [
      { id: 'pix',            texto: 'Ativar PIX — obrigatório, maior conversão no Brasil' },
      { id: 'cartao',         texto: 'Ativar cartão (Nuvem Pago ou Mercado Pago — verifique taxas)' },
      { id: 'boleto',         texto: 'Avaliar boleto — aumenta prazo mas pode ampliar público' },
      { id: 'correios',       texto: 'Integrar Correios: PAC e SEDEX (usar contrato próprio se tiver)' },
      { id: 'retirada',       texto: 'Habilitar retirada na loja física — custo zero e fideliza' },
      { id: 'frete-gratis',   texto: 'Definir frete grátis acima de R$ X (sugestão: ticket médio + 20%)' },
    ],
  },
  {
    id: 'bling',
    titulo: 'Integração Bling',
    icone: '🔗',
    descricao: 'Conectar ERP — estoque e pedidos automáticos',
    tarefas: [
      { id: 'app-bling',     texto: 'Instalar app Bling na App Store da Nuvemshop' },
      { id: 'auth',          texto: 'Autenticar: gerar token no Bling e colar na Nuvemshop' },
      { id: 'sync-estoque',  texto: 'Configurar sincronização de estoque em tempo real' },
      { id: 'sync-pedidos',  texto: 'Confirmar que pedidos NS entram automaticamente no Bling' },
      { id: 'nfe-teste',     texto: 'Emitir NF-e de teste para pedido originado no site' },
      { id: 'pedido-teste',  texto: 'Fazer pedido completo: pagar → Bling recebe → NF-e → envio' },
    ],
  },
  {
    id: 'conteudo',
    titulo: 'Conteúdo e SEO',
    icone: '📝',
    descricao: 'Textos, políticas e otimização para buscas',
    tarefas: [
      { id: 'sobre',         texto: 'Criar página "Nossa história" — por que a loja existe, quem são vocês' },
      { id: 'contato',       texto: 'Página de contato com botão WhatsApp (fone e email)' },
      { id: 'trocas',        texto: 'Política de trocas/devoluções (CDC: 7 dias, deixar bem visível)' },
      { id: 'privacidade',   texto: 'Política de privacidade (LGPD — Nuvemshop tem template)' },
      { id: 'seo-home',      texto: 'Title e meta description da home com "loja bebê + sua cidade"' },
      { id: 'google-tag',    texto: 'Instalar Google Analytics 4 via Tag Manager' },
      { id: 'pixel',         texto: 'Instalar Meta Pixel (para anúncios futuros no Instagram/Facebook)' },
    ],
  },
  {
    id: 'lancamento',
    titulo: 'Testes e lançamento',
    icone: '🚀',
    descricao: 'Validar tudo e abrir para o público',
    tarefas: [
      { id: 'mobile',        texto: 'Navegar na loja pelo celular — 80% do tráfego é mobile' },
      { id: 'checkout-pix',  texto: 'Testar checkout completo com PIX' },
      { id: 'checkout-card', texto: 'Testar checkout completo com cartão de crédito' },
      { id: 'emails-auto',   texto: 'Verificar emails automáticos: confirmação de pedido e envio' },
      { id: 'velocidade',    texto: 'Testar no PageSpeed Insights — meta: >60 no mobile' },
      { id: 'wa-flutuante',  texto: 'Adicionar botão WhatsApp flutuante (plugin NS gratuito)' },
      { id: 'divulgacao',    texto: 'Anunciar para clientes WhatsApp e Instagram — com link do site' },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'pb_orq_progresso'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(prog) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prog))
  } catch {}
}

function totalTarefas() {
  return FASES.reduce((acc, f) => acc + f.tarefas.length, 0)
}

function calcProgress(prog) {
  return FASES.reduce((acc, f) => acc + f.tarefas.filter(t => prog[t.id]).length, 0)
}

function faseProgress(fase, prog) {
  const done = fase.tarefas.filter(t => prog[t.id]).length
  return { done, total: fase.tarefas.length, pct: Math.round((done / fase.tarefas.length) * 100) }
}

function phaseStatus(fase, prog) {
  const { done, total } = faseProgress(fase, prog)
  if (done === 0)     return 'pendente'
  if (done === total) return 'concluida'
  return 'em_andamento'
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  )
}

function StatusDot({ status }) {
  const map = {
    pendente:      { color: 'var(--border)',  label: '' },
    em_andamento:  { color: '#FFC107',        label: '' },
    concluida:     { color: '#4CAF50',        label: '' },
  }
  const cfg = map[status] || map.pendente
  return (
    <span style={{
      width: 8, height: 8,
      borderRadius: '50%',
      background: cfg.color,
      display: 'inline-block',
      flexShrink: 0,
    }} />
  )
}

function OrientacaoPanel({ orientacao, onClose }) {
  if (!orientacao) return null
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }} onClick={onClose}>
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--gold-border)',
          borderRadius: 14,
          padding: 28,
          maxWidth: 600,
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          animation: 'fadeIn 0.2s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-dim)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Orientação IA
          </span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {/* Orientação principal */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 20, whiteSpace: 'pre-wrap' }}>
          {orientacao.orientacao}
        </p>

        {/* Passos */}
        {orientacao.passos?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Passo a passo
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {orientacao.passos.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'var(--gold)', color: 'var(--bg-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, flexShrink: 0, marginTop: 1,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dica para loja infantil */}
        {orientacao.dica_piccolo && (
          <div style={{
            background: 'rgba(201, 168, 76, 0.06)',
            border: '1px solid var(--gold-border)',
            borderRadius: 8,
            padding: '12px 16px',
            marginBottom: 16,
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              Dica para loja infantil
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {orientacao.dica_piccolo}
            </p>
          </div>
        )}

        {/* Cuidado */}
        {orientacao.cuidado && (
          <div style={{
            background: 'rgba(244, 67, 54, 0.05)',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            borderRadius: 8,
            padding: '12px 16px',
            marginBottom: 16,
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#F44336', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              Atenção
            </p>
            <p style={{ fontSize: '0.82rem', color: '#FF8A80', lineHeight: 1.5, margin: 0 }}>
              {orientacao.cuidado}
            </p>
          </div>
        )}

        {orientacao.tempo_estimado && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'right' }}>
            Tempo estimado: {orientacao.tempo_estimado}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Orquestrador() {
  const [progresso, setProgresso]     = useState(loadProgress)
  const [faseAtiva, setFaseAtiva]     = useState(FASES[0].id)
  const [loadingId, setLoadingId]     = useState(null)
  const [orientacao, setOrientacao]   = useState(null)
  const [erroId, setErroId]           = useState(null)

  const fase = FASES.find(f => f.id === faseAtiva) || FASES[0]
  const totalFeito = calcProgress(progresso)
  const totalGeral = totalTarefas()
  const pctGeral   = Math.round((totalFeito / totalGeral) * 100)

  function toggleTarefa(tarefaId) {
    setProgresso(prev => {
      const next = { ...prev, [tarefaId]: !prev[tarefaId] }
      saveProgress(next)
      return next
    })
  }

  async function pedirOrientacao(tarefa) {
    setLoadingId(tarefa.id)
    setErroId(null)
    try {
      const res = await fetch('/api/orientar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fase: fase.titulo, tarefa: tarefa.texto }),
      })
      if (!res.ok) throw new Error('Erro na API')
      const data = await res.json()
      setOrientacao(data)
    } catch {
      setErroId(tarefa.id)
    } finally {
      setLoadingId(null)
    }
  }

  function resetar() {
    if (!window.confirm('Apagar todo o progresso salvo?')) return
    setProgresso({})
    saveProgress({})
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Painel de orientação (modal) */}
      <OrientacaoPanel orientacao={orientacao} onClose={() => setOrientacao(null)} />

      {/* ── Cabeçalho ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            fontWeight: 600,
            marginBottom: 6,
          }}>
            Orquestrador Nuvemshop
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Setup guiado passo a passo. Clique em qualquer tarefa para pedir orientação detalhada ao Claude.
            Progresso salvo automaticamente no navegador.
          </p>
        </div>
        <button
          onClick={resetar}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '7px 14px',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          Resetar
        </button>
      </div>

      {/* ── Alerta domínio ── */}
      <Card style={{ borderColor: 'rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.04)', padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>💡</span>
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gold-light)' }}>
              Domínio pronto:{' '}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontSize: '0.8rem' }}>
                piccolobambino.com.br
              </code>{' '}
              já existe há 5 anos. Na Fase 1, você só precisa apontar o DNS para a Nuvemshop — não precisa comprar domínio novo.
              O histórico de domínio ajuda no SEO.
            </span>
          </div>
        </div>
      </Card>

      {/* ── Barra de progresso geral ── */}
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Progresso geral do setup
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: pctGeral === 100 ? '#4CAF50' : 'var(--gold)' }}>
                {totalFeito}/{totalGeral} tarefas · {pctGeral}%
              </span>
            </div>
            <div style={{ height: 6, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                width: `${pctGeral}%`,
                height: '100%',
                background: pctGeral === 100 ? '#4CAF50' : 'var(--gold)',
                borderRadius: 3,
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
          {pctGeral === 100 && (
            <span style={{ fontSize: '1.4rem' }}>🎉</span>
          )}
        </div>
      </Card>

      {/* ── Layout: sidebar + conteúdo ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>

        {/* Sidebar de fases */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {FASES.map((f, idx) => {
            const status = phaseStatus(f, progresso)
            const { done, total, pct } = faseProgress(f, progresso)
            const isActive = faseAtiva === f.id

            return (
              <button
                key={f.id}
                onClick={() => setFaseAtiva(f.id)}
                style={{
                  background: isActive ? 'var(--bg-elevated)' : 'none',
                  border: isActive ? '1px solid var(--gold-border)' : '1px solid transparent',
                  borderRadius: 8,
                  padding: '10px 12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StatusDot status={status} />
                  <span style={{ fontSize: '0.8rem', color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)', fontWeight: isActive ? 500 : 400 }}>
                    {idx + 1}. {f.titulo}
                  </span>
                </div>
                {done > 0 && (
                  <div style={{ height: 2, background: 'var(--border)', borderRadius: 1, overflow: 'hidden', marginLeft: 16 }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: status === 'concluida' ? '#4CAF50' : '#FFC107', borderRadius: 1 }} />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Painel da fase ativa */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Cabeçalho da fase */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            paddingBottom: 18,
            borderBottom: '1px solid var(--border)',
            marginBottom: 18,
          }}>
            <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{fase.icone}</span>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                {fase.titulo}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {fase.descricao}
              </p>
              {fase.alerta && (
                <div style={{
                  marginTop: 10,
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  color: 'var(--gold-light)',
                }}>
                  {fase.alerta}
                </div>
              )}
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
              {(() => {
                const { done, total } = faseProgress(fase, progresso)
                return (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: done === total ? '#4CAF50' : 'var(--text-muted)',
                  }}>
                    {done}/{total}
                  </span>
                )
              })()}
            </div>
          </div>

          {/* Lista de tarefas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {fase.tarefas.map((tarefa, i) => {
              const feito    = !!progresso[tarefa.id]
              const loading  = loadingId === tarefa.id
              const hasError = erroId === tarefa.id

              return (
                <div
                  key={tarefa.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: i < fase.tarefas.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTarefa(tarefa.id)}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      background: feito ? 'var(--gold)' : 'var(--bg-secondary)',
                      border: `1px solid ${feito ? 'var(--gold)' : 'var(--border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.65rem',
                      color: 'var(--bg-primary)',
                      flexShrink: 0,
                      transition: 'all 0.15s',
                    }}
                  >
                    {feito ? '✓' : ''}
                  </button>

                  {/* Texto */}
                  <span style={{
                    flex: 1,
                    fontSize: '0.875rem',
                    color: feito ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: feito ? 'line-through' : 'none',
                    lineHeight: 1.5,
                    transition: 'color 0.15s',
                  }}>
                    {tarefa.texto}
                  </span>

                  {/* Botão orientação IA */}
                  <button
                    onClick={() => pedirOrientacao(tarefa)}
                    disabled={loading}
                    style={{
                      background: 'none',
                      border: `1px solid ${hasError ? 'rgba(244,67,54,0.4)' : 'var(--border)'}`,
                      borderRadius: 6,
                      padding: '4px 10px',
                      color: hasError ? '#F44336' : 'var(--text-muted)',
                      fontSize: '0.7rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      flexShrink: 0,
                      transition: 'all 0.15s',
                      opacity: loading ? 0.6 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{
                          width: 10, height: 10,
                          border: '1.5px solid var(--border)', borderTopColor: 'var(--gold)',
                          borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                          display: 'inline-block',
                        }} />
                        <span>Carregando</span>
                      </>
                    ) : hasError ? (
                      '⚠ Erro'
                    ) : (
                      <>◈ IA</>
                    )}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Navegação entre fases */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--border)',
          }}>
            <button
              onClick={() => {
                const idx = FASES.findIndex(f => f.id === faseAtiva)
                if (idx > 0) setFaseAtiva(FASES[idx - 1].id)
              }}
              disabled={FASES[0].id === faseAtiva}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '8px 16px',
                color: FASES[0].id === faseAtiva ? 'var(--text-muted)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                cursor: FASES[0].id === faseAtiva ? 'not-allowed' : 'pointer',
                opacity: FASES[0].id === faseAtiva ? 0.4 : 1,
              }}
            >
              ← Fase anterior
            </button>

            {(() => {
              const { done, total } = faseProgress(fase, progresso)
              const lastFase = FASES[FASES.length - 1].id === faseAtiva
              return (
                <button
                  onClick={() => {
                    const idx = FASES.findIndex(f => f.id === faseAtiva)
                    if (idx < FASES.length - 1) setFaseAtiva(FASES[idx + 1].id)
                  }}
                  disabled={lastFase}
                  style={{
                    background: done === total && !lastFase ? 'var(--gold)' : 'var(--bg-secondary)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    color: done === total && !lastFase ? 'var(--bg-primary)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: done === total ? 600 : 400,
                    cursor: lastFase ? 'not-allowed' : 'pointer',
                    opacity: lastFase ? 0.4 : 1,
                    transition: 'all 0.15s',
                  }}
                >
                  {done === total && !lastFase ? 'Próxima fase →' : 'Pular fase →'}
                </button>
              )
            })()}
          </div>
        </Card>
      </div>
    </div>
  )
}
