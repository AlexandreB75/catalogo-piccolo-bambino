import { useNavigate } from 'react-router-dom'

const ITEMS = [
  { icon: '🏠', label: 'Início',  key: 'home',   path: '/' },
  { icon: '📋', label: 'A Pagar', key: 'contas',  path: '/contas' },
  { icon: '💰', label: 'Vendas',  key: 'vendas',  path: '/vendas' },
]

export default function BottomNav({ active }) {
  const navigate = useNavigate()
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'white', borderTop: '1px solid #f0e0ea',
      display: 'flex', justifyContent: 'space-around',
      padding: '8px 0 12px',
      boxShadow: '0 -4px 20px rgba(255,107,157,0.1)',
      zIndex: 100,
    }}>
      {ITEMS.map(item => (
        <button
          key={item.key}
          onClick={() => navigate(item.path)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2, padding: '4px 20px',
          }}
        >
          <span style={{ fontSize: 22 }}>{item.icon}</span>
          <span style={{
            fontSize: 11,
            fontWeight: active === item.key ? 'bold' : 'normal',
            color: active === item.key ? '#FF6B9D' : '#aaa',
          }}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
