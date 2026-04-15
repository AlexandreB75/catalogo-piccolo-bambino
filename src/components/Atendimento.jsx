import { useState } from 'react'

const CANAIS = [
  { value: 'WhatsApp',    label: 'WhatsApp',     icon: '💬' },
  { value: 'Mercado Livre', label: 'Mercado Livre', icon: '🛒' },
  { value: 'Loja Física', label: 'Loja Física',  icon: '🏪' },
  { value: 'Nuvemshop',  label: 'Nuvemshop',    icon: '🌐' },
]

const URGENCIA_COLOR = {
  baixa: '#4CAF50',
  media: '#FFC107',
  alta:  '#F44336',
}

const CATEGORIA_LABEL = {
  pre_venda:        'Pré-venda',
  pos_venda:        'Pós-venda',
  troca_devolucao:  'Troca / Devolução',
  frete_entrega:    'Frete / Entrega',
  reclamacao:       'Reclamação',
  outro:            'Outro',
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

function inputStyle(focused) {
  return {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: `1px solid ${focused ? 'var(--gold-dim)' : 'var(--border)'}`,
    borderRadius: 8,
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.15s',
    resize: 'vertical',
  }
}

export default function Atendimento() {
  const [canal, setCanal]       = useState('WhatsApp')
  const [mensagem, setMensagem] = useState('')
  const [contexto, setContexto] = useState('')
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState(null)
  const [copied, setCopied]     = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!mensagem.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)
    setCopied(false)

    try {
      const res = await fetch('/api/atendimento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ canal, mensagem_cliente: mensagem, contexto }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro desconhecido')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!result?.resposta_sugerida) return
    navigator.clipboard.writeText(result.resposta_sugerida)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleReset() {
    setMensagem('')
    setContexto('')
    setResult(null)
    setError(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* ── Título ── */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
          fontWeight: 600,
          marginBottom: 6,
        }}>
          Atendimento com IA
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Cole a mensagem do cliente. A IA sugere a resposta ideal para o canal, identifica urgência e propõe ações internas.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Formulário ── */}
        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Canal */}
            <div>
              <Label>Canal de origem</Label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CANAIS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCanal(c.value)}
                    style={{
                      background: canal === c.value ? 'var(--gold)' : 'var(--bg-secondary)',
                      border: `1px solid ${canal === c.value ? 'var(--gold)' : 'var(--border)'}`,
                      borderRadius: 8,
                      padding: '7px 14px',
                      color: canal === c.value ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontWeight: canal === c.value ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  >
                    <span>{c.icon}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mensagem */}
            <div>
              <Label>Mensagem do cliente *</Label>
              <textarea
                value={mensagem}
                onChange={e => setMensagem(e.target.value)}
                onFocus={() => setFocusedField('mensagem')}
                onBlur={() => setFocusedField(null)}
                placeholder="Cole aqui a mensagem exata do cliente..."
                rows={5}
                required
                style={inputStyle(focusedField === 'mensagem')}
              />
            </div>

            {/* Contexto */}
            <div>
              <Label>Contexto adicional (opcional)</Label>
              <textarea
                value={contexto}
                onChange={e => setContexto(e.target.value)}
                onFocus={() => setFocusedField('contexto')}
                onBlur={() => setFocusedField(null)}
                placeholder="Ex: cliente comprou há 3 dias, produto chegou errado..."
                rows={2}
                style={inputStyle(focusedField === 'contexto')}
              />
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="submit"
                disabled={loading || !mensagem.trim()}
                style={{
                  flex: 1,
                  background: loading || !mensagem.trim() ? 'var(--bg-secondary)' : 'var(--gold)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 20px',
                  color: loading || !mensagem.trim() ? 'var(--text-muted)' : 'var(--bg-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: loading || !mensagem.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.15s',
                }}
              >
                {loading ? (
                  <>
                    <span style={{ width: 14, height: 14, border: '2px solid var(--gold-dim)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Gerando resposta...
                  </>
                ) : 'Gerar resposta'}
              </button>

              {result && (
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '12px 16px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Limpar
                </button>
              )}
            </div>
          </form>
        </Card>

        {/* ── Resultado ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {error && (
            <Card style={{ borderColor: '#F4433640', background: '#F4433608' }}>
              <p style={{ color: '#F44336', fontSize: '0.875rem' }}>{error}</p>
            </Card>
          )}

          {result && (
            <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Badges */}
              <Card style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 16 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: URGENCIA_COLOR[result.urgencia] || 'var(--text-secondary)',
                  background: `${URGENCIA_COLOR[result.urgencia] || '#9E9E9E'}18`,
                  border: `1px solid ${URGENCIA_COLOR[result.urgencia] || '#9E9E9E'}40`,
                  borderRadius: 6,
                  padding: '4px 10px',
                }}>
                  Urgência {result.urgencia?.toUpperCase()}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '4px 10px',
                }}>
                  {CATEGORIA_LABEL[result.categoria] || result.categoria}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: 'var(--gold-dim)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '4px 10px',
                }}>
                  Tom {result.tom}
                </span>
              </Card>

              {/* Alerta */}
              {result.alerta && (
                <Card style={{ borderColor: '#F4433640', background: '#F4433608', padding: 16 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0 }}>🚨</span>
                    <p style={{ fontSize: '0.82rem', color: '#FF8A80', lineHeight: 1.5, margin: 0 }}>
                      {result.alerta}
                    </p>
                  </div>
                </Card>
              )}

              {/* Resposta sugerida */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Resposta sugerida
                  </span>
                  <button
                    onClick={handleCopy}
                    style={{
                      background: copied ? 'var(--gold)' : 'var(--bg-secondary)',
                      border: `1px solid ${copied ? 'var(--gold)' : 'var(--border)'}`,
                      borderRadius: 6,
                      padding: '5px 12px',
                      color: copied ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontWeight: copied ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  >
                    {copied ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                }}>
                  {result.resposta_sugerida}
                </p>
              </Card>

              {/* Ações internas */}
              {result.acoes_sugeridas?.length > 0 && (
                <Card>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                    Ações internas
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.acoes_sugeridas.map((acao, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.65rem',
                          color: 'var(--gold-dim)',
                          flexShrink: 0,
                          marginTop: 1,
                        }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {acao}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {!result && !error && !loading && (
            <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200, borderStyle: 'dashed' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12, opacity: 0.3 }}>💬</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Cole a mensagem do cliente e clique em "Gerar resposta"
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
