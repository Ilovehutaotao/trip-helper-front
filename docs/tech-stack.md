# TripStar React 重建 — 技术选型

> 目标：仿照 Vue 版 TripStar 从 0 到 1 重建一个 React CSR SPA，系统学习 React hooks、组件模型、状态管理。不追求最前沿框架，追求学习效果最大化。

---

## 技术选型对照表

| 类别 | React 选型 | Vue 对应 | 核心理由 |
|------|-----------|----------|----------|
| **构建工具** | Vite 6 | Vite 6（相同） | 无迁移成本，专注 React 概念 |
| **框架** | React 19 | Vue 3 | 当前稳定主版本 |
| **TypeScript** | TypeScript 5.x + `@types/react` | `vue-tsc` | TSX = SFC template 的 React 等价物 |
| **路由** | `react-router-dom` v7 | `vue-router` 4 | 概念最直接对应，2 条路由不需要 TanStack Router |
| **状态管理** | 内置（`useState` + `useContext` + `useReducer`） | `ref` / `reactive`（无 Pinia） | 原项目无集中状态管理，先理解 Context 再考虑 Zustand |
| **UI 组件库** | `antd` v5 | `ant-design-vue` 4 | 相同组件名/API，30+ 组件直觉直接复用 |
| **HTTP 客户端** | `axios` v1 | `axios`（相同） | 拦截器模式、运行时 baseURL 逻辑直接复用 |
| **i18n** | `i18next` + `react-i18next` | `vue-i18n` 9 | 底层引擎相同，JSON locale 文件可直接复制 |
| **表单** | `react-hook-form` v7 | 手动 `v-model` + `ref` | 非受控输入是 React 惯用法，学习价值高 |
| **日期** | `dayjs` | `dayjs`（相同） | 零迁移成本 |
| **图表** | `echarts-for-react` v3 + `echarts` v5 | 手动 ECharts 实例 | 封装了 init/dispose 生命周期，简化 `useEffect` 集成 |
| **轮播** | `swiper` v11（React 组件） | `swiper` Vue 组件 | 同一个库的 React 版本，API 基本一致 |
| **Canvas 导出** | `html2canvas` v1 | `html2canvas`（相同） | 框架无关 DOM 库 |
| **CSS 方案** | CSS Modules + SASS | `<style scoped>` + SASS | 最接近 Vue scoped styles，无额外运行时 |
| **代码规范** | ESLint v9 + `eslint-plugin-react-hooks` + Prettier | `eslint-plugin-vue` | **react-hooks 插件必装**，捕获 useEffect 依赖错误 |

**状态管理说明：** 原项目无集中状态管理，跨页面数据通过 `sessionStorage` 持久化。React 版本保持同样策略，真正遇到 prop drilling 痛点后再引入 `zustand`，不用 Redux Toolkit（对此规模过重）。

---

## 项目初始化

```bash
npm create vite@latest tripstar-react -- --template react-ts
cd tripstar-react

# 运行时依赖
npm install react-router-dom antd axios i18next react-i18next \
  i18next-browser-languagedetector react-hook-form dayjs \
  echarts echarts-for-react swiper html2canvas sass

# 开发依赖
npm install -D typescript @types/react @types/react-dom \
  eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-react-refresh typescript-eslint prettier
```

---

## src/ 目录结构

与 Vue 项目保持语义对应：

```
src/
├── assets/
├── components/
│   ├── NavBar/
│   │   ├── NavBar.tsx
│   │   └── NavBar.module.scss
│   ├── AIChat/
│   └── map/                    # AMapView.tsx, GoogleMapView.tsx
├── pages/                      # 对应 Vue 的 views/
│   ├── Landing/
│   │   ├── Landing.tsx
│   │   ├── Landing.module.scss
│   │   └── components/
│   └── Result/
│       ├── Result.tsx
│       ├── Result.module.scss
│       └── components/
├── hooks/                      # 对应 Vue 的 composables/
│   ├── useWebSocket.ts
│   └── useLocalStorage.ts
├── services/
│   ├── http.ts                 # axios 实例 + 拦截器
│   └── tripApi.ts
├── context/                    # React Context providers
│   └── AppContext.tsx
├── locales/                    # 从 Vue 项目直接复制
│   ├── zh-CN.json
│   ├── ja-JP.json
│   └── en-US.json
├── types/                      # 从 Vue 项目直接复制，无需修改
│   └── index.ts
├── utils/
│   └── storage.ts
├── i18n.ts                     # 对应 Vue 的 i18n/index.ts
├── router.tsx
├── App.tsx
└── main.tsx
```

**关键概念映射：**
- `views/` → `pages/`
- `composables/` → `hooks/`
- 单文件组件（SFC）→ `ComponentName.tsx` + `ComponentName.module.scss` 并列文件

---

## 学习路径建议

按此顺序构建，让 hooks 在真正需要时自然出现：

1. **脚手架 + 路由** — 学习 JSX、props、`useState`
2. **Ant Design 组件 + 行程表单** — 学习 `useEffect`、受控/非受控输入、React Hook Form
3. **Axios 服务 + WebSocket hook** — 学习自定义 hooks、`useRef`、cleanup effects
4. **i18n + localStorage 持久化** — 学习 Context、`useReducer`
5. **地图 + ECharts** — 学习命令式 DOM 集成（`useRef` + `useEffect`）

---

## 可直接复用的资源（从 Vue 项目复制）

- `src/types/index.ts` — 所有类型定义，无需修改
- `src/i18n/locales/*.json` → `src/locales/*.json` — i18n 翻译文件
- `src/services/api.ts` 的业务逻辑（需适配 axios 实例写法）
- `.env` 环境变量定义（VITE_ 前缀变量 Vite 原生支持）
