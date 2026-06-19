# CLAUDE.md

Guidance for working with TripStar frontend (React 19 SPA rebuild of Vue 3 app).

## Commands

```bash
npm run dev        # dev server (HMR)
npm run build      # tsc -b && vite build
npm run lint       # eslint
npm run preview    # preview production build
```

**⚠️ All `npm install` require `--legacy-peer-deps`** — `eslint-plugin-react@7.37.5` conflicts with `eslint@10.5.0`.

## Architecture

React 19 CSR SPA (Vite 8, TypeScript 6). Two main routes:

| Route | Purpose |
|-------|---------|
| `/` | Landing: trip planner form + history |
| `/result?plan_id=…` | Result: 6-tab trip display |

**State layers**: Component (`useState` / react-hook-form) → sessionStorage (`tripPlan`, `graphData`, `planId`) → localStorage (locale, API keys) → Backend (`PUT /api/settings`).

📖 **Details**: Component responsibilities, data flow, Vue→React mappings — see [`docs/components-dataflow.md`](docs/components-dataflow.md).

## Development Workflow

- **Planning & code review**: Use [/requesting-code-review](/requesting-code-review), [/receiving-code-review](/receiving-code-review), [/superpowers](/superpowers).
- **Bug fixes & features**: Use [/systematic-debugging](/systematic-debugging), [/test-driven-development](/test-driven-development).
- **Major implementation**: Use [/writing-plans](/writing-plans) → review → [/executing-plans](/executing-plans).
- **Parallel tasks**: Use [/dispatching-parallel-agents](/dispatching-parallel-agents).

## Design & Styling

**Tailwind CSS v4** via `@tailwindcss/vite` — no config file. Single entry in `src/index.css`:
```css
@import "tailwindcss";
```
No SASS, no CSS Modules. All colors/tokens defined in `@theme {}` block.

**Principle**: Integer-only sizing (no decimal px). Use Tailwind 4px scale or design spec values (12px, 20px, 30px radius). All color/spacing tokens in `@theme {}`, configured via Ant Design `ConfigProvider` token.

## Key Dependencies

| Purpose | Package | Version |
|---------|---------|---------|
| UI components | Ant Design 6 | 6.x |
| Routing | react-router-dom | v7 |
| Forms | react-hook-form | - |
| HTTP | axios | - |
| Charts | echarts + echarts-for-react | - |
| Carousel | swiper | - |
| i18n | i18next + react-i18next | zh-CN, ja-JP, en-US |
| Dates | dayjs | - |
| Export | html2canvas | - |

## References

Detailed specifications, design docs, and analysis: `docs/` folder.  
Component architecture: `docs/components-dataflow.md`.
