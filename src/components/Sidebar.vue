<template>
  <div class="sidebar">
    <!-- 导航栏内容 -->
    <div class="sidebar-content">
      <!-- 导航菜单 -->
      <nav class="navigation-menu">
        <div class="menu-section">
          <div class="menu-item" @click="toggleMenu('search')">
            <span class="menu-icon">🔍</span>
            <span class="menu-text">地点搜索</span>
            <span class="menu-arrow">{{ expandedMenus.search ? '▼' : '▶' }}</span>
          </div>
          <div v-if="expandedMenus.search" class="submenu">
            <div class="submenu-item" @click="showCitySearchModal">城市搜索</div>
            <div class="submenu-item" @click="showCoordinateSearchModal">坐标定位</div>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-item" @click="toggleMenu('map')">
            <span class="menu-icon">🗺️</span>
            <span class="menu-text">地图切换</span>
            <span class="menu-arrow">{{ expandedMenus.map ? '▼' : '▶' }}</span>
          </div>
          <div v-if="expandedMenus.map" class="submenu">
            <div class="submenu-item" @click="changeMapLayer('Esri卫星图')">Esri卫星图</div>
            <div class="submenu-item" @click="changeMapLayer('高德街道图')">街道图</div>
            <div class="submenu-item" @click="changeMapLayer('高德卫星图')">高德卫星</div>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-item" @click="toggleMenu('import')">
            <span class="menu-icon">📥</span>
            <span class="menu-text">数据导入</span>
            <span class="menu-arrow">{{ expandedMenus.import ? '▼' : '▶' }}</span>
          </div>
          <div v-if="expandedMenus.import" class="submenu">
            <div class="submenu-item" @click="showImportData">导入数据</div>
            <div class="submenu-item" @click="showExportData">导出数据</div>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-item" @click="toggleMenu('data')">
            <span class="menu-icon">📈</span>
            <span class="menu-text">数据中心</span>
            <span class="menu-arrow">{{ expandedMenus.data ? '▼' : '▶' }}</span>
          </div>
          <div v-if="expandedMenus.data" class="submenu">
            <div class="submenu-item" @click="showStatistics">统计分析</div>
            <div class="submenu-item" @click="showReports">报表生成</div>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-item" @click="toggleMenu('calculation')">
            <span class="menu-icon">🧮</span>
            <span class="menu-text">数据计算</span>
            <span class="menu-arrow">{{ expandedMenus.calculation ? '▼' : '▶' }}</span>
          </div>
          <div v-if="expandedMenus.calculation" class="submenu">
            <div class="submenu-item" @click="showDistanceCalculation">距离计算</div>
            <div class="submenu-item" @click="showAreaCalculation">面积计算</div>
            <div class="submenu-item" @click="showCoordinateTransform">坐标转换</div>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-item" @click="toggleMenu('region')">
            <span class="menu-icon">🎯</span>
            <span class="menu-text">分区切换</span>
            <span class="menu-arrow">{{ expandedMenus.region ? '▼' : '▶' }}</span>
          </div>
          <div v-if="expandedMenus.region" class="submenu">
            <!-- 动态显示所有分区（包括石宝镇） -->
            <div 
              v-for="dataSet in regionDataSets" 
              :key="dataSet.id"
              class="submenu-item user-region-item" 
              @click="gotoUserRegion(dataSet)">
              <span class="region-icon">🎯</span>
              <span>{{ dataSet.regionName }}</span>
              <span class="region-point-count">({{ dataSet.points.length }})</span>
            </div>
            <div v-if="regionDataSets.length === 0 && expandedMenus.region" class="submenu-hint">
              暂无导入的分区数据
            </div>
            <!-- 分区管理（放在最下方） -->
            <div class="submenu-item submenu-header" @click="showRegionManagement">
              <span class="region-icon">📋</span>
              <span>分区管理</span>
            </div>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-item" @click="toggleMenu('system')">
            <span class="menu-icon">⚙️</span>
            <span class="menu-text">系统管理</span>
            <span class="menu-arrow">{{ expandedMenus.system ? '▼' : '▶' }}</span>
          </div>
          <div v-if="expandedMenus.system" class="submenu">
            <div class="submenu-item" @click="showAuth">登录 / 注册</div>
            <div class="submenu-item" @click="showSettings">系统设置</div>
            <div class="submenu-item" @click="showAbout">关于系统</div>
          </div>
        </div>
      </nav>
    </div>
  </div>

  <!-- 城市搜索模态框 -->
  <div v-if="showCityModal" class="modal-overlay" @click="closeCityModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>城市搜索</h3>
        <button class="modal-close" @click="closeCityModal">×</button>
      </div>
      <div class="modal-body">
        <div class="search-input-group">
          <input 
            type="text" 
            v-model="citySearchQuery" 
            placeholder="输入城市名、县名或省份"
            @keyup.enter="handleCitySearch"
            class="modal-search-input"
          />
          <button @click="handleCitySearch" class="modal-search-btn">搜索</button>
        </div>
        
        <!-- 搜索结果 -->
        <div v-if="citySearchResults.length > 0" class="modal-search-results">
          <div 
            v-for="city in citySearchResults.slice(0, 15)" 
            :key="`${city.name}-${city.level}`"
            @click="selectCity(city)"
            class="modal-search-result-item"
          >
            <div class="city-info">
              <span class="city-name">{{ city.name }}</span>
              <span class="city-level">{{ getLevelText(city.level) }}</span>
            </div>
            <div class="city-location">
              <span class="city-province">{{ city.province || city.parent }}</span>
            </div>
          </div>
        </div>
        
        <!-- 快速定位 -->
        <div class="quick-location">
          <label>快速定位：</label>
          <select @change="goToCity">
            <option value="">选择热门城市</option>
            <option v-for="city in hotCities" :key="city.name" :value="city.name">
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <!-- 坐标定位模态框 -->
  <div v-if="showCoordinateModal" class="modal-overlay" @click="closeCoordinateModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>坐标定位</h3>
        <button class="modal-close" @click="closeCoordinateModal">×</button>
      </div>
      <div class="modal-body">
        <div class="coordinate-form">
          <div class="coordinate-input-group">
            <div class="coordinate-input">
              <label>纬度：</label>
              <input 
                type="number" 
                v-model="latitude" 
                placeholder="例：39.9042"
                step="0.000001"
                min="-90"
                max="90"
                class="coordinate-field"
              />
            </div>
            <div class="coordinate-input">
              <label>经度：</label>
              <input 
                type="number" 
                v-model="longitude" 
                placeholder="例：116.4074"
                step="0.000001"
                min="-180"
                max="180"
                class="coordinate-field"
              />
            </div>
          </div>
          <button @click="handleCoordinateSearch" class="modal-search-btn">定位</button>
        </div>
        
        <div class="coordinate-info">
          <p>请输入有效的经纬度坐标：</p>
          <ul>
            <li>纬度范围：-90° 到 90°</li>
            <li>经度范围：-180° 到 180°</li>
            <li>支持小数点后6位精度</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- 数据导入面板 -->
  <DataImportPanel
    v-if="showImportModal"
    @close="closeImportModal"
    @import-success="handleImportSuccess"
    @manage-data="showExportData"
  />
  
  <!-- 分区管理面板 -->
  <RegionManagementPanel
    v-if="showRegionManagementModal"
    :visible="showRegionManagementModal"
    :data-sets="userDataSets"
    @close="closeRegionManagement"
    @region-deleted="handleRegionDeleted"
    @region-renamed="handleRegionRenamed"
    @view-region="handleViewRegionFromManagement"
  />

  <!-- 认证面板 -->
  <AuthPanel
    v-if="showAuthModal"
    @close="closeAuth"
    @auth-success="handleAuthSuccess"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { CompleteCityDatabaseService, type CityInfo as ServiceCityInfo } from '@/services/completeCityDatabaseService'
import DataImportPanel from './DataImportPanel.vue'
import RegionManagementPanel from './RegionManagementPanel.vue'
import AuthPanel from './AuthPanel.vue'
import { UserDataStorageService } from '@/services/userDataStorageService'
import type { UserDataSet } from '@/types/userData'

// 定义事件
const emit = defineEmits<{
  citySelected: [city: ServiceCityInfo]
  coordinateSelected: [lat: number, lng: number]
  layerChanged: [layerName: string]
  cityQuickSelect: [cityName: string]
  regionNavigate: [lat: number, lng: number, zoom: number, regionName?: string]
  userDataUpdated: [dataSets: UserDataSet[]]
}>()

// 响应式数据
const showCityModal = ref(false)
const showCoordinateModal = ref(false)
const showImportModal = ref(false)
const showRegionManagementModal = ref(false)
const showAuthModal = ref(false)
const userDataSets = ref<UserDataSet[]>([])
const expandedMenus = ref({
  search: false,
  map: false,
  import: false,
  data: false,
  calculation: false,
  region: false,
  system: false
})

// 移除了 expandedSubMenus，因为不再需要嵌套菜单

// 搜索相关数据
const citySearchQuery = ref('')
const citySearchResults = ref<ServiceCityInfo[]>([])
const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)

// 获取服务实例
const cityDatabaseService = CompleteCityDatabaseService.getInstance()
const hotCities = cityDatabaseService.getHotCities()

// 监听城市搜索输入
watch(citySearchQuery, (newQuery) => {
  if (newQuery.trim().length >= 2) {
    citySearchResults.value = cityDatabaseService.searchCities(newQuery)
  } else {
    citySearchResults.value = []
  }
})

// 方法
const toggleMenu = (menuKey: keyof typeof expandedMenus.value) => {
  // 关闭其他菜单
  Object.keys(expandedMenus.value).forEach(key => {
    if (key !== menuKey) {
      expandedMenus.value[key as keyof typeof expandedMenus.value] = false
    }
  })
  
  // 切换当前菜单
  expandedMenus.value[menuKey] = !expandedMenus.value[menuKey]
}

// 显示分区管理
const showRegionManagement = () => {
  showRegionManagementModal.value = true
}

// 关闭分区管理
const closeRegionManagement = () => {
  showRegionManagementModal.value = false
}

// 处理分区删除
const handleRegionDeleted = () => {
  loadUserData()
  emit('userDataUpdated', userDataSets.value)
  console.log('✅ 分区已删除，数据已更新')
}

// 处理分区重命名
const handleRegionRenamed = () => {
  loadUserData()
  emit('userDataUpdated', userDataSets.value)
  console.log('✅ 分区已重命名，数据已更新')
}

// 从分区管理面板查看分区
const handleViewRegionFromManagement = (dataSet: UserDataSet) => {
  // 导航到该分区
  gotoUserRegion(dataSet)
}

const showCitySearchModal = () => {
  showCityModal.value = true
  expandedMenus.value.search = false
}

const showCoordinateSearchModal = () => {
  showCoordinateModal.value = true
  expandedMenus.value.search = false
}

const closeCityModal = () => {
  showCityModal.value = false
  citySearchQuery.value = ''
  citySearchResults.value = []
}

const closeCoordinateModal = () => {
  showCoordinateModal.value = false
  latitude.value = null
  longitude.value = null
}

const handleCitySearch = () => {
  if (!citySearchQuery.value.trim()) return
  
  const results = cityDatabaseService.searchCities(citySearchQuery.value)
  if (results.length > 0) {
    // 如果只有一个结果，直接定位
    if (results.length === 1) {
      selectCity(results[0])
    }
    // 否则显示搜索结果列表
    citySearchResults.value = results
  } else {
    alert(`未找到城市 "${citySearchQuery.value}"，请检查拼写或尝试其他城市名`)
  }
}

const selectCity = (city: ServiceCityInfo) => {
  emit('citySelected', city)
  
  // 清空搜索并关闭模态框
  citySearchQuery.value = ''
  citySearchResults.value = []
  showCityModal.value = false
}

const handleCoordinateSearch = () => {
  if (latitude.value === null || longitude.value === null) return
  
  const lat = latitude.value
  const lng = longitude.value
  
  // 验证经纬度范围
  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    emit('coordinateSelected', lat, lng)
    
    // 清空输入框并关闭模态框
    latitude.value = null
    longitude.value = null
    showCoordinateModal.value = false
  } else {
    alert('经纬度范围无效！纬度范围：-90到90，经度范围：-180到180')
  }
}

const changeMapLayer = (layerName: string) => {
  emit('layerChanged', layerName)
}

const goToCity = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const cityName = target.value
  if (cityName) {
    emit('cityQuickSelect', cityName)
    // 重置选择
    target.value = ''
  }
}

// 数据导入导出方法
const showImportData = () => {
  showImportModal.value = true
  showCityModal.value = false
  showCoordinateModal.value = false
}

const showExportData = () => {
  // TODO: 显示数据管理面板
  console.log('显示数据导出/管理')
  alert('数据管理功能开发中...')
}

// 计算有分区名称的数据集
const regionDataSets = computed(() => {
  return userDataSets.value.filter(dataSet => dataSet.regionName && dataSet.regionName.trim() !== '')
})

// 加载用户数据
const loadUserData = () => {
  userDataSets.value = UserDataStorageService.loadDataSets()
  console.log('✅ Sidebar: 已加载用户数据', userDataSets.value.length, '个数据集')
  console.log('✅ Sidebar: 有分区名称的数据集', regionDataSets.value.length, '个')
}

// 处理导入成功
const handleImportSuccess = (dataSet: UserDataSet) => {
  loadUserData()
  emit('userDataUpdated', userDataSets.value)
}

// 关闭导入面板
const closeImportModal = () => {
  showImportModal.value = false
}

// 页面加载时恢复用户数据
onMounted(() => {
  loadUserData()
})

const showStatistics = () => {
  console.log('显示统计分析')
}

const showReports = () => {
  console.log('显示报表生成')
}

const showDistanceCalculation = () => {
  console.log('显示距离计算')
}

const showAreaCalculation = () => {
  console.log('显示面积计算')
}

const showCoordinateTransform = () => {
  console.log('显示坐标转换')
}

/**
 * 导航到用户导入的分区（包括未命名分区）
 */
const gotoUserRegion = (dataSet: UserDataSet) => {
  // 只要有数据点就可以导航，不要求必须有分区名称
  if (dataSet.points.length === 0) return
  
  // 计算所有点的中心坐标
  let sumLat = 0
  let sumLng = 0
  let minLat = Infinity
  let maxLat = -Infinity
  let minLng = Infinity
  let maxLng = -Infinity
  
  dataSet.points.forEach(point => {
    sumLat += point.latitude
    sumLng += point.longitude
    minLat = Math.min(minLat, point.latitude)
    maxLat = Math.max(maxLat, point.latitude)
    minLng = Math.min(minLng, point.longitude)
    maxLng = Math.max(maxLng, point.longitude)
  })
  
  // 计算中心点
  const centerLat = sumLat / dataSet.points.length
  const centerLng = sumLng / dataSet.points.length
  
  // 根据点之间的跨度计算合适的缩放级别
  const latSpan = maxLat - minLat
  const lngSpan = maxLng - minLng
  const maxSpan = Math.max(latSpan, lngSpan)
  
  // 根据跨度计算缩放级别（范围大概在 10-15）
  let zoom = 14
  if (maxSpan > 0.05) zoom = 11 // 跨度大，缩小
  else if (maxSpan > 0.02) zoom = 12
  else if (maxSpan > 0.01) zoom = 13
  else if (maxSpan > 0.005) zoom = 14
  else zoom = 15 // 跨度小，放大
  
  const regionDisplayName = dataSet.regionName || '未命名分区'
  console.log(`📍 导航到分区 "${regionDisplayName}" (${dataSet.points.length}个点)`)
  emit('regionNavigate', centerLat, centerLng, zoom, dataSet.regionName)
}

const showAuth = () => {
  showAuthModal.value = true
  expandedMenus.value.system = false
}

const closeAuth = () => {
  showAuthModal.value = false
}

const handleAuthSuccess = () => {
  console.log('✅ 认证成功')
  // 可以在这里触发数据重新加载等操作
}

const showSettings = () => {
  console.log('显示系统设置')
}

const showAbout = () => {
  console.log('显示关于系统')
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
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-right: 2px solid #2c3e50;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  overflow-y: auto;
}


.sidebar-content {
  padding: 20px 0;
  height: 100%;
  overflow-y: auto;
}

/* 导航菜单 */
.navigation-menu {
  padding: 0 15px;
  margin-bottom: 30px;
}

.menu-section {
  margin-bottom: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 4px;
  background: rgba(52, 73, 94, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
}

.menu-item:hover {
  background: rgba(52, 152, 219, 0.2);
  border-color: #3498db;
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.menu-item.active {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-color: #2980b9;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.menu-icon {
  font-size: 18px;
  margin-right: 12px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.menu-text {
  flex: 1;
  color: #ecf0f1;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.menu-arrow {
  color: #bdc3c7;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.menu-item:hover .menu-arrow {
  color: #3498db;
}

/* 子菜单 */
.submenu {
  margin-left: 20px;
  margin-top: 8px;
  border-left: 2px solid #34495e;
  padding-left: 15px;
}

.submenu-item {
  padding: 8px 12px;
  margin-bottom: 4px;
  background: rgba(44, 62, 80, 0.4);
  border-radius: 6px;
  cursor: pointer;
  color: #bdc3c7;
  font-size: 13px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
}

.submenu-item:hover {
  background: rgba(52, 152, 219, 0.3);
  color: #ecf0f1;
  border-color: #3498db;
  transform: translateX(3px);
}

.region-icon {
  font-size: 14px;
}

.user-region-item {
  background: rgba(46, 204, 113, 0.15) !important;
  border-left: 3px solid #2ecc71 !important;
}

.user-region-item:hover {
  background: rgba(46, 204, 113, 0.25) !important;
  border-left-color: #27ae60 !important;
}

.region-point-count {
  margin-left: auto;
  font-size: 11px;
  color: #95a5a6;
  opacity: 0.8;
}

.submenu-hint {
  padding: 8px 12px;
  margin-bottom: 4px;
  color: #7f8c8d;
  font-size: 12px;
  font-style: italic;
  text-align: center;
}

.submenu-header {
  font-weight: 600;
  background: rgba(52, 152, 219, 0.2) !important;
}

.submenu-header:hover {
  background: rgba(52, 152, 219, 0.3) !important;
}

.sub-submenu {
  margin-left: 15px;
  margin-top: 4px;
  border-left: 2px solid #34495e;
  padding-left: 15px;
}

/* 搜索面板 */
.search-panel {
  background: rgba(44, 62, 80, 0.4);
  margin: 0 15px 20px 15px;
  border-radius: 10px;
  border: 1px solid #34495e;
  overflow: hidden;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(52, 73, 94, 0.6);
  border-bottom: 1px solid #34495e;
}

.search-title {
  color: #ecf0f1;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
}

.close-btn {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #c0392b;
  transform: scale(1.1);
}

.search-section,
.coordinate-section,
.city-selector {
  padding: 15px 20px;
  border-bottom: 1px solid #34495e;
}

.search-section:last-child,
.coordinate-section:last-child,
.city-selector:last-child {
  border-bottom: none;
}

.search-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #bdc3c7;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.city-search-group {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #34495e;
  border-radius: 6px;
  font-size: 13px;
  background: rgba(44, 62, 80, 0.6);
  color: #ecf0f1;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background: rgba(44, 62, 80, 0.8);
}

.search-input::placeholder {
  color: #7f8c8d;
}

.search-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(39, 174, 96, 0.3);
}

.search-btn:hover {
  background: linear-gradient(135deg, #229954, #1e8449);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(39, 174, 96, 0.4);
}

.search-results {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #34495e;
  border-radius: 6px;
  background: rgba(44, 62, 80, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.search-result-item {
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #2c3e50;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: rgba(52, 152, 219, 0.2);
}

.search-result-item:last-child {
  border-bottom: none;
}

.city-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.city-name {
  font-weight: 600;
  color: #ecf0f1;
  font-size: 13px;
}

.city-level {
  background: #3498db;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
}

.city-location {
  font-size: 11px;
  color: #95a5a6;
}

.city-province {
  font-size: 11px;
  color: #95a5a6;
}

.coordinate-input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.coordinate-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.coordinate-input label {
  min-width: 40px;
  font-size: 12px;
  color: #bdc3c7;
  font-weight: 500;
}

.coordinate-field {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #34495e;
  border-radius: 6px;
  font-size: 12px;
  background: rgba(44, 62, 80, 0.6);
  color: #ecf0f1;
  transition: all 0.3s ease;
}

.coordinate-field:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background: rgba(44, 62, 80, 0.8);
}

.city-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.city-selector label {
  font-size: 12px;
  color: #bdc3c7;
  font-weight: 500;
}

.city-selector select {
  padding: 8px 12px;
  border: 1px solid #34495e;
  border-radius: 6px;
  font-size: 12px;
  background: rgba(44, 62, 80, 0.6);
  color: #ecf0f1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.city-selector select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background: rgba(44, 62, 80, 0.8);
}

/* 滚动条样式 */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: rgba(44, 62, 80, 0.3);
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(52, 152, 219, 0.6);
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(52, 152, 219, 0.8);
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  border: 2px solid #34495e;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: rgba(52, 73, 94, 0.6);
  border-bottom: 2px solid #34495e;
}

.modal-header h3 {
  margin: 0;
  color: #ecf0f1;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}

.modal-close {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #c0392b;
  transform: scale(1.1);
}

.modal-body {
  padding: 25px;
  max-height: 60vh;
  overflow-y: auto;
}

.search-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.modal-search-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #34495e;
  border-radius: 8px;
  font-size: 14px;
  background: rgba(44, 62, 80, 0.6);
  color: #ecf0f1;
  transition: all 0.3s ease;
}

.modal-search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background: rgba(44, 62, 80, 0.8);
}

.modal-search-input::placeholder {
  color: #7f8c8d;
}

.modal-search-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
}

.modal-search-btn:hover {
  background: linear-gradient(135deg, #229954, #1e8449);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(39, 174, 96, 0.4);
}

.modal-search-results {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #34495e;
  border-radius: 8px;
  background: rgba(44, 62, 80, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}

.modal-search-result-item {
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #2c3e50;
  transition: background-color 0.2s ease;
}

.modal-search-result-item:hover {
  background-color: rgba(52, 152, 219, 0.2);
}

.modal-search-result-item:last-child {
  border-bottom: none;
}

.quick-location {
  margin-top: 20px;
}

.quick-location label {
  display: block;
  margin-bottom: 8px;
  color: #bdc3c7;
  font-size: 14px;
  font-weight: 500;
}

.quick-location select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #34495e;
  border-radius: 6px;
  font-size: 14px;
  background: rgba(44, 62, 80, 0.6);
  color: #ecf0f1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-location select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background: rgba(44, 62, 80, 0.8);
}

.coordinate-form {
  margin-bottom: 20px;
}

.coordinate-input-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.coordinate-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.coordinate-input label {
  min-width: 50px;
  font-size: 14px;
  color: #bdc3c7;
  font-weight: 500;
}

.coordinate-field {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #34495e;
  border-radius: 6px;
  font-size: 14px;
  background: rgba(44, 62, 80, 0.6);
  color: #ecf0f1;
  transition: all 0.3s ease;
}

.coordinate-field:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background: rgba(44, 62, 80, 0.8);
}

.coordinate-info {
  background: rgba(44, 62, 80, 0.4);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #34495e;
}

.coordinate-info p {
  margin: 0 0 10px 0;
  color: #bdc3c7;
  font-size: 14px;
}

.coordinate-info ul {
  margin: 0;
  padding-left: 20px;
  color: #95a5a6;
  font-size: 13px;
}

.coordinate-info li {
  margin-bottom: 5px;
}

/* 模态框滚动条 */
.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: rgba(44, 62, 80, 0.3);
}

.modal-body::-webkit-scrollbar-thumb {
  background: rgba(52, 152, 219, 0.6);
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(52, 152, 219, 0.8);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 180px;
  }
  
  .sidebar-content {
    padding: 15px 0;
  }
  
  .title-text {
    font-size: 16px;
  }
  
  .menu-item {
    padding: 10px 12px;
  }
  
  .menu-text {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 2px solid #2c3e50;
  }
  
  .sidebar-content {
    padding: 10px;
  }
}
</style>