import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const DEFAULT_CONFIG = {
  nomeExibido: 'Piccolo Bambino',
  tagline: 'Moda e acessórios infantis com amor ❤️',
  corPrimaria: '#FF6B9D',
  corFundo: '#FFF0F6',
  gtmId: 'GTM-PV837LX',
  rodape: 'Loja física · Seg–Sáb, 9h–18h',
  links: [
    { id: 'site',      ativo: true, icone: '🛒', rotulo: 'Loja online',           sub: 'piccolobambino.com.br',       url: 'https://www.piccolobambino.com.br', cor: '#FF6B9D' },
    { id: 'whatsapp',  ativo: true, icone: '💬', rotulo: 'Comprar pelo WhatsApp', sub: 'Atendimento rápido',           url: 'https://wa.me/5500000000000',       cor: '#25D366' },
    { id: 'ml',        ativo: true, icone: '🛍️', rotulo: 'Mercado Livre',         sub: 'Entrega para todo o Brasil',  url: 'https://www.mercadolivre.com.br',   cor: '#FFC107' },
    { id: 'loja',      ativo: true, icone: '📍', rotulo: 'Como chegar na loja',   sub: 'Seg–Sáb, 9h–18h',            url: 'https://maps.google.com',           cor: '#4CAF50' },
  ],
}

function injectGTM(id) {
  if (!id || document.getElementById('gtm-bio')) return
  const s = document.createElement('script')
  s.id = 'gtm-bio'
  s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`
  document.head.appendChild(s)
}

function gtmClick(id, label) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'bio_click', link_id: id, link_label: label })
}

export default function BioPagina() {
  const [config, setConfig]     = useState(null)
  const [pressed, setPressed]   = useState(null)

  useEffect(() => {
    getDoc(doc(db, 'config', 'bio'))
      .then(snap => setConfig(snap.exists() ? snap.data() : DEFAULT_CONFIG))
      .catch(() => setConfig(DEFAULT_CONFIG))
  }, [])

  useEffect(() => {
    if (config?.gtmId) injectGTM(config.gtmId)
  }, [config?.gtmId])

  if (!config) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100dvh', background:'#FFF0F6' }}>
        <span style={{ fontSize: 44 }}>🌸</span>
      </div>
    )
  }

  const activeLinks = (config.links || []).filter(l => l.ativo !== false)

  function handleClick(link) {
    setPressed(link.id)
    setTimeout(() => setPressed(null), 280)
    gtmClick(link.id, link.rotulo)
    window.open(link.url, '_blank', 'noopener')
  }

  const cor = config.corPrimaria || '#FF6B9D'

  return (
    <div style={{
      minHeight: '100dvh',
      background: config.corFundo || '#FFF0F6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '36px 20px',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Avatar */}
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: `${cor}22`,
          border: `3px solid ${cor}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', marginBottom: 16,
          boxShadow: `0 8px 28px ${cor}30`,
        }}>
          👶
        </div>

        {/* Nome */}
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: '1.75rem', fontWeight: 700, margin: 0,
          background: `linear-gradient(135deg, ${cor}, #C084FC)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', textAlign: 'center', lineHeight: 1.2,
        }}>
          {config.nomeExibido}
        </h1>

        {/* Tagline */}
        <p style={{ fontSize: '0.82rem', color: '#999', textAlign: 'center', margin: '10px 0 28px', lineHeight: 1.5 }}>
          {config.tagline}
        </p>

        {/* Links */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
          {activeLinks.map(link => {
            const on = pressed === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleClick(link)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  background: on ? `${link.cor}15` : 'white',
                  border: `1.5px solid ${on ? link.cor : '#F0E4EE'}`,
                  borderRadius: 16, padding: '13px 16px', cursor: 'pointer',
                  textAlign: 'left',
                  transform: on ? 'scale(0.97)' : 'scale(1)',
                  boxShadow: on ? `0 2px 14px ${link.cor}35` : '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: `${link.cor}18`, border: `1px solid ${link.cor}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem',
                }}>
                  {link.icone}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>
                    {link.rotulo}
                  </div>
                  {link.sub && (
                    <div style={{ fontSize: '0.7rem', color: '#bbb', marginTop: 2 }}>{link.sub}</div>
                  )}
                </div>
                <span style={{ color: link.cor, fontSize: '1rem', flexShrink: 0, opacity: 0.65 }}>→</span>
              </button>
            )
          })}
        </div>

        {/* Rodapé */}
        <p style={{ fontSize: '0.68rem', color: '#ccc', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
          {config.rodape}<br />
          <strong style={{ color: `${cor}99` }}>{config.nomeExibido}</strong>
        </p>
      </div>
    </div>
  )
}
