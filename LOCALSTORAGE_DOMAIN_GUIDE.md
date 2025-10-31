# 🌐 localStorage 域名隔离问题说明

## 为什么数据会"丢失"？

**原因**：localStorage 是基于**域名**存储的，不同的域名被视为完全不同的网站，数据无法共享。

## 🔍 常见的域名变化情况

### 情况 1：localhost vs 127.0.0.1

虽然它们都指向本地，但对浏览器来说是完全不同的域名：

```
❌ http://localhost:3000      → localStorage A
❌ http://127.0.0.1:3000      → localStorage B（不同的存储！）
```

**为什么会切换？**
- 浏览器自动补全（输入 `localhost` 可能变成 `127.0.0.1`）
- 书签保存的是 `127.0.0.1`，但手动输入的是 `localhost`
- 某些软件或代理会自动转换

### 情况 2：开发环境 vs 生产环境

```
❌ http://localhost:3000          → 本地开发存储
❌ https://your-app.netlify.app   → 线上存储（完全不同！）
```

### 情况 3：HTTP vs HTTPS

```
❌ http://localhost:3000   → HTTP 存储
❌ https://localhost:3000  → HTTPS 存储（如果启用了SSL）
```

### 情况 4：端口号变化

```
❌ http://localhost:3000   → 端口 3000 的存储
❌ http://localhost:5173   → 端口 5173 的存储（Vite默认）
```

## ✅ 解决方案

### 方案 1：统一使用固定的域名访问（推荐）

**固定使用 `localhost:3000`**：

1. 在浏览器中**固定使用一个地址**访问
2. 创建书签，每次都点击书签访问（不要手动输入）
3. 推荐使用 `localhost:3000`（更标准）

**检查当前域名**：
在浏览器地址栏查看，确保每次都使用同一个地址。

### 方案 2：配置 Vite 固定 host

修改 `vite.config.ts`，强制使用 `localhost`：

```typescript
export default defineConfig({
  // ... 其他配置
  server: {
    host: 'localhost',  // 固定使用 localhost
    port: 3000,
    open: true,
    strictPort: true,   // 如果 3000 被占用，不自动切换端口
  },
})
```

### 方案 3：数据迁移工具（未来功能）

可以添加一个功能，让用户在不同域名间迁移数据：
- 导出数据（JSON文件）
- 在新域名导入数据

## 🎯 立即检查

### 步骤 1：检查当前访问地址

打开浏览器，查看地址栏：
- ✅ 应该是：`http://localhost:3000`
- ❌ 不应该：`http://127.0.0.1:3000`

### 步骤 2：检查 localStorage 数据

打开浏览器控制台（F12），运行：

```javascript
// 查看所有 localStorage 的数据
console.log('当前域名:', window.location.host)

// 检查不同域名下的数据
console.log('localhost 数据:', localStorage.getItem('user_data_sets'))
```

**注意**：localStorage 是按域名隔离的，无法跨域名读取。

### 步骤 3：创建书签

1. 访问 `http://localhost:3000`
2. 按 `Ctrl + D` 或点击书签图标
3. 保存书签，以后都用这个书签打开

## 📊 localStorage 存储位置

### Windows 系统

**Chrome/Edge**：
```
C:\Users\{你的用户名}\AppData\Local\Google\Chrome\User Data\Default\Local Storage\leveldb
或
C:\Users\{你的用户名}\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\leveldb
```

**文件命名规则**：
- `http_localhost_3000_0.localstorage` ← localhost:3000 的数据
- `http_127.0.0.1_3000_0.localstorage` ← 127.0.0.1:3000 的数据（不同文件！）

## 🔧 手动迁移数据（高级）

如果需要从 `127.0.0.1` 迁移到 `localhost`：

1. **在 `127.0.0.1:3000` 导出数据**：
   ```javascript
   // 在浏览器控制台运行
   const data = localStorage.getItem('user_data_sets')
   const blob = new Blob([data], { type: 'application/json' })
   const url = URL.createObjectURL(blob)
   const a = document.createElement('a')
   a.href = url
   a.download = 'user_data_backup.json'
   a.click()
   ```

2. **切换到 `localhost:3000`**

3. **导入数据**：
   ```javascript
   // 读取文件内容，然后在控制台运行
   localStorage.setItem('user_data_sets', '从文件复制的内容')
   location.reload()
   ```

## 💡 最佳实践

1. **固定使用 `localhost:3000`**
2. **使用书签访问**（不要手动输入）
3. **定期导出数据备份**（防止丢失）
4. **避免在多个域名间切换**

## ⚠️ 注意事项

- ⚠️ 清空浏览器数据会删除 localStorage
- ⚠️ 无痕模式没有持久化存储
- ⚠️ 不同浏览器的数据不共享（Chrome 和 Edge 数据分离）
