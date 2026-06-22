import { useState } from 'react'

// ── Catálogo de produtos ─────────────────────────────────────────────────────

const PAPEIS_PAREDE = [
  { id: 'pp0', nome: 'Branco Puro',   cor: '#F8F8F4', pattern: null },
  { id: 'pp1', nome: 'Azul Céu',      cor: '#C8DCF0', pattern: 'dots' },
  { id: 'pp2', nome: 'Rosa Bebê',     cor: '#F5D0DC', pattern: 'stars' },
  { id: 'pp3', nome: 'Menta',         cor: '#C0DCCC', pattern: 'clouds' },
  { id: 'pp4', nome: 'Areia',         cor: '#ECD8B8', pattern: 'none' },
  { id: 'pp5', nome: 'Lilás',         cor: '#D8C8F0', pattern: 'hearts' },
  { id: 'pp6', nome: 'Sage',          cor: '#C8D4C0', pattern: 'none' },
]

const BERCOS = [
  { id: 'b1', nome: 'Berço Toy',          marca: 'Só Berço',  preco: 1890, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'b2', nome: 'Berço Evolutivo 3em1', marca: 'Quater',   preco: 2890, corMob: '#EDE8DC', detalhe: '#C8B898' },
  { id: 'b3', nome: 'Berço Cozy',         marca: 'Quater',    preco: 2490, corMob: '#F0EDE4', detalhe: '#D4C8A8' },
  { id: 'b4', nome: 'Berço Ópera',        marca: 'Piccolo',   preco: 2190, corMob: '#FAFAF8', detalhe: '#DDDDD8' },
  { id: 'b5', nome: 'Berço La Vie',       marca: 'Piccolo',   preco: 2690, corMob: '#F8F4EC', detalhe: '#C0B090' },
]

const COMODAS = [
  { id: 'c1', nome: 'Cômoda Simples',      preco: 1190, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'c2', nome: 'Cômoda c/ Trocador',  preco: 1590, corMob: '#EDE8DC', detalhe: '#C8B898' },
  { id: 'c3', nome: 'Cômoda Dupla',        preco: 1890, corMob: '#FAFAF8', detalhe: '#DDDDD8' },
  { id: 'c4', nome: 'Cômoda Quater',       preco: 2190, corMob: '#F0EDE4', detalhe: '#D4C8A8' },
]

const POLTRONAS = [
  { id: 'p1', nome: 'Poltrona Classic',  preco:  890, corMob: '#E8D8B8', detalhe: '#D4C09C' },
  { id: 'p2', nome: 'Poltrona Comfort',  preco: 1190, corMob: '#D8D8D8', detalhe: '#C0C0C0' },
  { id: 'p3', nome: 'Poltrona Luxo',     preco: 1490, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'p4', nome: 'Poltrona Reclinável', preco: 1890, corMob: '#E0D0C8', detalhe: '#C8B0A8' },
]

const KITS = [
  { id: 'k1', nome: 'Kit Urso Polar',     preco: 390, cor: '#D8E8F4', corAcento: '#B0C8E0' },
  { id: 'k2', nome: 'Kit Estrelinhas',    preco: 350, cor: '#F8ECD8', corAcento: '#E0C898' },
  { id: 'k3', nome: 'Kit Borboletas',     preco: 420, cor: '#F0D8EC', corAcento: '#D8A8D0' },
  { id: 'k4', nome: 'Kit Neutro Premium', preco: 480, cor: '#F0EDE8', corAcento: '#D8D0C4' },
  { id: 'k5', nome: 'Kit Safari',         preco: 440, cor: '#ECD8C0', corAcento: '#C8A880' },
]

const WHATSAPP = '5547999999999' // ← trocar pelo número real

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

function PatternOverlay({ pattern, cor }) {
  if (!pattern || pattern === 'none') return null
  const size = 28
  const shapes = {
    dots: (
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <defs><pattern id="dots" x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size/2} cy={size/2} r="3" fill="rgba(0,0,0,0.5)" />
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    stars: (
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.14 }}>
        <defs><pattern id="stars" x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <text x={size/2 - 5} y={size/2 + 4} fontSize="10" fill="rgba(0,0,0,0.5)">★</text>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>
    ),
    clouds: (
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
        <defs><pattern id="clouds" x="0" y="0" width="40" height="30" patternUnits="userSpaceOnUse">
          <text x="4" y="18" fontSize="14" fill="rgba(0,0,0,0.4)">☁</text>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#clouds)" />
      </svg>
    ),
    hearts: (
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.13 }}>
        <defs><pattern id="hearts" x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <text x={size/2 - 5} y={size/2 + 4} fontSize="10" fill="rgba(0,0,0,0.5)">♥</text>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#hearts)" />
      </svg>
    ),
  }
  return shapes[pattern] || null
}

// ── Visualização do quarto ────────────────────────────────────────────────────

function RoomPreview({ parede, berco, comoda, poltrona, kit }) {
  const wallColor = parede?.cor ?? '#F8F8F4'
  const floorColor = '#D4C4A8'
  const rodapeColor = '#C0B090'

  return (
    <div style={{ width: '100%', position: 'relative', userSelect: 'none' }}>
      {/* Container do quarto */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '62%',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        border: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>

          {/* Parede */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '62%',
            background: wallColor,
            transition: 'background 0.4s ease',
          }}>
            <PatternOverlay pattern={parede?.pattern} cor={wallColor} />

            {/* Rodapé teto */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(0,0,0,0.06)' }} />

            {/* Janela decorativa */}
            <div style={{
              position: 'absolute', top: '15%', right: '8%',
              width: '12%', height: '34%',
              background: 'rgba(255,255,255,0.55)',
              borderRadius: 6,
              border: '2px solid rgba(255,255,255,0.9)',
              boxShadow: 'inset 0 0 12px rgba(180,220,255,0.4)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 1, height: '100%', background: 'rgba(255,255,255,0.7)', position: 'absolute' }} />
              <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.7)', position: 'absolute' }} />
            </div>

            {/* Quadrinho decorativo */}
            <div style={{
              position: 'absolute', top: '12%', left: '30%',
              width: '8%', height: '16%',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 4,
              border: '2px solid rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem',
            }}>
              {['🌙','⭐','🌸','🦋','🐻','🌈'][PAPEIS_PAREDE.indexOf(parede) % 6] || '🌙'}
            </div>
          </div>

          {/* Rodapé parede */}
          <div style={{
            position: 'absolute', top: 'calc(62% - 8px)', left: 0, right: 0,
            height: 8, background: rodapeColor,
          }} />

          {/* Chão */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '38%',
            background: `repeating-linear-gradient(90deg, ${floorColor} 0px, ${floorColor} 59px, #C8B898 60px)`,
          }}>
            {/* Sombra perspectiva */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: 'linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)' }} />
          </div>

          {/* ── Berço ── */}
          {berco && (
            <div style={{
              position: 'absolute', bottom: '28%', left: '7%',
              width: '22%',
              transition: 'all 0.3s ease',
            }}>
              {/* Corpo do berço */}
              <div style={{
                position: 'relative',
                width: '100%', paddingBottom: '72%',
              }}>
                {/* Grade frontal */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: berco.corMob,
                  borderRadius: '6px 6px 4px 4px',
                  border: `2px solid ${berco.detalhe}`,
                  overflow: 'hidden',
                }}>
                  {/* Grades verticais */}
                  {[25, 50, 75].map(p => (
                    <div key={p} style={{
                      position: 'absolute', top: 0, bottom: '20%',
                      left: `${p}%`, width: 2,
                      background: berco.detalhe,
                    }} />
                  ))}
                  {/* Colchão com kit */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 4, right: 4, top: '30%',
                    background: kit?.cor ?? '#F0EDE8',
                    borderRadius: 3,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.55rem', color: kit?.corAcento ?? '#C8C0B8',
                  }}>
                    {kit ? '🛏' : ''}
                  </div>
                </div>
                {/* Pés */}
                {[10, 85].map(p => (
                  <div key={p} style={{
                    position: 'absolute', bottom: '-8%',
                    left: `${p}%`, width: '5%', height: '12%',
                    background: berco.detalhe, borderRadius: '0 0 3px 3px',
                  }} />
                ))}
              </div>
              <div style={{
                textAlign: 'center', marginTop: 4,
                fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                color: 'var(--text-muted)', letterSpacing: '0.04em',
              }}>
                {berco.nome}
              </div>
            </div>
          )}

          {/* Placeholder berço */}
          {!berco && (
            <div style={{
              position: 'absolute', bottom: '28%', left: '7%',
              width: '22%', paddingBottom: '16%',
              border: '2px dashed rgba(0,0,0,0.12)',
              borderRadius: 8, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.55rem', color: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>berço</span>
            </div>
          )}

          {/* ── Cômoda ── */}
          {comoda && (
            <div style={{
              position: 'absolute', bottom: '28%', left: '33%',
              width: '18%',
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                position: 'relative', width: '100%', paddingBottom: '80%',
                background: comoda.corMob,
                border: `2px solid ${comoda.detalhe}`,
                borderRadius: '4px 4px 3px 3px',
                overflow: 'hidden',
              }}>
                {/* Gavetas */}
                {[20, 50, 78].map((t, i) => (
                  <div key={i} style={{
                    position: 'absolute', top: `${t}%`, left: '8%', right: '8%',
                    height: '20%', background: comoda.detalhe,
                    borderRadius: 2, opacity: 0.5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: 8, height: 3, background: comoda.corMob, borderRadius: 2 }} />
                  </div>
                ))}
              </div>
              {/* Pés */}
              {[12, 76].map(p => (
                <div key={p} style={{
                  display: 'inline-block', marginTop: 0,
                  position: 'absolute', bottom: '-8%',
                  left: `${p}%`, width: '6%', height: '12%',
                  background: comoda.detalhe, borderRadius: '0 0 2px 2px',
                }} />
              ))}
              <div style={{
                textAlign: 'center', marginTop: 6,
                fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                color: 'var(--text-muted)',
              }}>
                {comoda.nome}
              </div>
            </div>
          )}
          {!comoda && (
            <div style={{
              position: 'absolute', bottom: '28%', left: '33%',
              width: '18%', paddingBottom: '14%',
              border: '2px dashed rgba(0,0,0,0.12)',
              borderRadius: 8,
            }}>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.55rem', color: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>cômoda</span>
            </div>
          )}

          {/* ── Poltrona ── */}
          {poltrona && (
            <div style={{
              position: 'absolute', bottom: '28%', left: '58%',
              width: '16%',
              transition: 'all 0.3s ease',
            }}>
              {/* Encosto */}
              <div style={{
                width: '100%', paddingBottom: '50%',
                background: poltrona.corMob,
                border: `2px solid ${poltrona.detalhe}`,
                borderRadius: '12px 12px 0 0',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', bottom: -2, left: '-8%', right: '-8%',
                  height: '40%', background: poltrona.detalhe,
                  borderRadius: '0 0 4px 4px', opacity: 0.3,
                }} />
              </div>
              {/* Assento */}
              <div style={{
                width: '110%', marginLeft: '-5%',
                paddingBottom: '28%',
                background: poltrona.corMob,
                border: `2px solid ${poltrona.detalhe}`,
                borderRadius: '4px 4px 2px 2px',
                marginTop: -2,
              }} />
              {/* Braços */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -4 }}>
                {[0,1].map(i => (
                  <div key={i} style={{
                    width: '15%', height: 16,
                    background: poltrona.detalhe,
                    borderRadius: '0 0 4px 4px',
                  }} />
                ))}
              </div>
              <div style={{
                textAlign: 'center', marginTop: 4,
                fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                color: 'var(--text-muted)',
              }}>
                {poltrona.nome}
              </div>
            </div>
          )}
          {!poltrona && (
            <div style={{
              position: 'absolute', bottom: '28%', left: '58%',
              width: '16%', paddingBottom: '18%',
              border: '2px dashed rgba(0,0,0,0.12)',
              borderRadius: 8,
            }}>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.55rem', color: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>poltrona</span>
            </div>
          )}

          {/* Marca d'água */}
          <div style={{
            position: 'absolute', bottom: 8, right: 12,
            fontFamily: 'var(--font-serif)',
            fontSize: '0.6rem', color: 'rgba(0,0,0,0.18)',
            letterSpacing: '0.08em',
          }}>
            Piccolo Bambino
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Seletor de produto ────────────────────────────────────────────────────────

function ProductSelector({ label, icon, items, selected, onSelect, renderItem }) {
  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        color: 'var(--text-muted)', letterSpacing: '0.12em',
        textTransform: 'uppercase', marginBottom: 10,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span>{icon}</span> {label}
        {selected && (
          <button onClick={() => onSelect(null)} style={{
            marginLeft: 'auto', background: 'none', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem',
            padding: '0 4px',
          }}>✕ limpar</button>
        )}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map(item => {
          const isSelected = selected?.id === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(isSelected ? null : item)}
              style={{
                background: isSelected ? 'var(--gold)' : 'var(--bg-secondary)',
                border: `1px solid ${isSelected ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 8, padding: '8px 12px',
                cursor: 'pointer', transition: 'all 0.15s',
                textAlign: 'left',
              }}
            >
              {renderItem ? renderItem(item, isSelected) : (
                <div>
                  <div style={{
                    fontSize: '0.78rem', fontWeight: 500,
                    color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                  }}>{item.nome}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                    color: isSelected ? 'rgba(0,0,0,0.5)' : 'var(--text-muted)',
                    marginTop: 2,
                  }}>{fmt(item.preco)}</div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function MonteSeuQuarto() {
  const [parede,   setParede]   = useState(PAPEIS_PAREDE[0])
  const [berco,    setBerco]    = useState(null)
  const [comoda,   setComoda]   = useState(null)
  const [poltrona, setPoltrona] = useState(null)
  const [kit,      setKit]      = useState(null)
  const [enviado,  setEnviado]  = useState(false)

  const total = [berco, comoda, poltrona, kit].reduce((s, p) => s + (p?.preco ?? 0), 0)
  const itens = [
    berco    && { nome: berco.nome,    preco: berco.preco },
    comoda   && { nome: comoda.nome,   preco: comoda.preco },
    poltrona && { nome: poltrona.nome, preco: poltrona.preco },
    kit      && { nome: kit.nome,      preco: kit.preco },
  ].filter(Boolean)

  function limparTudo() {
    setParede(PAPEIS_PAREDE[0])
    setBerco(null); setComoda(null)
    setPoltrona(null); setKit(null)
    setEnviado(false)
  }

  function enviarWhatsApp() {
    if (itens.length === 0) return
    const linhas = itens.map(i => `• ${i.nome} — ${fmt(i.preco)}`).join('\n')
    const msg = `Olá! Montei um projeto de quarto na loja e tenho interesse:\n\n${linhas}\n\nPapel de parede: ${parede?.nome ?? 'Branco Puro'}\n\nTotal estimado: ${fmt(total)}\n\nPoderia me passar mais informações?`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    setEnviado(true)
  }

  const selecionados = itens.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* ── Cabeçalho ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
            color: 'var(--text-primary)', fontWeight: 600, marginBottom: 6,
          }}>
            Monte seu Quarto
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Escolha os móveis e veja como o quarto vai ficar antes de decidir.
          </p>
        </div>
        {selecionados > 0 && (
          <button onClick={limparTudo} style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 16px',
            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem',
          }}>
            ↺ Recomeçar
          </button>
        )}
      </div>

      {/* ── Layout principal ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>

        {/* Visualização */}
        <div>
          <RoomPreview parede={parede} berco={berco} comoda={comoda} poltrona={poltrona} kit={kit} />

          {selecionados === 0 && (
            <p style={{
              textAlign: 'center', marginTop: 14,
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: 'var(--text-muted)', letterSpacing: '0.08em',
            }}>
              ← Selecione os itens no painel ao lado para montar o quarto
            </p>
          )}
        </div>

        {/* Painel lateral */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Resumo do projeto */}
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: 20, marginBottom: 20,
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: 'var(--text-muted)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>
              Projeto atual
            </p>

            {itens.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Nenhum item selecionado
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {itens.map(i => (
                  <div key={i.nome} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{i.nome}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)' }}>
                      {fmt(i.preco)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {itens.length > 0 && (
              <>
                <div style={{
                  marginTop: 14, paddingTop: 14,
                  borderTop: '1px solid var(--border)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Total estimado
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700 }}>
                    {fmt(total)}
                  </span>
                </div>

                <button
                  onClick={enviarWhatsApp}
                  style={{
                    width: '100%', marginTop: 14,
                    background: enviado ? '#25D366' : 'var(--gold)',
                    border: 'none', borderRadius: 10,
                    padding: '12px 0',
                    color: enviado ? '#fff' : 'var(--bg-primary)',
                    fontWeight: 700, fontSize: '0.875rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {enviado ? '✓ Enviado no WhatsApp' : '💬 Enviar projeto no WhatsApp'}
                </button>

                <p style={{
                  fontSize: '0.68rem', color: 'var(--text-muted)',
                  textAlign: 'center', marginTop: 8, lineHeight: 1.4,
                }}>
                  Abre o WhatsApp com todos os itens selecionados
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Seletores de produto ── */}
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 24,
        display: 'flex', flexDirection: 'column', gap: 28,
      }}>

        {/* Papel de parede */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'var(--text-muted)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            🎨 Papel de parede / Cor da parede
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {PAPEIS_PAREDE.map(pp => (
              <button
                key={pp.id}
                onClick={() => setParede(pp)}
                title={pp.nome}
                style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: pp.cor,
                  border: parede?.id === pp.id
                    ? '3px solid var(--gold)'
                    : '2px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: parede?.id === pp.id ? '0 0 0 2px var(--gold)' : 'none',
                }}
              >
                <PatternOverlay pattern={pp.pattern} cor={pp.cor} />
                {parede?.id === pp.id && (
                  <span style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem',
                  }}>✓</span>
                )}
              </button>
            ))}
          </div>
          {parede && (
            <p style={{ marginTop: 6, fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Selecionado: <strong>{parede.nome}</strong>
            </p>
          )}
        </div>

        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Berço */}
        <ProductSelector
          label="Berço" icon="🛏️"
          items={BERCOS} selected={berco} onSelect={setBerco}
        />

        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Cômoda */}
        <ProductSelector
          label="Cômoda" icon="🗄️"
          items={COMODAS} selected={comoda} onSelect={setComoda}
        />

        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Poltrona */}
        <ProductSelector
          label="Poltrona de Amamentação" icon="🪑"
          items={POLTRONAS} selected={poltrona} onSelect={setPoltrona}
        />

        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Kit de roupa de cama */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'var(--text-muted)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>🧸</span> Kit de Roupa de Cama
            {kit && (
              <button onClick={() => setKit(null)} style={{
                marginLeft: 'auto', background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem',
              }}>✕ limpar</button>
            )}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {KITS.map(k => (
              <button
                key={k.id}
                onClick={() => setKit(kit?.id === k.id ? null : k)}
                style={{
                  background: kit?.id === k.id ? 'var(--gold)' : 'var(--bg-secondary)',
                  border: `1px solid ${kit?.id === k.id ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: 8, padding: '8px 12px',
                  cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: 4,
                  background: k.cor,
                  border: `2px solid ${k.corAcento}`,
                  flexShrink: 0,
                }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '0.78rem', fontWeight: 500,
                    color: kit?.id === k.id ? 'var(--bg-primary)' : 'var(--text-primary)',
                  }}>{k.nome}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                    color: kit?.id === k.id ? 'rgba(0,0,0,0.5)' : 'var(--text-muted)',
                  }}>{fmt(k.preco)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Nota do projeto 3D ── */}
      <div style={{
        background: 'rgba(212,175,55,0.06)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius)', padding: 20,
        display: 'flex', gap: 14, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>📐</span>
        <div>
          <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 6 }}>
            Quer ver o quarto com render 3D profissional?
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Nosso designer parceiro cria um render 3D realista do quarto exatamente como vai ficar —
            e os <strong style={{ color: 'var(--gold)' }}>R$950 do projeto viram crédito</strong> para comprar os móveis aqui na loja.
          </p>
        </div>
      </div>

    </div>
  )
}
