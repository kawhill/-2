# 🚀 日常更新指南（自动部署版）

## ✅ 您已设置

- ✅ GitHub 仓库已创建
- ✅ 代码已推送到 GitHub
- ✅ Netlify 已连接到 GitHub
- ✅ 自动部署已启用

---

## 🎯 修改代码后的标准流程

### 完整版（推荐新手）

```bash
# 1. 查看修改了哪些文件
git status

# 2. 查看具体修改内容（可选）
git diff

# 3. 添加所有修改
git add .

# 4. 提交修改（附带说明）
git commit -m "修改了 Sidebar 组件的样式"

# 5. 推送到 GitHub
git push

# 6. 完成！等待 1-2 分钟自动部署
```

### 简化版（熟练后）

```bash
git add .
git commit -m "描述修改内容"
git push
```

---

## 📝 提交信息示例

### ✅ 好的提交信息

```bash
git commit -m "添加用户自定义点功能"
git commit -m "修复地图点击无响应的bug"
git commit -m "优化 Sidebar 组件布局"
git commit -m "更新天气 API 配置"
git commit -m "调整地图默认缩放级别"
```

### ❌ 不好的提交信息

```bash
git commit -m "update"
git commit -m "fix"
git commit -m "修改"
git commit -m "aaa"
```

**为什么要写清楚**：
- 方便以后查找历史记录
- 知道每次改了什么
- 团队协作时别人能看懂

---

## 🔍 常用 Git 命令

### 查看状态

```bash
# 查看修改了哪些文件
git status

# 查看具体修改内容
git diff

# 查看某个文件的修改
git diff src/components/Sidebar.vue
```

### 提交历史

```bash
# 查看提交历史（完整）
git log

# 查看提交历史（简洁）
git log --oneline

# 查看最近 5 次提交
git log -5

# 查看某个文件的修改历史
git log --follow src/components/Sidebar.vue
```

### 撤销操作

```bash
# 撤销工作区的修改（还未 git add）
git checkout -- 文件名

# 撤销暂存区的文件（已 git add，但未 commit）
git reset HEAD 文件名

# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 修改最后一次提交信息
git commit --amend -m "新的提交信息"
```

### 分支操作（高级）

```bash
# 创建新分支
git checkout -b feature/新功能

# 切换分支
git checkout main

# 查看所有分支
git branch -a

# 合并分支
git merge feature/新功能

# 删除分支
git branch -d feature/新功能
```

---

## 🎬 实际操作示例

### 示例 1：修改了 Sidebar 组件

```bash
# 在编辑器中修改 src/components/Sidebar.vue
# 保存文件

# 在终端运行（确保在项目目录）
cd c:\Users\SwaggyP\geo-info-app

# 查看状态
git status
# 输出：modified:   src/components/Sidebar.vue

# 添加修改
git add .

# 提交
git commit -m "优化 Sidebar 组件的布局和样式"

# 推送
git push

# 完成！等待 Netlify 自动部署
```

### 示例 2：同时修改了多个文件

```bash
# 修改了多个文件后

# 查看所有修改
git status

# 添加所有修改
git add .

# 提交
git commit -m "添加用户点管理功能，更新了 3 个组件"

# 推送
git push
```

### 示例 3：只提交部分文件

```bash
# 只想提交 Sidebar.vue，不提交其他修改

# 添加特定文件
git add src/components/Sidebar.vue

# 提交
git commit -m "更新 Sidebar 样式"

# 推送
git push
```

---

## 🔔 查看部署状态

### 方式 1：Netlify Dashboard

1. 访问：https://app.netlify.com
2. 选择您的项目
3. 点击 "Deploys" 标签
4. 查看部署状态：
   - 🟡 Building（正在构建）
   - 🟢 Published（部署成功）
   - 🔴 Failed（部署失败）

### 方式 2：GitHub 仓库

1. 访问您的 GitHub 仓库
2. 查看最新 commit 旁边的状态图标
3. ✅ 绿色对勾 = 部署成功
4. 🔴 红色叉号 = 部署失败
5. 🟡 黄色圆圈 = 正在部署

---

## ⏰ 部署时间线

```
修改代码并保存
    ↓
git add . && git commit -m "xxx" && git push
    ↓ (5-10 秒)
GitHub 收到推送
    ↓ (自动触发)
Netlify 检测到更新
    ↓ (10-30 秒)
Netlify 开始构建
    ↓ (1-2 分钟)
构建完成，自动部署
    ↓
✨ 网站更新完成！
```

**总耗时**：通常 2-3 分钟

---

## 🆘 遇到问题怎么办

### 问题 1：push 被拒绝

**错误信息**：
```
! [rejected]        main -> main (fetch first)
```

**原因**：远程仓库有新内容

**解决**：
```bash
# 先拉取远程更新
git pull origin main

# 如果有冲突，解决冲突后
git add .
git commit -m "合并远程更新"

# 再推送
git push
```

### 问题 2：部署失败

**步骤**：
1. 访问 Netlify Dashboard
2. 点击失败的部署
3. 查看 "Deploy log"
4. 查找错误信息

**常见原因**：
- 构建命令错误
- 依赖安装失败
- 代码语法错误

**解决**：
```bash
# 本地测试构建
npm run build

# 如果本地成功，检查 Netlify 设置
# 如果本地失败，修复错误后重新提交
```

### 问题 3：网站没有更新

**检查**：
1. Netlify 部署状态是否为 "Published"
2. 浏览器强制刷新（Ctrl + F5）
3. 清除浏览器缓存

### 问题 4：想回滚到之前的版本

**在 Netlify Dashboard**：
1. Deploys → 找到之前的成功部署
2. 点击 "Publish deploy"
3. 10 秒内回滚完成

**或者用 Git**：
```bash
# 查看历史
git log --oneline

# 回退到某个版本（保留修改）
git reset --soft 提交ID

# 或硬回退（丢弃修改）
git reset --hard 提交ID

# 强制推送（⚠️ 谨慎使用）
git push -f
```

---

## 💡 最佳实践

### 1. 提交频率
✅ **经常提交**：每完成一个小功能就提交
❌ **不要**：攒了一堆修改才提交一次

### 2. 提交信息
✅ **清晰明确**：说明做了什么修改
❌ **不要**：写 "update" 或 "fix"

### 3. 推送前测试
✅ **先本地测试**：`npm run dev` 确认功能正常
❌ **不要**：直接推送未测试的代码

### 4. 分支使用
✅ **大功能用分支**：新功能在分支上开发
✅ **主分支保持稳定**：main 分支总是可用的版本

---

## 📋 快速参考卡片

```
┌─────────────────────────────────┐
│  修改代码后更新网站（自动部署） │
├─────────────────────────────────┤
│ git add .                       │
│ git commit -m "描述修改"        │
│ git push                        │
│                                 │
│ ✨ 等待 2-3 分钟自动部署        │
└─────────────────────────────────┘
```

---

## 🎯 今天就试试

修改 `src/components/Sidebar.vue` 后：

```bash
cd c:\Users\SwaggyP\geo-info-app
git add .
git commit -m "测试自动部署功能"
git push
```

然后访问 Netlify Dashboard 看部署过程！

---

## 🚀 高级技巧

### 创建命令别名（可选）

为了更快，可以创建别名：

**在 PowerShell 中**：
```powershell
# 编辑 PowerShell 配置
notepad $PROFILE

# 添加这些行：
function gp { git add . ; git commit -m $args[0] ; git push }

# 保存后，以后只需：
gp "修改了 Sidebar"
# 就会自动执行 add、commit、push
```

### 使用 Git GUI 工具（可选）

如果不喜欢命令行，可以使用图形界面：

- **GitHub Desktop**：https://desktop.github.com
- **Sourcetree**：https://www.sourcetreeapp.com
- **VS Code 内置 Git**：直接在编辑器中操作

---

## ✅ 检查清单

每次更新前确认：

- [ ] 代码已修改并保存
- [ ] 本地测试通过（`npm run dev`）
- [ ] 写好了提交信息
- [ ] 推送到 GitHub
- [ ] 等待部署完成
- [ ] 访问网站验证

---

## 🎉 恭喜！

您现在拥有了现代化的开发工作流！

- ✅ 修改代码 → 3 个命令 → 自动部署
- ✅ 完整的版本历史
- ✅ 一键回滚
- ✅ 代码自动备份

**享受自动部署带来的便利吧！** 🚀

