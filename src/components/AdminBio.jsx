import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const DEFAULT_CONFIG = {
  nomeExibido: 'Piccolo Bambino',
  tagline: 'Moda e acessórios infantis com amor ❤️',
  corPrimaria: '#FF6B9D',
  corFundo: '#FFF0F6',
  gtmId: 'GTM-PV837LX',
  rodape: 'Loja física · Seg–Sáb, 9h–18h',
  links: [
    { id: 'site',     ativo: true, icone: '🛒', rotulo: 'Loja online',           sub: 'piccolobambino.com.br',      url: 'https://www.piccolobambino.com.br', cor: '#FF6B9D' },
    { id: 'whatsapp', ativo: true, icone: '💬', rotulo: 'Comprar pelo WhatsApp', sub: 'Atendimento rápido',          url: 'https://wa.me/5500000000000',       cor: '#25D366' },
    { id: 'ml',       ativo: true, icone: '🛍️', rotulo: 'Mercado Livre',         sub: 'Entrega para todo o Brasil', url: 'https://www.mercadolivre.com.br',   cor: '#FFC107' },
    { id: 'loja',     ativo: true, icone: '📍', rotulo: 'Como chegar na loja',   sub: 'Seg–Sáb, 9h–18h',           url: 'https://maps.google.com',           cor: '#4CAF50' },
  ],
}

// ── Preview mobile ────────────────────────────────────────────────────────────
function MobilePreview({ config }) {
  const cor = config.corPrimaria || '#FF6B9D'
  const active = (config.links || []).filter(l => l.ativo !== false)
  return (
    <div style={{
      width: 240, flexShrink: 0,
      background: config.corFundo || '#FFF0F6',
      borderRadius: 28, border: '6px solid #ddd',
      padding: '22px 14px 18px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: 460,
      boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: `${cor}22`, border: `2px solid ${cor}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', marginBottom: 10,
      }}>👶</div>

      <div style={{
        fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 700,
        background: `linear-gradient(135deg, ${cor}, #C084FC)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', textAlign: 'center', marginBottom: 5,
      }}>
        {config.nomeExibido || 'Piccolo Bambino'}
      </div>

      <div style={{ fontSize: '0.6rem', color: '#aaa', textAlign: 'center', marginBottom: 14, lineHeight: 1.4 }}>
        {config.tagline}
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
        {active.length === 0 && (
          <div style={{ textAlign: 'center', fontSize: '0.6rem', color: '#ccc', padding: '12px 0' }}>
            Nenhum link ativo
          </div>
        )}
        {active.map(l => (
          <div key={l.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'white', border: `1px solid ${l.cor}30`,
            borderRadius: 10, padding: '8px 10px',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: `${l.cor}18`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '0.9rem',
            }}>{l.icone}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#222' }}>{l.rotulo}</div>
              {l.sub && <div style={{ fontSize: '0.55rem', color: '#bbb' }}>{l.sub}</div>}
            </div>
            <span style={{ color: l.cor, fontSize: '0.7rem', opacity: 0.7 }}>→</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '0.52rem', color: '#ccc', textAlign: 'center', lineHeight: 1.5 }}>
        {config.rodape}
      </div>
    </div>
  )
}

// ── Editor de link individual ─────────────────────────────────────────────────
function LinkEditor({ link, onChange, onRemove, onUp, onDown, isFirst, isLast }) {
  return (
    <div style={{
      background: '#FFF8FB', border: '1px solid #F0E4EE',
      borderRadius: 12, padding: 14, opacity: link.ativo ? 1 : 0.5,
    }}>
      {/* Linha de controles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        {/* Toggle ativo */}
        <button
          onClick={() => onChange({ ...link, ativo: !link.ativo })}
          style={{
            width: 38, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
            background: link.ativo ? '#FF6B9D' : '#ddd', position: 'relative', flexShrink: 0,
            transition: 'background 0.2s',
          }}
        >
          <span style={{
            position: 'absolute', top: 2, left: link.ativo ? 20 : 2,
            width: 16, height: 16, borderRadius: '50%', background: 'white',
            transition: 'left 0.2s',
          }} />
        </button>

        <span style={{ fontSize: '1.1rem' }}>{link.icone}</span>
        <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: 600, color: '#333', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {link.rotulo}
        </span>

        <button onClick={onUp}    disabled={isFirst} style={arrowBtn(isFirst)}>↑</button>
        <button onClick={onDown}  disabled={isLast}  style={arrowBtn(isLast)}>↓</button>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '1rem', opacity: 0.7 }}>✕</button>
      </div>

      {/* Campos */}
      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', gap: 8, marginBottom: 8 }}>
        <div>
          <FieldLabel>Ícone</FieldLabel>
          <FieldInput value={link.icone} onChange={v => onChange({ ...link, icone: v })} placeholder="🛒" />
        </div>
        <div>
          <FieldLabel>Título</FieldLabel>
          <FieldInput value={link.rotulo} onChange={v => onChange({ ...link, rotulo: v })} placeholder="Nome do botão" />
        </div>
        <div>
          <FieldLabel>Subtítulo</FieldLabel>
          <FieldInput value={link.sub || ''} onChange={v => onChange({ ...link, sub: v })} placeholder="Descrição curta" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
        <div>
          <FieldLabel>URL</FieldLabel>
          <FieldInput value={link.url} onChange={v => onChange({ ...link, url: v })} placeholder="https://" />
        </div>
        <div>
          <FieldLabel>Cor</FieldLabel>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 6 }}>
            <input
              type="color" value={link.cor}
              onChange={e => onChange({ ...link, cor: e.target.value })}
              style={{ width: 34, height: 34, borderRadius: 6, border: '1px solid #eee', cursor: 'pointer', padding: 2 }}
            />
            <FieldInput value={link.cor} onChange={v => onChange({ ...link, cor: v })} placeholder="#FF6B9D"
              style={{ fontFamily: 'monospace', fontSize: '0.72rem', width: 80 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function arrowBtn(disabled) {
  return {
    background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    color: '#aaa', opacity: disabled ? 0.25 : 1, fontSize: '0.95rem',
  }
}

function FieldLabel({ children }) {
  return <div style={{ fontSize: '0.68rem', color: '#999', marginBottom: 4 }}>{children}</div>
}

function FieldInput({ value, onChange, placeholder, style = {} }) {
  return (
    <input
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: '100%', padding: '7px 10px', fontSize: '0.82rem',
        border: '1.5px solid #F0E4EE', borderRadius: 8,
        background: 'white', outline: 'none', boxSizing: 'border-box', ...style,
      }}
    />
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function AdminBio() {
  const navigate = useNavigate()
  const [config,  setConfig]  = useState(null)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [copied,  setCopied]  = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'config', 'bio'))
      .then(snap => setConfig(snap.exists() ? snap.data() : DEFAULT_CONFIG))
      .catch(() => setConfig(DEFAULT_CONFIG))
  }, [])

  async function salvar() {
    setSaving(true)
    try {
      await setDoc(doc(db, 'config', 'bio'), config)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      alert('Erro ao salvar. Verifique as regras do Firestore.')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  function copiarLink() {
    const url = `${window.location.origin}${window.location.pathname}#/bio`
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
    setConfig(c => ({ ...c, links: c.links.filter((_, i) => i !== idx) }))
  }

  function moveLink(idx, dir) {
    const links = [...config.links]
    const to = idx + dir
    if (to < 0 || to >= links.length) return
    ;[links[idx], links[to]] = [links[to], links[idx]]
    setConfig(c => ({ ...c, links }))
  }

  function addLink() {
    const novo = { id: `link_${Date.now()}`, ativo: true, icone: '🔗', rotulo: 'Novo link', sub: '', url: 'https://', cor: '#FF6B9D' }
    setConfig(c => ({ ...c, links: [...c.links, novo] }))
  }

  if (!config) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FFF5F8' }}>
        <span style={{ fontSize: 40 }}>🌸</span>
      </div>
    )
  }

  const activeCount = config.links.filter(l => l.ativo !== false).length

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5F8', paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #FF6B9D, #C084FC)',
        padding: '18px 16px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('/')} style={{
            background: 'rgba(255,255,255,0.25)', border: 'none', color: 'white',
            borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontSize: 16,
          }}>←</button>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Bio Page</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="#/bio" target="_blank" rel="noopener" style={{
            background: 'rgba(255,255,255,0.25)', border: 'none', color: 'white',
            borderRadius: 8, padding: '7px 12px', fontSize: '0.78rem',
            textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>👁 Ver</a>
          <button onClick={copiarLink} style={{
            background: copied ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.25)',
            border: 'none', color: 'white', borderRadius: 8, padding: '7px 12px',
            fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            {copied ? '✓ Copiado' : '🔗 Copiar link'}
          </button>
          <button onClick={salvar} disabled={saving} style={{
            background: saved ? 'rgba(76,175,80,0.5)' : 'rgba(255,255,255,0.9)',
            border: 'none', color: saved ? 'white' : '#FF6B9D',
            borderRadius: 8, padding: '7px 16px', fontSize: '0.82rem',
            fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
          }}>
            {saving ? 'Salvando...' : saved ? '✓ Salvo' : 'Salvar'}
          </button>
        </div>
      </div>

      {/* Aviso regras Firestore */}
      <div style={{ background: '#FFF3CD', borderBottom: '1px solid #FFC107', padding: '8px 16px', fontSize: '0.75rem', color: '#856404', display: 'flex', alignItems: 'center', gap: 6 }}>
        ⚠️ Para a página pública funcionar, adicione ao Firestore Rules:
        <code style={{ background: '#FFF', padding: '1px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.7rem' }}>
          match /config/{'{'}doc{'}'} {'{'} allow read: if true; allow write: if request.auth != null; {'}'}
        </code>
      </div>

      {/* Corpo: editor + preview */}
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', padding: 16, maxWidth: 800, margin: '0 auto' }}>

        {/* Editor (esquerda) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, marginRight: 20 }}>

          {/* Info da loja */}
          <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F0E4EE' }}>
            <div style={{ fontSize: '0.7rem', color: '#FF6B9D', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Informações
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div><FieldLabel>Nome</FieldLabel>
                <FieldInput value={config.nomeExibido} onChange={v => setConfig(c => ({...c, nomeExibido: v}))} placeholder="Piccolo Bambino" /></div>
              <div><FieldLabel>Tagline</FieldLabel>
                <FieldInput value={config.tagline} onChange={v => setConfig(c => ({...c, tagline: v}))} placeholder="Slogan da loja" /></div>
              <div><FieldLabel>Rodapé</FieldLabel>
                <FieldInput value={config.rodape} onChange={v => setConfig(c => ({...c, rodape: v}))} placeholder="Horário da loja" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div>
                  <FieldLabel>Cor principal</FieldLabel>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <input type="color" value={config.corPrimaria}
                      onChange={e => setConfig(c => ({...c, corPrimaria: e.target.value}))}
                      style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #eee', cursor: 'pointer', padding: 2 }} />
                    <FieldInput value={config.corPrimaria} onChange={v => setConfig(c => ({...c, corPrimaria: v}))}
                      style={{ fontFamily: 'monospace', fontSize: '0.7rem' }} />
                  </div>
                </div>
                <div>
                  <FieldLabel>Cor de fundo</FieldLabel>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <input type="color" value={config.corFundo}
                      onChange={e => setConfig(c => ({...c, corFundo: e.target.value}))}
                      style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #eee', cursor: 'pointer', padding: 2 }} />
                    <FieldInput value={config.corFundo} onChange={v => setConfig(c => ({...c, corFundo: v}))}
                      style={{ fontFamily: 'monospace', fontSize: '0.7rem' }} />
                  </div>
                </div>
                <div>
                  <FieldLabel>GTM ID</FieldLabel>
                  <FieldInput value={config.gtmId} onChange={v => setConfig(c => ({...c, gtmId: v}))} placeholder="GTM-XXXXXX"
                    style={{ fontFamily: 'monospace', fontSize: '0.7rem' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F0E4EE' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: '0.7rem', color: '#FF6B9D', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Links ({activeCount} ativos)
              </div>
              <button onClick={addLink} style={{
                background: '#FFF0F5', border: '1px solid #F0C0D8', borderRadius: 8,
                padding: '5px 12px', fontSize: '0.78rem', color: '#FF6B9D', cursor: 'pointer',
              }}>
                + Adicionar
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {config.links.map((link, i) => (
                <LinkEditor
                  key={link.id} link={link}
                  onChange={u => updateLink(i, u)}
                  onRemove={() => removeLink(i)}
                  onUp={() => moveLink(i, -1)}
                  onDown={() => moveLink(i, 1)}
                  isFirst={i === 0}
                  isLast={i === config.links.length - 1}
                />
              ))}
              {config.links.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#ddd', fontSize: '0.82rem' }}>
                  Clique em "+ Adicionar" para criar o primeiro link
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview (direita, sticky) */}
        <div style={{ position: 'sticky', top: 16, flexShrink: 0 }}>
          <div style={{ fontSize: '0.65rem', color: '#aaa', textAlign: 'center', marginBottom: 8, letterSpacing: '0.08em' }}>
            PREVIEW
          </div>
          <MobilePreview config={config} />
        </div>
      </div>
    </div>
  )
}
