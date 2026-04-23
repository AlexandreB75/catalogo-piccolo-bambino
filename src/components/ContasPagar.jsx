import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, updateDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import BottomNav from './BottomNav'

const TIPO_ICONS = { fornecedor: '📦', transportadora: '🚚', boleto: '📄', aluguel: '🏠', funcionario: '👤' }
const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)
const fmtDate = ts => {
  if (!ts) return 'Sem vencimento'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('pt-BR')
}
const daysUntil = ts => {
  if (!ts) return null
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  const t = new Date(); t.setHours(0,0,0,0); d.setHours(0,0,0,0)
  return Math.floor((d - t) / 86400000)
}
const getStatusStyle = item => {
  if (item.status === 'pago') return { label: 'Pago',     color: '#16a34a', bg: '#dcfce7' }
  const n = daysUntil(item.dataVencimento)
  if (n === null)  return { label: 'Pendente',  color: '#6b7280', bg: '#f3f4f6' }
  if (n < 0)       return { label: 'Vencido',   color: '#dc2626', bg: '#fee2e2' }
  if (n === 0)     return { label: 'Hoje!',     color: '#d97706', bg: '#fef3c7' }
  if (n <= 3)      return { label: `${n} dias`, color: '#ca8a04', bg: '#fef9c3' }
  return           { label: 'Pendente',         color: '#6b7280', bg: '#f3f4f6' }
}

const FILTROS = [
  { key: 'todos',    label: 'Todos' },
  { key: 'pendente', label: 'Pendente' },
  { key: 'vencido',  label: 'Vencido' },
  { key: 'pago',     label: 'Pago' },
]

export default function ContasPagar() {
  const [docs, setDocs]     = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [loading, setLoad]  = useState(true)
  const navigate = useNavigate()

  useEffect(() => { load() }, [])

  async function load() {
    setLoad(true)
    const q = query(collection(db, 'documentos'), orderBy('dataVencimento', 'asc'))
    const snap = await getDocs(q)
    setDocs(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(d => d.tipo !== 'venda')
    )
    setLoad(false)
  }

  async function marcarPago(id) {
    await updateDoc(doc(db, 'documentos', id), { status: 'pago', paidAt: Timestamp.now() })
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'pago' } : d))
  }

  const filtrados = docs.filter(d => {
    if (filtro === 'pendente') return d.status === 'pendente' && daysUntil(d.dataVencimento) >= 0
    if (filtro === 'vencido')  return d.status === 'pendente' && daysUntil(d.dataVencimento) < 0
    if (filtro === 'pago')     return d.status === 'pago'
    return true
  })
  const total = filtrados.reduce((s, d) => s + (d.valor || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5F8', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(135deg, #FF6B9D, #C084FC)',
        padding: '20px 16px', display: 'flex', alignItems: 'center',
        gap: 12, color: 'white',
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(255,255,255,0.25)', border: 'none', color: 'white',
          borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 18,
        }}>←</button>
        <h2 style={{ margin: 0, fontSize: 18 }}>Contas a Pagar</h2>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 14, paddingBottom: 2 }}>
          {FILTROS.map(f => (
            <button key={f.key} onClick={() => setFiltro(f.key)} style={{
              padding: '8px 16px', borderRadius: 20, cursor: 'pointer',
              border: `2px solid ${filtro === f.key ? '#FF6B9D' : '#e5e7eb'}`,
              background: filtro === f.key ? '#FF6B9D' : 'white',
              color: filtro === f.key ? 'white' : '#555',
              fontSize: 13, whiteSpace: 'nowrap',
              fontWeight: filtro === f.key ? 'bold' : 'normal',
            }}>{f.label}</button>
          ))}
        </div>

        <div style={{
          background: 'white', borderRadius: 12, padding: '10px 14px',
          marginBottom: 14, display: 'flex', justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <span style={{ color: '#888', fontSize: 14 }}>Total ({filtrados.length} {filtrados.length === 1 ? 'item' : 'itens'})</span>
          <span style={{ fontWeight: 'bold', color: '#FF6B9D' }}>{fmt(total)}</span>
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#aaa', marginTop: 24 }}>Carregando...</p>}
        {!loading && filtrados.length === 0 && (
          <p style={{ textAlign: 'center', color: '#bbb', marginTop: 32 }}>Nenhum item encontrado.</p>
        )}

        {filtrados.map(item => {
          const st = getStatusStyle(item)
          return (
            <div key={item.id} style={{
              background: 'white', borderRadius: 12, padding: 14,
              marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 26, flexShrink: 0 }}>{TIPO_ICONS[item.tipo] || '📄'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.descricao}
                </p>
                <p style={{ margin: '2px 0 0', color: '#aaa', fontSize: 12 }}>Vence: {fmtDate(item.dataVencimento)}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: 15 }}>{fmt(item.valor)}</p>
                <span style={{
                  display: 'inline-block', padding: '2px 8px', borderRadius: 10,
                  fontSize: 11, fontWeight: 'bold', color: st.color, background: st.bg,
                }}>{st.label}</span>
              </div>
              {item.status === 'pendente' && (
                <button
                  onClick={() => marcarPago(item.id)}
                  title="Marcar como pago"
                  style={{
                    background: '#dcfce7', border: 'none', borderRadius: 8,
                    padding: '8px 10px', cursor: 'pointer', fontSize: 18, flexShrink: 0,
                  }}
                >✅</button>
              )}
            </div>
          )
        })}
      </div>

      <BottomNav active="contas" />
    </div>
  )
}
