// 天气API配置
export const weatherConfig = {
  // 选择使用的天气服务提供商
  provider: 'qweather' as 'openweather' | 'qweather',
  
  // API密钥配置
  apiKeys: {
    // OpenWeatherMap API Key
    // 注册地址: https://openweathermap.org/api
    openweather: import.meta.env.VITE_OPENWEATHER_API_KEY || '',
    
    // 和风天气API Key  
    // 注册地址: https://dev.qweather.com/
    qweather: import.meta.env.VITE_QWEATHER_API_KEY || '34c29f1e5d2746e5ae89e28ef9ed1afc'
  },
  
  // 是否启用真实天气数据（false时使用模拟数据）
  useRealWeather: import.meta.env.VITE_USE_REAL_WEATHER === 'true' || true,
  
  // 备用配置
  fallbackToMock: false // API失败时不回退到模拟数据
}

// 获取当前配置的API Key
export const getCurrentApiKey = (): string => {
  return weatherConfig.apiKeys[weatherConfig.provider]
}

// 检查是否配置了API Key
export const hasApiKey = (): boolean => {
  return !!getCurrentApiKey()
}
