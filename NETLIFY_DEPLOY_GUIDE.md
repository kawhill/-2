# 🚀 Netlify 部署指南

## ✅ 部署前检查清单

- [x] 代码构建成功（`npm run build` 无错误）
- [ ] Supabase 环境变量已准备好
- [ ] Netlify 账号已登录

---

## 📋 部署步骤

### 方法一：通过 Netlify 网站部署（推荐）

#### 步骤 1：准备构建产物

1. 在项目根目录运行构建命令：
```bash
npm run build
```

2. 构建完成后，会生成 `dist` 文件夹，这就是要部署的文件。

#### 步骤 2：登录 Netlify

1. 打开浏览器，访问：https://app.netlify.com
2. 登录你的账号

#### 步骤 3：部署站点

**方式 A：拖拽部署（最简单）**

1. 在 Netlify 控制台，找到 **"Sites"** 页面
2. 如果已有站点，点击站点名称进入
3. 如果没有站点，直接拖拽 `dist` 文件夹到 Netlify 的部署区域
4. 等待部署完成

**方式 B：通过 Git 连接（自动部署）**

1. 在 Netlify 控制台，点击 **"Add new site"** → **"Import an existing project"**
2. 选择你的 Git 提供商（GitHub/GitLab/Bitbucket）
3. 选择仓库：`geo-info-app`
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 点击 **"Deploy site"**

#### 步骤 4：配置环境变量（⚠️ 重要）

1. 在 Netlify 控制台，进入你的站点
2. 点击 **"Site settings"**（站点设置）
3. 点击左侧菜单 **"Environment variables"**（环境变量）
4. 点击 **"Add a variable"**，添加以下两个变量：

```
变量名: VITE_SUPABASE_URL
值: https://你的项目ID.supabase.co
```

```
变量名: VITE_SUPABASE_ANON_KEY
值: 你的anon密钥（Publishable key）
```

5. 点击 **"Save"** 保存

#### 步骤 5：重新部署

配置环境变量后，需要重新部署才能生效：

1. 在 Netlify 控制台，进入 **"Deploys"**（部署）页面
2. 点击 **"Trigger deploy"** → **"Clear cache and deploy site"**
3. 等待部署完成

---

### 方法二：使用 Netlify CLI（命令行）

#### 步骤 1：安装 Netlify CLI

```bash
npm install -g netlify-cli
```

#### 步骤 2：登录 Netlify

```bash
netlify login
```

#### 步骤 3：初始化项目（首次部署）

```bash
netlify init
```

按照提示：
- 选择 **"Create & configure a new site"**
- 输入站点名称（或使用默认）
- 构建命令：`npm run build`
- 发布目录：`dist`

#### 步骤 4：配置环境变量

```bash
netlify env:set VITE_SUPABASE_URL "https://你的项目ID.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "你的anon密钥"
```

#### 步骤 5：部署

```bash
netlify deploy --prod
```

---

## 🔧 获取 Supabase 配置信息

如果还没有 Supabase 配置信息，按以下步骤获取：

1. 登录 Supabase 控制台：https://app.supabase.com
2. 选择你的项目
3. 点击左侧菜单 **"Settings"**（设置）
4. 点击 **"API"**
5. 复制以下信息：
   - **Project URL**：`https://xxxxx.supabase.co`
   - **anon/public key**：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## ⚠️ 重要注意事项

### 1. 环境变量配置

- **必须**在 Netlify 中配置环境变量，否则云存储功能无法使用
- 环境变量名称必须以 `VITE_` 开头，Vite 才会在构建时注入
- 配置环境变量后，**必须重新部署**才能生效

### 2. 数据库设置

确保 Supabase 数据库已正确配置：
- [ ] 已执行 `supabase-setup.sql` 创建表结构
- [ ] RLS（Row Level Security）策略已启用
- [ ] 邮箱确认功能已配置（建议开发阶段禁用）

### 3. 邮箱确认设置

如果用户注册后无法登录，可能是邮箱确认功能导致的：

**解决方案**：
1. 登录 Supabase 控制台
2. 进入 **Authentication** → **Providers** → **Email**
3. 取消勾选 **"Enable email confirmations"**
4. 保存设置

---

## 🧪 部署后验证

部署完成后，按以下步骤验证：

1. **访问网站**：打开 Netlify 提供的网站地址
2. **检查登录功能**：
   - 应该首先看到登录界面
   - 尝试注册新账号
   - 尝试登录
3. **检查控制台**：
   - 按 F12 打开开发者工具
   - 查看 Console 标签页
   - 不应该有 Supabase 相关的错误
4. **测试数据功能**：
   - 登录后，尝试导入数据
   - 检查数据是否保存成功

---

## 🔄 更新部署

### 如果使用 Git 连接（自动部署）

每次推送到 Git 仓库，Netlify 会自动重新部署。

### 如果使用拖拽部署

1. 修改代码后，运行 `npm run build`
2. 将新的 `dist` 文件夹拖拽到 Netlify 部署区域

### 如果使用 CLI

```bash
npm run build
netlify deploy --prod
```

---

## ❓ 常见问题

### Q1: 部署后显示空白页面？

**A**: 检查构建是否成功，确保 `dist` 文件夹中有 `index.html` 文件。

### Q2: 登录功能不工作？

**A**: 
1. 检查 Netlify 环境变量是否配置正确
2. 检查 Supabase 数据库表是否已创建
3. 检查浏览器控制台是否有错误信息

### Q3: 环境变量配置后不生效？

**A**: 
1. 确保变量名以 `VITE_` 开头
2. 配置后必须重新部署
3. 清除浏览器缓存后重试

### Q4: 如何查看部署日志？

**A**: 
1. 在 Netlify 控制台，进入 **"Deploys"** 页面
2. 点击具体的部署记录
3. 查看 **"Deploy log"** 标签页

---

## 📞 需要帮助？

如果遇到问题，请检查：
1. Netlify 部署日志
2. 浏览器控制台错误信息
3. Supabase 控制台的日志

---

**祝部署顺利！🎉**

