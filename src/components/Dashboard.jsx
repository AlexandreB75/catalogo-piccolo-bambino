import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'
import BottomNav from './BottomNav'

const TIPO_ICONS = {
  fornecedor: '📦', transportadora: '🚚', boleto: '📄',
  aluguel: '🏠', funcionario: '👤', venda: '💰',
}

const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

function daysUntil(ts) {
  if (!ts) return null
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  const today = new Date(); today.setHours(0, 0, 0, 0); d.setHours(0, 0, 0, 0)
  return Math.floor((d - today) / 86400000)
}

export default function Dashboard() {
  const [docs, setDocs]     = useState([])
  const [loading, setLoad]  = useState(true)
  const navigate = useNavigate()
  const mesNome = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  useEffect(() => { load() }, [])

  async function load() {
    setLoad(true)
    try {
      const q = query(collection(db, 'documentos'), orderBy('dataVencimento', 'asc'))
      const snap = await getDocs(q)
      setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (e) { console.error(e) }
    finally { setLoad(false) }
  }

  const pendentes   = docs.filter(d => d.status === 'pendente' && d.tipo !== 'venda')
  const pagos       = docs.filter(d => d.status === 'pago'     && d.tipo !== 'venda')
  const vendas      = docs.filter(d => d.tipo === 'venda')

  const totalPend   = pendentes.reduce((s, d) => s + (d.valor || 0), 0)
  const totalPago   = pagos.reduce((s, d) => s + (d.valor || 0), 0)
  const totalVendas = vendas.reduce((s, d) => s + (d.valor || 0), 0)

  const vencidos  = pendentes.filter(d => { const n = daysUntil(d.dataVencimento); return n !== null && n < 0 })
  const hoje      = pendentes.filter(d => daysUntil(d.dataVencimento) === 0)
  const prox3     = pendentes.filter(d => { const n = daysUntil(d.dataVencimento); return n > 0 && n <= 3 })
  const prox7     = pendentes.filter(d => { const n = daysUntil(d.dataVencimento); return n > 3 && n <= 7 })

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5F8', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(135deg, #FF6B9D, #C084FC)',
        padding: '24px 20px 36px', color: 'white',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: 0, opacity: 0.85, fontSize: 13 }}>Boa gestão, Isabela!</p>
            <h2 style={{ margin: '2px 0 0', fontSize: 18, textTransform: 'capitalize' }}>{mesNome}</h2>
          </div>
          <button onClick={() => signOut(auth)} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
            borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12,
          }}>Sair</button>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginTop: -20 }}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          <Card label="A Pagar"   value={fmt(totalPend)}   color="#FF6B9D" icon="📋" />
          <Card label="Pago"      value={fmt(totalPago)}   color="#22c55e" icon="✅" />
          <Card label="Vendas"    value={fmt(totalVendas)} color="#818CF8" icon="💰" />
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#aaa', marginTop: 32 }}>Carregando...</p>}

        {vencidos.length > 0 && (
          <Section title={`🔴 VENCIDO${vencidos.length > 1 ? 'S' : ''} (${vencidos.length})`} items={vencidos} bg="#fee2e2" border="#ef4444" />
        )}
        {hoje.length > 0 && (
          <Section title={`🟠 VENCE HOJE (${hoje.length})`} items={hoje} bg="#fef3c7" border="#f59e0b" />
        )}
        {prox3.length > 0 && (
          <Section title={`🟡 PRÓXIMOS 3 DIAS (${prox3.length})`} items={prox3} bg="#fef9c3" border="#eab308" />
        )}
        {prox7.length > 0 && (
          <Section title={`🟢 PRÓXIMOS 7 DIAS (${prox7.length})`} items={prox7} bg="#dcfce7" border="#22c55e" />
        )}

        {!loading && docs.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 56, color: '#bbb' }}>
            <p style={{ fontSize: 48 }}>📋</p>
            <p style={{ marginTop: 8 }}>Nenhum documento ainda.</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Toque no + para adicionar</p>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate('/lancar')}
        style={{
          position: 'fixed', bottom: 76, right: 20,
          width: 56, height: 56, borderRadius: 28,
          background: 'linear-gradient(135deg, #FF6B9D, #C084FC)',
          color: 'white', fontSize: 28, border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255,107,157,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99,
        }}
      >+</button>

      <BottomNav active="home" />
    </div>
  )
}

function Card({ label, value, color, icon }) {
  return (
    <div style={{
      background: 'white', borderRadius: 16,
      padding: '16px 18px', minWidth: 140, flexShrink: 0,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <p style={{ margin: 0, color: '#999', fontSize: 12 }}>{icon} {label}</p>
      <p style={{ margin: '4px 0 0', color, fontWeight: 'bold', fontSize: 17 }}>{value}</p>
    </div>
  )
}

function Section({ title, items, bg, border }) {
  const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)
  const TIPO_ICONS = { fornecedor: '📦', transportadora: '🚚', boleto: '📄', aluguel: '🏠', funcionario: '👤' }
  return (
    <div style={{
      marginTop: 14, background: bg, borderRadius: 12,
      padding: '10px 12px', borderLeft: `4px solid ${border}`,
    }}>
      <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 'bold', color: '#444' }}>{title}</p>
      {items.map(item => (
        <div key={item.id} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '5px 0', borderBottom: `1px solid ${border}22`,
        }}>
          <span style={{ fontSize: 14 }}>
            {TIPO_ICONS[item.tipo] || '📄'} {item.descricao || item.tipo}
          </span>
          <span style={{ fontSize: 14, fontWeight: 'bold' }}>{fmt(item.valor)}</span>
        </div>
      ))}
    </div>
  )
}
