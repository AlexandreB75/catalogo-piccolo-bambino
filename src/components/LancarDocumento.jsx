import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'

const CATS = [
  { key: 'fornecedor',    label: 'Fornecedor',    icon: '📦' },
  { key: 'transportadora',label: 'Transportadora', icon: '🚚' },
  { key: 'boleto',        label: 'Boleto',         icon: '📄' },
  { key: 'aluguel',       label: 'Aluguel',        icon: '🏠' },
  { key: 'funcionario',   label: 'Funcionário',    icon: '👤' },
  { key: 'venda',         label: 'Venda',          icon: '💰' },
]

function decodeBoleto(code) {
  const clean = code.replace(/[\s.\-]/g, '')
  if (!/^\d+$/.test(clean) || clean.length < 44) return null
  if (clean.length === 44) {
    const fator = parseInt(clean.substring(20, 24))
    const valor = parseInt(clean.substring(24, 34)) / 100
    if (fator > 0) {
      const base = new Date('1997-10-07')
      const venc = new Date(base.getTime() + fator * 86400000)
      return { valor, vencimento: venc.toISOString().split('T')[0] }
    }
  }
  return null
}

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 'bold', color: '#666', marginBottom: 6 }
const inputStyle = {
  width: '100%', padding: '12px 14px', fontSize: 15,
  border: '2px solid #e5e7eb', borderRadius: 12,
  boxSizing: 'border-box', outline: 'none', background: 'white',
}

export default function LancarDocumento() {
  const navigate = useNavigate()
  const [tipo,      setTipo]     = useState('')
  const [descricao, setDesc]     = useState('')
  const [valor,     setValor]    = useState('')
  const [venc,      setVenc]     = useState('')
  const [fotoUrl,   setFotoUrl]  = useState('')
  const [fotoFile,  setFotoFile] = useState(null)
  const [scanning,  setScanning] = useState(false)
  const [scanMsg,   setScanMsg]  = useState('')
  const [salvando,  setSalv]     = useState(false)
  const scannerRef = useRef(null)

  useEffect(() => () => { scannerRef.current?.clear().catch(() => {}) }, [])

  async function iniciarScanner() {
    setScanning(true)
    setScanMsg('')
    const { Html5QrcodeScanner } = await import('html5-qrcode')
    setTimeout(() => {
      const s = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: { width: 250, height: 250 } })
      s.render(result => {
        s.clear()
        setScanning(false)
        processarScan(result)
      }, () => {})
      scannerRef.current = s
    }, 100)
  }

  function processarScan(result) {
    const clean = result.replace(/[\s.]/g, '')
    if (/^\d{44,48}$/.test(clean)) {
      const boleto = decodeBoleto(clean)
      setScanMsg('Boleto lido!')
      if (boleto) {
        setValor(boleto.valor.toFixed(2).replace('.', ','))
        setVenc(boleto.vencimento)
        if (!tipo) setTipo('boleto')
      }
      return
    }
    if (result.includes('nfe') || result.includes('nfce') || result.includes('fazenda')) {
      setScanMsg('NF-e lida! Complete os dados abaixo.')
      const chave = result.match(/\d{44}/)
      if (chave && !descricao) setDesc(`NF-e ${chave[0].substring(0, 8)}...`)
      if (!tipo) setTipo('fornecedor')
      return
    }
    setScanMsg('Lido com sucesso!')
    if (!descricao) setDesc(result.substring(0, 80))
  }

  function handleFoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setFotoFile(file)
    setFotoUrl(URL.createObjectURL(file))
  }

  async function salvar() {
    if (!tipo || !valor) return
    setSalv(true)
    try {
      let photoUrl = null
      if (fotoFile) {
        const sRef = storageRef(storage, `docs/${Date.now()}_${fotoFile.name}`)
        await uploadBytes(sRef, fotoFile)
        photoUrl = await getDownloadURL(sRef)
      }
      const valorNum = parseFloat(valor.replace(',', '.').replace(/[^0-9.]/g, '')) || 0
      await addDoc(collection(db, 'documentos'), {
        tipo,
        descricao: descricao || tipo,
        valor: valorNum,
        dataVencimento: venc ? Timestamp.fromDate(new Date(venc + 'T12:00:00')) : null,
        status: tipo === 'venda' ? 'pago' : 'pendente',
        fotoUrl: photoUrl,
        criadoEm: Timestamp.now(),
      })
      navigate('/')
    } catch (e) {
      console.error(e)
      alert('Erro ao salvar. Tente novamente.')
    } finally {
      setSalv(false)
    }
  }

  const podeSalvar = tipo && valor && !salvando

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5F8' }}>
      <div style={{
        background: 'linear-gradient(135deg, #FF6B9D, #C084FC)',
        padding: '20px 16px', display: 'flex', alignItems: 'center',
        gap: 12, color: 'white',
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(255,255,255,0.25)', border: 'none', color: 'white',
          borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 18,
        }}>←</button>
        <h2 style={{ margin: 0, fontSize: 18 }}>Lançar Documento</h2>
      </div>

      <div style={{ padding: 16, maxWidth: 520, margin: '0 auto' }}>
        <label style={labelStyle}>Categoria *</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {CATS.map(c => (
            <button
              key={c.key}
              onClick={() => setTipo(c.key)}
              style={{
                padding: '8px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 14,
                border: `2px solid ${tipo === c.key ? '#FF6B9D' : '#e5e7eb'}`,
                background: tipo === c.key ? '#FFF0F5' : 'white',
                color: tipo === c.key ? '#FF6B9D' : '#555',
                fontWeight: tipo === c.key ? 'bold' : 'normal',
              }}
            >{c.icon} {c.label}</button>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Ler QR Code / Código de Barras</label>
          {!scanning ? (
            <button onClick={iniciarScanner} style={{
              width: '100%', padding: 14, background: 'white',
              border: '2px dashed #C084FC', borderRadius: 12,
              fontSize: 15, cursor: 'pointer', color: '#C084FC',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>📷 Abrir Câmera para Escanear</button>
          ) : (
            <div>
              <div id="qr-reader" style={{ width: '100%' }}></div>
              <button
                onClick={() => { scannerRef.current?.clear(); setScanning(false) }}
                style={{
                  marginTop: 8, width: '100%', padding: 10,
                  background: '#fee2e2', border: 'none', borderRadius: 8,
                  color: '#ef4444', cursor: 'pointer',
                }}
              >Cancelar Scanner</button>
            </div>
          )}
          {scanMsg && <p style={{ color: '#22c55e', fontSize: 13, marginTop: 6 }}>✅ {scanMsg}</p>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Foto do Documento</label>
          <label style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, padding: 14, background: 'white',
            border: '2px dashed #FF6B9D', borderRadius: 12,
            cursor: 'pointer', fontSize: 14, color: '#FF6B9D',
          }}>
            {fotoUrl
              ? <img src={fotoUrl} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
              : <>📸 Tirar Foto ou Escolher Imagem</>
            }
            <input type="file" accept="image/*" capture="environment" onChange={handleFoto} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>
            {tipo === 'aluguel' ? 'Descrição' : tipo === 'funcionario' ? 'Nome do Funcionário' : 'Fornecedor / Descrição'}
          </label>
          <input
            type="text"
            placeholder={tipo === 'aluguel' ? 'Ex: Aluguel do ponto comercial' : tipo === 'funcionario' ? 'Nome do funcionário' : 'Ex: Fornecedor ABC Ltda'}
            value={descricao}
            onChange={e => setDesc(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Valor (R$) *</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={valor}
              onChange={e => setValor(e.target.value)}
              style={inputStyle}
            />
          </div>
          {tipo !== 'venda' && (
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Vencimento</label>
              <input
                type="date"
                value={venc}
                onChange={e => setVenc(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}
        </div>

        <button
          onClick={salvar}
          disabled={!podeSalvar}
          style={{
            width: '100%', padding: 16, fontSize: 16, fontWeight: 'bold',
            color: 'white', border: 'none', borderRadius: 12,
            background: podeSalvar
              ? 'linear-gradient(135deg, #FF6B9D, #C084FC)'
              : '#d1d5db',
            cursor: podeSalvar ? 'pointer' : 'not-allowed',
            marginBottom: 32,
          }}
        >
          {salvando ? 'Salvando...' : '✅ Salvar Documento'}
        </button>
      </div>
    </div>
  )
}
