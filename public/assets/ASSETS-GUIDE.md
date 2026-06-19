# 本地资源指南

## 📦 资源清单

### 图片资源 (`public/assets/images/`)

| 文件名 | 类型 | 大小 | 用途 | 原链接 |
|-------|------|------|------|--------|
| `clouds.png` | PNG | 643 KB | 云雾装饰效果（Landing 页面） | https://demos.creative-tim.com/paper-kit-2/assets/img/clouds.png |
| `antoine-barres.jpg` | JPG | 472 KB | Hero 背景图片（备用） | http://demos.creative-tim.com/paper-kit-2/assets/img/antoine-barres.jpg |

**使用位置**:
- `clouds.png`: Landing.vue 第 22, 25, 387 行（出现 3 次）
- `antoine-barres.jpg`: Landing.vue 第 381 行

---

### 字体资源 (`public/assets/fonts/`)

| 文件名 | 字体家族 | 粗细 | 大小 | 用途 |
|-------|--------|------|------|------|
| `outfit-300.ttf` | Outfit | 300 (Light) | 47 KB | 副标题 |
| `outfit-400.ttf` | Outfit | 400 (Regular) | 47 KB | 正文文本 |
| `outfit-500.ttf` | Outfit | 500 (Medium) | 47 KB | 标签 |
| `outfit-600.ttf` | Outfit | 600 (Semibold) | 48 KB | 小标题 |
| `outfit-700.ttf` | Outfit | 700 (Bold) | 48 KB | 大标题 |
| `outfit-800.ttf` | Outfit | 800 (Extrabold) | 48 KB | 超粗标题 |
| `outfit-900.ttf` | Outfit | 900 (Black) | 48 KB | "TRIPSTAR" 标题 (69.72px) |
| `nunito-sans-400.ttf` | Nunito Sans | 400 | 105 KB | OverviewAttractionCard 组件 |
| `raleway-700.ttf` | Raleway | 700 | 136 KB | 特殊用途文本 |
| `fonts.css` | CSS 定义 | - | 2 KB | 字体声明文件 |

**字体加载 CSS**: `fonts/fonts.css`

**使用位置**:
- Outfit: App.vue (70 行)
- Nunito Sans + Raleway: OverviewAttractionCard.vue (52 行)

---

## 🔧 在代码中使用

### 方案 1: 在 HTML 中直接引入

在 `index.html` 的 `<head>` 标签中添加：

```html
<link rel="stylesheet" href="/assets/fonts/fonts.css">
```

### 方案 2: 在 CSS 中导入

在 `src/index.css` 或主样式文件中：

```css
@import "/assets/fonts/fonts.css";
```

### 方案 3: 在 Vue 组件中导入

在需要使用字体的组件中：

```vue
<script setup lang="ts">
import "/assets/fonts/fonts.css";
</script>
```

---

## 🖼️ 图片使用示例

### Vue 3 中使用图片

```vue
<!-- 相对于 public 目录 -->
<img src="/assets/images/clouds.png" alt="Cloud decoration">

<!-- 或在 CSS 中 -->
<style scoped>
.hero-bg {
  background-image: url('/assets/images/clouds.png');
}
</style>
```

### JavaScript 中动态引用

```typescript
// Vue 3 + TypeScript
const cloudImageUrl = '/assets/images/clouds.png';
const heroImageUrl = '/assets/images/antoine-barres.jpg';

// 动态加载
const img = new Image();
img.src = '/assets/images/clouds.png';
```

---

## 📊 资源统计

### 总大小
- **图片**: 1.1 MB (2 个文件)
- **字体**: 585 KB (11 个文件)
- **总计**: ~1.7 MB

### 加载顺序（建议）
1. 字体 CSS (`fonts.css`) - 2 KB
2. 字体文件 - 按需加载 (lazy loading)
3. 图片 - 按需加载

---

## 🚀 优化建议

### 1. 字体加载优化
```css
/* 使用 font-display: swap 已配置 */
/* 这会在自定义字体加载前使用系统字体 */
@font-face {
  font-family: 'Outfit';
  font-display: swap; /* ← 已配置 */
  src: url('./outfit-700.ttf') format('truetype');
}
```

### 2. 图片优化（未来改进）
- 考虑使用 WebP 格式转换
- 使用图片压缩工具优化文件大小
- 对 `clouds.png` (643 KB) 进行压缩

### 3. 懒加载图片
```vue
<img 
  src="/assets/images/clouds.png" 
  alt="Cloud"
  loading="lazy"
>
```

---

## 📝 更新源代码中的 URL

如果源代码中仍有外部 URL，需要替换为本地路径：

### 找到所有外部 URL
```bash
grep -r "fonts.googleapis.com" src/
grep -r "demos.creative-tim.com" src/
```

### 替换规则

| 原 URL | 新 URL |
|-------|--------|
| `https://fonts.googleapis.com/css2?family=Outfit:wght@...` | `/assets/fonts/fonts.css` |
| `https://demos.creative-tim.com/paper-kit-2/assets/img/clouds.png` | `/assets/images/clouds.png` |
| `http://demos.creative-tim.com/paper-kit-2/assets/img/antoine-barres.jpg` | `/assets/images/antoine-barres.jpg` |

---

## 🔐 离线使用

现在项目可以完全离线运行：
- ✅ 字体已本地化
- ✅ 图片已本地化
- ⚠️ 二维码生成 API 仍需网络（Result.vue 第 2011 行）

### 二维码 API 处理
如果需要离线支持，考虑使用本地二维码库：
- `qrcode` - npm 包
- `qr-code` - 轻量级库

```bash
npm install qrcode --legacy-peer-deps
```

---

## ✅ 验证清单

- [ ] 在 index.html 中添加 `<link href="/assets/fonts/fonts.css">`
- [ ] 测试字体是否正确加载
- [ ] 测试图片是否显示
- [ ] 检查浏览器网络标签，确认使用本地资源
- [ ] 测试离线模式（如果需要）

---

**文件位置**: `public/assets/`  
**下载时间**: 2026-06-19  
**总资源数**: 13 个文件  
**总大小**: ~1.7 MB  
