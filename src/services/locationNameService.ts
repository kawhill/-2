// 地名服务
import { CompleteCityDatabaseService, type CityInfo } from './completeCityDatabaseService'
import type { GeoLocation } from '@/types'

export interface LocationNameInfo {
  name: string
  level: string
  province?: string
  parent?: string
}

export class LocationNameService {
  private static instance: LocationNameService
  private cityDatabaseService: CompleteCityDatabaseService
  
  private constructor() {
    this.cityDatabaseService = CompleteCityDatabaseService.getInstance()
  }
  
  public static getInstance(): LocationNameService {
    if (!LocationNameService.instance) {
      LocationNameService.instance = new LocationNameService()
    }
    return LocationNameService.instance
  }
  
  /**
   * 根据经纬度获取最近的地名信息
   * @param location 地理坐标
   * @returns 地名信息
   */
  public getLocationName(location: GeoLocation): LocationNameInfo {
    const { lat, lng } = location
    
    // 获取所有城市数据
    const allCities = this.cityDatabaseService.getAllCities()
    
    if (allCities.length === 0) {
      return {
        name: '未知位置',
        level: 'unknown'
      }
    }
    
    // 计算距离并找到最近的城市
    let nearestCity: CityInfo | null = null
    let minDistance = Infinity
    
    for (const city of allCities) {
      const distance = this.calculateDistance(lat, lng, city.lat, city.lng)
      if (distance < minDistance) {
        minDistance = distance
        nearestCity = city
      }
    }
    
    if (!nearestCity) {
      return {
        name: '未知位置',
        level: 'unknown'
      }
    }
    
    // 根据距离判断显示级别
    let displayName = nearestCity.name
    let displayLevel = nearestCity.level
    
    // 如果距离很远（超过50公里），显示更高级别的行政区
    if (minDistance > 50) {
      // 尝试找到更高级别的行政区
      const higherLevelCity = this.findHigherLevelCity(nearestCity, allCities)
      if (higherLevelCity) {
        displayName = higherLevelCity.name
        displayLevel = higherLevelCity.level
      }
    }
    
    return {
      name: displayName,
      level: displayLevel,
      province: nearestCity.province,
      parent: nearestCity.parent
    }
  }
  
  /**
   * 计算两点之间的距离（公里）
   */
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // 地球半径（公里）
    const dLat = this.toRadians(lat2 - lat1)
    const dLng = this.toRadians(lng2 - lng1)
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }
  
  /**
   * 角度转弧度
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
  
  /**
   * 查找更高级别的行政区
   */
  private findHigherLevelCity(city: CityInfo, allCities: CityInfo[]): CityInfo | null {
    // 如果当前是县级，尝试找市级
    if (city.level === 'county' && city.parent) {
      const parentCity = allCities.find(c => 
        c.name === city.parent && c.level === 'city'
      )
      if (parentCity) return parentCity
    }
    
    // 如果当前是市级，尝试找省级
    if (city.level === 'city' && city.province) {
      const provinceCity = allCities.find(c => 
        c.name === city.province && c.level === 'province'
      )
      if (provinceCity) return provinceCity
    }
    
    return null
  }
  
  /**
   * 获取级别显示文本
   */
  public getLevelText(level: string): string {
    const levelMap: Record<string, string> = {
      'province': '省级',
      'city': '市级',
      'county': '县级',
      'town': '镇级',
      'village': '村级',
      'unknown': '未知'
    }
    return levelMap[level] || level
  }
}
