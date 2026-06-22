import { useState } from 'react'

const BASE = import.meta.env.BASE_URL || '/'

// ── Estilos ────────────────────────────────────────────────────────────────────
const ESTILOS = [
  { id: 'classico',      nome: 'Clássico',      descricao: 'Creme & Bege — elegância atemporal',         foto: `${BASE}produtos/quarto-classico.jpeg`, corParede: '#EFE8D8', corChao: '#C8B898' },
  { id: 'raizes',        nome: 'Linha Raízes',  descricao: 'Madeira & palha — naturalidade e aconchego', foto: `${BASE}produtos/linha-raizes.png`,      corParede: '#E8D4B0', corChao: '#B89870' },
  { id: 'sora',          nome: 'Linha Sora',    descricao: 'Bege areia — design atemporal e versátil',   foto: `${BASE}produtos/linha-sora.png`,        corParede: '#EDE4D4', corChao: '#C0A880' },
  { id: 'vero',          nome: 'Linha Vero',    descricao: 'Madeira natural — texturas e aconchego',     foto: `${BASE}produtos/linha-vero.png`,        corParede: '#D8C8A0', corChao: '#9C7850' },
  { id: 'natu',          nome: 'Linha Natu',    descricao: 'Rose & terracota — delicadeza e elegância',  foto: `${BASE}produtos/linha-natu.png`,        corParede: '#EAC8BC', corChao: '#C09080' },
  { id: 'arte',          nome: 'Linha Art',     descricao: 'Madeira natural — design sofisticado',       foto: `${BASE}produtos/linha-art.png`,         corParede: '#F0E8D8', corChao: '#C8B490' },
  { id: 'personalizado', nome: 'Personalizar',  descricao: 'Monte do seu jeito — escolha cada item',    foto: null,                                     corParede: '#F0EDE4', corChao: '#D4C4A8' },
]

// ── Catálogo ──────────────────────────────────────────────────────────────────
// foto: preencha com `${BASE}produtos/berco-b1.png` quando tiver a foto real
const BERCOS = [
  { id: 'b1', nome: 'Berço Toy',            marca: 'Só Berço', preco: 1890, foto: null, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'b2', nome: 'Berço Evolutivo 3em1', marca: 'Quater',   preco: 2890, foto: null, corMob: '#EDE8DC', detalhe: '#C8B898' },
  { id: 'b3', nome: 'Berço Cozy',           marca: 'Quater',   preco: 2490, foto: null, corMob: '#F0EDE4', detalhe: '#D4C8A8' },
  { id: 'b4', nome: 'Berço Ópera',          marca: 'Piccolo',  preco: 2190, foto: null, corMob: '#FAFAF8', detalhe: '#DDDDD8' },
  { id: 'b5', nome: 'Berço La Vie',         marca: 'Piccolo',  preco: 2690, foto: null, corMob: '#F8F4EC', detalhe: '#C0B090' },
]

const COMODAS = [
  { id: 'c1', nome: 'Cômoda Simples',     preco: 1190, foto: null, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'c2', nome: 'Cômoda c/ Trocador', preco: 1590, foto: null, corMob: '#EDE8DC', detalhe: '#C8B898' },
  { id: 'c3', nome: 'Cômoda Dupla',       preco: 1890, foto: null, corMob: '#FAFAF8', detalhe: '#DDDDD8' },
  { id: 'c4', nome: 'Cômoda Quater',      preco: 2190, foto: null, corMob: '#F0EDE4', detalhe: '#D4C8A8' },
]

const POLTRONAS = [
  { id: 'p1', nome: 'Poltrona Classic',    preco:  890, foto: null, corMob: '#E8D8B8', detalhe: '#D4C09C' },
  { id: 'p2', nome: 'Poltrona Comfort',    preco: 1190, foto: null, corMob: '#D8D8D8', detalhe: '#C0C0C0' },
  { id: 'p3', nome: 'Poltrona Luxo',       preco: 1490, foto: null, corMob: '#F5F5F0', detalhe: '#E0DDD4' },
  { id: 'p4', nome: 'Poltrona Reclinável', preco: 1890, foto: null, corMob: '#E0D0C8', detalhe: '#C8B0A8' },
]

const KITS = [
  { id: 'k1', nome: 'Kit Urso Polar',     preco: 390, cor: '#D8E8F4', corAcento: '#B0C8E0' },
  { id: 'k2', nome: 'Kit Estrelinhas',    preco: 350, cor: '#F8ECD8', corAcento: '#E0C898' },
  { id: 'k3', nome: 'Kit Borboletas',     preco: 420, cor: '#F0D8EC', corAcento: '#D8A8D0' },
  { id: 'k4', nome: 'Kit Neutro Premium', preco: 480, cor: '#F0EDE8', corAcento: '#D8D0C4' },
  { id: 'k5', nome: 'Kit Safari',         preco: 440, cor: '#ECD8C0', corAcento: '#C8A880' },
]

const PAPEIS_PAREDE = [
  { id: 'pp0', nome: 'Branco Puro', cor: '#F8F8F4' },
  { id: 'pp1', nome: 'Azul Céu',   cor: '#C8DCF0' },
  { id: 'pp2', nome: 'Rosa Bebê',  cor: '#F5D0DC' },
  { id: 'pp3', nome: 'Menta',      cor: '#C0DCCC' },
  { id: 'pp4', nome: 'Areia',      cor: '#ECD8B8' },
  { id: 'pp5', nome: 'Lilás',      cor: '#D8C8F0' },
  { id: 'pp6', nome: 'Sage',       cor: '#C8D4C0' },
]

const WHATSAPP = '554732280196'

// ── Helpers ────────────────────────────────────────────────────────────────────
function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

// ── Formas CSS de fallback ────────────────────────────────────────────────────
function BercoCSS({ item }) {
  return (
    <div style={{ position: 'relative', paddingBottom: '80%' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: item.corMob, border: `2px solid ${item.detalhe}`,
        borderRadius: '7px 7px 3px 3px',
      }}>
        {[22, 44, 66].map(p => (
          <div key={p} style={{ position: 'absolute', top: 0, bottom: '24%', left: `${p}%`, width: 2, background: item.detalhe, opacity: 0.5 }} />
        ))}
        <div style={{ position: 'absolute', bottom: 0, left: 4, right: 4, height: '28%', background: 'rgba(255,255,255,0.55)', borderRadius: '0 0 2px 2px' }} />
      </div>
      {[6, 85].map(p => (
        <div key={p} style={{ position: 'absolute', bottom: '-13%', left: `${p}%`, width: '6%', height: '16%', background: item.detalhe, borderRadius: '0 0 3px 3px' }} />
      ))}
    </div>
  )
}

function ComodaCSS({ item }) {
  return (
    <div style={{ position: 'relative', paddingBottom: '90%' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: item.corMob, border: `2px solid ${item.detalhe}`,
        borderRadius: '4px 4px 2px 2px',
      }}>
        {[10, 38, 65].map((t) => (
          <div key={t} style={{
            position: 'absolute', top: `${t}%`, left: '8%', right: '8%', height: '20%',
            border: `1.5px solid ${item.detalhe}`, borderRadius: 2, opacity: 0.55,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 10, height: 5, background: item.detalhe, borderRadius: 3, opacity: 0.7 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PoltronaCSS({ item }) {
  return (
    <div>
      <div style={{ width: '100%', paddingBottom: '52%', background: item.corMob, border: `2px solid ${item.detalhe}`, borderRadius: '14px 14px 0 0' }} />
      <div style={{ width: '110%', marginLeft: '-5%', paddingBottom: '30%', background: item.corMob, border: `2px solid ${item.detalhe}`, borderRadius: '3px 3px 2px 2px', marginTop: -2 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -2 }}>
        {[0, 1].map(i => <div key={i} style={{ width: '13%', height: 13, background: item.detalhe, borderRadius: '0 0 3px 3px' }} />)}
      </div>
    </div>
  )
}

// ── Slot de móvel no quarto ───────────────────────────────────────────────────
function Slot({ item, placeholder, largura, bottom, lado, CSSShape }) {
  const pos = lado === 'right'
    ? { right: '5%' }
    : { left: lado }

  return (
    <div style={{
      position: 'absolute',
      bottom,
      ...pos,
      width: largura,
      transition: 'all 0.35s ease',
      filter: item ? 'drop-shadow(2px 8px 12px rgba(0,0,0,0.22))' : 'none',
    }}>
      {item ? (
        item.foto ? (
          <img
            src={item.foto}
            alt={item.nome}
            style={{ width: '100%', objectFit: 'contain', display: 'block', mixBlendMode: 'multiply' }}
          />
        ) : (
          <CSSShape item={item} />
        )
      ) : (
        <div style={{
          paddingBottom: '80%', border: '1.5px dashed rgba(0,0,0,0.10)',
          borderRadius: 8, position: 'relative',
        }}>
          <span style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontSize: '0.38rem', color: 'rgba(0,0,0,0.18)', whiteSpace: 'nowrap',
          }}>{placeholder}</span>
        </div>
      )}
      {item && (
        <p style={{ textAlign: 'center', fontSize: '0.38rem', color: '#999', marginTop: 3, fontFamily: 'monospace', lineHeight: 1.2 }}>
          {item.nome}
        </p>
      )}
    </div>
  )
}

// ── Cena 3D do quarto ─────────────────────────────────────────────────────────
function RoomScene({ estilo, parEdeCor, berco, comoda, poltrona }) {
  const corParede = estilo?.id === 'personalizado' ? (parEdeCor ?? '#F0EDE4') : (estilo?.corParede ?? '#F0EDE4')
  const corChao   = estilo?.corChao ?? '#D4C4A8'

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingBottom: '66%',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 6px 36px rgba(0,0,0,0.16)',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>

        {/* ── Parede ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '57%',
          background: `linear-gradient(180deg, ${corParede} 0%, ${corParede}dd 100%)`,
          transition: 'background 0.5s',
        }}>
          {/* luz vinda do teto */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)' }} />

          {/* Janela */}
          <div style={{
            position: 'absolute', top: '10%', right: '7%', width: '11%', height: '62%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(180,220,255,0.65))',
            borderRadius: 5, border: '2.5px solid rgba(255,255,255,0.96)',
            boxShadow: '0 0 18px rgba(180,220,255,0.55), inset 0 0 8px rgba(180,220,255,0.25)',
          }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1.5, background: 'rgba(255,255,255,0.8)' }} />
            <div style={{ position: 'absolute', top: '46%', left: 0, right: 0, height: 1.5, background: 'rgba(255,255,255,0.8)' }} />
            {/* reflexo */}
            <div style={{ position: 'absolute', top: '5%', left: '10%', width: '22%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
          </div>

          {/* Quadro */}
          <div style={{
            position: 'absolute', top: '10%', left: '30%', width: '9%', height: '34%',
            background: 'rgba(255,255,255,0.78)', borderRadius: 3,
            border: '2px solid rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem',
          }}>🌸</div>

          {/* rodapé da parede */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 7, background: 'rgba(255,255,255,0.55)', boxShadow: '0 3px 8px rgba(0,0,0,0.1)' }} />
        </div>

        {/* ── Chão com perspectiva ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '46%',
          transition: 'background 0.5s',
          background: `
            linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 40%, transparent 100%),
            repeating-linear-gradient(90deg,
              ${corChao} 0px, ${corChao} 48px,
              rgba(255,255,255,0.18) 49px,
              ${corChao} 50px
            )
          `,
        }}>
          {/* sombra de perspectiva — torna o fundo mais escuro (profundidade) */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 100%)' }} />
        </div>

        {/* ── Móveis ── */}
        <Slot item={berco}    placeholder="berço"    largura="28%" bottom="23%" lado="4%"   CSSShape={BercoCSS}   />
        <Slot item={comoda}   placeholder="cômoda"   largura="22%" bottom="24%" lado="36%"  CSSShape={ComodaCSS}  />
        <Slot item={poltrona} placeholder="poltrona" largura="19%" bottom="21%" lado="right" CSSShape={PoltronaCSS} />

        {/* marca d'água */}
        <div style={{ position: 'absolute', bottom: 6, right: 10, fontFamily: 'Georgia,serif', fontSize: '0.48rem', color: 'rgba(0,0,0,0.13)', letterSpacing: '0.08em' }}>
          Piccolo Bambino
        </div>
      </div>
    </div>
  )
}

// ── Chip de produto ────────────────────────────────────────────────────────────
function Chip({ item, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(selected ? null : item)}
      style={{
        background: selected ? '#FF6B9D' : '#FFF',
        border: `1.5px solid ${selected ? '#FF6B9D' : '#f0e0ea'}`,
        borderRadius: 10, padding: '10px 14px',
        cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left', minWidth: 0,
      }}
    >
      {item.foto && (
        <img src={item.foto} alt={item.nome} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 6, marginBottom: 6, display: 'block' }} />
      )}
      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: selected ? '#fff' : '#444' }}>{item.nome}</div>
      {item.marca && <div style={{ fontSize: '0.68rem', color: selected ? 'rgba(255,255,255,0.7)' : '#aaa', marginTop: 1 }}>{item.marca}</div>}
      <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: selected ? 'rgba(255,255,255,0.85)' : '#FF6B9D', marginTop: 3, fontWeight: 600 }}>{fmt(item.preco)}</div>
    </button>
  )
}

// ── Seção de seleção ──────────────────────────────────────────────────────────
function Section({ label, icon, items, selected, onSelect }) {
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
    const estiloNome  = estilo ? `Estilo: ${estilo.nome}\n` : ''
    const itensLinhas = itens.length
      ? itens.map(i => `• ${i.nome} — ${fmt(i.preco)}`).join('\n')
      : '(nenhum item selecionado ainda)'
    const msg = `Olá! Montei um projeto de quarto na Piccolo Bambino:\n\n${estiloNome}${itensLinhas}${itens.length ? `\n\nTotal estimado: ${fmt(total)}` : ''}\n\nPoderia me passar mais informações?`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    setEnviado(true)
  }

  const modoPersonalizado = estilo?.id === 'personalizado'

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5F8', paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0e0ea', padding: '16px 20px 12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '1.25rem', color: '#FF6B9D', margin: 0 }}>Monte seu Quarto</h1>
            <p style={{ fontSize: '0.7rem', color: '#bbb', margin: '2px 0 0', fontFamily: 'monospace' }}>Piccolo Bambino · Meia Praia, Itapema/SC</p>
          </div>
          {(estilo || itens.length > 0) && (
            <button onClick={limpar} style={{ background: 'none', border: '1px solid #f0e0ea', borderRadius: 8, padding: '6px 12px', fontSize: '0.72rem', color: '#bbb', cursor: 'pointer' }}>
              ↺ Recomeçar
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* Cena 3D — sempre visível */}
        <div style={{ marginBottom: 14 }}>
          <RoomScene
            estilo={estilo}
            parEdeCor={parede?.cor}
            berco={berco}
            comoda={comoda}
            poltrona={poltrona}
          />
        </div>

        {/* PASSO 1 — Escolha o estilo */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 18, marginBottom: 14 }}>
          <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            1 — Escolha um estilo de quarto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ESTILOS.map(e => (
              <button
                key={e.id}
                onClick={() => { setEstilo(e); setBerco(null); setComoda(null); setPoltrona(null) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: estilo?.id === e.id ? '#FFF0F5' : '#fff',
                  border: `2px solid ${estilo?.id === e.id ? '#FF6B9D' : '#f0e0ea'}`,
                  borderRadius: 14, padding: 12,
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                }}
              >
                {e.foto ? (
                  <img src={e.foto} alt={e.nome} style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 72, height: 72, borderRadius: 10, background: '#FFF0F5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🎨</div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: estilo?.id === e.id ? '#FF6B9D' : '#333' }}>
                    {e.nome} {estilo?.id === e.id && <span style={{ fontSize: '0.75rem' }}>✓</span>}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: 3, lineHeight: 1.4 }}>{e.descricao}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* PASSO 2 — Personalizar */}
        {estilo && (
          <>
            <div style={{ background: '#fff', borderRadius: 16, padding: 18, marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                2 — Personalize os itens
              </p>

              {/* Cor da parede — apenas no modo personalizado */}
              {modoPersonalizado && (
                <div style={{ borderBottom: '1px solid #f5e8f0', paddingBottom: 18 }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>🎨 Cor da parede</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {PAPEIS_PAREDE.map(pp => (
                      <button key={pp.id} onClick={() => setParede(pp)} title={pp.nome}
                        style={{
                          width: 38, height: 38, borderRadius: 10, background: pp.cor,
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

              <Section label="Berço"                    icon="🛏️" items={BERCOS}    selected={berco}    onSelect={setBerco} />
              <Section label="Cômoda"                   icon="🗄️" items={COMODAS}   selected={comoda}   onSelect={setComoda} />
              <Section label="Poltrona de Amamentação"  icon="🪑" items={POLTRONAS} selected={poltrona} onSelect={setPoltrona} />

              {/* Kit roupa de cama */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#CC8899', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>🧸 Kit Roupa de Cama</p>
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
                  {estilo && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: '#aaa' }}>Estilo</span>
                      <span style={{ color: '#555' }}>{estilo.nome}</span>
                    </div>
                  )}
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
                  border: 'none', borderRadius: 12, padding: '13px 0',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {enviado ? '✓ Projeto enviado!' : '💬 Enviar projeto no WhatsApp'}
              </button>
              <p style={{ fontSize: '0.68rem', color: '#ccc', textAlign: 'center', marginTop: 8 }}>Abre o WhatsApp com seus itens selecionados</p>
            </div>
          </>
        )}

        {/* Banner projeto 3D */}
        <div style={{ background: 'linear-gradient(135deg, #FF6B9D, #FFB6C1)', borderRadius: 16, padding: 20, marginTop: 4, color: '#fff', marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>📐</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 5 }}>Quer ver em render 3D profissional?</div>
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
