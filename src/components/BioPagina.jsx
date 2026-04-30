import { useState } from 'react'

const LINKS = [
  {
    id: 'site',
    icone: '🛒',
    rotulo: 'Loja online',
    sub: 'piccolobambino.com.br',
    url: 'https://www.piccolobambino.com.br',
    cor: '#FF6B9D',
  },
  {
    id: 'whatsapp',
    icone: '💬',
    rotulo: 'Comprar pelo WhatsApp',
    sub: 'Atendimento rápido',
    url: 'https://wa.me/5500000000000',
    cor: '#25D366',
  },
  {
    id: 'ml',
    icone: '🛍️',
    rotulo: 'Mercado Livre',
    sub: 'Entrega para todo o Brasil',
    url: 'https://www.mercadolivre.com.br',
    cor: '#FFC107',
  },
  {
    id: 'loja',
    icone: '📍',
    rotulo: 'Como chegar na loja',
    sub: 'Seg–Sáb, 9h–18h',
    url: 'https://maps.google.com',
    cor: '#4CAF50',
  },
]

export default function BioPagina() {
  const [pressionado, setPressionado] = useState(null)

  function handleClick(link) {
    setPressionado(link.id)
    setTimeout(() => setPressionado(null), 300)
    window.open(link.url, '_blank', 'noopener')
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #FFF0F6 0%, #F5F0FF 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 20px',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Avatar */}
        <div style={{
          width: 90, height: 90,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF6B9D40, #C084FC40)',
          border: '3px solid #FF6B9D60',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.6rem',
          marginBottom: 16,
          boxShadow: '0 8px 24px rgba(255,107,157,0.2)',
        }}>
          👶
        </div>

        {/* Nome */}
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: '1.7rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #FF6B9D, #C084FC)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          Piccolo Bambino
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: '0.85rem',
          color: '#888',
          textAlign: 'center',
          marginTop: 8,
          marginBottom: 32,
          lineHeight: 1.5,
        }}>
          Moda e acessórios infantis com amor ❤️
        </p>

        {/* Links */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {LINKS.map(link => {
            const ativo = pressionado === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleClick(link)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: ativo ? `${link.cor}18` : 'white',
                  border: `1.5px solid ${ativo ? link.cor : '#F0E6EF'}`,
                  borderRadius: 16,
                  padding: '14px 18px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transform: ativo ? 'scale(0.97)' : 'scale(1)',
                  boxShadow: ativo ? `0 2px 12px ${link.cor}30` : '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                {/* Ícone com círculo colorido */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `${link.cor}18`,
                  border: `1px solid ${link.cor}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                }}>
                  {link.icone}
                </div>

                {/* Texto */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#222', lineHeight: 1.2 }}>
                    {link.rotulo}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: 2 }}>
                    {link.sub}
                  </div>
                </div>

                {/* Seta */}
                <span style={{ color: link.cor, fontSize: '1rem', flexShrink: 0, opacity: 0.7 }}>→</span>
              </button>
            )
          })}
        </div>

        {/* Rodapé */}
        <p style={{ fontSize: '0.7rem', color: '#ccc', textAlign: 'center', lineHeight: 1.6 }}>
          Loja física · Seg–Sáb, 9h–18h<br />
          <strong style={{ color: '#e0a0c0' }}>Piccolo Bambino</strong>
        </p>
      </div>
    </div>
  )
}
