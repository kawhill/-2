import axios from 'axios'
import type { WeatherInfo, GeoLocation } from '@/types'

// 真实天气API服务
export class RealWeatherService {
  private static instance: RealWeatherService
  private apiKey: string = ''
  private baseUrl: string = ''
  
  public static getInstance(): RealWeatherService {
    if (!RealWeatherService.instance) {
      RealWeatherService.instance = new RealWeatherService()
    }
    return RealWeatherService.instance
  }
  
  // 设置API配置
  public setApiConfig(apiKey: string, provider: 'openweather' | 'qweather' = 'openweather') {
    this.apiKey = apiKey
    
    switch (provider) {
      case 'openweather':
        this.baseUrl = 'https://api.openweathermap.org/data/2.5'
        break
      case 'qweather':
        this.baseUrl = 'https://ma6hex5x37.re.qweatherapi.com/v7'
        break
    }
  }
  
  // 使用OpenWeatherMap API获取天气数据
  async getWeatherForecastOpenWeather(location: GeoLocation): Promise<WeatherInfo[]> {
    if (!this.apiKey) {
      throw new Error('请先设置OpenWeatherMap API Key')
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat: location.lat,
          lon: location.lng,
          appid: this.apiKey,
          units: 'metric', // 使用摄氏度
          lang: 'zh_cn' // 中文
        }
      })
      
      const forecastData = response.data.list
      const weatherData: WeatherInfo[] = []
      
      // 按天分组数据（OpenWeatherMap返回5天每3小时的数据）
      const dailyData: { [key: string]: any[] } = {}
      
      forecastData.forEach((item: any) => {
        const date = item.dt_txt.split(' ')[0]
        if (!dailyData[date]) {
          dailyData[date] = []
        }
        dailyData[date].push(item)
      })
      
      // 处理每天的数据
      Object.keys(dailyData).forEach(date => {
        const dayData = dailyData[date]
        const temps = dayData.map(item => item.main.temp)
        const precipitations = dayData.map(item => item.rain?.['3h'] || 0)
        const humidities = dayData.map(item => item.main.humidity)
        const windSpeeds = dayData.map(item => item.wind.speed)
        
        weatherData.push({
          date: date,
          temperature: {
            min: Math.round(Math.min(...temps) * 10) / 10,
            max: Math.round(Math.max(...temps) * 10) / 10
          },
          precipitation: Math.round(precipitations.reduce((a, b) => a + b, 0) * 10) / 10,
          humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
          windSpeed: Math.round(windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length * 10) / 10,
          description: this.translateWeatherDescription(dayData[0].weather[0].description)
        })
      })
      
      return weatherData.slice(0, 7) // 返回最多7天
    } catch (error) {
      console.error('获取OpenWeatherMap天气数据失败:', error)
      throw error
    }
  }
  
  // 使用和风天气API获取天气数据
  async getWeatherForecastQWeather(location: GeoLocation): Promise<WeatherInfo[]> {
    if (!this.apiKey) {
      throw new Error('请先设置和风天气API Key')
    }
    
    try {
      console.log('调用和风天气API，位置:', location)
      console.log('API Key:', this.apiKey.substring(0, 8) + '...')
      console.log('请求URL:', `${this.baseUrl}/weather/7d`)
      
      // 直接使用经纬度获取7天天气预报，不需要先获取城市ID
      const weatherResponse = await axios.get(`${this.baseUrl}/weather/7d`, {
        params: {
          location: `${location.lng},${location.lat}`,
          key: this.apiKey
        }
      })
      
      console.log('和风天气API响应:', weatherResponse.data)
      
      if (!weatherResponse.data.daily || weatherResponse.data.daily.length === 0) {
        throw new Error('未获取到天气数据')
      }
      
      const forecastData = weatherResponse.data.daily
      const weatherData: WeatherInfo[] = []
      
      forecastData.forEach((item: any) => {
        weatherData.push({
          date: item.fxDate,
          temperature: {
            min: parseInt(item.tempMin),
            max: parseInt(item.tempMax)
          },
          precipitation: parseFloat(item.precip || 0),
          humidity: parseInt(item.humidity || 0),
          windSpeed: parseFloat(item.windSpeed || 0),
          description: item.textDay || '未知'
        })
      })
      
      console.log('解析后的天气数据:', weatherData)
      return weatherData
    } catch (error) {
      console.error('获取和风天气数据失败:', error)
      if (error.response) {
        console.error('响应状态:', error.response.status)
        console.error('响应数据:', error.response.data)
        
        // 如果是403错误，提供具体的解决建议
        if (error.response.status === 403) {
          console.error('403错误可能的原因:')
          console.error('1. API密钥无效或未激活')
          console.error('2. 超出免费请求额度')
          console.error('3. IP白名单限制')
          console.error('4. API密钥权限不足')
          console.error('请检查: https://dev.qweather.com/')
        }
      }
      throw error
    }
  }
  
  // 翻译天气描述
  private translateWeatherDescription(description: string): string {
    const translations: { [key: string]: string } = {
      'clear sky': '晴天',
      'few clouds': '少云',
      'scattered clouds': '多云',
      'broken clouds': '阴天',
      'shower rain': '阵雨',
      'rain': '雨天',
      'thunderstorm': '雷雨',
      'snow': '雪天',
      'mist': '薄雾',
      'fog': '雾天',
      'haze': '霾'
    }
    
    return translations[description.toLowerCase()] || description
  }
  
  // 通用获取天气方法
  async getWeatherForecast(location: GeoLocation, provider: 'openweather' | 'qweather' = 'openweather'): Promise<WeatherInfo[]> {
    switch (provider) {
      case 'openweather':
        return this.getWeatherForecastOpenWeather(location)
      case 'qweather':
        return this.getWeatherForecastQWeather(location)
      default:
        throw new Error('不支持的天气服务提供商')
    }
  }
}

// 使用示例和配置说明
export const WeatherConfig = {
  // OpenWeatherMap配置
  openweather: {
    apiKey: 'YOUR_OPENWEATHER_API_KEY', // 替换为您的API Key
    signupUrl: 'https://openweathermap.org/api',
    freeLimit: '1000 calls/month'
  },
  
  // 和风天气配置
  qweather: {
    apiKey: 'YOUR_QWEATHER_API_KEY', // 替换为您的API Key
    signupUrl: 'https://dev.qweather.com/',
    freeLimit: '1000 calls/day'
  }
}
