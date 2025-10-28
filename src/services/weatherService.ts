import axios from 'axios'
import type { WeatherInfo, GeoLocation } from '@/types'
import { RealWeatherService } from './realWeatherService'
import { weatherConfig, hasApiKey } from '@/config/weatherConfig'

// 天气服务（支持真实和模拟数据）
export class WeatherService {
  private static instance: WeatherService
  private realWeatherService: RealWeatherService
  
  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService()
    }
    return WeatherService.instance
  }
  
  private constructor() {
    this.realWeatherService = RealWeatherService.getInstance()
    
    // 如果配置了API Key，初始化真实天气服务
    if (hasApiKey()) {
      this.realWeatherService.setApiConfig(
        weatherConfig.apiKeys[weatherConfig.provider],
        weatherConfig.provider
      )
    }
  }

  // 获取未来7天天气信息
  async getWeatherForecast(location: GeoLocation): Promise<WeatherInfo[]> {
    // 如果启用了真实天气数据且有API Key，使用真实API
    if (weatherConfig.useRealWeather && hasApiKey()) {
      console.log('使用真实天气API获取数据...')
      return await this.realWeatherService.getWeatherForecast(location, weatherConfig.provider)
    }
    
    // 如果没有配置API Key，抛出错误
    throw new Error('未配置天气API密钥，请先配置和风天气API密钥')
  }
  
  // 获取模拟天气数据
  private async getMockWeatherData(location: GeoLocation): Promise<WeatherInfo[]> {
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟天气数据
    const weatherData: WeatherInfo[] = []
    const baseDate = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000)
      
      // 基于地理位置和日期生成相对稳定的天气数据
      const latFactor = Math.sin(location.lat * Math.PI / 180)
      const lngFactor = Math.cos(location.lng * Math.PI / 180)
      const dayFactor = Math.sin((date.getTime() / (24 * 60 * 60 * 1000)) * Math.PI / 180)
      
      const baseTemp = 20 + latFactor * 10 + lngFactor * 5 + dayFactor * 3
      const tempVariation = 5 + Math.abs(latFactor) * 3
      
      weatherData.push({
        date: date.toISOString().split('T')[0],
        temperature: {
          min: Math.round((baseTemp - tempVariation) * 10) / 10,
          max: Math.round((baseTemp + tempVariation) * 10) / 10
        },
        precipitation: Math.max(0, Math.round((Math.random() * 10 + latFactor * 5) * 10) / 10),
        humidity: Math.round(60 + Math.random() * 30 + lngFactor * 10),
        windSpeed: Math.round((5 + Math.random() * 10 + dayFactor * 3) * 10) / 10,
        description: this.getWeatherDescription(baseTemp, Math.random())
      })
    }
    
    return weatherData
  }
  
  private getWeatherDescription(temp: number, random: number): string {
    if (random < 0.3) return '晴天'
    if (random < 0.6) return '多云'
    if (random < 0.8) return '阴天'
    return '小雨'
  }
}