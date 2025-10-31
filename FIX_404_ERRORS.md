# 🔧 修复 404 错误指南

## ✅ 已修复的问题

### 1. Favicon 404 错误

**问题**：`index.html` 引用了不存在的 `/vite.svg` 图标文件

**修复**：已注释掉 favicon 引用，避免 404 错误

```html
<!-- 之前 -->
<link rel="icon" type="image/svg+xml" href="/vite.svg" />

<!-- 修复后 -->
<!-- Favicon 图标（可选，避免 404 错误） -->
<!-- <link rel="icon" type="image/svg+xml" href="/favicon.ico" /> -->
```

## 🔍 其他可能的问题

### 2. 图片资源路径

**检查项目**：`/daorumuban.png` 图片

**状态**：✅ 正确
- 文件位置：`public/daorumuban.png`
- 代码引用：`/daorumuban.png`（正确）
- Vite 会自动将 `public` 目录下的文件复制到构建根目录

### 3. JSON 数据文件（如果使用）

**文件**：`src/data/mapData.json`

**注意**：如果在代码中使用 `fetch('/src/data/mapData.json')`，构建后可能找不到文件。

**建议**：
- 使用 `import` 语句而不是 `fetch`
- 或移动到 `public` 目录

```typescript
// ❌ 不推荐（构建后可能 404）
const response = await fetch('/src/data/mapData.json')

// ✅ 推荐方式 1：使用 import
import mapData from '@/data/mapData.json'

// ✅ 推荐方式 2：放到 public 目录
// 文件：public/data/mapData.json
// 使用：fetch('/data/mapData.json')
```

## 📝 验证步骤

### 步骤 1：检查控制台错误

1. 打开浏览器控制台（F12）
2. 查看 Network 标签
3. 查找红色（404）的资源
4. 记下失败的文件路径

### 步骤 2：检查文件是否存在

根据控制台显示的 404 路径，检查：
- 文件是否在 `public` 目录（静态资源）
- 文件是否在 `src` 目录（需要 import）

### 步骤 3：修复路径

**静态资源**（如图片、字体）：
- 放在 `public` 目录
- 使用绝对路径 `/filename.ext`

**代码资源**（如 JSON、组件）：
- 放在 `src` 目录
- 使用 `import` 语句
- 或使用 `@/` 别名

## 🚀 重新构建和部署

修复后需要：

1. **重新构建**：
```bash
npm run build
```

2. **本地测试**：
```bash
npm run preview
```

3. **检查 dist 目录**：
- 确认所有资源都在 `dist` 目录中
- 检查 `dist` 目录结构

4. **重新部署到 Netlify**：
- 上传新的 `dist` 文件夹
- 或推送代码触发自动部署

## ✅ 常见资源路径规则

### Vite 资源处理规则

| 资源类型 | 存放位置 | 引用方式 | 说明 |
|---------|---------|---------|------|
| 静态图片 | `public/` | `/image.png` | 直接复制到根目录 |
| 组件图片 | `src/assets/` | `import img from '@/assets/img.png'` | 会被打包处理 |
| JSON 数据 | `public/` | `fetch('/data.json')` | 直接复制 |
| JSON 数据 | `src/data/` | `import data from '@/data/data.json'` | 会被打包 |
| 字体文件 | `public/fonts/` | `/fonts/font.woff2` | 直接复制 |

## 🔍 调试技巧

### 查看实际请求路径

在浏览器控制台 Network 标签中：
1. 找到 404 的资源
2. 查看 "Request URL" 列
3. 对比实际文件位置

### 检查构建输出

```bash
npm run build
# 查看 dist 目录内容
```

确认：
- 所有资源都在 `dist` 目录中
- 路径正确
- 文件名正确

## ⚠️ 注意事项

1. **大小写敏感**：
   - Windows 不区分大小写，但部署后（Linux 服务器）区分
   - 确保文件名大小写完全匹配

2. **路径前导斜杠**：
   - `public` 目录的文件：`/filename.ext`（有前导斜杠）
   - `src` 目录的文件：使用 import 或别名

3. **部署后的路径**：
   - Netlify 会自动处理路径
   - 确保 `vercel.json` 或 `netlify.toml` 配置正确

## 🎯 快速检查清单

修复 404 错误后：

- [ ] 检查浏览器控制台，没有红色 404 错误
- [ ] Network 标签中所有资源状态码为 200
- [ ] 图片正常显示
- [ ] 功能正常工作
- [ ] 本地测试通过
- [ ] 部署后测试通过

---

如果还有 404 错误，请：
1. 记录具体的文件路径
2. 检查文件是否存在于正确位置
3. 检查代码中的引用路径
4. 查看构建后的 `dist` 目录结构
