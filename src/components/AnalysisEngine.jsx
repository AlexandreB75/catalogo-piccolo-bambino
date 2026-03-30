import { useState } from 'react'

const PROFISSOES  = ['Médico', 'Dentista', 'Psicólogo', 'Fisioterapeuta', 'Advogado', 'Contador', 'Arquiteto / Designer', 'Empresário', 'Empreendedor', 'Outro']
const SITUACOES   = ['Trabalho em casa', 'Coworking / escritório compartilhado', 'Aluguel próprio em outra cidade', 'Aluguel em Itapema', 'Sem espaço fixo']
const ORIGENS     = ['LinkedIn', 'Indicação', 'Instagram', 'Google Ads', 'Evento / feira', 'WhatsApp ativo', 'Outro']
const CANAIS      = ['WhatsApp', 'LinkedIn', 'Email', 'Telefone']
const TEMPOS      = ['Menos de 1 ano', '1 a 3 anos', '3 a 5 anos', 'Mais de 5 anos']
const INTERESSES  = ['Muito alto', 'Alto', 'Médio', 'Baixo', 'Desconhecido']

const FORM_INICIAL = {
  nome: '',
  profissao: '',
  especialidade: '',
  situacaoAtual: '',
  tempoEmItapema: '',
  interesseDemonstrado: '',
  origemContato: '',
  canalPreferido: 'WhatsApp',
  observacoes: '',
}

// ── Componentes de campo ────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <label style={{
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.68rem',
      color: 'var(--text-muted)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 7,
    }}>
      {children}
    </label>
  )
}

const inputBase = {
  width: '100%',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '11px 14px',
  color: 'var(--text-primary)',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.15s',
}

function Input({ value, onChange, placeholder, required }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={inputBase}
      onFocus={e => (e.target.style.borderColor = 'var(--gold-dim)')}
      onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
    />
  )
}

function Select({ value, onChange, options, required }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      style={{
        ...inputBase,
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23524E4A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        paddingRight: 32,
        color: value ? 'var(--text-primary)' : 'var(--text-muted)',
      }}
      onFocus={e => (e.target.style.borderColor = 'var(--gold-dim)')}
      onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
    >
      <option value="" style={{ background: '#222' }}>Selecionar…</option>
      {options.map(o => (
        <option key={o} value={o} style={{ background: '#222' }}>{o}</option>
      ))}
    </select>
  )
}

// ── Score circle SVG ─────────────────────────────────────────────────────────

function ScoreCircle({ score }) {
  const r  = 42
  const cx = 52, cy = 52
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  const color = score >= 70 ? 'var(--gold)' : score >= 40 ? '#E8A030' : '#6B8CAE'

  return (
    <svg width={104} height={104} viewBox="0 0 104 104" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={5} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text
        x={cx} y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize={20}
        fontWeight={700}
        fontFamily="'JetBrains Mono', monospace"
      >
        {score}
      </text>
    </svg>
  )
}

// ── Resultado ────────────────────────────────────────────────────────────────

function ResultCard({ result, canal }) {
  const [copied, setCopied] = useState(false)

  const catColor = result.categoria === 'Quente' ? 'var(--gold)' : result.categoria === 'Morno' ? '#E8A030' : '#6B8CAE'

  const copy = () => {
    navigator.clipboard.writeText(result.mensagem_personalizada)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const insights = [
    { key: 'dor_principal',    label: 'Dor principal',    icon: '◎' },
    { key: 'argumento_chave',  label: 'Argumento-chave',  icon: '◆' },
    { key: 'objecao_provavel', label: 'Objeção provável', icon: '◇' },
    { key: 'como_contornar',   label: 'Como contornar',   icon: '◈' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeIn 0.35s ease' }}>
      {/* Score + Categoria */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius)',
        padding: '22px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 22,
      }}>
        <ScoreCircle score={result.score} />
        <div>
          <span style={{
            display: 'inline-block',
            background: `${catColor}18`,
            border: `1px solid ${catColor}55`,
            color: catColor,
            borderRadius: 5,
            padding: '3px 12px',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            marginBottom: 10,
          }}>
            {result.categoria}
          </span>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {result.justificativa_score}
          </p>
        </div>
      </div>

      {/* Insights */}
      {insights.map(item => (
        <div key={item.key} style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '14px 18px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--gold-dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 7,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span>{item.icon}</span>{item.label}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.65 }}>
            {result[item.key]}
          </p>
        </div>
      ))}

      {/* Mensagem personalizada */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius)',
        padding: '16px 18px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--gold-dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            ✦ Mensagem · {canal}
          </div>
          <button
            onClick={copy}
            style={{
              background: copied ? 'rgba(201,168,76,0.15)' : 'var(--bg-elevated)',
              border: '1px solid var(--gold-border)',
              borderRadius: 6,
              padding: '4px 12px',
              color: copied ? 'var(--gold)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s',
            }}
          >
            {copied ? 'Copiado ✓' : 'Copiar'}
          </button>
        </div>
        <p style={{
          fontSize: '0.855rem',
          color: 'var(--text-primary)',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
        }}>
          {result.mensagem_personalizada}
        </p>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function AnalysisEngine() {
  const [form, setForm]       = useState(FORM_INICIAL)
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospect: form }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Erro desconhecido')
      setResult(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
      {/* ── Formulário ── */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: 6 }}>
          Análise de Prospect
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 30, lineHeight: 1.6 }}>
          Insira os dados do prospect. O Claude diagnostica, classifica e gera a mensagem personalizada.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <Label>Nome completo</Label>
            <Input value={form.nome} onChange={v => set('nome', v)} placeholder="Dr. João Silva" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <Label>Profissão</Label>
              <Select value={form.profissao} onChange={v => set('profissao', v)} options={PROFISSOES} required />
            </div>
            <div>
              <Label>Especialidade / Setor</Label>
              <Input value={form.especialidade} onChange={v => set('especialidade', v)} placeholder="Cardiologista, Tributário…" />
            </div>
          </div>

          <div>
            <Label>Situação atual de espaço</Label>
            <Select value={form.situacaoAtual} onChange={v => set('situacaoAtual', v)} options={SITUACOES} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <Label>Tempo em Itapema</Label>
              <Select value={form.tempoEmItapema} onChange={v => set('tempoEmItapema', v)} options={TEMPOS} />
            </div>
            <div>
              <Label>Interesse demonstrado</Label>
              <Select value={form.interesseDemonstrado} onChange={v => set('interesseDemonstrado', v)} options={INTERESSES} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <Label>Origem do contato</Label>
              <Select value={form.origemContato} onChange={v => set('origemContato', v)} options={ORIGENS} required />
            </div>
            <div>
              <Label>Canal preferido</Label>
              <Select value={form.canalPreferido} onChange={v => set('canalPreferido', v)} options={CANAIS} />
            </div>
          </div>

          <div>
            <Label>Observações livres</Label>
            <textarea
              value={form.observacoes}
              onChange={e => set('observacoes', e.target.value)}
              placeholder="Qualquer contexto adicional relevante…"
              rows={4}
              style={{
                ...inputBase,
                resize: 'vertical',
                lineHeight: 1.6,
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--gold-dim)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? 'var(--bg-elevated)' : 'var(--gold)',
              color: loading ? 'var(--text-muted)' : '#0D0D0D',
              border: 'none',
              borderRadius: 8,
              padding: '13px 24px',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              marginTop: 4,
            }}
          >
            {loading ? 'Analisando…' : 'Analisar com Claude'}
          </button>
        </form>
      </div>

      {/* ── Resultado ── */}
      <div>
        {!result && !loading && !error && (
          <div style={{
            minHeight: 320,
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            color: 'var(--text-muted)',
          }}>
            <span style={{ fontSize: '1.8rem', opacity: 0.2 }}>◈</span>
            <p style={{ fontSize: '0.82rem', textAlign: 'center', lineHeight: 1.7 }}>
              Preencha o formulário e clique em<br />
              <span style={{ color: 'var(--gold-dim)' }}>Analisar com Claude</span>
            </p>
          </div>
        )}

        {loading && (
          <div style={{
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}>
            <div style={{
              width: 42,
              height: 42,
              border: '2px solid var(--border)',
              borderTop: '2px solid var(--gold)',
              borderRadius: '50%',
              animation: 'spin 0.9s linear infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              claude-opus-4-6 processando…
            </span>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(244,67,54,0.07)',
            border: '1px solid rgba(244,67,54,0.3)',
            borderRadius: 'var(--radius)',
            padding: '18px 20px',
            color: '#F87171',
            fontSize: '0.85rem',
            lineHeight: 1.6,
          }}>
            <strong>Erro:</strong> {error}
          </div>
        )}

        {result && <ResultCard result={result} canal={form.canalPreferido} />}
      </div>
    </div>
  )
}
