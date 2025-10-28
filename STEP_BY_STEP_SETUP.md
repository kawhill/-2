# 🎯 GitHub + Vercel 设置 - 一步步完成

## ✅ 当前进度

- [ ] 步骤 1：安装 Git
- [ ] 步骤 2：配置 Git
- [ ] 步骤 3：创建 GitHub 账号
- [ ] 步骤 4：初始化项目
- [ ] 步骤 5：推送到 GitHub
- [ ] 步骤 6：连接 Vercel
- [ ] 步骤 7：完成部署

---

## 📦 步骤 1：安装 Git

### 下载 Git

1. **打开浏览器**，访问：
   ```
   https://git-scm.com/download/win
   ```

2. **下载会自动开始**
   - 文件名类似：`Git-2.43.0-64-bit.exe`
   - 大小约：50 MB
   - 等待下载完成

### 安装 Git

3. **双击下载的安装包**

4. **安装向导** - 按以下步骤操作：
   
   ```
   页面 1: Information
   → 点击 [Next]
   
   页面 2: Select Destination Location
   → 保持默认路径
   → 点击 [Next]
   
   页面 3: Select Components
   → 保持默认选项
   → 点击 [Next]
   
   页面 4: Select Start Menu Folder
   → 保持默认
   → 点击 [Next]
   
   页面 5: Choosing the default editor
   → 保持默认（或选择 Visual Studio Code 如果您安装了）
   → 点击 [Next]
   
   页面 6: Adjusting the name of the initial branch
   → 选择 "Override the default branch name for new repositories"
   → 输入：main
   → 点击 [Next]
   
   页面 7: Adjusting your PATH environment
   → 选择 "Git from the command line and also from 3rd-party software"
   → 点击 [Next]
   
   页面 8-13: 其他设置
   → 全部保持默认，一直点击 [Next]
   
   最后一页:
   → 点击 [Install]
   → 等待安装完成
   → 取消勾选 "View Release Notes"
   → 点击 [Finish]
   ```

### 验证安装

5. **重新打开 PowerShell 或 CMD**（必须重新打开！）

6. **运行以下命令验证**：
   ```bash
   git --version
   ```
   
   应该显示类似：
   ```
   git version 2.43.0.windows.1
   ```

✅ **如果看到版本号，说明安装成功！**

---

## ⚙️ 步骤 2：配置 Git

安装完成后，需要告诉 Git 您是谁。

### 打开终端

在项目目录 `c:\Users\SwaggyP\geo-info-app` 右键 → "在终端中打开"

或者打开 PowerShell 后运行：
```bash
cd c:\Users\SwaggyP\geo-info-app
```

### 配置用户信息

```bash
# 设置您的名字（可以用中文）
git config --global user.name "您的名字"

# 设置您的邮箱（建议用真实邮箱）
git config --global user.email "your.email@example.com"

# 验证配置
git config --global --list
```

应该显示：
```
user.name=您的名字
user.email=your.email@example.com
```

✅ **配置完成！**

---

## 🌐 步骤 3：创建 GitHub 账号

### 注册 GitHub

1. **访问**：https://github.com

2. **点击右上角 "Sign up"**

3. **填写注册信息**：
   ```
   Enter your email: 输入您的邮箱
   → 点击 [Continue]
   
   Create a password: 设置密码（至少15个字符，或8个字符+数字和符号）
   → 点击 [Continue]
   
   Enter a username: 设置用户名（字母、数字、连字符）
   → 点击 [Continue]
   
   Email preferences: 选择是否接收邮件
   → 建议选 "n"（不接收）
   → 点击 [Continue]
   ```

4. **验证您不是机器人**
   - 完成验证码挑战

5. **点击 "Create account"**

6. **验证邮箱**
   - 去您的邮箱查看 GitHub 发送的验证邮件
   - 点击邮件中的验证链接或输入验证码

7. **完成设置**
   - 可以跳过问卷调查
   - 选择 Free 免费计划

✅ **GitHub 账号创建完成！**

---

## 📂 步骤 4：初始化 Git 仓库

回到 PowerShell，确保在项目目录：

```bash
# 确认当前目录
pwd
# 应该显示：C:\Users\SwaggyP\geo-info-app

# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 查看将要提交的文件
git status

# 第一次提交
git commit -m "Initial commit - 农业地理信息系统"
```

您会看到类似输出：
```
[main (root-commit) abc1234] Initial commit - 农业地理信息系统
 XX files changed, XXXX insertions(+)
 create mode 100644 package.json
 create mode 100644 vite.config.ts
 ...
```

✅ **本地仓库创建完成！**

---

## 📤 步骤 5：推送到 GitHub

### 在 GitHub 创建远程仓库

1. **登录 GitHub**：https://github.com

2. **点击右上角的 "+" 号** → 选择 "New repository"

3. **填写仓库信息**：
   ```
   Repository name: geo-info-app
   Description: 农业地理信息决策系统
   
   选择：
   ○ Public  (推荐，可以分享给别人)
   ○ Private (如果想保密)
   
   ⚠️ 重要！不要勾选以下任何选项：
   ☐ Add a README file
   ☐ Add .gitignore
   ☐ Choose a license
   ```

4. **点击 "Create repository"**

### 关联本地仓库到 GitHub

创建完成后，GitHub 会显示一些命令。

**复制您的仓库地址**（类似）：
```
https://github.com/您的用户名/geo-info-app.git
```

**在 PowerShell 中运行**（替换成您的用户名）：

```bash
# 关联远程仓库
git remote add origin https://github.com/您的用户名/geo-info-app.git

# 设置主分支名称
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 首次推送可能需要登录

**会弹出登录窗口**：
- 选择 "Browser/Device" 或 "Token"
- 按照提示完成登录

**或者在终端输入**：
- Username: 您的 GitHub 用户名
- Password: 需要使用 Personal Access Token（不是密码）

**创建 Token**（如果需要）：
1. GitHub → 右上角头像 → Settings
2. 左侧最下方 → Developer settings
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. Note: `vercel-deployment`
6. 勾选：`repo` (所有子选项)
7. 点击 "Generate token"
8. **复制 token**（只显示一次！保存好）
9. 在终端粘贴作为密码

✅ **推送成功！**

刷新 GitHub 仓库页面，应该能看到所有文件了！

---

## 🚀 步骤 6：连接 Vercel

### 登录 Vercel

1. **访问**：https://vercel.com

2. **点击 "Sign Up" 或 "Login"**

3. **选择 "Continue with GitHub"**
   - 会跳转到 GitHub 授权页面
   - 点击 "Authorize Vercel"
   - 可能需要输入 GitHub 密码确认

4. **授权成功**，自动返回 Vercel Dashboard

### 导入项目

5. **点击 "Add New..."** → 选择 "Project"

6. **导入 Git 仓库**
   - 在列表中找到 `geo-info-app`
   - 如果看不到，点击 "Adjust GitHub App Permissions"
   - 点击仓库右侧的 "Import" 按钮

7. **配置项目**（Vercel 会自动检测）
   
   应该自动显示：
   ```
   Framework Preset: Vite ✅
   Root Directory: ./
   Build Command: npm run build ✅
   Output Directory: dist ✅
   Install Command: npm install ✅
   ```
   
   **无需修改！** 直接点击 "Deploy"

8. **等待部署**
   - 显示部署进度
   - 大约 2-3 分钟
   - 可以点击 "Building" 查看详细日志

### 部署成功！

9. **看到庆祝动画**：🎉

10. **获得网站地址**：
    ```
    https://geo-info-app-xxx.vercel.app
    ```

11. **点击 "Visit" 或 "Continue to Dashboard"**

✅ **部署完成！您的网站已经上线！**

---

## 🎉 步骤 7：测试您的网站

### 访问网站

1. 复制 Vercel 提供的网址
2. 在浏览器中打开
3. 测试功能：
   - ✅ 地图是否正常显示
   - ✅ 点击地图是否有反应
   - ✅ 城市搜索是否工作
   - ✅ 导入的点是否显示

### 分享网站

现在您可以把网址分享给任何人！

---

## 🔄 日常使用：修改代码后更新网站

以后修改代码，只需 3 个命令：

```bash
# 1. 添加修改
git add .

# 2. 提交修改（说明做了什么）
git commit -m "描述您的修改"

# 3. 推送到 GitHub
git push

# 4. 等待 1-2 分钟，Vercel 自动部署！✨
```

就这么简单！

---

## 📊 完成检查清单

请确认以下所有项目都完成：

- [ ] Git 已安装并配置
- [ ] GitHub 账号已创建
- [ ] 本地仓库已初始化
- [ ] 代码已推送到 GitHub
- [ ] Vercel 已连接 GitHub
- [ ] 项目已成功部署
- [ ] 网站可以正常访问

---

## 🆘 遇到问题？

### 常见问题快速解决

**问题 1：git 命令找不到**
```bash
# 解决：重启终端
# 或者重新安装 Git
```

**问题 2：推送时要求密码**
```bash
# 使用 Personal Access Token 而不是密码
# 参考步骤 5 中的 Token 创建说明
```

**问题 3：Vercel 找不到仓库**
```bash
# 1. 检查仓库是否推送成功（刷新 GitHub 页面）
# 2. 在 Vercel 中点击 "Adjust GitHub App Permissions"
# 3. 给 Vercel 授权访问该仓库
```

**问题 4：部署失败**
```bash
# 1. 查看 Vercel 的构建日志
# 2. 确保本地 npm run build 能成功
# 3. 检查 vercel.json 配置
```

---

## 🎊 恭喜！

您已经成功设置了现代化的开发和部署工作流！

从现在开始：
- ✅ 修改代码后自动部署
- ✅ 完整的版本历史记录
- ✅ 可以随时回滚到之前的版本
- ✅ 代码自动备份到云端
- ✅ 可以与他人协作开发

**您学会了全世界开发者都在用的标准工作流！** 🚀

