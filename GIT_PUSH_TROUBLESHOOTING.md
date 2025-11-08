# 🔧 Git Push 连接问题解决方案

## 问题描述

```
fatal: unable to access 'https://github.com/kawhill/-2.git/': 
Recv failure: Connection was reset
或
Failed to connect to github.com port 443 after 21065 ms: Could not connect to server
```

## ✅ 已尝试的解决方案

我已经为你配置了以下 Git 设置：
- ✅ 增加 HTTP 缓冲区大小
- ✅ 降低速度限制
- ✅ 增加超时时间
- ✅ 使用 HTTP/1.1 协议

## 🔄 其他解决方案

### 方案 1：使用 SSH 连接（推荐）

如果 HTTPS 连接不稳定，可以改用 SSH：

1. **检查是否已有 SSH 密钥**：
```bash
ls -al ~/.ssh
```

2. **如果没有，生成 SSH 密钥**：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

3. **添加 SSH 密钥到 GitHub**：
   - 复制公钥内容：`cat ~/.ssh/id_ed25519.pub`
   - 登录 GitHub → Settings → SSH and GPG keys → New SSH key
   - 粘贴公钥并保存

4. **更改远程仓库地址为 SSH**：
```bash
git remote set-url origin git@github.com:kawhill/-2.git
```

5. **测试连接**：
```bash
ssh -T git@github.com
```

6. **再次推送**：
```bash
git push
```

---

### 方案 2：配置代理（如果你使用代理）

如果你在使用代理，需要配置 Git：

```bash
# HTTP 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080

# SOCKS5 代理
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

### 方案 3：使用 GitHub Desktop（图形界面）

如果命令行一直有问题，可以使用 GitHub Desktop：

1. 下载安装：https://desktop.github.com/
2. 登录 GitHub 账号
3. 打开项目文件夹
4. 点击 "Push origin" 按钮

---

### 方案 4：检查网络和防火墙

1. **检查网络连接**：
   - 确保能正常访问 https://github.com
   - 尝试 ping github.com

2. **检查防火墙设置**：
   - Windows 防火墙可能阻止了 Git
   - 临时关闭防火墙测试

3. **检查公司/学校网络**：
   - 某些网络可能阻止了 GitHub 访问
   - 尝试使用手机热点

---

### 方案 5：使用 VPN

如果网络环境限制访问 GitHub，可以使用 VPN：
- 连接 VPN 后再尝试 `git push`

---

### 方案 6：分批推送（如果文件很大）

如果项目文件很大，可以尝试：

```bash
# 先推送当前分支
git push origin HEAD

# 或者只推送最近的提交
git push origin HEAD~1:main
```

---

### 方案 7：使用 GitHub CLI

安装 GitHub CLI 后，可以使用更稳定的连接：

```bash
# 安装 GitHub CLI
# Windows: winget install GitHub.cli
# 或下载：https://cli.github.com/

# 登录
gh auth login

# 推送
git push
```

---

## 🧪 测试连接

在尝试推送前，可以先测试连接：

```bash
# 测试 HTTPS 连接
curl -I https://github.com

# 测试 SSH 连接（如果配置了 SSH）
ssh -T git@github.com
```

---

## 📞 如果以上方案都不行

1. **检查 Git 版本**：
```bash
git --version
```
建议使用最新版本。

2. **重新配置远程仓库**：
```bash
git remote remove origin
git remote add origin https://github.com/kawhill/-2.git
git push -u origin main
```

3. **联系网络管理员**（如果在公司/学校网络）

---

## 💡 推荐方案

**最推荐的解决方案是使用 SSH 连接**，因为：
- ✅ 更稳定
- ✅ 不需要每次输入密码
- ✅ 不受 HTTPS 连接问题影响

按照"方案 1"的步骤操作即可。

