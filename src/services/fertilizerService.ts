import type { FertilizerAdvice, CropInfo, WeatherInfo, GeoLocation } from '@/types'

// 水肥决策服务
export class FertilizerService {
  private static instance: FertilizerService
  
  public static getInstance(): FertilizerService {
    if (!FertilizerService.instance) {
      FertilizerService.instance = new FertilizerService()
    }
    return FertilizerService.instance
  }

  // 生成水肥决策建议
  async generateAdvice(
    location: GeoLocation,
    cropInfo: CropInfo,
    weatherForecast: WeatherInfo[]
  ): Promise<FertilizerAdvice> {
    // 模拟 AI 处理延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 基于作物类型和天气条件生成建议
    const avgTemp = this.calculateAverageTemperature(weatherForecast)
    const totalPrecipitation = this.calculateTotalPrecipitation(weatherForecast)
    const avgHumidity = this.calculateAverageHumidity(weatherForecast)
    
    // 根据作物类型确定基础需求
    const baseWater = this.getBaseWaterRequirement(cropInfo.name)
    const baseFertilizer = this.getBaseFertilizerRequirement(cropInfo.name)
    
    // 根据天气调整建议
    const waterAdjustment = this.calculateWaterAdjustment(totalPrecipitation, avgTemp)
    const fertilizerAdjustment = this.calculateFertilizerAdjustment(avgTemp, avgHumidity)
    
    const waterAmount = Math.max(0, baseWater + waterAdjustment)
    const fertilizerAmount = Math.max(0, baseFertilizer + fertilizerAdjustment)
    
    return {
      waterAmount: Math.round(waterAmount * 10) / 10,
      fertilizerType: this.getFertilizerType(cropInfo.name),
      fertilizerAmount: Math.round(fertilizerAmount * 10) / 10,
      applicationMethod: this.getApplicationMethod(cropInfo.growthStage),
      timing: this.getOptimalTiming(weatherForecast),
      reason: this.generateReason(cropInfo, weatherForecast, waterAmount, fertilizerAmount)
    }
  }

  private calculateAverageTemperature(weather: WeatherInfo[]): number {
    const total = weather.reduce((sum, day) => sum + (day.temperature.min + day.temperature.max) / 2, 0)
    return total / weather.length
  }

  private calculateTotalPrecipitation(weather: WeatherInfo[]): number {
    return weather.reduce((sum, day) => sum + day.precipitation, 0)
  }

  private calculateAverageHumidity(weather: WeatherInfo[]): number {
    const total = weather.reduce((sum, day) => sum + day.humidity, 0)
    return total / weather.length
  }

  private getBaseWaterRequirement(cropType: string): number {
    const requirements: Record<string, number> = {
      '水稻': 15,
      '小麦': 8,
      '玉米': 12,
      '大豆': 10,
      '蔬菜': 6,
      '果树': 20
    }
    return requirements[cropType] || 10
  }

  private getBaseFertilizerRequirement(cropType: string): number {
    const requirements: Record<string, number> = {
      '水稻': 2.5,
      '小麦': 2.0,
      '玉米': 3.0,
      '大豆': 1.5,
      '蔬菜': 1.0,
      '果树': 4.0
    }
    return requirements[cropType] || 2.0
  }

  private calculateWaterAdjustment(precipitation: number, avgTemp: number): number {
    // 降雨量多时减少灌溉，温度高时增加灌溉
    const precipitationAdjustment = -precipitation * 0.1
    const temperatureAdjustment = (avgTemp - 20) * 0.2
    return precipitationAdjustment + temperatureAdjustment
  }

  private calculateFertilizerAdjustment(avgTemp: number, avgHumidity: number): number {
    // 温度适宜时增加施肥，湿度过高时减少施肥
    const temperatureAdjustment = (avgTemp - 20) * 0.05
    const humidityAdjustment = (avgHumidity - 70) * -0.02
    return temperatureAdjustment + humidityAdjustment
  }

  private getFertilizerType(cropType: string): string {
    const types: Record<string, string> = {
      '水稻': '复合肥(NPK 15-15-15)',
      '小麦': '氮肥 + 磷肥',
      '玉米': '复合肥(NPK 20-10-10)',
      '大豆': '有机肥 + 钾肥',
      '蔬菜': '水溶性肥料',
      '果树': '缓释肥 + 微量元素'
    }
    return types[cropType] || '复合肥'
  }

  private getApplicationMethod(growthStage: string): string {
    const methods: Record<string, string> = {
      '苗期': '根部施肥',
      '生长期': '叶面喷施 + 根部施肥',
      '开花期': '叶面喷施',
      '结果期': '根部施肥 + 叶面喷施',
      '成熟期': '减少施肥'
    }
    return methods[growthStage] || '根部施肥'
  }

  private getOptimalTiming(weather: WeatherInfo[]): string {
    // 选择未来3天内降雨概率最低的日期
    const bestDay = weather.slice(0, 3).reduce((best, current) => 
      current.precipitation < best.precipitation ? current : best
    )
    return `建议在${bestDay.date} 进行施肥，当天降雨量较少`
  }

  private generateReason(
    cropInfo: CropInfo,
    weather: WeatherInfo[],
    waterAmount: number,
    fertilizerAmount: number
  ): string {
    const avgTemp = this.calculateAverageTemperature(weather)
    const totalPrecipitation = this.calculateTotalPrecipitation(weather)
    
    return `基于${cropInfo.name}的${cropInfo.growthStage}阶段，结合未来7天平均温度${avgTemp.toFixed(1)}°C和总降雨量${totalPrecipitation.toFixed(1)}mm的天气条件，建议灌溉${waterAmount}升/平方米，施用${fertilizerAmount}公斤/亩的肥料，以确保作物健康生长。`
  }
}