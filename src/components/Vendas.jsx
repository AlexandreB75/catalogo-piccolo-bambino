import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import BottomNav from './BottomNav'

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
               'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

export default function Vendas() {
  const [vendas, setVendas] = useState([])
  const [mes,    setMes]    = useState(new Date().getMonth())
  const [ano,    setAno]    = useState(new Date().getFullYear())
  const [loading, setLoad]  = useState(true)
  const navigate = useNavigate()

  useEffect(() => { load() }, [mes, ano])

  async function load() {
    setLoad(true)
    const q = query(collection(db, 'documentos'), orderBy('criadoEm', 'desc'))
    const snap = await getDocs(q)
    const todas = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(d => d.tipo === 'venda')
    const filtradas = todas.filter(v => {
      const d = v.criadoEm?.toDate ? v.criadoEm.toDate() : new Date(v.criadoEm)
      return d.getMonth() === mes && d.getFullYear() === ano
    })
    setVendas(filtradas)
    setLoad(false)
  }

  function mudarMes(delta) {
    let nm = mes + delta, na = ano
    if (nm < 0)  { nm = 11; na-- }
    if (nm > 11) { nm = 0;  na++ }
    setMes(nm); setAno(na)
  }

  const total = vendas.reduce((s, v) => s + (v.valor || 0), 0)

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
        <h2 style={{ margin: 0, fontSize: 18 }}>Vendas</h2>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 20, marginBottom: 20,
        }}>
          <button onClick={() => mudarMes(-1)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#FF6B9D' }}>‹</button>
          <span style={{ fontWeight: 'bold', fontSize: 16, minWidth: 160, textAlign: 'center' }}>
            {MESES[mes]} {ano}
          </span>
          <button onClick={() => mudarMes(1)}  style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#FF6B9D' }}>›</button>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #818CF8, #C084FC)',
          borderRadius: 16, padding: '20px 24px', marginBottom: 20,
          color: 'white', textAlign: 'center',
        }}>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 13 }}>Total de Vendas</p>
          <p style={{ margin: '6px 0 4px', fontSize: 34, fontWeight: 'bold' }}>{fmt(total)}</p>
          <p style={{ margin: 0, opacity: 0.8, fontSize: 13 }}>
            {vendas.length} venda{vendas.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#aaa', marginTop: 24 }}>Carregando...</p>}

        {!loading && vendas.length === 0 && (
          <div style={{ textAlign: 'center', color: '#bbb', marginTop: 40 }}>
            <p style={{ fontSize: 48 }}>💰</p>
            <p style={{ marginTop: 8 }}>Nenhuma venda em {MESES[mes]}.</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Use o + para adicionar</p>
          </div>
        )}

        {vendas.map(v => (
          <div key={v.id} style={{
            background: 'white', borderRadius: 12, padding: 14,
            marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: 15 }}>{v.descricao || 'Venda'}</p>
              <p style={{ margin: '2px 0 0', color: '#aaa', fontSize: 12 }}>
                {v.criadoEm?.toDate ? v.criadoEm.toDate().toLocaleDateString('pt-BR') : ''}
              </p>
            </div>
            <span style={{ fontWeight: 'bold', color: '#22c55e', fontSize: 16 }}>{fmt(v.valor)}</span>
          </div>
        ))}
      </div>

      <BottomNav active="vendas" />
    </div>
  )
}
