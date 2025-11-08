# 🔧 Netlify 环境变量配置详细指南

## 📋 步骤 1：登录 Netlify 控制台

1. 打开浏览器，访问：https://app.netlify.com
2. 使用你的账号登录

---

## 📋 步骤 2：进入站点设置

### 方法 A：从站点列表进入

1. 登录后，你会看到 **"Sites"**（站点）页面
2. 找到你的站点（`geo-info-app` 或你设置的站点名称）
3. 点击站点名称进入站点详情页

### 方法 B：从部署记录进入

1. 在 Netlify 控制台顶部，点击 **"Sites"** 菜单
2. 选择你的站点

---

## 📋 步骤 3：打开环境变量设置

1. 在站点详情页，点击顶部菜单栏的 **"Site settings"**（站点设置）
   - 或者点击左侧菜单的 **"Site configuration"** → **"Environment variables"**

2. 在左侧菜单中找到 **"Environment variables"**（环境变量）
   - 位置：**Site settings** → **Build & deploy** → **Environment variables**

3. 点击 **"Environment variables"**

---

## 📋 步骤 4：查看现有环境变量

进入环境变量页面后，你会看到：

- **环境变量列表**（如果有的话）
- **"Add a variable"**（添加变量）按钮

### 检查是否已有以下变量：

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

**如果这两个变量都存在：**
- ✅ 环境变量已配置
- 📝 检查值是否正确（见步骤 5）

**如果这两个变量不存在：**
- ⚠️ 需要添加环境变量（见步骤 6）

---

## 📋 步骤 5：检查环境变量值（如果已存在）

如果环境变量已存在，检查值是否正确：

### 5.1 检查 VITE_SUPABASE_URL

1. 找到 `VITE_SUPABASE_URL` 这一行
2. 点击右侧的 **"Edit"**（编辑）按钮
3. 检查值格式：
   - ✅ 正确格式：`https://xxxxx.supabase.co`
   - ❌ 错误格式：`https://xxxxx.supabase.co/`（末尾有斜杠）
   - ❌ 错误格式：`xxxxx.supabase.co`（缺少 https://）

### 5.2 检查 VITE_SUPABASE_ANON_KEY

1. 找到 `VITE_SUPABASE_ANON_KEY` 这一行
2. 点击右侧的 **"Edit"**（编辑）按钮
3. 检查值格式：
   - ✅ 正确格式：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（很长的字符串）
   - ❌ 错误：如果值很短或看起来不对

---

## 📋 步骤 6：添加环境变量（如果不存在）

### 6.1 获取 Supabase 配置信息

如果还没有 Supabase 配置信息，先获取：

1. **打开 Supabase 控制台**：
   - 访问：https://app.supabase.com
   - 登录你的账号

2. **选择项目**：
   - 在项目列表中选择你的项目

3. **进入 API 设置**：
   - 点击左侧菜单的 **"Settings"**（设置）
   - 点击 **"API"**

4. **复制配置信息**：
   - **Project URL**：复制 `https://xxxxx.supabase.co` 这个值
   - **anon public key**：点击 **"Reveal"**（显示）按钮，然后复制完整的 key
     - 注意：这是 **Publishable key**（公开密钥），不是 Secret key

### 6.2 在 Netlify 中添加环境变量

#### 添加第一个变量：VITE_SUPABASE_URL

1. 在 Netlify 环境变量页面，点击 **"Add a variable"**（添加变量）按钮

2. 填写变量信息：
   - **Key**（键名）：输入 `VITE_SUPABASE_URL`
   - **Value**（值）：粘贴你从 Supabase 复制的 Project URL
     - 例如：`https://abcdefghijklmnop.supabase.co`
   - **Scopes**（作用域）：选择 **"All scopes"**（所有作用域）
     - 或者选择 **"Production"**（生产环境）和 **"Deploy previews"**（部署预览）

3. 点击 **"Add variable"**（添加变量）按钮

#### 添加第二个变量：VITE_SUPABASE_ANON_KEY

1. 再次点击 **"Add a variable"**（添加变量）按钮

2. 填写变量信息：
   - **Key**（键名）：输入 `VITE_SUPABASE_ANON_KEY`
   - **Value**（值）：粘贴你从 Supabase 复制的 anon public key
     - 例如：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Scopes**（作用域）：选择 **"All scopes"**（所有作用域）

3. 点击 **"Add variable"**（添加变量）按钮

---

## 📋 步骤 7：验证环境变量

添加完成后，你应该看到：

```
环境变量列表：
┌─────────────────────────────┬──────────────────────────────────────┐
│ Key                         │ Value                                 │
├─────────────────────────────┼──────────────────────────────────────┤
│ VITE_SUPABASE_URL           │ https://xxxxx.supabase.co            │
│ VITE_SUPABASE_ANON_KEY      │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
└─────────────────────────────┴──────────────────────────────────────┘
```

---

## 📋 步骤 8：重新部署站点（重要！）

⚠️ **重要**：环境变量配置后，必须重新部署才能生效！

### 方法 1：触发新部署

1. 在 Netlify 控制台，点击顶部菜单的 **"Deploys"**（部署）
2. 点击 **"Trigger deploy"**（触发部署）按钮
3. 选择 **"Clear cache and deploy site"**（清除缓存并部署站点）
4. 等待部署完成（通常需要 1-3 分钟）

### 方法 2：推送代码触发自动部署

如果你使用 Git 连接：

1. 在本地做一个小改动（比如修改 README）
2. 提交并推送：
   ```bash
   git add .
   git commit -m "Trigger deploy"
   git push
   ```
3. Netlify 会自动检测到推送并重新部署

---

## 📋 步骤 9：验证环境变量是否生效

部署完成后，验证环境变量是否正确加载：

1. **访问你的网站**
2. **打开浏览器控制台**（按 F12）
3. **查看控制台日志**，应该看到：
   - ✅ 没有 "缺少 Supabase 环境变量" 的警告
   - ✅ 可以正常使用登录功能

如果仍然看到警告：
- 检查环境变量名称是否正确（必须以 `VITE_` 开头）
- 确认已重新部署
- 尝试清除浏览器缓存后重试

---

## 🎯 快速检查清单

- [ ] 已登录 Netlify 控制台
- [ ] 已进入站点设置 → Environment variables
- [ ] 已检查是否有 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
- [ ] 已从 Supabase 获取正确的配置信息
- [ ] 已添加/编辑环境变量
- [ ] 已重新部署站点
- [ ] 已验证环境变量生效

---

## ❓ 常见问题

### Q1: 找不到 "Environment variables" 选项？

**A**: 
- 确保你点击的是 **"Site settings"**（站点设置），不是站点详情页
- 在左侧菜单中查找 **"Build & deploy"** → **"Environment variables"**

### Q2: 添加变量后点击保存没反应？

**A**: 
- 检查网络连接
- 刷新页面重试
- 确保变量名以 `VITE_` 开头

### Q3: 环境变量值很长，复制时出错？

**A**: 
- 使用 `Ctrl+A` 全选，然后 `Ctrl+C` 复制
- 或者点击 Supabase 控制台中的 **"Copy"** 按钮

### Q4: 如何删除环境变量？

**A**: 
1. 在环境变量列表中找到要删除的变量
2. 点击右侧的 **"Edit"**（编辑）按钮
3. 点击 **"Delete"**（删除）按钮
4. 确认删除

### Q5: 环境变量对大小写敏感吗？

**A**: 
- 是的，变量名对大小写敏感
- 必须使用：`VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
- 不能使用：`vite_supabase_url` 或 `VITE_SUPABASE_url`

---

## 📸 参考截图位置

如果你在 Netlify 界面中找不到选项，可以参考以下路径：

```
Netlify 控制台
└── Sites（站点）
    └── [你的站点名称]
        └── Site settings（站点设置）
            └── Build & deploy（构建和部署）
                └── Environment variables（环境变量）
```

---

**配置完成后，记得重新部署！🎉**


