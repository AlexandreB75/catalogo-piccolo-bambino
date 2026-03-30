import { useState } from 'react'
import AnalysisEngine from './components/AnalysisEngine'
import Pipeline from './components/Pipeline'
import Architecture from './components/Architecture'

const TABS = [
  { id: 'analysis',      label: 'Motor de Análise', icon: '◎' },
  { id: 'pipeline',      label: 'Pipeline',          icon: '◈' },
  { id: 'architecture',  label: 'Arquitetura',       icon: '⬡' },
]

export default function App() {
  const [active, setActive] = useState('analysis')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* ── Header ── */}
      <header style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--gold-border)',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--gold)',
            letterSpacing: '0.01em',
            lineHeight: 1.1,
          }}>
            Lótus <span style={{ fontWeight: 400 }}>Business</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: 5,
          }}>
            Prospecção Inteligente · Itapema SC
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--gold-dim)',
            letterSpacing: '0.08em',
          }}>
            Claude API
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            marginTop: 2,
          }}>
            claude-opus-4-6
          </div>
        </div>
      </header>

      {/* ── Tabs ── */}
      <nav style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: '0 40px',
        display: 'flex',
        gap: 4,
      }}>
        {TABS.map(tab => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                padding: '14px 20px',
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'color 0.15s',
                marginBottom: -1,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '0.9rem', opacity: isActive ? 1 : 0.5 }}>{tab.icon}</span>
              {tab.label}
            </button>
          )
        })}
      </nav>

      {/* ── Content ── */}
      <main style={{
        flex: 1,
        padding: '36px 40px',
        maxWidth: 1280,
        width: '100%',
        margin: '0 auto',
      }}>
        {active === 'analysis'     && <AnalysisEngine />}
        {active === 'pipeline'     && <Pipeline />}
        {active === 'architecture' && <Architecture />}
      </main>
    </div>
  )
}
