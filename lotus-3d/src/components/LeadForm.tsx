import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SITE, PERFIS, type Perfil } from '../constants/config'

interface FormData {
  nome:    string
  whatsapp: string
  perfil:  Perfil | ''
}

type Status = 'idle' | 'loading' | 'success' | 'error'

function LeadForm() {
  const [form, setForm]     = useState<FormData>({ nome: '', whatsapp: '', perfil: '' })
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(SITE.webhookUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, origem: 'lotus-3d-landing', ts: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error('webhook error')
      setStatus('success')
      setForm({ nome: '', whatsapp: '', perfil: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="bg-dark2 py-24 px-8 md:px-20 lg:px-32 border-t border-white/5">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-4">
            Contato
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold leading-snug mb-3">
            Dê o primeiro passo.
          </h2>
          <p className="text-white/50 text-base mb-12">
            Preencha seus dados e um especialista entra em contato pelo WhatsApp.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold/30 bg-gold/5 p-8 text-center"
            >
              <div className="text-gold text-3xl mb-4">✦</div>
              <h3 className="font-serif text-white text-xl mb-2">Recebemos seu contato!</h3>
              <p className="text-white/50 text-sm">
                Em breve nossa equipe fala com você pelo WhatsApp.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nome */}
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-white/40 mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={e => set('nome', e.target.value)}
                  placeholder="Dr. João Silva"
                  required
                  className="w-full bg-transparent border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-white/40 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={e => set('whatsapp', e.target.value)}
                  placeholder="(47) 99999-9999"
                  required
                  className="w-full bg-transparent border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>

              {/* Perfil */}
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-white/40 mb-2">
                  Seu perfil
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PERFIS.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => set('perfil', p)}
                      className={`py-3 px-4 text-sm border transition-all duration-200 text-left ${
                        form.perfil === p
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Erro */}
              {status === 'error' && (
                <p className="text-red-400/80 text-xs font-mono">
                  Erro ao enviar. Verifique a URL do webhook no .env e tente novamente.
                </p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'loading' || !form.perfil}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 bg-gold text-dark font-semibold text-sm tracking-widest uppercase py-4 px-8 hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Enviando…' : SITE.cta}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default LeadForm
