# ⚡ 5 分钟快速部署指南

## 🎯 最快捷的方法：Vercel CLI

不需要 Git，不需要 GitHub，直接部署！

---

## 📦 准备工作（只需一次）

### 安装 Vercel CLI

在项目目录打开 PowerShell 或 CMD，运行：

```bash
npm install -g vercel
```

等待安装完成（约 30 秒）

---

## 🚀 部署步骤（3步完成）

### 步骤 1：登录 Vercel

```bash
vercel login
```

会弹出浏览器：
1. 选择登录方式（推荐用邮箱）
2. 输入邮箱
3. 去邮箱点击验证链接
4. 回到终端，看到 "Success!" 表示登录成功

### 步骤 2：部署

在项目目录 `c:\Users\SwaggyP\geo-info-app` 运行：

```bash
vercel
```

会问几个问题，按下面回答：

```
? Set up and deploy "c:\Users\SwaggyP\geo-info-app"? 
  → 按回车（默认 Yes）

? Which scope do you want to deploy to? 
  → 选择您的账号（通常只有一个）

? Link to existing project? 
  → 输入 N 按回车（创建新项目）

? What's your project's name? 
  → 直接按回车（使用默认名称 geo-info-app）

? In which directory is your code located? 
  → 直接按回车（使用默认 ./）
```

Vercel 会自动：
- ✅ 检测到这是 Vite 项目
- ✅ 运行 `npm install`
- ✅ 运行 `npm run build`
- ✅ 上传文件
- ✅ 部署到服务器

等待 1-2 分钟...

### 步骤 3：部署到生产环境

上一步是预览部署，要部署到正式环境，运行：

```bash
vercel --prod
```

等待约 1 分钟，看到：

```
✅ Production: https://geo-info-app-xxx.vercel.app
```

**恭喜！部署成功！** 🎉

---

## 🌐 访问您的网站

复制上面的网址，在浏览器打开，您的网站就上线了！

网址格式类似：
- `https://geo-info-app.vercel.app`
- `https://geo-info-app-xxx.vercel.app`

---

## 🔄 更新网站

以后修改代码后，想更新网站，只需运行：

```bash
vercel --prod
```

就这么简单！

---

## 📊 管理您的项目

### 查看项目详情

访问：https://vercel.com/dashboard

可以看到：
- 📈 访问统计
- 🔍 部署历史
- ⚙️ 项目设置
- 🌐 自定义域名

---

## 🎨 自定义域名（可选）

如果您有自己的域名（如 `www.yoursite.com`）：

1. 登录 Vercel Dashboard
2. 选择项目 `geo-info-app`
3. 点击 "Settings" → "Domains"
4. 输入您的域名
5. 按照提示配置 DNS

---

## ⚡ 完整命令速查

```bash
# 首次安装（只需一次）
npm install -g vercel

# 登录（只需一次）
vercel login

# 预览部署（测试用）
vercel

# 正式部署（生产环境）
vercel --prod

# 查看项目列表
vercel ls

# 查看部署状态
vercel inspect

# 删除部署
vercel remove geo-info-app
```

---

## 🎯 总结

整个流程只需 3 个命令：

```bash
1️⃣ npm install -g vercel      # 安装（首次）
2️⃣ vercel login                # 登录（首次）
3️⃣ vercel --prod               # 部署
```

就是这么简单！✨

---

## 💡 提示

- ✅ 首次部署需要 2-3 分钟
- ✅ 后续更新只需 1 分钟
- ✅ 完全免费（个人项目）
- ✅ 自动 HTTPS 证书
- ✅ 全球 CDN 加速

---

## 🆘 遇到问题？

### 问题 1：`npm install -g vercel` 失败

**可能原因**：网络问题

**解决方案**：
```bash
# 使用国内镜像
npm install -g vercel --registry=https://registry.npmmirror.com
```

### 问题 2：构建失败

**解决方案**：
```bash
# 先本地测试
npm run build

# 如果本地成功，再部署
vercel --prod
```

### 问题 3：网站打不开

**检查**：
- 是否使用了 `--prod` 参数
- 检查 Vercel Dashboard 中的部署状态
- 查看浏览器控制台错误

---

## 🎉 现在就开始！

打开终端，进入项目目录，运行：

```bash
cd c:\Users\SwaggyP\geo-info-app
npm install -g vercel
vercel login
vercel --prod
```

5 分钟后，您的网站就上线了！🚀

