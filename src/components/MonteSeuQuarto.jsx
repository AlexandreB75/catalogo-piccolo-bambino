import { useState } from 'react'

// ── Estilos de quarto (fotos reais) ──────────────────────────────────────────

const BASE = import.meta.env.BASE_URL || '/'

const ESTILOS = [
  {
    id: 'classico',
    nome: 'Clássico',
    descricao: 'Creme & Bege — elegância atemporal',
    foto: `${BASE}produtos/quarto-classico.jpeg`,
    cor: '#F5F0E8',
  },
  {
    id: 'raizes',
    nome: 'Linha Raízes',
    descricao: 'Madeira & palha — naturalidade e aconchego',
    foto: `${BASE}produtos/linha-raizes.png`,
    cor: '#C8A878',
  },
  {
    id: 'sora',
    nome: 'Linha Sora',
    descricao: 'Bege areia — design atemporal e versátil',
    foto: `${BASE}produtos/linha-sora.png`,
    cor: '#C8B898',
  },
  {
    id: 'vero',
    nome: 'Linha Vero',
    descricao: 'Madeira natural — texturas e aconchego',
    foto: `${BASE}produtos/linha-vero.png`,
    cor: '#8B6A4A',
  },
  {
    id: 'natu',
    nome: 'Linha Natu',
    descricao: 'Rose & terracota — delicadeza e elegância',
    foto: `${BASE}produtos/linha-natu.png`,
    cor: '#B87060',
  },
  {
    id: 'arte',
    nome: 'Linha Art',
    descricao: 'Madeira natural — design sofisticado',
    foto: `${BASE}produtos/linha-art.png`,
    cor: '#EDE0CC',
  },
  {
    id: 'personalizado',
    nome: 'Personalizar',
    descricao: 'Monte do seu jeito — escolha cada item',
    foto: null,
    cor: '#F8F5F0',
  },
]

// ── Catálogo ──────────────────────────────────────────────────────────────────

const PAPEIS_PAREDE = [
  { id: 'pp0', nome: 'Branco Puro', cor: '#F8F8F4', pattern: null },
  { id: 'pp1', nome: 'Azul Céu',   cor: '#C8DCF0', pattern: 'dots' },
  { id: 'pp2', nome: 'Rosa Bebê',  cor: '#F5D0DC', pattern: 'stars' },
  { id: 'pp3', nome: 'Menta',      cor: '#C0DCCC', pattern: 'clouds' },
  { id: 'pp4', nome: 'Areia',      cor: '#ECD8B8', pattern: null },
  { id: 'pp5', nome: 'Lilás',      cor: '#D8C8F0', pattern: 'hearts' },
  { id: 'pp6', nome: 'Sage',       cor: '#C8D4C0', pattern: null },
]

const BERCOS = [
  { id: 'b1', nome: 'Berço Toy',           marca: 'Só Berço', preco: 1890, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'b2', nome: 'Berço Evolutivo 3em1',marca: 'Quater',   preco: 2890, corMob: '#EDE8DC', detalhe: '#C8B898' },
  { id: 'b3', nome: 'Berço Cozy',          marca: 'Quater',   preco: 2490, corMob: '#F0EDE4', detalhe: '#D4C8A8' },
  { id: 'b4', nome: 'Berço Ópera',         marca: 'Piccolo',  preco: 2190, corMob: '#FAFAF8', detalhe: '#DDDDD8' },
  { id: 'b5', nome: 'Berço La Vie',        marca: 'Piccolo',  preco: 2690, corMob: '#F8F4EC', detalhe: '#C0B090' },
]

const COMODAS = [
  { id: 'c1', nome: 'Cômoda Simples',     preco: 1190, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'c2', nome: 'Cômoda c/ Trocador', preco: 1590, corMob: '#EDE8DC', detalhe: '#C8B898' },
  { id: 'c3', nome: 'Cômoda Dupla',       preco: 1890, corMob: '#FAFAF8', detalhe: '#DDDDD8' },
  { id: 'c4', nome: 'Cômoda Quater',      preco: 2190, corMob: '#F0EDE4', detalhe: '#D4C8A8' },
]

const POLTRONAS = [
  { id: 'p1', nome: 'Poltrona Classic',   preco:  890, corMob: '#E8D8B8', detalhe: '#D4C09C' },
  { id: 'p2', nome: 'Poltrona Comfort',   preco: 1190, corMob: '#D8D8D8', detalhe: '#C0C0C0' },
  { id: 'p3', nome: 'Poltrona Luxo',      preco: 1490, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'p4', nome: 'Poltrona Reclinável',preco: 1890, corMob: '#E0D0C8', detalhe: '#C8B0A8' },
]

const KITS = [
  { id: 'k1', nome: 'Kit Urso Polar',    preco: 390, cor: '#D8E8F4', corAcento: '#B0C8E0' },
  { id: 'k2', nome: 'Kit Estrelinhas',   preco: 350, cor: '#F8ECD8', corAcento: '#E0C898' },
  { id: 'k3', nome: 'Kit Borboletas',    preco: 420, cor: '#F0D8EC', corAcento: '#D8A8D0' },
  { id: 'k4', nome: 'Kit Neutro Premium',preco: 480, cor: '#F0EDE8', corAcento: '#D8D0C4' },
  { id: 'k5', nome: 'Kit Safari',        preco: 440, cor: '#ECD8C0', corAcento: '#C8A880' },
]

const WHATSAPP = '554732280196'

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

function PatternBg({ pattern, cor }) {
  if (!pattern) return null
  const emojis = { dots: '·', stars: '★', clouds: '☁', hearts: '♥' }
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexWrap: 'wrap',
      overflow: 'hidden', opacity: 0.15,
      fontSize: pattern === 'dots' ? 8 : 11,
      lineHeight: 1.8, letterSpacing: 8,
      color: 'rgba(0,0,0,0.6)',
      userSelect: 'none', pointerEvents: 'none',
    }}>
      {Array.from({ length: 200 }).map((_, i) => (
        <span key={i}>{emojis[pattern]}</span>
      ))}
    </div>
  )
}

// ── Preview do Quarto (mobile-friendly) ──────────────────────────────────────

function RoomPreview({ parede, berco, comoda, poltrona, kit }) {
  const wallColor = parede?.cor ?? '#F8F8F4'

  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '65%', borderRadius: 16, overflow: 'hidden', boxShadow: '0 6px 32px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ position: 'absolute', inset: 0 }}>

        {/* Parede */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%', background: wallColor, transition: 'background 0.4s ease', overflow: 'hidden' }}>
          <PatternBg pattern={parede?.pattern} />
          {/* Janela */}
          <div style={{ position: 'absolute', top: '12%', right: '7%', width: '11%', height: '38%', background: 'rgba(255,255,255,0.6)', borderRadius: 5, border: '2px solid rgba(255,255,255,0.9)', boxShadow: 'inset 0 0 10px rgba(180,220,255,0.4)' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.7)' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.7)' }} />
          </div>
          {/* Quadrinho */}
          <div style={{ position: 'absolute', top: '10%', left: '28%', width: '7%', height: '20%', background: 'rgba(255,255,255,0.75)', borderRadius: 4, border: '2px solid rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
            {['🌙','⭐','🌸','🦋','🐻','🌈','🌿'][PAPEIS_PAREDE.findIndex(p => p.id === parede?.id) % 7]}
          </div>
          {/* Barra teto */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'rgba(255,255,255,0.5)' }} />
        </div>

        {/* Rodapé parede */}
        <div style={{ position: 'absolute', top: 'calc(60% - 6px)', left: 0, right: 0, height: 6, background: '#C8B898' }} />

        {/* Chão */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'repeating-linear-gradient(90deg, #D4C4A8 0, #D4C4A8 49px, #C8B898 50px)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'linear-gradient(to bottom,rgba(0,0,0,0.07),transparent)' }} />
        </div>

        {/* Berço */}
        {berco ? (
          <div style={{ position: 'absolute', bottom: '28%', left: '6%', width: '21%', transition: 'all 0.3s' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '70%', background: berco.corMob, border: `2px solid ${berco.detalhe}`, borderRadius: '6px 6px 3px 3px', overflow: 'hidden' }}>
              {[25, 50, 75].map(p => <div key={p} style={{ position: 'absolute', top: 0, bottom: '20%', left: `${p}%`, width: 2, background: berco.detalhe }} />)}
              <div style={{ position: 'absolute', bottom: 0, left: 3, right: 3, top: '32%', background: kit?.cor ?? '#F0EDE8', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>{kit ? '🛏' : ''}</div>
            </div>
            {[8, 82].map(p => <div key={p} style={{ position: 'absolute', bottom: '-10%', left: `${p}%`, width: '5%', height: '14%', background: berco.detalhe, borderRadius: '0 0 3px 3px' }} />)}
            <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '0.45rem', color: '#888', marginTop: 4 }}>{berco.nome}</p>
          </div>
        ) : (
          <div style={{ position: 'absolute', bottom: '28%', left: '6%', width: '21%', paddingBottom: '15%', border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.45rem', color: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>berço</span>
          </div>
        )}

        {/* Cômoda */}
        {comoda ? (
          <div style={{ position: 'absolute', bottom: '28%', left: '31%', width: '17%', transition: 'all 0.3s' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '82%', background: comoda.corMob, border: `2px solid ${comoda.detalhe}`, borderRadius: '4px 4px 2px 2px', overflow: 'hidden' }}>
              {[18, 48, 76].map((t, i) => (
                <div key={i} style={{ position: 'absolute', top: `${t}%`, left: '8%', right: '8%', height: '18%', background: comoda.detalhe, borderRadius: 2, opacity: 0.45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 6, height: 3, background: comoda.corMob, borderRadius: 2 }} />
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '0.45rem', color: '#888', marginTop: 4 }}>{comoda.nome}</p>
          </div>
        ) : (
          <div style={{ position: 'absolute', bottom: '28%', left: '31%', width: '17%', paddingBottom: '14%', border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 8 }}>
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.45rem', color: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>cômoda</span>
          </div>
        )}

        {/* Poltrona */}
        {poltrona ? (
          <div style={{ position: 'absolute', bottom: '28%', left: '55%', width: '15%', transition: 'all 0.3s' }}>
            <div style={{ width: '100%', paddingBottom: '48%', background: poltrona.corMob, border: `2px solid ${poltrona.detalhe}`, borderRadius: '12px 12px 0 0' }} />
            <div style={{ width: '112%', marginLeft: '-6%', paddingBottom: '26%', background: poltrona.corMob, border: `2px solid ${poltrona.detalhe}`, borderRadius: '3px 3px 2px 2px', marginTop: -2 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -3 }}>
              {[0,1].map(i => <div key={i} style={{ width: '13%', height: 14, background: poltrona.detalhe, borderRadius: '0 0 3px 3px' }} />)}
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '0.45rem', color: '#888', marginTop: 4 }}>{poltrona.nome}</p>
          </div>
        ) : (
          <div style={{ position: 'absolute', bottom: '28%', left: '55%', width: '15%', paddingBottom: '18%', border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 8 }}>
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.45rem', color: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>poltrona</span>
          </div>
        )}

        {/* Marca */}
        <div style={{ position: 'absolute', bottom: 6, right: 10, fontFamily: 'Georgia,serif', fontSize: '0.55rem', color: 'rgba(0,0,0,0.15)', letterSpacing: '0.06em' }}>
          Piccolo Bambino
        </div>
      </div>
    </div>
  )
}

// ── Chip de produto ───────────────────────────────────────────────────────────

function Chip({ item, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(selected ? null : item)}
      style={{
        background: selected ? '#FF6B9D' : '#FFF',
        border: `1.5px solid ${selected ? '#FF6B9D' : '#f0e0ea'}`,
        borderRadius: 10, padding: '10px 14px',
        cursor: 'pointer', transition: 'all 0.15s',
        textAlign: 'left', minWidth: 0,
      }}
    >
      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: selected ? '#fff' : '#444' }}>{item.nome}</div>
      {item.marca && <div style={{ fontSize: '0.68rem', color: selected ? 'rgba(255,255,255,0.7)' : '#aaa', marginTop: 1 }}>{item.marca}</div>}
      <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: selected ? 'rgba(255,255,255,0.85)' : '#FF6B9D', marginTop: 3, fontWeight: 600 }}>
        {fmt(item.preco)}
      </div>
    </button>
  )
}

// ── Seção de seleção ─────────────────────────────────────────────────────────

function Section({ label, icon, items, selected, onSelect, extra }) {
  return (
    <div style={{ borderBottom: '1px solid #f5e8f0', paddingBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
          <span>{icon}</span> {label}
        </p>
        {selected && (
          <button onClick={() => onSelect(null)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.7rem' }}>✕ limpar</button>
        )}
      </div>
      {extra}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map(item => <Chip key={item.id} item={item} selected={selected?.id === item.id} onSelect={onSelect} />)}
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function MonteSeuQuarto() {
  const [estilo,   setEstilo]   = useState(null)
  const [parede,   setParede]   = useState(PAPEIS_PAREDE[0])
  const [berco,    setBerco]    = useState(null)
  const [comoda,   setComoda]   = useState(null)
  const [poltrona, setPoltrona] = useState(null)
  const [kit,      setKit]      = useState(null)
  const [enviado,  setEnviado]  = useState(false)

  const itens = [
    berco    && { nome: berco.nome,    preco: berco.preco },
    comoda   && { nome: comoda.nome,   preco: comoda.preco },
    poltrona && { nome: poltrona.nome, preco: poltrona.preco },
    kit      && { nome: kit.nome,      preco: kit.preco },
  ].filter(Boolean)

  const total = itens.reduce((s, i) => s + i.preco, 0)

  function limpar() {
    setEstilo(null); setBerco(null); setComoda(null)
    setPoltrona(null); setKit(null); setParede(PAPEIS_PAREDE[0]); setEnviado(false)
  }

  function enviarWpp() {
    const estiloNome = estilo ? `Estilo: ${estilo.nome}\n` : ''
    const itensLinhas = itens.length
      ? itens.map(i => `• ${i.nome} — ${fmt(i.preco)}`).join('\n')
      : '(nenhum item selecionado ainda)'
    const msg = `Olá! Montei um projeto de quarto na Piccolo Bambino:\n\n${estiloNome}${itensLinhas}${itens.length ? `\n\nTotal estimado: ${fmt(total)}` : ''}\n\nPoderia me passar mais informações?`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    setEnviado(true)
  }

  const modoPersonalizado = estilo?.id === 'personalizado'
  const fotoEstilo = estilo?.foto

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5F8', paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0e0ea', padding: '16px 20px 12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '1.25rem', color: '#FF6B9D', margin: 0 }}>
              Monte seu Quarto
            </h1>
            <p style={{ fontSize: '0.7rem', color: '#bbb', margin: '2px 0 0', fontFamily: 'monospace' }}>
              Piccolo Bambino · Meia Praia, Itapema/SC
            </p>
          </div>
          {(estilo || itens.length > 0) && (
            <button onClick={limpar} style={{ background: 'none', border: '1px solid #f0e0ea', borderRadius: 8, padding: '6px 12px', fontSize: '0.72rem', color: '#bbb', cursor: 'pointer' }}>
              ↺ Recomeçar
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* PASSO 1 — Escolha o estilo */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 18, marginBottom: 14 }}>
          <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            1 — Escolha um estilo de quarto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ESTILOS.map(e => (
              <button
                key={e.id}
                onClick={() => setEstilo(e)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: estilo?.id === e.id ? '#FFF0F5' : '#fff',
                  border: `2px solid ${estilo?.id === e.id ? '#FF6B9D' : '#f0e0ea'}`,
                  borderRadius: 14, padding: 12,
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                {e.foto ? (
                  <img
                    src={e.foto}
                    alt={e.nome}
                    style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div style={{ width: 72, height: 72, borderRadius: 10, background: '#FFF0F5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                    🎨
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: estilo?.id === e.id ? '#FF6B9D' : '#333' }}>
                    {e.nome}
                    {estilo?.id === e.id && <span style={{ marginLeft: 8, fontSize: '0.75rem' }}>✓</span>}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: 3, lineHeight: 1.4 }}>{e.descricao}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Foto do estilo selecionado (tela cheia) */}
        {fotoEstilo && (
          <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 14, position: 'relative' }}>
            <img
              src={fotoEstilo}
              alt={estilo.nome}
              style={{ width: '100%', display: 'block', maxHeight: 320, objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
              padding: '20px 16px 14px',
            }}>
              <div style={{ color: '#fff', fontFamily: 'Georgia,serif', fontSize: '1.1rem', fontWeight: 600 }}>{estilo.nome}</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', marginTop: 2 }}>{estilo.descricao}</div>
            </div>
          </div>
        )}

        {/* Preview geométrico (modo personalizado) */}
        {modoPersonalizado && (
          <div style={{ marginBottom: 14 }}>
            <RoomPreview parede={parede} berco={berco} comoda={comoda} poltrona={poltrona} kit={kit} />
          </div>
        )}

        {/* PASSO 2 — Personalize (aparece após escolher estilo) */}
        {estilo && (
          <>
            <div style={{ background: '#fff', borderRadius: 16, padding: 18, marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                2 — Personalize os itens
              </p>

              {/* Cor da parede (só no modo personalizado) */}
              {modoPersonalizado && (
                <div style={{ borderBottom: '1px solid #f5e8f0', paddingBottom: 18 }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                    🎨 Cor da parede
                  </p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {PAPEIS_PAREDE.map(pp => (
                      <button key={pp.id} onClick={() => setParede(pp)} title={pp.nome}
                        style={{
                          width: 38, height: 38, borderRadius: 10,
                          background: pp.cor,
                          border: parede?.id === pp.id ? '3px solid #FF6B9D' : '2px solid #f0e0ea',
                          cursor: 'pointer', position: 'relative',
                          boxShadow: parede?.id === pp.id ? '0 0 0 2px #FF6B9D' : 'none',
                        }}
                      >
                        {parede?.id === pp.id && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>✓</span>}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#aaa', marginTop: 5 }}>{parede?.nome}</p>
                </div>
              )}

              <Section label="Berço" icon="🛏️" items={BERCOS} selected={berco} onSelect={setBerco} />
              <Section label="Cômoda" icon="🗄️" items={COMODAS} selected={comoda} onSelect={setComoda} />
              <Section label="Poltrona de Amamentação" icon="🪑" items={POLTRONAS} selected={poltrona} onSelect={setPoltrona} />

              {/* Kit roupa de cama */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                    🧸 Kit Roupa de Cama
                  </p>
                  {kit && <button onClick={() => setKit(null)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {KITS.map(k => (
                    <button key={k.id} onClick={() => setKit(kit?.id === k.id ? null : k)}
                      style={{
                        background: kit?.id === k.id ? '#FF6B9D' : '#fff',
                        border: `1.5px solid ${kit?.id === k.id ? '#FF6B9D' : '#f0e0ea'}`,
                        borderRadius: 10, padding: '8px 12px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                      }}
                    >
                      <div style={{ width: 20, height: 20, borderRadius: 4, background: k.cor, border: `2px solid ${k.corAcento}`, flexShrink: 0 }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 500, color: kit?.id === k.id ? '#fff' : '#444' }}>{k.nome}</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: kit?.id === k.id ? 'rgba(255,255,255,0.8)' : '#FF6B9D', fontWeight: 600 }}>{fmt(k.preco)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo e WhatsApp */}
            <div style={{ background: '#fff', border: '1px solid #f0e0ea', borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                3 — Seu projeto
              </p>
              {itens.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: '#ccc', fontStyle: 'italic' }}>Selecione os itens acima</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {estilo && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: '#aaa' }}>Estilo</span>
                    <span style={{ color: '#555' }}>{estilo.nome}</span>
                  </div>}
                  {itens.map(i => (
                    <div key={i.nome} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: '#555' }}>{i.nome}</span>
                      <span style={{ color: '#FF6B9D', fontFamily: 'monospace', fontWeight: 600 }}>{fmt(i.preco)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #f5e8f0', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#aaa' }}>Total estimado</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#FF6B9D', fontWeight: 700 }}>{fmt(total)}</span>
                  </div>
                </div>
              )}
              <button
                onClick={enviarWpp}
                style={{
                  width: '100%', marginTop: 4,
                  background: enviado ? '#25D366' : '#FF6B9D',
                  border: 'none', borderRadius: 12,
                  padding: '13px 0', color: '#fff',
                  fontWeight: 700, fontSize: '0.9rem',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {enviado ? '✓ Projeto enviado!' : '💬 Enviar projeto no WhatsApp'}
              </button>
              <p style={{ fontSize: '0.68rem', color: '#ccc', textAlign: 'center', marginTop: 8 }}>
                Abre o WhatsApp com seus itens selecionados
              </p>
            </div>
          </>
        )}

        {/* Banner projeto 3D */}
        <div style={{ background: 'linear-gradient(135deg, #FF6B9D, #FFB6C1)', borderRadius: 16, padding: 20, marginTop: 4, color: '#fff', marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>📐</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 5 }}>
                Quer ver em render 3D profissional?
              </div>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.5, margin: '0 0 10px', opacity: 0.9 }}>
                Nosso designer cria o quarto em 3D exatamente como vai ficar — e os <strong>R$950 viram crédito</strong> para comprar os móveis aqui na loja.
              </p>
              <button
                onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Tenho interesse no projeto 3D do quarto. Como funciona?')}`, '_blank')}
                style={{ background: '#fff', border: 'none', borderRadius: 10, padding: '9px 16px', color: '#FF6B9D', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Quero saber mais →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
