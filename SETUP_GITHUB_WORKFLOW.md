# 🎯 GitHub + Vercel 工作流设置指南

## 📋 一次性设置（约 10 分钟）

### 步骤 1：安装 Git（5 分钟）

1. **下载 Git**：
   - 访问：https://git-scm.com/download/win
   - 下载 64-bit Git for Windows Setup
   
2. **安装**：
   - 双击安装包
   - 所有选项保持默认
   - 点击 "Next" 直到完成
   
3. **验证安装**：
   - 重启 PowerShell 或 CMD
   - 运行：`git --version`
   - 应该显示：`git version 2.x.x`

---

### 步骤 2：配置 Git（1 分钟）

打开终端，运行：

```bash
# 设置您的用户名（用于记录谁做的修改）
git config --global user.name "您的名字"

# 设置您的邮箱
git config --global user.email "your.email@example.com"
```

---

### 步骤 3：创建 GitHub 账号（2 分钟）

1. 访问：https://github.com
2. 点击 "Sign up"
3. 填写：
   - Email（邮箱）
   - Password（密码）
   - Username（用户名）
4. 验证邮箱

---

### 步骤 4：初始化项目并推送到 GitHub（2 分钟）

```bash
# 进入项目目录
cd c:\Users\SwaggyP\geo-info-app

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 第一次提交
git commit -m "Initial commit - 农业地理信息系统"
```

**在 GitHub 创建仓库**：
1. 访问：https://github.com/new
2. Repository name: `geo-info-app`
3. 选择 Public 或 Private
4. **不要勾选**任何初始化选项
5. 点击 "Create repository"

**关联并推送**：
```bash
# 关联远程仓库（替换成您的 GitHub 用户名）
git remote add origin https://github.com/您的用户名/geo-info-app.git

# 设置主分支
git branch -M main

# 推送到 GitHub
git push -u origin main
```

---

### 步骤 5：连接 Vercel（2 分钟）

1. **访问 Vercel**：https://vercel.com
2. **登录**：点击 "Continue with GitHub"
3. **授权**：允许 Vercel 访问您的 GitHub
4. **导入项目**：
   - 点击 "Add New..." → "Project"
   - 找到 `geo-info-app`
   - 点击 "Import"
5. **部署**：
   - 检查配置（通常自动检测正确）
   - 点击 "Deploy"
   - 等待 2-3 分钟

**完成！** 🎉

---

## ✨ 日常使用（每次只需 30 秒）

### 修改代码后的标准流程：

```bash
# 1. 查看修改了哪些文件
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改（附带说明信息）
git commit -m "描述您做了什么修改"

# 4. 推送到 GitHub
git push

# 5. 等待 1-2 分钟，Vercel 自动部署完成！✨
```

---

## 📝 实用的 Git 命令

### 日常使用：

```bash
# 查看当前状态
git status

# 查看修改内容
git diff

# 查看提交历史
git log

# 查看提交历史（简洁版）
git log --oneline

# 撤销未提交的修改
git checkout -- 文件名

# 查看远程仓库地址
git remote -v
```

### 分支管理（高级）：

```bash
# 创建新分支（用于开发新功能）
git checkout -b feature/新功能

# 切换分支
git checkout main

# 合并分支
git merge feature/新功能

# 删除分支
git branch -d feature/新功能
```

---

## 🎯 提交信息规范（推荐）

好的提交信息能帮助您快速找到历史修改：

```bash
# ✅ 好的提交信息
git commit -m "添加用户自定义点功能"
git commit -m "修复地图点击无响应的bug"
git commit -m "优化天气数据加载速度"
git commit -m "更新文档和部署指南"

# ❌ 不好的提交信息
git commit -m "update"
git commit -m "fix"
git commit -m "修改"
```

---

## 🔄 工作流示例

### 示例 1：添加新功能

```bash
# 1. 创建功能分支
git checkout -b feature/add-user-points

# 2. 开发功能...（修改代码）

# 3. 测试功能
npm run dev

# 4. 提交到功能分支
git add .
git commit -m "实现用户自定义添加点功能"
git push origin feature/add-user-points

# 5. 在 GitHub 创建 Pull Request
# 6. Vercel 会自动为这个 PR 创建预览部署
# 7. 测试预览部署无误后，合并到 main
# 8. Vercel 自动部署到生产环境
```

### 示例 2：紧急修复 Bug

```bash
# 1. 发现线上有 bug
git checkout -b hotfix/map-click-bug

# 2. 修复 bug
# 修改代码...

# 3. 测试
npm run dev

# 4. 提交并推送
git add .
git commit -m "修复地图点击时坐标显示错误"
git push origin hotfix/map-click-bug

# 5. 合并到 main
git checkout main
git merge hotfix/map-click-bug
git push

# 6. Vercel 自动部署，bug 修复完成！
```

---

## 🆘 常见问题

### Q1: `git push` 需要密码但密码错误

**原因**：GitHub 不再支持密码登录

**解决方案 A（推荐）**：使用 SSH 密钥
```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your.email@example.com"

# 添加到 GitHub：
# 1. 复制 ~/.ssh/id_ed25519.pub 的内容
# 2. GitHub → Settings → SSH and GPG keys → New SSH key
# 3. 粘贴密钥

# 修改远程仓库地址为 SSH
git remote set-url origin git@github.com:您的用户名/geo-info-app.git
```

**解决方案 B**：使用 Personal Access Token
```bash
# 1. GitHub → Settings → Developer settings → Personal access tokens
# 2. Generate new token → 勾选 repo 权限
# 3. 复制 token
# 4. push 时用 token 代替密码
```

### Q2: 推送失败，提示 "rejected"

**原因**：远程仓库有新提交

**解决**：
```bash
# 先拉取远程更新
git pull origin main

# 再推送
git push origin main
```

### Q3: 不小心提交了错误的代码

**解决**：
```bash
# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 或者撤销并丢弃修改
git reset --hard HEAD~1
```

---

## 💡 最佳实践

1. **频繁提交**：每完成一个小功能就提交
2. **清晰的提交信息**：说明做了什么修改
3. **测试后再推送**：确保代码能正常运行
4. **使用分支**：新功能在分支上开发，稳定后合并
5. **定期备份**：每天结束时 push 一次

---

## 🎉 总结

**初次设置**：10 分钟  
**日常使用**：30 秒（3 个命令）  
**获得收益**：终身受益！

这个工作流是**全世界开发者的标准实践**，学会后：
- ✅ 项目管理更轻松
- ✅ 永远不会丢失代码
- ✅ 可以轻松与他人协作
- ✅ 出问题能快速回滚
- ✅ 简历上的加分项

**值得投入这 10 分钟！** 🚀

