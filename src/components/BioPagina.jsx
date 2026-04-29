import { useState, useEffect } from 'react'

const DEFAULT_CONFIG = {
  nomeExibido: 'Piccolo Bambino',
  tagline: 'Moda e acessórios infantis com amor ❤️',
  corPrimaria: '#C9A84C',
  corFundo: '#0D0D0D',
  gtmId: 'GTM-PV837LX',
  links: [],
  rodape: 'Loja física aberta de seg a sáb, 9h–18h',
}

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

function Label({ children }) {
  return (
    <label style={{
      display: 'block',
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      marginBottom: 6,
      letterSpacing: '0.03em',
    }}>
      {children}
    </label>
  )
}

function Input({ value, onChange, placeholder, style = {} }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: '100%',
        background: 'var(--bg-secondary)',
        border: `1px solid ${focused ? 'var(--gold-dim)' : 'var(--border)'}`,
        borderRadius: 8,
        padding: '9px 12px',
        color: 'var(--text-primary)',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'border-color 0.15s',
        ...style,
      }}
    />
  )
}

// ── Preview mobile ────────────────────────────────────────────────────────────

function MobilePreview({ config }) {
  const active = config.links.filter(l => l.ativo)
  return (
    <div style={{
      width: 260,
      flexShrink: 0,
      background: config.corFundo || '#0D0D0D',
      borderRadius: 28,
      border: '6px solid #333',
      padding: '28px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      minHeight: 500,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      {/* Avatar */}
      <div style={{
        width: 64, height: 64,
        borderRadius: '50%',
        background: `${config.corPrimaria}25`,
        border: `2px solid ${config.corPrimaria}60`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.8rem', marginBottom: 12,
      }}>
        👶
      </div>

      {/* Nome */}
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: config.corPrimaria || '#C9A84C',
        textAlign: 'center',
        marginBottom: 6,
      }}>
        {config.nomeExibido || 'Piccolo Bambino'}
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: '0.65rem',
        color: '#9A9390',
        textAlign: 'center',
        marginBottom: 20,
        maxWidth: 200,
        lineHeight: 1.5,
      }}>
        {config.tagline}
      </div>

      {/* Links */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {active.map(l => (
          <div key={l.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#161616',
            border: `1px solid ${l.cor}30`,
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: '0.72rem',
            color: '#F0EBE0',
          }}>
            <span style={{ fontSize: '1rem' }}>{l.icone}</span>
            <span style={{ flex: 1 }}>{l.rotulo}</span>
            <span style={{ color: l.cor, fontSize: '0.75rem' }}>→</span>
          </div>
        ))}
        {active.length === 0 && (
          <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#524E4A', padding: '16px 0' }}>
            Nenhum link ativo
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div style={{ fontSize: '0.58rem', color: '#524E4A', textAlign: 'center', lineHeight: 1.6 }}>
        {config.rodape}
      </div>
    </div>
  )
}

// ── Editor de um link ─────────────────────────────────────────────────────────

function LinkEditor({ link, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: `1px solid ${link.ativo ? 'var(--border)' : 'var(--border)'}`,
      borderRadius: 10,
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      opacity: link.ativo ? 1 : 0.5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Ativo toggle */}
        <button
          onClick={() => onChange({ ...link, ativo: !link.ativo })}
          style={{
            width: 36, height: 20,
            borderRadius: 10,
            background: link.ativo ? 'var(--gold)' : 'var(--border)',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute',
            top: 2, left: link.ativo ? 18 : 2,
            width: 16, height: 16,
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.2s',
          }} />
        </button>

        <span style={{ fontSize: '1.1rem' }}>{link.icone}</span>
        <span style={{ flex: 1, fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
          {link.rotulo}
        </span>

        {/* Reordenar */}
        <button onClick={onMoveUp} disabled={isFirst} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: isFirst ? 'not-allowed' : 'pointer', opacity: isFirst ? 0.3 : 1, fontSize: '0.9rem' }}>↑</button>
        <button onClick={onMoveDown} disabled={isLast} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: isLast ? 'not-allowed' : 'pointer', opacity: isLast ? 0.3 : 1, fontSize: '0.9rem' }}>↓</button>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', color: '#F44336', cursor: 'pointer', fontSize: '0.9rem', opacity: 0.7 }}>✕</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: 8 }}>
        <div>
          <Label>Ícone</Label>
          <Input value={link.icone} onChange={v => onChange({ ...link, icone: v })} placeholder="🛒" />
        </div>
        <div>
          <Label>Rótulo</Label>
          <Input value={link.rotulo} onChange={v => onChange({ ...link, rotulo: v })} placeholder="Nome do botão" />
        </div>
        <div>
          <Label>Cor</Label>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="color"
              value={link.cor}
              onChange={e => onChange({ ...link, cor: e.target.value })}
              style={{ width: 36, height: 34, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', background: 'none', padding: 2 }}
            />
            <Input value={link.cor} onChange={v => onChange({ ...link, cor: v })} placeholder="#C9A84C" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} />
          </div>
        </div>
      </div>

      <div>
        <Label>URL</Label>
        <Input value={link.url} onChange={v => onChange({ ...link, url: v })} placeholder="https://..." />
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function BioPagina() {
  const [config, setConfig]   = useState(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const [copied, setCopied]   = useState(false)

  useEffect(() => {
    fetch('/api/bio-config')
      .then(r => r.json())
      .then(data => { setConfig(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function salvar() {
    setSaving(true)
    try {
      await fetch('/api/bio-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  function copiarLink() {
    const url = `${window.location.origin}/bio`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function updateLink(idx, updated) {
    const links = [...config.links]
    links[idx] = updated
    setConfig(c => ({ ...c, links }))
  }

  function removeLink(idx) {
    const links = config.links.filter((_, i) => i !== idx)
    setConfig(c => ({ ...c, links }))
  }

  function moveLink(idx, dir) {
    const links = [...config.links]
    const swapIdx = idx + dir
    if (swapIdx < 0 || swapIdx >= links.length) return
    ;[links[idx], links[swapIdx]] = [links[swapIdx], links[idx]]
    setConfig(c => ({ ...c, links }))
  }

  function addLink() {
    const novo = {
      id: `link_${Date.now()}`,
      ativo: true,
      icone: '🔗',
      rotulo: 'Novo link',
      url: 'https://',
      cor: '#C9A84C',
    }
    setConfig(c => ({ ...c, links: [...c.links, novo] }))
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Carregando...</span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

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
            Página Bio
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Sua própria versão do Foxappy — sem mensalidade, com sua marca. Cole o link na bio do Instagram.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 16 }}>
          <a
            href="/bio"
            target="_blank"
            rel="noopener"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '8px 14px',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            👁 Visualizar
          </a>
          <button
            onClick={copiarLink}
            style={{
              background: copied ? 'rgba(76,175,80,0.15)' : 'none',
              border: `1px solid ${copied ? '#4CAF5060' : 'var(--border)'}`,
              borderRadius: 8,
              padding: '8px 14px',
              color: copied ? '#4CAF50' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {copied ? '✓ Link copiado' : '🔗 Copiar link'}
          </button>
          <button
            onClick={salvar}
            disabled={saving}
            style={{
              background: saved ? 'rgba(76,175,80,0.2)' : 'var(--gold)',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              color: saved ? '#4CAF50' : 'var(--bg-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {saving ? 'Salvando...' : saved ? '✓ Salvo' : 'Salvar'}
          </button>
        </div>
      </div>

      {/* ── Aviso de URL ── */}
      <Card style={{ padding: '12px 16px', borderColor: 'var(--gold-border)', background: 'rgba(201,168,76,0.04)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span>📌</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Sua bio page estará em{' '}
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontSize: '0.8rem' }}>
              piccolobambino.com.br/bio
            </code>
            {' '}— cole esse link na bio do Instagram, TikTok ou qualquer rede social.
          </span>
        </div>
      </Card>

      {/* ── Layout: editor + preview ── */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

        {/* Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>

          {/* Info geral */}
          <Card>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Informações da loja
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <Label>Nome exibido</Label>
                <Input value={config.nomeExibido} onChange={v => setConfig(c => ({ ...c, nomeExibido: v }))} placeholder="Piccolo Bambino" />
              </div>
              <div>
                <Label>Tagline (subtítulo)</Label>
                <Input value={config.tagline} onChange={v => setConfig(c => ({ ...c, tagline: v }))} placeholder="Moda e acessórios infantis..." />
              </div>
              <div>
                <Label>Texto do rodapé</Label>
                <Input value={config.rodape} onChange={v => setConfig(c => ({ ...c, rodape: v }))} placeholder="Horário de funcionamento..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <Label>Cor principal</Label>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input type="color" value={config.corPrimaria} onChange={e => setConfig(c => ({ ...c, corPrimaria: e.target.value }))} style={{ width: 36, height: 34, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', background: 'none', padding: 2 }} />
                    <Input value={config.corPrimaria} onChange={v => setConfig(c => ({ ...c, corPrimaria: v }))} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} />
                  </div>
                </div>
                <div>
                  <Label>Cor de fundo</Label>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input type="color" value={config.corFundo} onChange={e => setConfig(c => ({ ...c, corFundo: e.target.value }))} style={{ width: 36, height: 34, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', background: 'none', padding: 2 }} />
                    <Input value={config.corFundo} onChange={v => setConfig(c => ({ ...c, corFundo: v }))} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} />
                  </div>
                </div>
                <div>
                  <Label>GTM ID</Label>
                  <Input value={config.gtmId} onChange={v => setConfig(c => ({ ...c, gtmId: v }))} placeholder="GTM-XXXXXXX" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Links */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Links ({config.links.filter(l => l.ativo).length} ativos)
              </p>
              <button
                onClick={addLink}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 7,
                  padding: '5px 12px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                + Adicionar link
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {config.links.map((link, i) => (
                <LinkEditor
                  key={link.id}
                  link={link}
                  onChange={updated => updateLink(i, updated)}
                  onRemove={() => removeLink(i)}
                  onMoveUp={() => moveLink(i, -1)}
                  onMoveDown={() => moveLink(i, 1)}
                  isFirst={i === 0}
                  isLast={i === config.links.length - 1}
                />
              ))}
              {config.links.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Clique em "+ Adicionar link" para começar
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Preview mobile */}
        <div style={{ position: 'sticky', top: 24, flexShrink: 0 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
            Preview
          </p>
          <MobilePreview config={config} />
        </div>
      </div>
    </div>
  )
}
