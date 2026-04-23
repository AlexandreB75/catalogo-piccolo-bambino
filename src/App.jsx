import { createContext, useContext, useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import LancarDocumento from './components/LancarDocumento'
import ContasPagar from './components/ContasPagar'
import Vendas from './components/Vendas'

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export default function App() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    return onAuthStateChanged(auth, u => setUser(u ?? null))
  }, [])

  if (user === undefined) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FFF5F8' }}>
        <span style={{ fontSize: 48 }}>🌸</span>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <HashRouter>
        <Routes>
          <Route path="/login"  element={!user ? <Login />           : <Navigate to="/" />} />
          <Route path="/"       element={ user ? <Dashboard />       : <Navigate to="/login" />} />
          <Route path="/lancar" element={ user ? <LancarDocumento /> : <Navigate to="/login" />} />
          <Route path="/contas" element={ user ? <ContasPagar />     : <Navigate to="/login" />} />
          <Route path="/vendas" element={ user ? <Vendas />          : <Navigate to="/login" />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  )
}
