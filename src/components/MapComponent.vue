<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
    
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>正在加载地图数据...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import type { GeoLocation, MapClickData, ImportedGeoPoint } from '@/types'
import type { UserDataSet } from '@/types/userData'
import { MapConfigService } from '@/services/mapConfigService'
import { CompleteCityDatabaseService, type CityInfo as ServiceCityInfo } from '@/services/completeCityDatabaseService'
import { LocationNameService } from '@/services/locationNameService'

// 修复 Leaflet 默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const props = defineProps<{
  onLocationClick: (data: MapClickData) => void
  importedPoints?: ImportedGeoPoint[]
  userDataSets?: UserDataSet[]
}>()

const emit = defineEmits<{
  locationClick: [data: MapClickData]
}>()

const mapContainer = ref<HTMLElement>()
const loading = ref(false)
const selectedLayer = ref('Esri卫星图')
let map: L.Map | null = null
let currentTileLayer: L.TileLayer | null = null
let searchMarker: L.Marker | null = null
let userDataMarkers: L.Marker[] = [] // 存储用户数据标记
let importedPointMarkers: L.Marker[] = [] // 存储导入点标记（红色）

// 获取服务实例
const mapConfigService = MapConfigService.getInstance()
const cityDatabaseService = CompleteCityDatabaseService.getInstance()
const mapLayers = mapConfigService.getMapLayers()
const hotCities = cityDatabaseService.getHotCities()

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  // 清理所有标记
  userDataMarkers.forEach(marker => {
    if (map) map.removeLayer(marker)
  })
  importedPointMarkers.forEach(marker => {
    if (map) map.removeLayer(marker)
  })
  if (searchMarker && map) {
    map.removeLayer(searchMarker)
  }
  
  if (map) {
    map.remove()
  }
})

const initMap = () => {
  if (!mapContainer.value) return

  // 创建地图实例，默认中心点设为北京，使用更精细的缩放
  map = L.map(mapContainer.value, {
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
    dragging: true,
    zoomSnap: 0.1,  // 缩放步长设为0.1，更精细
    zoomDelta: 0.5, // 鼠标滚轮缩放步长
    wheelPxPerZoomLevel: 60 // 滚轮灵敏度
  }).setView([39.9042, 116.4074], 10)

  // 添加默认地图图层
  addTileLayer(mapConfigService.getDefaultLayer())

  // 添加地图点击事件监听
  map.on('click', handleMapClick)
  
  // 添加导入的点标记
  addImportedPoints()
  
  // 添加用户数据点标记
  displayUserData()
}

const addImportedPoints = () => {
  if (!map || !props.importedPoints) return
  
  // 清除旧的导入点标记（如果有）
  importedPointMarkers.forEach(marker => {
    map?.removeLayer(marker)
  })
  importedPointMarkers = []
  
  // 为每个导入的点添加标记
  props.importedPoints.forEach(point => {
    // 为每个点创建自定义图标，显示点号
    const importedPointIcon = L.divIcon({
      className: 'imported-point-marker',
      html: `<div style="background-color: #e74c3c; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">${point.id}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })
    
    const marker = L.marker([point.latitude, point.longitude], { icon: importedPointIcon })
      .addTo(map!)
    
    // 添加点击事件监听，直接触发详细信息获取
    marker.on('click', () => {
      handleImportedPointClick(point)
    })
    
    importedPointMarkers.push(marker)
  })
  
  // 如果有导入的点，调整地图视图以显示所有点
  if (props.importedPoints.length > 0) {
    const markers = props.importedPoints.map(point => 
      L.marker([point.latitude, point.longitude])
    )
    const group = new L.FeatureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.1))
  }
}

/**
 * 显示用户数据点
 */
const displayUserData = () => {
  if (!map || !props.userDataSets || props.userDataSets.length === 0) return
  
  // 清除旧的用户数据标记
  userDataMarkers.forEach(marker => {
    map?.removeLayer(marker)
  })
  userDataMarkers = []
  
  // 添加新的用户数据标记
  props.userDataSets.forEach(dataSet => {
    // 每个数据集（分区）的编号独立，从1开始
    let dataSetPointIndex = 1
    dataSet.points.forEach(point => {
      // 创建用户数据点标记（红色），显示编号
      const userIcon = L.divIcon({
        className: 'user-point-marker',
        html: `<div style="
          background-color: #e74c3c;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: bold;
        ">${dataSetPointIndex}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
      
      const marker = L.marker([point.latitude, point.longitude], { icon: userIcon })
        .addTo(map!)
      
      // 简化弹窗内容，只显示点名称（详细信息在InfoPopup中显示）
      const popupContent = `<div style="text-align: center; padding: 8px;">
        <b style="font-size: 14px; color: #333;">${point.name || '未命名'}</b>
      </div>`
      
      marker.bindPopup(popupContent)
      
      // 添加点击事件
      marker.on('click', () => {
        handleUserPointClick(point)
      })
      
      userDataMarkers.push(marker)
      dataSetPointIndex++ // 该数据集内的编号递增
    })
  })
  
  console.log('✅ 已显示', userDataMarkers.length, '个用户数据点')
}

/**
 * 处理用户数据点点击
 */
const handleUserPointClick = async (point: any) => {
  // 获取位置名称
  const locationNameService = LocationNameService.getInstance()
  const location: GeoLocation = {
    lat: point.latitude,
    lng: point.longitude,
    elevation: point.altitude
  }
  const locationName = await Promise.resolve(locationNameService.getLocationName(location))
  
  // 构造完整的点击数据
  const clickData: MapClickData = {
    location: {
      ...location,
      locationName
    },
    cropInfo: point.cropType ? {
      name: point.cropType,
      plantingTime: point.plantingTime || '--',
      growthStage: '--',
      area: 0,
      notes: point.notes || '--'
    } : undefined,
    weatherForecast: [],
    soilAttributes: point.soilType ? {
      soilType: point.soilType,
      notes: point.notes
    } : undefined,
    evapotranspiration: point.evapotranspiration !== undefined ? {
      et: point.evapotranspiration
    } : undefined
  }
  
  emit('locationClick', clickData)
}

// 监听用户数据变化
watch(() => props.userDataSets, () => {
  if (map) {
    displayUserData()
  }
}, { deep: true })

// 监听导入点变化
watch(() => props.importedPoints, () => {
  if (map) {
    addImportedPoints()
  }
}, { deep: true })

const addTileLayer = (layer: any) => {
  if (!map) return

  // 移除当前图层
  if (currentTileLayer) {
    map.removeLayer(currentTileLayer)
  }

  // 创建新的图层配置
  const layerOptions: any = {
    attribution: layer.attribution,
    maxZoom: layer.maxZoom || 20,
    minZoom: layer.minZoom || 1,
    errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  }

  // 处理子域名
  if (layer.subdomains) {
    layerOptions.subdomains = layer.subdomains
  }

  // 添加新图层
  currentTileLayer = L.tileLayer(layer.url, layerOptions)
  
  // 添加错误处理
  currentTileLayer.on('tileerror', (error) => {
    console.warn(`地图图层加载失败: ${layer.name}`, error)
    // 如果地图失败，自动切换到默认图层
    const fallbackLayer = mapConfigService.getDefaultLayer()
    if (fallbackLayer) {
      console.log('自动切换到默认图层:', fallbackLayer.name)
      selectedLayer.value = fallbackLayer.name
      addTileLayer(fallbackLayer)
    }
  })
  
  currentTileLayer.addTo(map)
}

// 侧边栏调用的方法
const goToCityByInfo = (city: ServiceCityInfo) => {
  if (!map) return
  
  map.setView([city.lat, city.lng], 15)
  
  // 移除之前的搜索标记
  if (searchMarker) {
    map.removeLayer(searchMarker)
  }
  
  // 添加城市标记
  const popupContent = `
    <div style="text-align: center;">
      <b>${city.name}</b><br/>
      <span style="color: #666; font-size: 0.9em;">${getLevelText(city.level)}</span><br/>
      <span style="color: #888; font-size: 0.8em;">${city.province || city.parent}</span>
    </div>
  `
  
  searchMarker = L.marker([city.lat, city.lng])
    .addTo(map)
    .bindPopup(popupContent)
    .openPopup()
  
  // 为标记添加点击事件监听
  searchMarker.on('click', () => {
    handleCityMarkerClick(city)
  })
}

const goToCityByName = (cityName: string) => {
  if (!map) return
  
  const city = hotCities.find(c => c.name === cityName)
  if (city) {
    goToCityByInfo(city)
  }
}

const goToCoordinate = (lat: number, lng: number) => {
  if (!map) return
  
  // 验证经纬度范围
  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    map.setView([lat, lng], 18)
    
    // 移除之前的搜索标记
    if (searchMarker) {
      map.removeLayer(searchMarker)
    }
    
    // 添加新的搜索标记
    searchMarker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<b>搜索位置</b><br/>纬度: ${lat.toFixed(6)}<br/>经度: ${lng.toFixed(6)}`)
      .openPopup()
  }
}

const changeMapLayer = (layerName: string) => {
  const layer = mapLayers.find(l => l.name === layerName)
  if (layer && map) {
    try {
      selectedLayer.value = layerName
      addTileLayer(layer)
    } catch (error) {
      console.error('切换地图图层失败:', error)
      // 如果切换失败，回退到默认图层
      const defaultLayer = mapConfigService.getDefaultLayer()
      selectedLayer.value = defaultLayer.name
      addTileLayer(defaultLayer)
    }
  }
}

const goToRegion = (lat: number, lng: number, zoom: number, regionName?: string) => {
  if (!map) return
  
  // 移动到指定区域
  map.setView([lat, lng], zoom)
  
  // 移除之前的搜索标记
  if (searchMarker) {
    map.removeLayer(searchMarker)
    searchMarker = null
  }
  
  // 如果有分区名称，添加区域标记
  if (regionName) {
    const popupContent = `
      <div style="text-align: center;">
        <b>${regionName}</b><br/>
        <span style="color: #666; font-size: 0.9em;">分区中心</span>
      </div>
    `
    
    searchMarker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(popupContent)
      .openPopup()
  }
}

const getLevelText = (level: string): string => {
  const levelMap: Record<string, string> = {
    'province': '省级',
    'city': '市级',
    'county': '县级',
    'town': '镇级',
    'village': '村级'
  }
  return levelMap[level] || level
}

// 暴露方法给父组件
defineExpose({
  goToCityByInfo,
  goToCityByName,
  goToCoordinate,
  changeMapLayer,
  goToRegion
})

const handleImportedPointClick = async (point: ImportedGeoPoint) => {
  const location: GeoLocation = {
    lat: point.latitude,
    lng: point.longitude,
    elevation: point.altitude
  }

  loading.value = true
  
  try {
    // 触发父组件的数据获取，就像点击普通地图位置一样
    emit('locationClick', {
      location,
      cropInfo: {} as any, // 临时空对象，实际会在父组件中填充
      weatherForecast: [] // 临时空数组，实际会在父组件中填充
    })
  } finally {
    loading.value = false
  }
}

const handleCityMarkerClick = async (city: ServiceCityInfo) => {
  const location: GeoLocation = {
    lat: city.lat,
    lng: city.lng,
    elevation: undefined // 城市点没有海拔信息
  }

  loading.value = true
  
  try {
    // 触发父组件的数据获取，传递城市信息
    emit('locationClick', {
      location,
      cropInfo: {} as any, // 临时空对象，实际会在父组件中填充
      weatherForecast: [], // 临时空数组，实际会在父组件中填充
      cityInfo: city // 传递城市信息
    })
  } finally {
    loading.value = false
  }
}

const handleMapClick = async (e: L.LeafletMouseEvent) => {
  const location: GeoLocation = {
    lat: e.latlng.lat,
    lng: e.latlng.lng
  }

  loading.value = true
  
  try {
    // 触发父组件的数据获取，普通地图点击不包含作物信息
    emit('locationClick', {
      location,
      cropInfo: undefined, // 普通地图点击不显示作物信息
      weatherForecast: [] // 临时空数组，实际会在父组件中填充
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  color: #666;
  font-size: 1rem;
}
</style>