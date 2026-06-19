# Landing 页面布局设计文档

## 文档目的

本文档定义 TripStar 应用 Landing 页面（路由 `/`）的整体布局结构、尺寸规范、设计 token、以及与 Tailwind CSS v4 + Ant Design 6 的集成规范。

编码时严格按本文档执行，不使用小数 px 值，所有尺寸基于 Tailwind 4px 倍数或整数设计规范。

---

## 一、文件结构与职责

本次需要创建或修改的文件清单：

| 文件路径 | 操作 | 职责 |
|---------|------|------|
| `index.html` | 修改 | 更新 title、lang、添加字体 link |
| `src/index.css` | 修改 | 添加 `@theme` token、全局 base 样式 |
| `src/App.tsx` | 替换 | BrowserRouter + Routes + ConfigProvider |
| `src/pages/Landing/Landing.tsx` | 新建 | 页面 4 section 布局骨架 |
| `src/pages/Landing/Landing.css` | 新建 | 背景图 shorthand 规则 |
| `src/components/NavBar/NavBar.tsx` | 新建 | 导航栏（Ant Design Button + Select） |

---

## 二、尺寸规范（整数化）

所有尺寸以 Tailwind 4px 倍数或整数设计规范为准。**禁止使用小数 px 值**。

| 设计元素 | 测量基值 | 开发使用值 | 应用方式 |
|---------|---------|-----------|---------|
| 页面最大宽度 | ~996px | `1000px` | `max-w-[1000px]` 任意值 |
| 容器左右 padding | 对称 | `px-12`（48px） | 左右各 48px，内容区撑满 |
| NavBar 高度 | ~71px | `72px` | `h-18`（Tailwind） |
| 提交按钮高度 | 48px | `48px` | `h-12`（Tailwind） |
| 输入框高度 | ~40px | `40px` | `h-10`（Tailwind） |
| 历史卡片最小高度 | ~188px | `192px` | `min-h-48`（Tailwind） |
| **Hero H1 字号** | ~70px | `72px` | `text-7xl`（Tailwind） |
| **Hero H2 字号** | ~18px | `18px` | `text-lg`（Tailwind） |
| H3 步骤标题字号 | 16px | `16px` | `text-base`（Tailwind） |
| 历史标题字号 | 24px | `24px` | `text-2xl`（Tailwind） |
| 正文字号 | 14px | `14px` | `text-sm`（Tailwind） |

### 容器宽度策略

**原则**：不使用固定宽度，改用 flex + padding 容纳内容。

```
最外层容器（Landing 页面）
├─ max-w-[1000px]          ← 最大宽度限制（唯一需要任意值）
├─ mx-auto                 ← 居中
└─ <content>
   ├─ px-12                ← 左右各 48px
   └─ w-full               ← 内容撑满
```

效果：
- **桌面** (≥1000px)：容器 1000px，左右各 48px padding，内容区 904px
- **平板** (768px-1000px)：容器 100vw，左右各 48px padding，内容区自适应
- **手机** (<768px)：可进一步调整 padding（后续响应式任务）

---

## 三、设计 Token（`src/index.css`）

### `@theme {}` 块 — 产生 Tailwind 工具类

以下每一项会自动生成对应的 Tailwind 工具类：

```css
@theme {
  /* 颜色 — 深色主题 */
  --color-page:          rgb(10, 25, 38);           /* 页面背景 */
  --color-input-bg:      rgba(14, 27, 38, 0.66);    /* 输入框背景 */
  --color-card-bg:       rgba(255, 255, 255, 0.04); /* 卡片背景 */
  --color-primary:       rgb(236, 243, 250);        /* 主文本 */
  --color-title:         rgb(255, 255, 255);        /* 标题文本 */
  --color-subtitle:      rgba(224, 233, 242, 0.78); /* 副标题 */
  --color-label:         rgba(240, 246, 252, 0.94); /* 表单标签 */
  --color-accent-orange: rgb(245, 89, 61);          /* 主操作色 */
  --color-accent-blue:   rgb(22, 119, 255);         /* 次操作色 */
  --color-border-card:   rgba(203, 227, 255, 0.12); /* 卡片边框 */
  --color-border-input:  rgba(236, 243, 250, 0.2);  /* 输入框边框 */
  
  /* 字体 */
  --font-outfit: 'Outfit', ui-sans-serif, system-ui, sans-serif;
  
  /* 圆角 */
  --radius-btn-cta:  30px;   /* NavBar CTA "开始定制" — 半圆 */
  --radius-btn-form: 12px;   /* 提交按钮、输入框 */
  --radius-card:     20px;   /* 历史卡片 */
  --radius-btn-add:  10px;   /* "+ 添加城市" 按钮 */
  --radius-btn-sm:   6px;    /* 刷新等小按钮 */
}
```

产生的 Tailwind 工具类示例：

```
颜色类：
  bg-page, text-page, border-page
  bg-input-bg, text-primary, ...
  bg-accent-orange, text-accent-orange, ...
  border-border-card, border-border-input

字体类：
  font-outfit

圆角类：
  rounded-btn-cta, rounded-btn-form, rounded-card, ...
```

### 全局 base 样式

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
}

body {
  font-family: var(--font-outfit);
  background-color: rgb(10, 25, 38);
  color: rgb(236, 243, 250);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 四、Ant Design ConfigProvider 配置

在 `src/App.tsx` 中的 ConfigProvider 应使用以下 token 配置：

```tsx
const antdTheme = {
  algorithm: theme.darkAlgorithm,  // ← 全局 dark palette
  token: {
    /* 品牌色 — 传播到 Button、Select、Input focus ring 等 */
    colorPrimary: 'rgb(245, 89, 61)',
    
    /* 表面色 */
    colorBgContainer:     'rgba(14, 27, 38, 0.66)',  // 输入框、Select 背景
    colorBgElevated:      'rgb(10, 25, 38)',         // 下拉菜单、Modal 背景
    colorBgLayout:        'rgb(10, 25, 38)',         // Layout 页面背景
    
    /* 文本和边框 */
    colorText:            'rgb(236, 243, 250)',
    colorTextSecondary:   'rgba(236, 243, 250, 0.65)',
    colorBorder:          'rgba(236, 243, 250, 0.2)',
    colorBorderSecondary: 'rgba(203, 227, 255, 0.12)',
    
    /* 圆角规范 */
    borderRadius:         12,    // 输入框、普通按钮
    borderRadiusLG:       20,    // 卡片、大组件
    borderRadiusSM:       6,     // 小型控件
    
    /* 字体 */
    fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    fontSize: 14,
  }
}
```

配置应包在 `BrowserRouter` 外层：

```tsx
<ConfigProvider theme={antdTheme}>
  <BrowserRouter>
    {/* routes */}
  </BrowserRouter>
</ConfigProvider>
```

---

## 五、页面布局骨架

### DOM 树结构

```
<div className="landing-wrapper min-h-screen">      ← Landing.css 中定义背景图
  <div className="max-w-[1000px] mx-auto">          ← 居中列
    
    <NavBar />                                       ← Section 1
    
    <section aria-label="Hero">                      ← Section 2
      {/* Hero 内容 */}
    </section>
    
    <section aria-label="表单" className="px-12">   ← Section 3
      {/* Form 内容 */}
    </section>
    
    <section aria-label="历史计划" className="px-12"> ← Section 4
      {/* History 内容 */}
    </section>
    
  </div>
</div>
```

---

### Section 1 — NavBar（高度 `h-18`）

**布局**：flex 横向，透明背景，顶部固定（可选）

```tsx
<nav className="flex items-center justify-between h-18 bg-transparent">
  
  {/* 左侧：Logo */}
  <Button type="text">
    <span className="font-outfit font-bold">TRIPSTAR</span>
  </Button>
  
  {/* 中间：语言选择 */}
  <Select variant="borderless" />
  
  {/* 右侧：配置 + CTA */}
  <div className="flex items-center gap-2">
    <Button type="text">⚙</Button>  {/* 配置图标 */}
    <Button
      type="primary"
      className="rounded-btn-cta bg-accent-orange"
    >
      开始定制
    </Button>
  </div>
  
</nav>
```

**组件选择**：
- 纯文本按钮用 `Button type="text"`（继承 dark theme 文本色）
- 语言下拉用 `Select variant="borderless"`（无边框，dark theme 下拉）
- CTA 按钮用 `Button type="primary"`（自动使用 `colorPrimary` orange）

**样式应用**：
- 所有文字天生继承 `color: rgb(236, 243, 250)` from ConfigProvider
- Logo 用 `font-outfit font-bold` 工具类
- CTA 用 `rounded-btn-cta` 工具类（30px 圆角）

---

### Section 2 — Hero（相对定位，防止云图溢出）

**结构**：背景云图 + 文字覆盖

```tsx
<section className="relative overflow-hidden py-16">
  
  {/* 云图装饰 — 左 */}
  <img
    src="/assets/images/clouds.png"
    alt=""
    aria-hidden
    loading="lazy"
    className="pointer-events-none absolute left-0 top-0 select-none"
    style={{ opacity: 0.6 }}
  />
  
  {/* 云图装饰 — 右（镜像） */}
  <img
    src="/assets/images/clouds.png"
    alt=""
    aria-hidden
    loading="lazy"
    className="pointer-events-none absolute right-0 top-0 select-none scale-x-[-1]"
    style={{ opacity: 0.6 }}
  />
  
  {/* 文字（z-10 覆盖在云图上） */}
  <div className="relative z-10 text-center">
    <h1 className="font-outfit text-7xl font-extrabold text-title">
      TRIPSTAR
    </h1>
    <h2 className="font-outfit text-lg font-light mt-8" style={{ color: 'rgba(224,233,242,0.78)' }}>
      探索世界的每一种可能
    </h2>
  </div>
  
</section>
```

**关键点**：
- 云图用 `absolute` 定位，`pointer-events-none`（不拦截点击）
- 右侧云图用 `scale-x-[-1]` 镜像
- 文字用 `relative z-10` 覆盖在云图上方
- H1 用 `text-7xl`（72px）、`font-extrabold`（800）
- H2 用 `text-lg`（18px）、`font-light`（300）

---

### Section 3 — Form（内容区宽度由 `px-12` 控制）

**结构**：三个步骤 + 提交按钮

```tsx
<section className="px-12">
  
  {/* 步骤 01 */}
  <div className="mb-6">
    <h3 className="text-base font-semibold text-label mb-3">
      01 目的地与行程
    </h3>
    {/* TODO: 输入框、日期选择等 */}
  </div>
  
  {/* 步骤 02 */}
  <div className="mb-6">
    <h3 className="text-base font-semibold text-label mb-3">
      02 偏好设置
    </h3>
    {/* TODO: 下拉、多选框等 */}
  </div>
  
  {/* 步骤 03 */}
  <div className="mb-6">
    <h3 className="text-base font-semibold text-label mb-3">
      03 特殊需求
    </h3>
    {/* TODO: 文本域等 */}
  </div>
  
  {/* 提交按钮 */}
  <button
    className="w-full h-12 bg-accent-orange text-white font-medium rounded-btn-form"
  >
    开始规划旅程
  </button>
  
</section>
```

**布局说明**：
- Section 外层 `px-12` 产生左右 padding，内容自动居中
- 步骤标题用 `text-base`（16px）、`text-label`（亮白）
- 提交按钮 `w-full h-12` 撑满容器宽度，高度 48px

---

### Section 4 — History（同样 `px-12`）

**结构**：标题 + 卡片列表

```tsx
<section className="px-12 mt-10 pb-16">
  
  {/* 标题区 */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-title">历史计划</h2>
    {/* TODO: Refresh Button (Ant Design) */}
  </div>
  
  {/* 卡片列表 */}
  <div className="flex flex-col gap-4 items-center">
    
    {/* 卡片占位 */}
    <div
      className="w-full min-h-48 bg-card-bg rounded-card border border-border-card p-5"
    >
      {/* TODO: 历史卡片内容 */}
    </div>
    
  </div>
  
</section>
```

**卡片样式**：
- `w-full`：撑满内容区（`px-12` 内）
- `min-h-48`：最小高度 192px
- `bg-card-bg`：半透明白（rgba 0.04）
- `rounded-card`：20px 圆角
- `border border-border-card`：0.8px 半透明蓝边框
- `p-5`：内边距 20px

---

## 六、背景图处理（`src/pages/Landing/Landing.css`）

```css
.landing-wrapper {
  background-image:      url('/assets/images/antoine-barres.jpg');
  background-size:       cover;
  background-position:   center top;
  background-repeat:     no-repeat;
  background-attachment: fixed;  /* 滚动时图片保持固定位置 — 视差效果 */
}
```

**为何单独用 CSS**：
- `background` shorthand 在 JSX `style={{}}` 对象中写法冗长
- `background-attachment: fixed` 在 Tailwind v4 中虽然有 `bg-fixed` 工具类，但与其他 background 属性组合时仍需 CSS（避免选择器优先级问题）

**替代方案**（如果倾向于全 Tailwind）：
```tsx
<div className="bg-fixed" style={{ backgroundImage: "url('/assets/images/antoine-barres.jpg')" }}>
```
但推荐用独立 CSS 文件保持清晰。

---

## 七、样式决策规则

在编码时遵循以下规则决定使用 Tailwind 工具类还是 inline style：

| 场景 | 写法 | 示例 |
|------|------|------|
| 命名设计 token（颜色、字体、圆角） | `className="..."` 工具类 | `bg-page text-primary font-outfit rounded-card` |
| Tailwind 4px 倍数尺寸 | `className="h-12 text-lg min-h-48"` | `h-18`, `px-12`, `text-7xl` |
| 独特/唯一容器宽度 | `max-w-[1000px]` 任意值 | `className="max-w-[1000px]"` |
| 多属性 background shorthand | 单独 `.css` 文件 | `.landing-wrapper { background-image: url(...); ... }` |
| 一次性 rgba（设计中不重复） | `style={{ color: '...' }}` | `style={{ color: 'rgba(224,233,242,0.78)' }}` |
| 特殊单位或浮点数 | 禁止 | ❌ 不用 914.4px、69.72px |

**核心原则**：
- ✅ 优先用 Tailwind 工具类
- ✅ 命名 token 放 `@theme {}`
- ✅ 只有 inline style 无法表达时才用 `style={{}}`
- ❌ 禁止小数 px 值

---

## 八、响应式设计（未来）

本文档定义的是 **桌面端** (≥1000px) 布局。未来响应式任务中：

- **平板** (768px-1000px)：调整 `px-*`，可能改为 `px-8`（32px）
- **手机** (<768px)：导航改为 mobile menu，表单改单列，`px-4` 或 `px-6`

目前使用 `px-12` 仅针对桌面设计。

---

## 九、验证清单

开发完成后，按以下步骤验证：

- [ ] `npm run dev` — 无 TS 错误，页面在 http://localhost:5173 正常加载
- [ ] DevTools Network 过滤 `font`：`outfit-*.ttf` 全部返回 200
- [ ] DevTools Network 过滤 `image`：`antoine-barres.jpg`、`clouds.png` 返回 200
- [ ] Ant Design Select 下拉背景为深色（dark theme 已应用）
- [ ] NavBar 高度 ~72px，三元素水平对齐，背景透明
- [ ] Hero H1 字号 ~72px、H2 字号 ~18px，两张云图覆盖两侧
- [ ] Form section 居中，提交按钮 orange + 圆角
- [ ] History 卡片深灰背景、蓝边框、20px 圆角
- [ ] `npm run build` — 零 TS 错误
- [ ] 页面整体背景为深蓝灰，没有白底闪烁

---

## 十、相关资源

- 样式规范：`docs/@pageStyle/` 下各文档（layout-structure.md、color-system.md 等）
- 资源位置：`public/assets/fonts/` + `public/assets/images/`
- Tailwind v4 文档：https://tailwindcss.com/docs/v4-upgrade
- Ant Design 主题定制：https://ant.design/docs/react/customize-theme
