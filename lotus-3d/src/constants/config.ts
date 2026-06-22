export const SITE = {
  name: 'Lótus Business',
  tagline: 'Salas comerciais de alto padrão na entrada de Itapema',
  location: 'Itapema / Porto Belo · SC',
  cta: 'Quero receber informações',
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL as string || '',
}

export const DIFERENCIAIS = [
  {
    icon: '🏪',
    title: 'Ao lado do Angeloni',
    desc: 'Localização estratégica no polo comercial mais movimentado de Itapema.',
  },
  {
    icon: '🛣️',
    title: 'Próximo à BR-101',
    desc: 'Acesso rápido de toda a região — Balneário Camboriú, Itajaí e Porto Belo.',
  },
  {
    icon: '🏢',
    title: 'Salas e lajes corporativas',
    desc: 'Unidades flexíveis projetadas para consultórios, escritórios e clínicas.',
  },
  {
    icon: '🌆',
    title: 'Rooftop com restaurante',
    desc: 'Área gastronômica exclusiva com vista privilegiada para a cidade.',
  },
  {
    icon: '🚗',
    title: 'Estacionamento rotativo',
    desc: 'Comodidade para clientes e colaboradores com fluxo intenso.',
  },
]

export const PERFIS = ['Investidor', 'Médico', 'Empresário', 'Corretor'] as const

export type Perfil = typeof PERFIS[number]
