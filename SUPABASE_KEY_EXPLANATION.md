# 🔑 Supabase 密钥说明

## 两种密钥的区别

在 Supabase 控制台的 **Settings → API** 页面，你会看到两种密钥：

### 1. Publishable key（公开密钥 / anon key）✅ 使用这个

- **用途**：前端应用使用
- **安全性**：安全，可以暴露在前端代码中
- **权限**：受 RLS（Row Level Security）策略限制
- **位置**：在 Supabase 控制台显示为 **"Publishable key"** 或 **"anon public"**
- **使用场景**：`.env.local` 文件中的 `VITE_SUPABASE_ANON_KEY`

### 2. Secret key（服务端密钥）❌ 不要使用这个

- **用途**：后端服务使用
- **安全性**：非常敏感，绝对不能暴露在前端
- **权限**：绕过 RLS 策略，拥有完整权限
- **位置**：在 Supabase 控制台显示为 **"Secret key"** 或 **"service_role"**
- **使用场景**：只在服务器端使用，永远不要放在前端代码中

---

## 在 Supabase 控制台中的位置

1. 登录 Supabase 控制台：https://app.supabase.com
2. 选择你的项目
3. 点击左侧菜单 **Settings**（设置）
4. 点击 **API**
5. 你会看到：

```
Project URL
https://xxxxxxxxxxxxx.supabase.co

Project API keys
┌─────────────────────────────────────────┐
│ Publishable key (anon public)          │  ← 使用这个！
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│ [Reveal] [Copy]                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Secret key (service_role)               │  ← 不要使用这个！
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│ [Reveal] [Copy]                         │
└─────────────────────────────────────────┘
```

---

## 在 .env.local 文件中应该使用

```env
# Supabase 配置
VITE_SUPABASE_URL=https://你的项目ID.supabase.co
VITE_SUPABASE_ANON_KEY=你的Publishable key（不是Secret key）
```

---

## 如何确认你使用的是正确的密钥？

1. **Publishable key** 通常以 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` 开头
2. 在 Supabase 控制台中，**Publishable key** 显示在 **Secret key** 的上方
3. **Publishable key** 旁边通常有 "anon public" 或 "public" 的标识
4. **Secret key** 旁边通常有 "service_role" 或 "secret" 的标识

---

## 总结

✅ **使用**：Publishable key（anon public key）  
❌ **不要使用**：Secret key（service_role key）

如果你只有这两个选项，选择 **Publishable key**！

