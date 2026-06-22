import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { SITE } from '../constants/config'

const Scene = lazy(() => import('./Scene/Scene'))

interface HeroProps {
  onCta: () => void
}

function Hero({ onCta }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark">
      {/* Canvas 3D — ocupa tela toda, atrás do conteúdo */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* Gradiente de baixo para cima */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

      {/* Gradiente lateral esquerdo */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-dark/80 via-transparent to-transparent" />

      {/* Conteúdo */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-xs tracking-[0.22em] uppercase text-gold mb-5"
          >
            {SITE.location}
          </motion.p>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.08] mb-4"
          >
            Lótus
            <br />
            <span className="text-gold">Business</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-md"
          >
            {SITE.tagline}
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCta}
            className="inline-flex items-center gap-3 bg-gold text-dark font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-none hover:bg-white transition-colors duration-300"
          >
            {SITE.cta}
            <span className="text-base">→</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs tracking-widest text-white/30 uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}

export default Hero
