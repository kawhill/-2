import type { GeoLocation } from '@/types'

// 海拔信息服务
export class ElevationService {
  private static instance: ElevationService
  
  public static getInstance(): ElevationService {
    if (!ElevationService.instance) {
      ElevationService.instance = new ElevationService()
    }
    return ElevationService.instance
  }

  // 获取指定位置的海拔高度
  async getElevation(location: GeoLocation): Promise<number> {
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 模拟海拔数据 - 基于经纬度生成相对稳定的海拔值
    const baseElevation = 100
    const latVariation = Math.sin(location.lat * Math.PI / 180) * 500
    const lngVariation = Math.cos(location.lng * Math.PI / 180) * 300
    
    const elevation = baseElevation + latVariation + lngVariation + (Math.random() - 0.5) * 50
    
    return Math.round(Math.max(0, elevation))
  }
}