# 天气API配置指南

## 获取真实天气数据的步骤

### 1. 选择天气服务提供商

#### OpenWeatherMap (推荐)
- **注册地址**: https://openweathermap.org/api
- **免费额度**: 1000次调用/月
- **特点**: 全球数据，API简单，支持中文

#### 和风天气 (国内推荐)
- **注册地址**: https://dev.qweather.com/
- **免费额度**: 1000次调用/天
- **特点**: 国内数据准确，中文支持好

### 2. 配置API密钥

#### 方法一：环境变量配置
1. 在项目根目录创建 `.env.local` 文件
2. 添加以下配置：

```bash
# 是否使用真实天气数据
VITE_USE_REAL_WEATHER=true

# OpenWeatherMap API Key
VITE_OPENWEATHER_API_KEY=your_api_key_here

# 和风天气API Key
VITE_QWEATHER_API_KEY=your_api_key_here
```

#### 方法二：直接修改配置文件
修改 `src/config/weatherConfig.ts` 文件：

```typescript
export const weatherConfig = {
  provider: 'openweather', // 或 'qweather'
  useRealWeather: true,
  apiKeys: {
    openweather: 'your_openweather_api_key',
    qweather: 'your_qweather_api_key'
  }
}
```

### 3. 重启应用
配置完成后重启开发服务器：
```bash
npm run dev
```

### 4. 验证配置
打开浏览器控制台，点击地图查看天气数据：
- 如果看到 "使用真实天气API获取数据..." 说明配置成功
- 如果看到 "使用模拟天气数据..." 说明仍在使用模拟数据

## 故障排除

### 常见问题
1. **API Key无效**: 检查密钥是否正确复制
2. **超出免费额度**: 等待下个周期或升级付费计划
3. **网络问题**: 检查网络连接和防火墙设置
4. **API调用失败**: 查看控制台错误信息

### 回退机制
如果真实API调用失败，系统会自动回退到模拟数据，确保应用正常运行。

## API服务对比

| 服务商 | 免费额度 | 数据质量 | 中文支持 | 推荐度 |
|--------|----------|----------|----------|--------|
| OpenWeatherMap | 1000次/月 | 高 | 好 | ⭐⭐⭐⭐⭐ |
| 和风天气 | 1000次/天 | 高 | 很好 | ⭐⭐⭐⭐⭐ |
| AccuWeather | 50次/天 | 很高 | 一般 | ⭐⭐⭐ |
