import { motion } from 'framer-motion'

const NUMEROS = [
  { valor: 'R$ 1M+',  label: 'Ticket médio por sala' },
  { valor: 'Alto padrão', label: 'Especificação construtiva' },
  { valor: 'Itapema',  label: 'Mercado em expansão acelerada' },
  { valor: '100%',    label: 'Vocação comercial do entorno' },
]

function Investimento() {
  return (
    <section className="bg-dark py-24 px-8 md:px-20 lg:px-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-4">
              Investimento
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold leading-snug mb-6">
              Itapema cresce.<br />
              <span className="text-gold">Seu espaço também.</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-6">
              O litoral norte de Santa Catarina vive uma expansão sem precedentes.
              Itapema consolida-se como polo de saúde, negócios e gastronomia — e o
              Lótus Business está na posição certa para capturar essa valorização.
            </p>
            <p className="text-white/55 text-base leading-relaxed">
              Médicos, advogados e empresários que já vivem na cidade encontram aqui
              o espaço profissional que faltava: infraestrutura de alto padrão, endereço
              nobre e investimento com retorno real.
            </p>
          </motion.div>

          {/* Números */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-px bg-white/5"
          >
            {NUMEROS.map((n, i) => (
              <div key={i} className="bg-dark p-8">
                <div className="font-serif text-2xl md:text-3xl text-gold font-bold mb-2">
                  {n.valor}
                </div>
                <div className="text-white/40 text-xs font-mono tracking-wide uppercase">
                  {n.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Investimento
