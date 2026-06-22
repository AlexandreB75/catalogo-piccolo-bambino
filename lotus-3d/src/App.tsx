import { useRef } from 'react'
import Hero from './components/Hero'
import Diferenciais from './components/Diferenciais'
import Investimento from './components/Investimento'
import LeadForm from './components/LeadForm'

function App() {
  const formRef = useRef<HTMLElement | null>(null)

  const scrollToForm = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main ref={formRef}>
      <Hero onCta={scrollToForm} />
      <Diferenciais />
      <Investimento />
      <LeadForm />

      {/* Footer mínimo */}
      <footer className="bg-dark border-t border-white/5 py-8 px-8 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-serif text-gold text-lg font-semibold">Lótus Business</span>
          <span className="font-mono text-xs text-white/20 tracking-widest uppercase">
            Itapema · Porto Belo · SC
          </span>
        </div>
      </footer>
    </main>
  )
}

export default App
