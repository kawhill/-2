<template>
  <div class="app">
    <div class="app-body">
      <Sidebar 
        @city-selected="handleCitySelected"
        @coordinate-selected="handleCoordinateSelected"
        @layer-changed="handleLayerChanged"
        @city-quick-select="handleCityQuickSelect"
        @region-navigate="handleRegionNavigate"
        @user-data-updated="handleUserDataUpdated"
      />
      
      <main class="app-main">
        <div class="map-wrapper">
        <MapComponent 
          ref="mapComponent"
          @location-click="handleLocationClick" 
          :imported-points="importedPoints"
          :user-data-sets="userDataSets"
        />
        </div>
        
        <InfoPopup
          :visible="popupVisible"
          :data="clickData"
          @close="closePopup"
          @generate-weather="generateWeather"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MapComponent from '@/components/MapComponent.vue'
import InfoPopup from '@/components/InfoPopup.vue'
import Sidebar from '@/components/Sidebar.vue'
import type { MapClickData, GeoLocation, ImportedGeoPoint } from '@/types'
import type { UserDataPoint, UserDataSet } from '@/types/userData'
import { WeatherService } from '@/services/weatherService'
import { FertilizerService } from '@/services/fertilizerService'
import { LocationNameService } from '@/services/locationNameService'
import { UserDataStorageService } from '@/services/userDataStorageService'
import type { CityInfo as ServiceCityInfo } from '@/services/completeCityDatabaseService'
import { v4 as uuidv4 } from 'uuid'

const popupVisible = ref(false)
const importedPoints = ref<ImportedGeoPoint[]>([])
const userDataSets = ref<UserDataSet[]>([])
const mapComponent = ref<InstanceType<typeof MapComponent>>()
const clickData = ref<MapClickData>({
  location: { lat: 0, lng: 0 },
  cropInfo: {} as any,
  weatherForecast: [],
  advice: undefined,
  soilAttributes: undefined,
  terrainInfo: undefined,
  evapotranspiration: undefined
})

const weatherService = WeatherService.getInstance()
const fertilizerService = FertilizerService.getInstance()
const locationNameService = LocationNameService.getInstance()

// 加载导入的地理点数据（已废弃，石宝镇数据已转换为用户数据集）
// 保留此函数以兼容旧代码，但不再使用红色标记
const loadImportedPoints = () => {
  // 石宝镇数据已转换为用户数据集，不再显示为红色导入点
  importedPoints.value = []
  
  /* 原始数据已转换为用户数据集
  importedPoints.value = [
    // 点1-28：根据第一个表格的海拔数据
    { id: 1, longitude: 108.16036053, latitude: 30.42729920, altitude: 144.31, vegetationType: "药材种植时间:4到7月备注:植被覆盖率很低" },
    { id: 2, longitude: 108.16048200, latitude: 30.42773597, altitude: 145.6, vegetationType: "药材种植时间:4到7月" },
    { id: 3, longitude: 108.16176400, latitude: 30.42800497, altitude: 147.71, vegetationType: "药材种植时间:4到7月" },
    { id: 4, longitude: 108.16316897, latitude: 30.42898597, altitude: 150.97, vegetationType: "花生地 种植时间: 4到9月" },
    { id: 5, longitude: 108.16499397, latitude: 30.43027100, altitude: 174.56, vegetationType: "冬黄豆种植时间: 5到10月" },
    { id: 6, longitude: 108.16829197, latitude: 30.43274200, altitude: 211.73, vegetationType: "橙子" },
    { id: 7, longitude: 108.16213500, latitude: 30.42670197, altitude: 194.84, vegetationType: "橙子" },
    { id: 8, longitude: 108.16650900, latitude: 30.42715797, altitude: 259.95, vegetationType: "橘子" },
    { id: 9, longitude: 108.16353700, latitude: 30.42607297, altitude: 244.79, vegetationType: "橘子" },
    { id: 10, longitude: 108.16182200, latitude: 30.42538100, altitude: 247.33, vegetationType: "林地备注:植被覆盖度高" },
    { id: 11, longitude: 108.16786197, latitude: 30.42914000, altitude: 248.66, vegetationType: "橘子" },
    { id: 12, longitude: 108.17003097, latitude: 30.43095100, altitude: 270.98, vegetationType: "橘子" },
    { id: 13, longitude: 108.17306200, latitude: 30.43152900, altitude: 270.94, vegetationType: "橘子备注:稀疏" },
    { id: 14, longitude: 108.17484897, latitude: 30.43206197, altitude: 237.54, vegetationType: "橘子备注:路边" },
    { id: 15, longitude: 108.16316897, latitude: 30.42377600, altitude: 212.7, vegetationType: "花生冬黄豆种植时间:5到10月" },
    { id: 16, longitude: 108.16534000, latitude: 30.42524997, altitude: 205.17, vegetationType: "橘子地备注:地面有杂草覆盖" },
    { id: 17, longitude: 108.16781797, latitude: 30.42602497, altitude: 220.36, vegetationType: "橘子备注:有杂草覆盖" },
    { id: 18, longitude: 108.17133697, latitude: 30.42761600, altitude: 245.49, vegetationType: "橘子和红薯红薯种植时间:5到10月" },
    { id: 19, longitude: 108.17356100, latitude: 30.42863600, altitude: 238, vegetationType: "橘子备注:路边" },
    { id: 20, longitude: 108.17440997, latitude: 30.43010297, altitude: 251.59, vegetationType: "橘子备注:路边" },
    { id: 21, longitude: 108.17650897, latitude: 30.43078200, altitude: 211.93, vegetationType: "红薯种植时间:5到10月水稻种植时间:2月-8月" },
    { id: 22, longitude: 108.17441597, latitude: 30.42710200, altitude: 197.63, vegetationType: "红薯种植时间:5到10月" },
    { id: 23, longitude: 108.17514300, latitude: 30.42554397, altitude: 190.12, vegetationType: "桉树" },
    { id: 24, longitude: 108.17618500, latitude: 30.42482400, altitude: 186.59, vegetationType: "西瓜和茄子" },
    { id: 25, longitude: 108.17282400, latitude: 30.42504200, altitude: 187.82, vegetationType: "荒树林备注:植被覆盖度高" },
    { id: 26, longitude: 108.17192929, latitude: 30.42952303, altitude: 273.72, vegetationType: "冬黄豆水稻种植时间:2月-8月" },
    { id: 27, longitude: 108.16802374, latitude: 30.42530231, altitude: 208.5, vegetationType: "橘子" },
    { id: 28, longitude: 108.17019985, latitude: 30.42612805, altitude: 206.67, vegetationType: "橘子林备注:地面杂草覆盖" },
    // 点29-50：根据第二个表格的海拔数据
    { id: 29, longitude: 108.16699127, latitude: 30.42482895, altitude: 197.04, vegetationType: "药材种植时间:4到7月备注:植被覆盖率很低" },
    { id: 30, longitude: 108.16863616, latitude: 30.42463347, altitude: 187.43, vegetationType: "药材种植时间:4到7月" },
    { id: 31, longitude: 108.16745577, latitude: 30.42335647, altitude: 177.78, vegetationType: "药材种植时间:4到7月" },
    { id: 32, longitude: 108.16784102, latitude: 30.42189140, altitude: 164.24, vegetationType: "花生地 种植时间: 4到9月" },
    { id: 33, longitude: 108.16959035, latitude: 30.42368043, altitude: 176.88, vegetationType: "冬黄豆种植时间: 5到10月" },
    { id: 34, longitude: 108.17138222, latitude: 30.42432834, altitude: 166.31, vegetationType: "橙子" },
    { id: 35, longitude: 108.17366155, latitude: 30.42377637, altitude: 165.02, vegetationType: "橙子" },
    { id: 36, longitude: 108.17208483, latitude: 30.42135218, altitude: 154.34, vegetationType: "橘子" },
    { id: 37, longitude: 108.17121111, latitude: 30.42287351, altitude: 156.81, vegetationType: "橘子" },
    { id: 38, longitude: 108.16954442, latitude: 30.42160256, altitude: 153.60, vegetationType: "林地备注:植被覆盖度高" },
    { id: 39, longitude: 108.16810983, latitude: 30.42034369, altitude: 148.02, vegetationType: "橘子" },
    { id: 40, longitude: 108.16666196, latitude: 30.42135865, altitude: 145.74, vegetationType: "橘子" },
    { id: 41, longitude: 108.16662453, latitude: 30.41952910, altitude: 153.89, vegetationType: "橘子备注:稀疏" },
    { id: 42, longitude: 108.16548010, latitude: 30.42399902, altitude: 184.10, vegetationType: "橘子备注:路边" },
    { id: 43, longitude: 108.16395097, latitude: 30.42754800, altitude: 194.40, vegetationType: "花生冬黄豆种植时间:5到10月" },
    { id: 44, longitude: 108.16899800, latitude: 30.42787997, altitude: 249.64, vegetationType: "橘子地备注:地面有杂草覆盖" },
    { id: 45, longitude: 108.16976997, latitude: 30.42724097, altitude: 233.69, vegetationType: "橘子备注:有杂草覆盖" },
    { id: 46, longitude: 108.17385200, latitude: 30.42707400, altitude: 229.15, vegetationType: "橘子和红薯红薯种植时间:5到10月" },
    { id: 47, longitude: 108.17348597, latitude: 30.42142700, altitude: 168.27, vegetationType: "橘子备注:路边" },
    { id: 48, longitude: 108.17599697, latitude: 30.42276000, altitude: 148.49, vegetationType: "橘子备注:路边" },
    { id: 49, longitude: 108.17541300, latitude: 30.42373900, altitude: 154.65, vegetationType: "红薯种植时间:5到10月水稻种植时间:2月-8月" },
    { id: 50, longitude: 108.17573500, latitude: 30.42894497, altitude: 200.85, vegetationType: "红薯种植时间:5到10月" }
  ]
  */
}

// 已废弃：石宝镇数据已删除，不再自动初始化
/*
const getShibaoRawPoints = (): Array<{id: number, longitude: number, latitude: number, altitude: number, vegetationType: string}> => {
  return [
    // 点1-28：根据第一个表格的海拔数据
    { id: 1, longitude: 108.16036053, latitude: 30.42729920, altitude: 144.31, vegetationType: "药材种植时间:4到7月备注:植被覆盖率很低" },
    { id: 2, longitude: 108.16048200, latitude: 30.42773597, altitude: 145.6, vegetationType: "药材种植时间:4到7月" },
    { id: 3, longitude: 108.16176400, latitude: 30.42800497, altitude: 147.71, vegetationType: "药材种植时间:4到7月" },
    { id: 4, longitude: 108.16316897, latitude: 30.42898597, altitude: 150.97, vegetationType: "花生地 种植时间: 4到9月" },
    { id: 5, longitude: 108.16499397, latitude: 30.43027100, altitude: 174.56, vegetationType: "冬黄豆种植时间: 5到10月" },
    { id: 6, longitude: 108.16829197, latitude: 30.43274200, altitude: 211.73, vegetationType: "橙子" },
    { id: 7, longitude: 108.16213500, latitude: 30.42670197, altitude: 194.84, vegetationType: "橙子" },
    { id: 8, longitude: 108.16650900, latitude: 30.42715797, altitude: 259.95, vegetationType: "橘子" },
    { id: 9, longitude: 108.16353700, latitude: 30.42607297, altitude: 244.79, vegetationType: "橘子" },
    { id: 10, longitude: 108.16182200, latitude: 30.42538100, altitude: 247.33, vegetationType: "林地备注:植被覆盖度高" },
    { id: 11, longitude: 108.16786197, latitude: 30.42914000, altitude: 248.66, vegetationType: "橘子" },
    { id: 12, longitude: 108.17003097, latitude: 30.43095100, altitude: 270.98, vegetationType: "橘子" },
    { id: 13, longitude: 108.17306200, latitude: 30.43152900, altitude: 270.94, vegetationType: "橘子备注:稀疏" },
    { id: 14, longitude: 108.17484897, latitude: 30.43206197, altitude: 237.54, vegetationType: "橘子备注:路边" },
    { id: 15, longitude: 108.16316897, latitude: 30.42377600, altitude: 212.7, vegetationType: "花生冬黄豆种植时间:5到10月" },
    { id: 16, longitude: 108.16534000, latitude: 30.42524997, altitude: 205.17, vegetationType: "橘子地备注:地面有杂草覆盖" },
    { id: 17, longitude: 108.16781797, latitude: 30.42602497, altitude: 220.36, vegetationType: "橘子备注:有杂草覆盖" },
    { id: 18, longitude: 108.17133697, latitude: 30.42761600, altitude: 245.49, vegetationType: "橘子和红薯红薯种植时间:5到10月" },
    { id: 19, longitude: 108.17356100, latitude: 30.42863600, altitude: 238, vegetationType: "橘子备注:路边" },
    { id: 20, longitude: 108.17440997, latitude: 30.43010297, altitude: 251.59, vegetationType: "橘子备注:路边" },
    { id: 21, longitude: 108.17650897, latitude: 30.43078200, altitude: 211.93, vegetationType: "红薯种植时间:5到10月水稻种植时间:2月-8月" },
    { id: 22, longitude: 108.17441597, latitude: 30.42710200, altitude: 197.63, vegetationType: "红薯种植时间:5到10月" },
    { id: 23, longitude: 108.17514300, latitude: 30.42554397, altitude: 190.12, vegetationType: "桉树" },
    { id: 24, longitude: 108.17618500, latitude: 30.42482400, altitude: 186.59, vegetationType: "西瓜和茄子" },
    { id: 25, longitude: 108.17282400, latitude: 30.42504200, altitude: 187.82, vegetationType: "荒树林备注:植被覆盖度高" },
    { id: 26, longitude: 108.17192929, latitude: 30.42952303, altitude: 273.72, vegetationType: "冬黄豆水稻种植时间:2月-8月" },
    { id: 27, longitude: 108.16802374, latitude: 30.42530231, altitude: 208.5, vegetationType: "橘子" },
    { id: 28, longitude: 108.17019985, latitude: 30.42612805, altitude: 206.67, vegetationType: "橘子林备注:地面杂草覆盖" },
    // 点29-50：根据第二个表格的海拔数据
    { id: 29, longitude: 108.16699127, latitude: 30.42482895, altitude: 197.04, vegetationType: "药材种植时间:4到7月备注:植被覆盖率很低" },
    { id: 30, longitude: 108.16863616, latitude: 30.42463347, altitude: 187.43, vegetationType: "药材种植时间:4到7月" },
    { id: 31, longitude: 108.16745577, latitude: 30.42335647, altitude: 177.78, vegetationType: "药材种植时间:4到7月" },
    { id: 32, longitude: 108.16784102, latitude: 30.42189140, altitude: 164.24, vegetationType: "花生地 种植时间: 4到9月" },
    { id: 33, longitude: 108.16959035, latitude: 30.42368043, altitude: 176.88, vegetationType: "冬黄豆种植时间: 5到10月" },
    { id: 34, longitude: 108.17138222, latitude: 30.42432834, altitude: 166.31, vegetationType: "橙子" },
    { id: 35, longitude: 108.17366155, latitude: 30.42377637, altitude: 165.02, vegetationType: "橙子" },
    { id: 36, longitude: 108.17208483, latitude: 30.42135218, altitude: 154.34, vegetationType: "橘子" },
    { id: 37, longitude: 108.17121111, latitude: 30.42287351, altitude: 156.81, vegetationType: "橘子" },
    { id: 38, longitude: 108.16954442, latitude: 30.42160256, altitude: 153.60, vegetationType: "林地备注:植被覆盖度高" },
    { id: 39, longitude: 108.16810983, latitude: 30.42034369, altitude: 148.02, vegetationType: "橘子" },
    { id: 40, longitude: 108.16666196, latitude: 30.42135865, altitude: 145.74, vegetationType: "橘子" },
    { id: 41, longitude: 108.16662453, latitude: 30.41952910, altitude: 153.89, vegetationType: "橘子备注:稀疏" },
    { id: 42, longitude: 108.16548010, latitude: 30.42399902, altitude: 184.10, vegetationType: "橘子备注:路边" },
    { id: 43, longitude: 108.16395097, latitude: 30.42754800, altitude: 194.40, vegetationType: "花生冬黄豆种植时间:5到10月" },
    { id: 44, longitude: 108.16899800, latitude: 30.42787997, altitude: 249.64, vegetationType: "橘子地备注:地面有杂草覆盖" },
    { id: 45, longitude: 108.16976997, latitude: 30.42724097, altitude: 233.69, vegetationType: "橘子备注:有杂草覆盖" },
    { id: 46, longitude: 108.17385200, latitude: 30.42707400, altitude: 229.15, vegetationType: "橘子和红薯红薯种植时间:5到10月" },
    { id: 47, longitude: 108.17348597, latitude: 30.42142700, altitude: 168.27, vegetationType: "橘子备注:路边" },
    { id: 48, longitude: 108.17599697, latitude: 30.42276000, altitude: 148.49, vegetationType: "橘子备注:路边" },
    { id: 49, longitude: 108.17541300, latitude: 30.42373900, altitude: 154.65, vegetationType: "红薯种植时间:5到10月水稻种植时间:2月-8月" },
    { id: 50, longitude: 108.17573500, latitude: 30.42894497, altitude: 200.85, vegetationType: "红薯种植时间:5到10月" }
  ]
}
*/

// 已废弃：石宝镇数据已删除，不再自动初始化
/*
const initializeShibaoDataSet = () => {
  const existingDataSets = UserDataStorageService.loadDataSets()
  
  // 检查是否已存在石宝镇数据集
  const shibaoExists = existingDataSets.some(ds => ds.regionName === '石宝镇')
  
  if (shibaoExists) {
    console.log('✅ 石宝镇数据集已存在')
    return
  }
  
  // 获取原始石宝镇数据点
  const rawPoints = getShibaoRawPoints()
  
  // 将导入的点转换为UserDataPoint
  const points: UserDataPoint[] = rawPoints.map(point => {
    const cropInfo = parseImportedVegetationType(point.vegetationType)
    
    return {
      id: uuidv4(),
      name: `点${point.id}`,
      longitude: point.longitude,
      latitude: point.latitude,
      altitude: point.altitude,
      cropType: cropInfo.name !== '未知作物' ? cropInfo.name : undefined,
      plantingTime: cropInfo.plantingTime !== '--' ? cropInfo.plantingTime : undefined,
      notes: cropInfo.notes !== '--' ? cropInfo.notes : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  })
  
  // 创建石宝镇数据集
  const shibaoDataSet: UserDataSet = {
    id: 'shibao-default-' + Date.now(),
    name: '石宝镇调查数据',
    regionName: '石宝镇',
    description: `包含 ${points.length} 个数据点`,
    points: points,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  // 保存到localStorage
  const success = UserDataStorageService.addDataSet(shibaoDataSet)
  
  if (success) {
    console.log('✅ 已初始化石宝镇数据集，包含', points.length, '个数据点')
  } else {
    console.error('❌ 初始化石宝镇数据集失败')
  }
}
*/

// 加载用户数据
const loadUserData = () => {
  userDataSets.value = UserDataStorageService.loadDataSets()
  console.log('✅ App: 已加载用户数据', userDataSets.value.length, '个数据集')
  
  // 详细日志：列出所有数据集
  if (userDataSets.value.length > 0) {
    userDataSets.value.forEach((ds, index) => {
      console.log(`  - 数据集 ${index + 1}: ${ds.name} (分区: ${ds.regionName || '无'}, ${ds.points.length} 个点)`)
    })
  } else {
    console.warn('⚠️ App: 没有找到任何用户数据，localStorage可能为空或被清除')
  }
}

// 处理用户数据更新
const handleUserDataUpdated = (dataSets: UserDataSet[]) => {
  userDataSets.value = dataSets
  console.log('✅ App: 用户数据已更新')
}

// 组件挂载时加载导入的点数据和用户数据
onMounted(() => {
  console.log('🚀 App: 开始初始化...')
  
  // 加载用户数据
  loadUserData()
  
  // 加载导入的点数据（已废弃，保持兼容性）
  loadImportedPoints()
  
  console.log('✅ App: 初始化完成，共', userDataSets.value.length, '个数据集')
})

// 解析导入点的植被类型信息
const parseImportedVegetationType = (vegetationType: string) => {
  // 提取作物名称
  let cropName = '未知作物'
  let plantingTime = '--'
  let notes = '--'
  
  // 匹配各种作物类型
  const cropPatterns = [
    { pattern: /药材/, name: '药材' },
    { pattern: /花生/, name: '花生' },
    { pattern: /冬黄豆/, name: '冬黄豆' },
    { pattern: /橙子/, name: '橙子' },
    { pattern: /橘子/, name: '橘子' },
    { pattern: /红薯/, name: '红薯' },
    { pattern: /水稻/, name: '水稻' },
    { pattern: /桉树/, name: '桉树' },
    { pattern: /西瓜/, name: '西瓜' },
    { pattern: /茄子/, name: '茄子' },
    { pattern: /林地/, name: '林地' },
    { pattern: /荒树林/, name: '荒树林' }
  ]
  
  // 找到匹配的作物
  for (const crop of cropPatterns) {
    if (crop.pattern.test(vegetationType)) {
      cropName = crop.name
      break
    }
  }
  
  // 提取种植时间
  const plantingTimeMatch = vegetationType.match(/种植时间[：:]?\s*([^备注]+)/)
  if (plantingTimeMatch) {
    plantingTime = plantingTimeMatch[1].trim()
  }
  
  // 提取备注
  const notesMatch = vegetationType.match(/备注[：:]?\s*(.+)/)
  if (notesMatch) {
    notes = notesMatch[1].trim()
  }
  
  return {
    name: cropName,
    plantingTime,
    growthStage: '生长期', // 默认生长阶段
    area: 100, // 默认面积
    notes
  }
}

const handleLocationClick = async (data: MapClickData) => {
  popupVisible.value = true
  
  try {
    // 检查是否是城市点击
    if (data.cityInfo) {
      // 处理城市点击
      const locationWithElevation: GeoLocation = {
        ...data.location,
        locationName: {
          name: data.cityInfo.name,
          level: data.cityInfo.level,
          province: data.cityInfo.province,
          parent: data.cityInfo.parent
        }
      }
      
      // 城市点击不显示作物信息
      clickData.value = {
        location: locationWithElevation,
        cropInfo: undefined, // 不显示作物信息
        weatherForecast: [], // 初始为空，需要手动点击获取
        advice: undefined,
        soilAttributes: undefined,
        terrainInfo: undefined,
        evapotranspiration: undefined
      }
    } else if (data.location.locationName) {
      // 如果已经有位置名称（说明是用户数据点点击，已由MapComponent处理），直接使用
      clickData.value = {
        ...data,
        weatherForecast: data.weatherForecast || [] // 保持已有的天气数据或初始为空
      }
    } else {
      // 检查是否是导入的点
      const importedPoint = importedPoints.value.find(point => 
        Math.abs(point.latitude - data.location.lat) < 0.0001 && 
        Math.abs(point.longitude - data.location.lng) < 0.0001
      )
      
      if (importedPoint) {
        // 使用导入的数据
        const cropInfo = parseImportedVegetationType(importedPoint.vegetationType)
        const locationName = await Promise.resolve(locationNameService.getLocationName(data.location))
        
        const locationWithElevation: GeoLocation = {
          ...data.location,
          elevation: importedPoint.altitude,
          locationName
        }
        
        clickData.value = {
          location: locationWithElevation,
          cropInfo,
          weatherForecast: [], // 初始为空，需要手动点击获取
          advice: undefined,
          soilAttributes: undefined,
          terrainInfo: undefined,
          evapotranspiration: undefined
        }
      } else {
        // 普通地图点击，获取地理位置和地名信息
        const locationName = await Promise.resolve(locationNameService.getLocationName(data.location))
        
        const locationWithElevation: GeoLocation = {
          ...data.location,
          locationName
        }
        
        clickData.value = {
          location: locationWithElevation,
          cropInfo: undefined, // 普通地图点击不显示作物信息
          weatherForecast: [], // 初始为空，需要手动点击获取
          advice: undefined,
          soilAttributes: undefined,
          terrainInfo: undefined,
          evapotranspiration: undefined
        }
      }
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    // 显示错误信息
    clickData.value = {
      ...data,
      cropInfo: { name: '数据获取失败', plantingTime: '--', growthStage: '--', area: 0, notes: '--' },
      weatherForecast: [],
      advice: undefined,
      soilAttributes: undefined,
      terrainInfo: undefined,
      evapotranspiration: undefined
    }
  }
}

const generateWeather = async () => {
  if (!clickData.value.location) {
    return
  }
  
  try {
    const weatherForecast = await weatherService.getWeatherForecast(clickData.value.location)
    clickData.value.weatherForecast = weatherForecast
  } catch (error) {
    console.error('获取天气数据失败:', error)
    // 清空天气数据，让组件显示错误状态
    clickData.value.weatherForecast = []
  }
}

const closePopup = () => {
  popupVisible.value = false
}

// 侧边栏事件处理方法
const handleCitySelected = (city: ServiceCityInfo) => {
  if (mapComponent.value) {
    mapComponent.value.goToCityByInfo(city)
  }
}

const handleCoordinateSelected = (lat: number, lng: number) => {
  if (mapComponent.value) {
    mapComponent.value.goToCoordinate(lat, lng)
  }
}

const handleLayerChanged = (layerName: string) => {
  if (mapComponent.value) {
    mapComponent.value.changeMapLayer(layerName)
  }
}

const handleCityQuickSelect = (cityName: string) => {
  if (mapComponent.value) {
    mapComponent.value.goToCityByName(cityName)
  }
}

const handleRegionNavigate = (lat: number, lng: number, zoom: number, regionName?: string) => {
  if (mapComponent.value) {
    mapComponent.value.goToRegion(lat, lng, zoom, regionName)
  }
}

</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-main {
  flex: 1;
  position: relative;
  overflow: hidden;
  margin-left: 200px; /* 为侧边栏留出空间 */
  transition: margin-left 0.3s ease;
}

.map-wrapper {
  width: 100%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-main {
    margin-left: 180px;
  }
}

@media (max-width: 480px) {
  .app-body {
    flex-direction: column;
  }
  
  .app-main {
    margin-left: 0;
    margin-top: 0;
  }
}
</style>