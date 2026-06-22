---
tags:
  - projeto
  - imobiliario
  - react
  - threejs
  - lotus-business
created: 2026-06-22
status: em-desenvolvimento
---

# 🏢 Lótus Business — Landing Page 3D

> Salas comerciais de alto padrão na entrada de Itapema SC.
> Stack: React + Vite + TypeScript + Three.js + TailwindCSS + Framer Motion

---

## 📍 Contexto

| Campo         | Detalhe                                      |
|---------------|----------------------------------------------|
| Empreendimento| Lótus Business                               |
| Localização   | Itapema / Porto Belo · SC                    |
| Produto       | Salas comerciais e lajes corporativas        |
| Ticket médio  | R$ 1.000.000                                 |
| Público-alvo  | Médicos, empresários, advogados, investidores|
| Diferencial   | Ao lado do Angeloni · Próximo à BR-101       |

---

## 🗂️ Estrutura de Arquivos

```
lotus-3d/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── .env.example
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── constants/
    │   └── config.ts          ← ✏️ textos e webhook aqui
    └── components/
        ├── Scene/
        │   ├── Scene.tsx      ← canvas R3F
        │   ├── Tower.tsx      ← torre 3D
        │   ├── Particles.tsx  ← partículas gold
        │   └── CameraRig.tsx  ← parallax mouse
        ├── Hero.tsx           ← seção hero full-screen
        ├── Diferenciais.tsx   ← 5 diferenciais
        ├── Investimento.tsx   ← mercado + números
        └── LeadForm.tsx       ← formulário → N8N
```

---

## ⚙️ Configuração Rápida

### 1. Instalar

```bash
cd lotus-3d
npm install
```

### 2. Variáveis de ambiente

```bash
cp .env.example .env
```

Editar `.env`:

```env
VITE_N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/lotus-leads
```

### 3. Rodar

```bash
npm run dev
# → http://localhost:5174
```

### 4. Build para produção

```bash
npm run build
# → pasta dist/ pronta para nginx
```

---

## 🎨 Identidade Visual

| Token       | Valor     | Uso                        |
|-------------|-----------|----------------------------|
| `dark`      | `#06080D` | Fundo principal            |
| `dark2`     | `#0D1117` | Fundo seções secundárias   |
| `gold`      | `#B8965A` | Dourado premium (accent)   |
| `white`     | `#FFFFFF` | Textos principais          |
| Fonte serif | Playfair Display | Títulos              |
| Fonte sans  | Inter           | Corpo de texto        |
| Fonte mono  | JetBrains Mono  | Labels e tags         |

---

## 🧩 Seções da Landing Page

- [x] **Hero** — cena 3D interativa + título + CTA
- [x] **Diferenciais** — 5 cards com hover premium
- [x] **Investimento** — contexto de mercado + números
- [x] **Formulário de Lead** — nome, WhatsApp, perfil → N8N
- [x] **Footer** — mínimo, clean

---

## 🌐 Integração N8N

O formulário faz um `POST` para o webhook configurado no `.env`:

```json
{
  "nome":    "Dr. João Silva",
  "whatsapp": "(47) 99999-9999",
  "perfil":  "Médico",
  "origem":  "lotus-3d-landing",
  "ts":      "2026-06-22T..."
}
```

Configurar no N8N:
1. Criar workflow com nó **Webhook**
2. Copiar a URL gerada
3. Colar em `VITE_N8N_WEBHOOK_URL` no `.env`
4. Conectar ao HubSpot / Chatwoot / Telegram

---

## 🔗 Integrações Relacionadas

- [[HubSpot — Portal 51028942]]
- [[N8N — Workflows Lótus]]
- [[Lótus Prospecting — Motor de Análise Claude API]]
- [[Formulário HubSpot — Página WordPress]]

---

## 📦 Repositório

```
GitHub: AlexandreB75/catalogo-piccolo-bambino
Branch: claude/new-session-ew7rX
Pasta:  lotus-3d/
```

---

## 📝 Notas de Desenvolvimento

- A cena 3D usa `lazy()` + `Suspense` para não bloquear o carregamento inicial
- `dpr={[1, 1.5]}` limita a resolução em mobile para performance
- Todos os textos ficam em `src/constants/config.ts` — editar lá sem tocar nos componentes
- Para deploy: build gera pasta `dist/` estática, servir com nginx ou `npx serve dist`

---

*Última atualização: 2026-06-22*
