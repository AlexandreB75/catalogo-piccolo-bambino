import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const ADMIN_EMAIL = 'admin@piccolobambino.com'

export default function Login() {
  const [senha, setSenha]   = useState('')
  const [erro, setErro]     = useState('')
  const [loading, setLoad]  = useState(false)

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    setLoad(true)
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, senha)
    } catch {
      setErro('Senha incorreta. Tente novamente.')
    } finally {
      setLoad(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        background: 'white', borderRadius: 24,
        padding: '40px 32px', maxWidth: 360, width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)', textAlign: 'center',
      }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>👶</div>
        <h1 style={{ margin: '0 0 4px', fontSize: 22, color: '#1a1a1a' }}>Piccolo Bambino</h1>
        <p style={{ margin: '0 0 32px', color: '#aaa', fontSize: 13 }}>Controle Financeiro</p>

        <form onSubmit={entrar}>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            autoFocus
            style={{
              width: '100%', padding: '14px 16px', fontSize: 16,
              border: '2px solid #e5e7eb', borderRadius: 12,
              boxSizing: 'border-box', outline: 'none', marginBottom: 12,
            }}
          />
          {erro && (
            <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{erro}</p>
          )}
          <button
            type="submit"
            disabled={loading || !senha}
            style={{
              width: '100%', padding: 14, fontSize: 16, fontWeight: 'bold',
              color: 'white',
              background: senha && !loading
                ? 'linear-gradient(135deg, #FF6B9D, #C084FC)'
                : '#d1d5db',
              border: 'none', borderRadius: 12,
              cursor: senha && !loading ? 'pointer' : 'not-allowed',
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
