import type { CropInfo, GeoLocation } from '@/types'

// 作物信息服务
export class CropService {
  private static instance: CropService
  
  public static getInstance(): CropService {
    if (!CropService.instance) {
      CropService.instance = new CropService()
    }
    return CropService.instance
  }

  // 根据地理位置获取作物信息
  async getCropInfo(location: GeoLocation): Promise<CropInfo> {
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟根据地理位置返回不同的作物信息
    const cropTypes = ['水稻', '小麦', '玉米', '大豆', '蔬菜', '果树']
    const growthStages = ['苗期', '生长期', '开花期', '结果期', '成熟期']
    const plantingTimes = ['3月', '4月', '5月', '6月', '7月', '8月']
    const notesList = [
      '适合湿润环境种植',
      '需要充足阳光照射',
      '耐旱性强，适合干旱地区',
      '需要定期施肥管理',
      '适合温室种植',
      '需要防虫害处理'
    ]
    
    // 基于经纬度生成相对稳定的作物信息
    const cropIndex = Math.floor(Math.abs(location.lat + location.lng) * 10) % cropTypes.length
    const stageIndex = Math.floor(Math.abs(location.lat - location.lng) * 10) % growthStages.length
    const plantingIndex = Math.floor(Math.abs(location.lat * location.lng) * 10) % plantingTimes.length
    const notesIndex = Math.floor(Math.abs(location.lat + location.lng * 2) * 10) % notesList.length
    
    const cropType = cropTypes[cropIndex]
    const growthStage = growthStages[stageIndex]
    const plantingTime = plantingTimes[plantingIndex]
    const notes = notesList[notesIndex]
    
    // 模拟种植面积（基于地理位置）
    const area = Math.floor(Math.abs(location.lat * location.lng) * 100) % 1000 + 100
    
    return {
      name: cropType,
      plantingTime,
      growthStage,
      area,
      notes
    }
  }
}