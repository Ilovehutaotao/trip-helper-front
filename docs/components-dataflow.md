# TripStar Vue 版 — 组件体系与数据流

> 本文档作为 React 重建的参考基线，记录 Vue 版各组件的职责、状态、Props/Emits 接口及完整数据流。

---

## 组件树

```
App.vue
└── <router-view>
    ├── Landing.vue          # 路由 /
    │   └── NavBar.vue
    └── Result.vue           # 路由 /result?plan_id=…
        ├── NavBar.vue
        ├── OverviewAttractionCard.vue   (Swiper 轮播内，逐项渲染)
        └── AIChat.vue
```

---

## 各组件说明

### App.vue — 根组件

**职责：**
- 用 `<a-layout>` 包裹 `<router-view />`
- 监听 locale 变化，同步更新 `vue-i18n` 实例和 `document.title`
- 引入全局样式 `src/styles/global.css`

**状态：** 无自有业务状态，仅维护 locale 侦听器。

---

### Landing.vue — 首页（行程表单 + 历史记录）

**职责：**
- 视差滚动云雾动画背景（scroll → computed 样式）
- 三栏表单：城市列表（动态增删，最多 5 个）、出行偏好、自由文本
- 提交表单 → WebSocket 进度条（4 阶段动画）
- 页面底部历史行程列表

**响应式状态（`<script setup>`）：**

| 变量 | 类型 | 说明 |
|------|------|------|
| `formData` | `reactive<LandingFormData>` | 城市列表、日期、交通、住宿、兴趣偏好、自由输入 |
| `loading` | `ref<boolean>` | 提交中状态 |
| `loadingProgress` | `ref<number>` | 进度 0–100 |
| `loadingStatus` | `ref<string>` | 当前阶段文案 |
| `historyPlans` | `ref<TripHistoryItem[]>` | 历史行程列表 |
| `scrollY` | `ref<number>` | 滚动位移，驱动视差动画 |
| `planCode` | `ref<string>` | WebSocket 返回的 plan_id（进度期间显示） |

**Computed（动画相关）：**
- `heroProgress`、`toneProgress` — 滚动进度（0–1）
- `heroContentStyle`、`formRevealStyle`、`pageHeaderStyle` 等 — 驱动 CSS transform / opacity

**生命周期：**
- `onMounted`：注册 `scroll` 监听器 + 加载历史列表
- `onUnmounted`：移除 `scroll` 监听器

---

### Result.vue — 结果页（行程多标签展示）

**职责：** 读取 sessionStorage 或按 plan_id 拉取数据，分 6 个标签展示行程。

**标签页：**

| key | 内容 |
|-----|------|
| `overview` | Swiper 景点轮播卡片 |
| `budget` | 预算明细，支持类型过滤 + 金额/日期排序 |
| `map` | AMap 或 Google Maps（按运行时 Key 自动选择） |
| `days` | 按天折叠的详细行程（景点 / 餐饮 / 酒店） |
| `knowledge-graph` | ECharts 知识图谱 |
| `weather` | 天气仪表盘 + 7 天预报列表 |

**响应式状态（`<script setup>`）：**

| 变量 | 类型 | 说明 |
|------|------|------|
| `tripPlan` | `ref<TripPlan \| null>` | 核心行程数据 |
| `planId` | `ref<string>` | 当前行程 ID |
| `editMode` | `ref<boolean>` | 编辑模式开关 |
| `originalPlan` | `ref<TripPlan \| null>` | 编辑前快照，用于取消还原 |
| `activeSection` | `ref<string>` | 当前激活标签 key |
| `activeDays` | `ref<number[]>` | 展开的天索引列表 |
| `activeOverviewCard` | `ref<number>` | Swiper 当前居中卡片索引 |
| `mapProviderType` | `ref<'google' \| 'amap'>` | 地图提供商 |
| `budgetFilterType` | `ref<'all' \| BudgetItemType>` | 预算过滤类型 |
| `budgetSortMode` | `ref<BudgetSortMode>` | 排序模式 |
| `pendingBudgetItems` | `ref<BudgetRestoreItem[]>` | 待恢复的已删预算项 |
| `activeWeatherIndex` | `ref<number>` | 当前选中天气日索引 |
| `attractionPhotos` | `ref<Record<string, string>>` | 景点名 → 图片 URL 缓存 |

**命令式实例（非响应式）：**
- `map` — AMap 地图实例
- `googleMap` — Google Maps 实例
- `overviewSwiper` — Swiper 实例
- ECharts 实例（通过 `echarts.init` 在 `nextTick` 后创建）

**Computed（天气相关）：**
- `weatherList`、`selectedWeather`、`selectedWeatherIconKind`
- `weatherDisplayList`（附加 `_iconKind` 字段）
- `weatherSideStyle`（CSS 变量，驱动渐变背景）

**Computed（景点相关）：**
- `overviewAttractions` — 将所有天的景点展平为带 `dayNumber` / `order` 的列表

---

### NavBar.vue — 导航栏

**职责：**
- 品牌 Logo（点击触发 `brand-click` 事件）
- 语言切换器（zh-CN / ja-JP / en-US），写入 localStorage + 更新 i18n locale
- 设置弹窗：运行时配置（API Base URL、AMap Key、Google Maps Key、OpenAI 参数、XHS Cookie）
- GitHub 链接

**Props：** 无

**Emits：**

| 事件 | 触发时机 |
|------|---------|
| `brand-click` | 点击品牌 Logo |
| `cta-click` | 点击 CTA 按钮 |

**设置持久化：**
- 读取：`onMounted` 调用 `getBackendRuntimeSettings()` + `getRuntimeSettings()`
- 写入：点击保存调用 `saveRuntimeSettings()` + `updateBackendRuntimeSettings()`

---

### AIChat.vue — 浮动 AI 对话组件

**职责：**
- 3D 动效悬浮卡片（含眼睛跟随鼠标效果，scale 30%）
- 展开为对话面板，含历史消息 + 快捷问题按钮
- `Enter` 发送消息，支持多行输入
- 向 `POST /api/chat/ask` 发送 `TripChatRequest`，携带完整 `TripPlan` 上下文
- 打字动画（等待响应期间）

**Props：**

| Prop | 类型 | 说明 |
|------|------|------|
| `tripPlan` | `TripPlan \| null` | 当前行程，作为对话上下文 |

**内部状态：**
- `messages: ChatMessage[]` — 对话历史
- `inputText: string` — 输入框内容
- `isLoading: boolean` — 等待响应中
- `isOpen: boolean` — 面板展开状态

---

### OverviewAttractionCard.vue — 景点卡片

**职责：**
- Swiper 滑动卡片，含景点图片（加载失败有兜底）+ SVG 波浪叠层
- 悬浮显示操作按钮，`active` 状态下展示详情

**Props：**

| Prop | 类型 | 说明 |
|------|------|------|
| `item` | `Attraction` | 景点数据 |
| `imageSrc` | `string` | 图片 URL |
| `active` | `boolean` | 是否为 Swiper 居中（激活）卡片 |

**Emits：**

| 事件 | 参数 | 说明 |
|------|------|------|
| `select-day` | `{ dayArrayIndex, order }` | 点击"查看行程"时跳转到对应天 |

---

## 完整数据流

### 主流程：表单提交 → 行程展示

```
用户填写表单（formData）
    │
    ▼
handleSubmit()
    │  构造 TripFormData（含 language 字段）
    │  清空 sessionStorage
    ▼
generateTripPlan(requestData, { onTaskCreated, onTaskEvent })   [api.ts]
    │
    ├─ POST /api/trip/plan  →  { task_id, ws_url }
    │
    └─ new WebSocket(ws_url)
           │
           ├─ onTaskCreated(task)  → planCode = task.plan_id
           │
           ├─ onTaskEvent(event)   → loadingProgress / loadingStatus 更新
           │       stage: submitted → initializing → attraction_search
           │              → weather_search → hotel_search → planning
           │              → graph_building → completed
           │
           └─ status === 'completed'
                  │
                  └─ response: TripPlanResponse
                         │
                         ├─ sessionStorage.setItem('tripPlan',   JSON)
                         ├─ sessionStorage.setItem('graphData',  JSON)
                         └─ sessionStorage.setItem('planId',     string)
                                │
                                ▼
                         router.push('/result?plan_id=…')
```

### Result.vue 挂载流程

```
onMounted()
    │
    ├─ 读取 sessionStorage['tripPlan']   → tripPlan.value
    ├─ 读取 sessionStorage['graphData']  → graphData（局部变量）
    ├─ 读取 sessionStorage['planId']     → planId.value
    │
    └─ 若 tripPlan 为空且 plan_id query 存在
           └─ GET /api/trip/plan/:id  → tripPlan.value
```

### 历史行程打开流程

```
用户点击历史记录项
    │
    ▼
openHistoryPlan(planId)
    │  sessionStorage.removeItem('tripPlan')
    │  sessionStorage.removeItem('graphData')
    │  sessionStorage.setItem('planId', planId)
    ▼
router.push('/result?plan_id=…')
    │
    ▼
Result.vue onMounted：tripPlan 为空
    └─ GET /api/trip/plan/:id  → 拉取完整行程数据
```

### 运行时设置流程

```
NavBar onMounted
    ├─ GET /api/settings  → BackendRuntimeSettings
    └─ getRuntimeSettings() ← localStorage

用户修改设置并保存
    ├─ PUT /api/settings  → 写入后端
    ├─ saveRuntimeSettings() → localStorage
    └─ 派发 CustomEvent 'tripstar:runtime-settings-updated'
           │
           └─ Result.vue 监听该事件 → 重新读取地图 Key → 重载地图
```

### AI 对话流程

```
用户在 AIChat 面板发送消息
    │
    ▼
POST /api/chat/ask
    payload: { message, trip_plan: TripPlan, history: ChatMessage[] }
    │
    ▼
response: TripChatResponse → messages 列表追加
```

---

## 状态分层

| 层级 | 技术 | 存储内容 |
|------|------|---------|
| 组件内 | `ref` / `reactive` | 表单数据、加载状态、UI 交互状态 |
| 跨路由临时 | `sessionStorage` | `tripPlan`、`graphData`、`planId` |
| 用户偏好 | `localStorage` | locale、API Base URL、地图 Key |
| 后端持久化 | `/api/settings` | OpenAI 配置、地图 Key（服务端存储） |

---

## React 重建对照提示

| Vue 模式 | React 等价 |
|----------|-----------|
| `reactive<LandingFormData>` | `useForm()` from react-hook-form |
| `ref<TripPlan>` + `watch` | `useState<TripPlan>` + `useEffect` |
| `onMounted` + `onUnmounted` | `useEffect(() => { ... return cleanup }, [])` |
| `computed(() => ...)` | `useMemo(() => ..., [deps])` |
| 命令式实例（map、swiper） | `useRef` 持有实例，`useEffect` 负责 init/destroy |
| `v-model` 表单 | react-hook-form `register()` / `Controller` |
| `$emit('select-day', payload)` | `onSelectDay: (payload) => void` prop |
| `provide` / `inject` | `React.createContext` + `useContext` |
