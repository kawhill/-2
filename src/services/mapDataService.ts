import type { ImportedGeoPoint } from '@/types'
import { LyrParser } from './lyrParser'

export interface MapDataConfig {
  mapPoints: ImportedGeoPoint[]
  mapInfo: {
    name: string
    description: string
    totalPoints: number
    dateCreated: string
  }
}

export class MapDataService {
  private static instance: MapDataService
  private currentMapData: MapDataConfig | null = null
  private lyrParser: LyrParser

  public static getInstance(): MapDataService {
    if (!MapDataService.instance) {
      MapDataService.instance = new MapDataService()
    }
    return MapDataService.instance
  }

  constructor() {
    this.lyrParser = LyrParser.getInstance()
  }

  // 加载默认地图数据
  public async loadDefaultMapData(): Promise<MapDataConfig> {
    try {
      const response = await fetch('/src/data/mapData.json')
      const data = await response.json()
      this.currentMapData = data
      return data
    } catch (error) {
      console.error('加载默认地图数据失败:', error)
      throw error
    }
  }

  // 加载自定义地图数据
  public async loadCustomMapData(file: File): Promise<MapDataConfig> {
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()
      
      if (fileExtension === 'lyr') {
        // 处理Lyr文件
        const mapPoints = await this.lyrParser.parseLyrFile(file)
        const mapData: MapDataConfig = {
          mapPoints,
          mapInfo: {
            name: file.name.replace('.lyr', ''),
            description: `从Lyr文件导入的地图数据`,
            totalPoints: mapPoints.length,
            dateCreated: new Date().toISOString().split('T')[0]
          }
        }
        this.currentMapData = mapData
        return mapData
      } else {
        // 处理JSON文件
        const text = await file.text()
        const data = JSON.parse(text)
        
        // 验证数据格式
        this.validateMapData(data)
        
        this.currentMapData = data
        return data
      }
    } catch (error) {
      console.error('加载自定义地图数据失败:', error)
      throw error
    }
  }

  // 验证地图数据格式
  private validateMapData(data: any): void {
    if (!data.mapPoints || !Array.isArray(data.mapPoints)) {
      throw new Error('地图数据格式错误：缺少mapPoints数组')
    }

    data.mapPoints.forEach((point: any, index: number) => {
      if (!point.id || !point.longitude || !point.latitude || !point.altitude || !point.vegetationType) {
        throw new Error(`地图数据格式错误：点${index + 1}缺少必要字段`)
      }
    })
  }

  // 获取当前地图数据
  public getCurrentMapData(): MapDataConfig | null {
    return this.currentMapData
  }

  // 获取地图点数据
  public getMapPoints(): ImportedGeoPoint[] {
    return this.currentMapData?.mapPoints || []
  }

  // 导出当前地图数据
  public exportMapData(): string {
    if (!this.currentMapData) {
      throw new Error('没有可导出的地图数据')
    }
    return JSON.stringify(this.currentMapData, null, 2)
  }
}
