import { useState } from 'react'

const PERGUNTAS = [
  {
    id: 'atendimento_atual',
    label: 'Capacidade de atendimento atual',
    pergunta: 'Hoje, quantas mensagens/pedidos sua equipe de 3 pessoas consegue atender por dia sem atrasar?',
    tipo: 'opcoes',
    opcoes: [
      { value: 'ate_30',    label: 'Até 30 por dia — já no limite' },
      { value: '30_a_60',   label: '30 a 60 por dia — confortável' },
      { value: 'mais_60',   label: 'Mais de 60 — sobra capacidade' },
    ],
  },
  {
    id: 'canal_mais_trabalho',
    label: 'Canal com mais trabalho',
    pergunta: 'Qual canal hoje gera mais trabalho manual para a equipe?',
    tipo: 'opcoes',
    opcoes: [
      { value: 'whatsapp', label: 'WhatsApp — muito volume de mensagens' },
      { value: 'ml',       label: 'Mercado Livre — respostas e reclamações' },
      { value: 'loja',     label: 'Loja física — muita demanda presencial' },
      { value: 'igual',    label: 'Todos parecidos' },
    ],
  },
  {
    id: 'tempo_para_site',
    label: 'Tempo disponível para configurar',
    pergunta: 'Você ou alguém da equipe tem tempo para configurar a loja e manter produtos atualizados?',
    tipo: 'opcoes',
    opcoes: [
      { value: 'sim_eu',       label: 'Sim, eu mesmo tenho tempo' },
      { value: 'sim_equipe',   label: 'Sim, alguém da equipe fará isso' },
      { value: 'nao_agora',    label: 'Não agora, estou sobrecarregado' },
      { value: 'contratar',    label: 'Pensei em contratar alguém para isso' },
    ],
  },
  {
    id: 'catalogo_atualizado',
    label: 'Estado do catálogo de produtos',
    pergunta: 'Seus produtos no Bling estão com fotos, descrições e preços prontos para um site?',
    tipo: 'opcoes',
    opcoes: [
      { value: 'sim_completo', label: 'Sim, tudo cadastrado e organizado' },
      { value: 'parcial',      label: 'Parcialmente — precisa de ajuste' },
      { value: 'nao',          label: 'Não — precisaria de trabalho significativo' },
    ],
  },
  {
    id: 'frete_configurado',
    label: 'Política de frete',
    pergunta: 'Você já tem uma política de frete definida? (Correios, Jadlog, retirada, frete grátis acima de X)',
    tipo: 'opcoes',
    opcoes: [
      { value: 'sim',         label: 'Sim, já está definido' },
      { value: 'parcial',     label: 'Parcialmente — precisa ajuste fino' },
      { value: 'nao',         label: 'Não, ainda precisa ser estruturado' },
    ],
  },
  {
    id: 'motivo_principal',
    label: 'Motivação para abrir o site',
    pergunta: 'Qual é o principal motivo para você querer a Nuvemshop agora?',
    tipo: 'opcoes',
    opcoes: [
      { value: 'profissionalizar', label: 'Profissionalizar a imagem da loja' },
      { value: 'escalar_ml',      label: 'Reduzir dependência do ML (taxas)' },
      { value: 'novos_clientes',  label: 'Atrair clientes que não estão no ML' },
      { value: 'pressao',         label: 'Concorrentes já têm site — me sinto pressionado' },
    ],
  },
  {
    id: 'observacoes',
    label: 'Contexto adicional (opcional)',
    pergunta: 'Algo mais que seja importante considerar na sua situação?',
    tipo: 'texto',
  },
]

const REC_CONFIG = {
  proceder_agora:        { label: 'Proceder agora',         color: '#4CAF50', icon: '✅' },
  aguardar:              { label: 'Aguardar',               color: '#F44336', icon: '⏸️' },
  proceder_com_ressalvas:{ label: 'Proceder com ressalvas', color: '#FFC107', icon: '⚠️' },
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

function Label({ children }) {
  return (
    <label style={{
      display: 'block',
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginBottom: 8,
      letterSpacing: '0.03em',
    }}>
      {children}
    </label>
  )
}

function ScoreRing({ score }) {
  const radius = 42
  const circ = 2 * Math.PI * radius
  const filled = (score / 100) * circ
  const color = score >= 65 ? '#4CAF50' : score >= 40 ? '#FFC107' : '#F44336'

  return (
    <div style={{ position: 'relative', width: 110, height: 110 }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="var(--bg-secondary)" strokeWidth="8" />
        <circle
          cx="55" cy="55" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeDashoffset={circ * 0.25}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color, fontWeight: 700 }}>{score}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>PRONTIDÃO</span>
      </div>
    </div>
  )
}

export default function NuvemshopPlanning() {
  const [respostas, setRespostas]     = useState({})
  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState(null)
  const [error, setError]             = useState(null)
  const [etapa, setEtapa]             = useState('form') // 'form' | 'resultado'

  const totalRespostas = PERGUNTAS.filter(p => p.tipo !== 'texto').length
  const respondidas = PERGUNTAS.filter(p => p.tipo !== 'texto' && respostas[p.id]).length
  const pronto = respondidas === totalRespostas

  function setResposta(id, value) {
    setRespostas(prev => ({ ...prev, [id]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!pronto) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/nuvemshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro desconhecido')
      }

      const data = await res.json()
      setResult(data)
      setEtapa('resultado')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setRespostas({})
    setResult(null)
    setError(null)
    setEtapa('form')
  }

  const rec = result ? REC_CONFIG[result.recomendacao] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* ── Título ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            fontWeight: 600,
            marginBottom: 6,
          }}>
            Avaliação Nuvemshop
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Responda o questionário abaixo. A IA analisa se sua operação está pronta para absorver o 4º canal agora.
          </p>
        </div>
        {etapa === 'resultado' && (
          <button
            onClick={handleReset}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '8px 16px',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              marginLeft: 16,
            }}
          >
            ← Refazer
          </button>
        )}
      </div>

      {/* ── Formulário ── */}
      {etapa === 'form' && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {PERGUNTAS.map((p, i) => (
            <Card key={p.id}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: respostas[p.id] ? 'var(--gold)' : 'var(--bg-secondary)',
                  border: `1px solid ${respostas[p.id] ? 'var(--gold)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', color: respostas[p.id] ? 'var(--bg-primary)' : 'var(--text-muted)',
                  flexShrink: 0, marginTop: 1, fontWeight: 700, transition: 'all 0.15s',
                }}>
                  {respostas[p.id] ? '✓' : i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <Label>{p.label}</Label>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                    {p.pergunta}
                  </p>

                  {p.tipo === 'opcoes' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.opcoes.map(op => {
                        const selected = respostas[p.id] === op.value
                        return (
                          <button
                            key={op.value}
                            type="button"
                            onClick={() => setResposta(p.id, op.value)}
                            style={{
                              background: selected ? 'rgba(201, 168, 76, 0.08)' : 'var(--bg-secondary)',
                              border: `1px solid ${selected ? 'var(--gold-dim)' : 'var(--border)'}`,
                              borderRadius: 8,
                              padding: '10px 14px',
                              color: selected ? 'var(--gold-light)' : 'var(--text-secondary)',
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.15s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                            }}
                          >
                            <span style={{
                              width: 14, height: 14, borderRadius: '50%',
                              border: `2px solid ${selected ? 'var(--gold)' : 'var(--border)'}`,
                              background: selected ? 'var(--gold)' : 'none',
                              flexShrink: 0,
                              transition: 'all 0.15s',
                            }} />
                            {op.label}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {p.tipo === 'texto' && (
                    <textarea
                      value={respostas[p.id] || ''}
                      onChange={e => setResposta(p.id, e.target.value)}
                      placeholder="Opcional — deixe em branco se não houver nada a adicionar"
                      rows={3}
                      style={{
                        width: '100%',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        padding: '10px 14px',
                        color: 'var(--text-primary)',
                        fontSize: '0.875rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* Progresso + botão */}
          <Card style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  Respostas obrigatórias
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: pronto ? 'var(--gold)' : 'var(--text-muted)' }}>
                  {respondidas}/{totalRespostas}
                </span>
              </div>
              <div style={{ height: 4, background: 'var(--bg-secondary)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  width: `${(respondidas / totalRespostas) * 100}%`,
                  height: '100%',
                  background: pronto ? 'var(--gold)' : 'var(--gold-dim)',
                  borderRadius: 2,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={!pronto || loading}
              style={{
                background: pronto && !loading ? 'var(--gold)' : 'var(--bg-secondary)',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                color: pronto && !loading ? 'var(--bg-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: pronto && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 14, height: 14, border: '2px solid var(--gold-dim)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Analisando...
                </>
              ) : 'Analisar prontidão →'}
            </button>
          </Card>

          {error && (
            <Card style={{ borderColor: '#F4433640', background: '#F4433608' }}>
              <p style={{ color: '#F44336', fontSize: '0.875rem' }}>{error}</p>
            </Card>
          )}
        </form>
      )}

      {/* ── Resultado ── */}
      {etapa === 'resultado' && result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeIn 0.4s ease' }}>

          {/* Score + recomendação */}
          <Card style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <ScoreRing score={result.score_prontidao} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: '1.2rem' }}>{rec?.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: rec?.color || 'var(--text-secondary)',
                  background: `${rec?.color || '#9E9E9E'}18`,
                  border: `1px solid ${rec?.color || '#9E9E9E'}40`,
                  borderRadius: 6,
                  padding: '4px 12px',
                }}>
                  {rec?.label?.toUpperCase()}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                {result.resumo_executivo}
              </p>
            </div>
          </Card>

          {/* Impacto na equipe */}
          <Card style={{ borderColor: 'rgba(255, 193, 7, 0.25)', background: 'rgba(255, 193, 7, 0.03)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Impacto na equipe atual
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {result.impacto_na_equipe}
            </p>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Riscos */}
            <Card>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                Principais riscos
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.riscos_principais?.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#F44336', flexShrink: 0, marginTop: 1 }}>▸</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alternativa */}
            {result.alternativa_ao_site && (
              <Card>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                  Alternativa imediata
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {result.alternativa_ao_site}
                </p>
              </Card>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Antes de migrar */}
            <Card>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--gold-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                Antes de abrir a loja
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.acoes_antes_de_migrar?.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: 4,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.62rem', color: 'var(--gold-dim)', flexShrink: 0, marginTop: 1,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Após abertura */}
            <Card>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#4CAF5090', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                Primeiras 2 semanas
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.acoes_apos_abertura?.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: 4,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.62rem', color: '#4CAF50', flexShrink: 0, marginTop: 1,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
