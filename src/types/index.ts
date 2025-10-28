// 地理坐标接口
export interface GeoLocation {
  lat: number
  lng: number
  elevation?: number
  locationName?: {
    name: string
    level: string
    province?: string
    parent?: string
  }
}

// 导入的地理点接口
export interface ImportedGeoPoint {
  id: number
  longitude: number
  latitude: number
  altitude: number
  vegetationType: string
}

// 作物信息接口
export interface CropInfo {
  name: string
  plantingTime: string
  growthStage: string
  area: number
  notes: string
}

// 天气信息接口
export interface WeatherInfo {
  date: string
  temperature: {
    min: number
    max: number
  }
  precipitation: number
  humidity: number
  windSpeed: number
  description: string
}

// 水肥建议接口
export interface FertilizerAdvice {
  waterAmount: number
  fertilizerType: string
  fertilizerAmount: number
  applicationMethod: string
  timing: string
  reason: string
}

// 城市信息接口
export interface CityInfo {
  name: string
  lat: number
  lng: number
  level: string
  province?: string
  parent?: string
}

// 土壤属性接口
export interface SoilAttributes {
  soilType?: string // 土壤类型
  ph?: number // pH值
  organicMatter?: number // 有机质含量
  moisture?: number // 土壤湿度
  notes?: string // 备注
}

// 地形信息接口
export interface TerrainInfo {
  elevation?: number // 海拔高度
  relief?: number // 地形高差
  slope?: number // 坡度
  aspect?: string // 坡向
}

// 蒸散发信息接口
export interface Evapotranspiration {
  et?: number // 蒸散发量
  eto?: number // 潜在蒸散发量
  panEvaporation?: number // 蒸发皿蒸发量
  notes?: string // 备注
}

// 地图点击数据接口
export interface MapClickData {
  location: GeoLocation
  cropInfo?: CropInfo // 作物信息（城市点击时可以为undefined）
  weatherForecast: WeatherInfo[]
  advice?: FertilizerAdvice
  cityInfo?: CityInfo // 城市信息（当点击城市标记时）
  soilAttributes?: SoilAttributes // 土壤属性
  terrainInfo?: TerrainInfo // 地形信息
  evapotranspiration?: Evapotranspiration // 蒸散发信息
}