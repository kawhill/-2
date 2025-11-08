# 🚀 Supabase 快速开始指南

## 📋 5 分钟快速配置

### 步骤 1：获取 Supabase 配置信息（2 分钟）

1. 登录 Supabase 控制台：https://app.supabase.com
2. 选择你的项目
3. 进入 **Settings** → **API**
4. 复制以下信息：
   - **Project URL**：`https://xxxxx.supabase.co`
   - **anon/public key**：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 步骤 2：配置环境变量（1 分钟）

在项目根目录创建 `.env.local` 文件：

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ 重要**：
- 将 `your-project-id` 替换为你的项目 ID
- 将 `your-anon-key-here` 替换为你的 anon key
- **不要**提交 `.env.local` 到 Git

### 步骤 3：创建数据库表（2 分钟）

1. 在 Supabase 控制台，点击左侧菜单 **SQL Editor**
2. 点击 **New query**
3. 复制并执行以下 SQL（从 `SUPABASE_IMPLEMENTATION_GUIDE.md` 中获取完整 SQL）

### 步骤 4：安装依赖（如果还没安装）

```bash
npm install @supabase/supabase-js
```

### 步骤 5：测试连接

1. 启动开发服务器：`npm run dev`
2. 打开浏览器控制台
3. 检查是否有 Supabase 相关错误

---

## ✅ 验证清单

- [ ] Supabase 项目已创建
- [ ] 环境变量已配置（`.env.local`）
- [ ] 数据库表已创建
- [ ] RLS 策略已配置
- [ ] 依赖已安装
- [ ] 开发服务器可以正常启动

---

## 🎯 下一步

完成以上步骤后，参考 `SUPABASE_IMPLEMENTATION_GUIDE.md` 进行：
1. 实现用户认证
2. 集成云存储功能
3. 测试数据同步

---

## ❓ 遇到问题？

查看 `SUPABASE_IMPLEMENTATION_GUIDE.md` 中的"故障排除"部分。

