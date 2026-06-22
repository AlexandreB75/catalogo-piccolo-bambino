import { motion } from 'framer-motion'
import { DIFERENCIAIS } from '../constants/config'

function Diferenciais() {
  return (
    <section className="bg-dark2 py-24 px-8 md:px-20 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-4">
            Diferenciais
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold leading-snug">
            Um endereço que trabalha<br />
            <span className="text-gold">por você</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {DIFERENCIAIS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-dark2 p-8 group hover:bg-[#0f1520] transition-colors duration-300"
            >
              <div className="text-3xl mb-5 grayscale group-hover:grayscale-0 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif text-white text-lg font-semibold mb-3 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-6 w-8 h-px bg-gold/30 group-hover:bg-gold group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Diferenciais
