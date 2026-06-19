# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server (HMR)
npm run build      # tsc -b && vite build
npm run lint       # eslint
npm run preview    # preview production build
```

**All `npm install` commands require `--legacy-peer-deps`** — `eslint-plugin-react@7.37.5` has a peer conflict with `eslint@10.5.0` that cannot be resolved without this flag.

## Architecture

This is a React 19 CSR SPA (Vite 8 + TypeScript 6) — a React rebuild of a Vue 3 app. The reference for component responsibilities and data flow is `docs/components-dataflow.md`.

**Target route structure:**

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Landing` | Trip planner form + history list |
| `/result?plan_id=…` | `Result` | 6-tab trip plan display |

**Planned component tree:**
```
App
└── <Routes>
    ├── Landing → NavBar
    └── Result  → NavBar, OverviewAttractionCard (in Swiper), AIChat
```

**State layers:**

| Layer | Tech | Contents |
|-------|------|---------|
| Component | `useState` / react-hook-form | Form data, loading state, UI |
| Cross-route | `sessionStorage` | `tripPlan`, `graphData`, `planId` |
| User prefs | `localStorage` | locale, API base URL, map keys |
| Backend | `PUT /api/settings` | OpenAI config, map keys |

**Key Vue → React mappings** (from `docs/components-dataflow.md`):

- `reactive<LandingFormData>` → `useForm()` from react-hook-form
- `ref<T>` + `watch` → `useState<T>` + `useEffect`
- `onMounted` / `onUnmounted` → `useEffect(() => { … return cleanup }, [])`
- `computed(() => …)` → `useMemo(() => …, [deps])`
- Imperative instances (map, swiper, echarts) → `useRef` + `useEffect` init/destroy
- `$emit('select-day', payload)` → `onSelectDay: (payload) => void` prop

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin — no config file needed. Single entry in `src/index.css`:

```css
@import "tailwindcss";
```

No SASS, no CSS Modules.

## Key dependencies

- **UI components**: Ant Design 6
- **Routing**: react-router-dom v7
- **Forms**: react-hook-form
- **HTTP**: axios
- **Charts**: echarts + echarts-for-react
- **Carousel**: swiper
- **i18n**: i18next + react-i18next (zh-CN, ja-JP, en-US)
- **Dates**: dayjs
- **Export**: html2canvas
