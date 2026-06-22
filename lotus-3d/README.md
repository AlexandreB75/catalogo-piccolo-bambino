# Lótus Business — Landing Page 3D

Landing page premium com cena 3D interativa para o empreendimento Lótus Business, Itapema SC.

## Stack

- React 18 + TypeScript
- Vite 5
- Three.js + @react-three/fiber + @react-three/drei
- TailwindCSS
- Framer Motion

## Instalação

```bash
cd lotus-3d
npm install
```

## Configuração

```bash
cp .env.example .env
```

Edite o `.env` com a URL do seu webhook N8N:

```env
VITE_N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/lotus-leads
```

## Desenvolvimento

```bash
npm run dev
# http://localhost:5174
```

## Build para produção

```bash
npm run build
# Saída em dist/
```

## Deploy no VPS

```bash
npm run build
npx serve dist -p 80
```

Ou use nginx para servir a pasta `dist/`.

## Estrutura

```
src/
├── constants/config.ts          ← textos e webhook URL
├── components/
│   ├── Scene/
│   │   ├── Scene.tsx            ← Canvas R3F
│   │   ├── Tower.tsx            ← torre 3D abstrata
│   │   ├── Particles.tsx        ← partículas douradas
│   │   └── CameraRig.tsx        ← parallax do mouse
│   ├── Hero.tsx                 ← seção hero full-screen
│   ├── Diferenciais.tsx         ← grid de diferenciais
│   ├── Investimento.tsx         ← seção investimento
│   └── LeadForm.tsx             ← formulário → N8N webhook
```

## Personalização rápida

Todos os textos estão em `src/constants/config.ts`.
