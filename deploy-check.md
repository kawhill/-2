# 🔍 部署前检查清单

## 第一步：本地测试

打开终端（PowerShell 或 CMD），在项目目录下运行：

```bash
# 1. 确保依赖已安装
npm install

# 2. 运行类型检查
npm run type-check

# 3. 测试构建
npm run build

# 4. 预览构建结果
npm run preview
```

✅ 如果上述命令都成功执行，说明项目准备就绪！

## 第二步：检查文件

确保以下文件存在：

- ✅ `vercel.json` - Vercel 配置文件
- ✅ `.vercelignore` - 忽略文件配置
- ✅ `package.json` - 包含正确的 build 脚本
- ✅ `vite.config.ts` - Vite 配置正确

## 第三步：Git 准备（如果使用 GitHub 部署）

```bash
# 查看当前状态
git status

# 添加新文件
git add vercel.json .vercelignore vite.config.ts

# 提交更改
git commit -m "配置 Vercel 部署"

# 推送到 GitHub
git push
```

## 第四步：开始部署

### 方式A：通过 Vercel 网站（推荐新手）

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入您的 GitHub 仓库
5. 点击 "Deploy"
6. 等待部署完成（约2-3分钟）

### 方式B：通过命令行（推荐熟练用户）

```bash
# 安装 Vercel CLI（全局安装一次即可）
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

## 预期结果

✅ 部署成功后，您会获得一个网址，类似：
- `https://geo-info-app-xxx.vercel.app`

✅ 访问这个网址，应该看到：
- 地图正常显示
- 可以点击地图获取信息
- 城市搜索功能正常
- 导入的点标记显示正常

## 常见问题

### Q1: 构建时出现 TypeScript 错误

**解决方案**：
```bash
# 忽略类型检查，仅构建
vite build
```

或修改 package.json 的 build 命令：
```json
"build": "vite build"
```

### Q2: 部署后页面空白

**检查**：
- 浏览器控制台是否有错误
- 检查网络请求是否都成功
- 确认 `index.html` 在项目根目录

### Q3: 地图不显示

**可能原因**：
- Leaflet CSS 未正确加载
- 网络问题导致地图瓦片加载失败

**解决方案**：检查浏览器控制台的错误信息

## 部署完成后的操作

1. **测试所有功能**
   - 地图交互
   - 城市搜索
   - 点击获取信息
   - 天气数据

2. **分享您的网站**
   - 复制 Vercel 提供的网址
   - 分享给朋友或同事

3. **配置自定义域名**（可选）
   - 在 Vercel 项目设置中添加域名
   - 按照提示配置 DNS

## 🎉 恭喜！

如果一切顺利，您的网站现在已经在线上运行了！

