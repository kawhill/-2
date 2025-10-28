# 🚀 Vercel 部署指南

## 📋 部署前准备

### 1. 确保项目可以本地构建

在部署之前，先在本地测试构建：

```bash
# 安装依赖（如果还没安装）
npm install

# 本地构建测试
npm run build

# 预览构建结果
npm run preview
```

如果本地构建成功，访问 http://localhost:4173 查看效果。

### 2. 创建 GitHub 仓库（推荐方式）

如果还没有将项目上传到 GitHub：

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - 准备部署到 Vercel"

# 创建 GitHub 仓库后，关联远程仓库
git remote add origin https://github.com/你的用户名/geo-info-app.git

# 推送到 GitHub
git push -u origin main
```

## 🌐 方法一：通过 GitHub 部署（推荐）

### 步骤 1：注册 Vercel 账号

1. 访问 [https://vercel.com](https://vercel.com)
2. 点击 "Sign Up"
3. 选择 "Continue with GitHub"（使用 GitHub 账号登录）

### 步骤 2：导入项目

1. 登录后，点击 "Add New Project"
2. 选择 "Import Git Repository"
3. 找到您的 `geo-info-app` 仓库
4. 点击 "Import"

### 步骤 3：配置项目

Vercel 会自动检测到这是一个 Vite 项目，配置如下：

- **Framework Preset**: Vite
- **Root Directory**: `./`（默认）
- **Build Command**: `npm run build`（自动检测）
- **Output Directory**: `dist`（自动检测）

### 步骤 4：部署

1. 检查配置无误后，点击 "Deploy"
2. 等待 2-3 分钟，Vercel 会自动构建和部署
3. 部署成功后，您会看到一个类似这样的网址：
   - `https://geo-info-app-xxx.vercel.app`

### 步骤 5：配置自定义域名（可选）

1. 在项目设置中，点击 "Domains"
2. 输入您的域名
3. 按照提示配置 DNS 记录

## 🖥️ 方法二：通过 Vercel CLI 部署

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2：登录 Vercel

```bash
vercel login
```

选择您的登录方式（GitHub/Email）

### 步骤 3：部署项目

在项目根目录运行：

```bash
# 第一次部署（会进行配置）
vercel

# 按照提示回答问题：
# ? Set up and deploy "~/geo-info-app"? [Y/n] y
# ? Which scope do you want to deploy to? 选择您的账号
# ? Link to existing project? [y/N] n
# ? What's your project's name? geo-info-app
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n
```

### 步骤 4：生产环境部署

```bash
# 部署到生产环境
vercel --prod
```

## 🔧 环境变量配置（如果需要）

如果您的项目使用了环境变量（如天气 API Key）：

### 在 Vercel Dashboard 配置：

1. 进入项目设置 (Settings)
2. 点击 "Environment Variables"
3. 添加变量：
   - **Name**: `VITE_OPENWEATHER_API_KEY`
   - **Value**: 您的 API Key
   - **Environment**: Production (或 All)
4. 点击 "Save"
5. 重新部署项目

### 通过 CLI 配置：

```bash
# 添加环境变量
vercel env add VITE_OPENWEATHER_API_KEY

# 按提示输入值和选择环境
```

## 🎯 自动部署

使用 GitHub 方式部署后，Vercel 会自动配置：

- ✅ **自动部署**: 每次推送到 `main` 分支都会自动部署
- ✅ **预览部署**: 创建 Pull Request 时会生成预览链接
- ✅ **回滚功能**: 可以随时回滚到之前的版本

## 📊 部署后检查清单

部署成功后，请检查：

- [ ] 网站可以正常访问
- [ ] 地图可以正常显示
- [ ] 点击地图可以获取信息
- [ ] 城市搜索功能正常
- [ ] 导入的点数据显示正常
- [ ] 天气数据可以获取（如果配置了 API）

## 🐛 常见问题解决

### 问题1：构建失败

**错误信息**: `Build failed`

**解决方案**:
```bash
# 本地清理并重新构建
rm -rf node_modules dist
npm install
npm run build
```

### 问题2：页面空白

**原因**: 可能是路径问题

**解决方案**: 检查 `vite.config.ts` 的 `base` 配置：
```typescript
export default defineConfig({
  base: '/', // 确保是 '/'
  // ...
})
```

### 问题3：静态资源404

**解决方案**: 确保资源文件在 `public` 目录下

### 问题4：API 调用失败

**解决方案**: 
- 检查环境变量是否正确配置
- 检查 API 调用是否使用了正确的协议（HTTPS）

## 📱 访问您的网站

部署成功后，您可以通过以下方式访问：

1. **Vercel 提供的域名**: 
   - `https://geo-info-app-xxx.vercel.app`

2. **自定义域名**（如果配置了）:
   - `https://yourdomain.com`

3. **分享链接**:
   - 可以直接分享 Vercel 域名给其他人使用

## 🔄 更新网站

### 使用 GitHub（推荐）

```bash
# 修改代码后
git add .
git commit -m "更新功能"
git push

# Vercel 会自动检测并重新部署
```

### 使用 CLI

```bash
# 直接部署
vercel --prod
```

## 📈 监控和分析

Vercel 提供了免费的监控功能：

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 查看：
   - 部署历史
   - 访问统计
   - 性能指标
   - 错误日志

## 💡 优化建议

1. **启用 CDN**: Vercel 自动启用全球 CDN
2. **压缩资源**: Vite 已自动处理
3. **缓存策略**: 已在 `vercel.json` 中配置
4. **HTTPS**: Vercel 自动启用 HTTPS

## 🎉 完成！

恭喜！您的农业地理信息系统已经成功部署到 Vercel！

现在任何人都可以通过网址访问您的应用了。

