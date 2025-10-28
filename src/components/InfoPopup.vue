<template>
  <div v-if="visible" class="info-popup">
    <div class="popup-header">
      <h3>位置信息</h3>
      <button @click="close" class="close-btn">×</button>
    </div>
    
    <div class="popup-content">
      <!-- 基本信息 -->
      <div class="info-section">
        <h4>📍 地理位置</h4>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">所在地:</span>
            <span class="value">{{ getLocationDisplayName() }}</span>
          </div>
          <div class="info-item">
            <span class="label">经度:</span>
            <span class="value">{{ data.location.lng.toFixed(6) }}°</span>
          </div>
          <div class="info-item">
            <span class="label">纬度:</span>
            <span class="value">{{ data.location.lat.toFixed(6) }}°</span>
          </div>
          <div class="info-item">
            <span class="label">海拔:</span>
            <span class="value">{{ data.location.elevation || '--' }}m</span>
          </div>
        </div>
      </div>

      <!-- 作物信息 -->
      <div v-if="data.cropInfo" class="info-section">
        <h4>🌾 作物信息</h4>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">作物名称:</span>
            <span class="value">{{ data.cropInfo.name || '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">种植时间:</span>
            <span class="value">{{ data.cropInfo.plantingTime || '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">备注:</span>
            <span class="value">{{ data.cropInfo.notes || '--' }}</span>
          </div>
        </div>
      </div>

      <!-- 土壤属性 -->
      <div class="info-section">
        <h4>🌍 土壤属性</h4>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">土壤类型:</span>
            <span class="value">{{ data.soilAttributes?.soilType || '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">pH值:</span>
            <span class="value">{{ data.soilAttributes?.ph !== undefined ? data.soilAttributes.ph : '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">有机质含量:</span>
            <span class="value">{{ data.soilAttributes?.organicMatter !== undefined ? data.soilAttributes.organicMatter + '%' : '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">土壤湿度:</span>
            <span class="value">{{ data.soilAttributes?.moisture !== undefined ? data.soilAttributes.moisture + '%' : '--' }}</span>
          </div>
        </div>
      </div>

      <!-- 地形高差 -->
      <div class="info-section">
        <h4>⛰️ 地形高差</h4>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">海拔高度:</span>
            <span class="value">{{ data.terrainInfo?.elevation !== undefined ? data.terrainInfo.elevation + 'm' : (data.location.elevation || '--') }}</span>
          </div>
          <div class="info-item">
            <span class="label">地形高差:</span>
            <span class="value">{{ data.terrainInfo?.relief !== undefined ? data.terrainInfo.relief + 'm' : '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">坡度:</span>
            <span class="value">{{ data.terrainInfo?.slope !== undefined ? data.terrainInfo.slope + '°' : '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">坡向:</span>
            <span class="value">{{ data.terrainInfo?.aspect || '--' }}</span>
          </div>
        </div>
      </div>

      <!-- 蒸散发信息 -->
      <div class="info-section">
        <h4>💧 蒸散发信息</h4>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">蒸散发量:</span>
            <span class="value">{{ data.evapotranspiration?.et !== undefined ? data.evapotranspiration.et + 'mm/d' : '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">潜在蒸散发量:</span>
            <span class="value">{{ data.evapotranspiration?.eto !== undefined ? data.evapotranspiration.eto + 'mm/d' : '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">蒸发皿蒸发量:</span>
            <span class="value">{{ data.evapotranspiration?.panEvaporation !== undefined ? data.evapotranspiration.panEvaporation + 'mm/d' : '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">备注:</span>
            <span class="value">{{ data.evapotranspiration?.notes || '--' }}</span>
          </div>
        </div>
      </div>

      <!-- 天气信息 -->
      <div class="info-section">
        <h4>🌤️ 未来7天天气</h4>
        
        <!-- 天气数据 -->
        <div v-if="data.weatherForecast && data.weatherForecast.length > 0" class="weather-list">
          <div 
            v-for="(weather, index) in data.weatherForecast" 
            :key="index"
            class="weather-item"
          >
            <div class="weather-date">{{ formatDate(weather.date) }}</div>
            <div class="weather-details">
              <span class="weather-desc">{{ weather.description }}</span>
              <span class="weather-temp">{{ weather.temperature.min }}°-{{ weather.temperature.max }}°</span>
              <span class="weather-precip">{{ weather.precipitation }}mm</span>
            </div>
          </div>
        </div>
        
        <!-- 初始状态和错误状态 -->
        <div v-else class="weather-center">
          <div class="weather-icon">🌤️</div>
          <p v-if="weatherError" class="error-text">⚠️ {{ weatherError }}</p>
          <p v-else class="prompt-text"></p>
          <button 
            @click="generateWeather" 
            :disabled="weatherLoading"
            class="weather-btn-center"
          >
            {{ weatherLoading ? '获取中...' : '获取未来七天天气' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { MapClickData } from '@/types'

const props = defineProps<{
  visible: boolean
  data: MapClickData
}>()

const emit = defineEmits<{
  close: []
  generateWeather: []
}>()

// 天气相关状态
const weatherLoading = ref(false)
const weatherError = ref('')
const hasAttemptedWeatherFetch = ref(false) // 是否已尝试获取天气

const close = () => {
  emit('close')
}

const generateWeather = () => {
  weatherLoading.value = true
  weatherError.value = ''
  hasAttemptedWeatherFetch.value = true // 标记已尝试获取
  emit('generateWeather')
}

// 监听天气数据变化，更新加载状态
watch(() => props.data.weatherForecast, (newWeather) => {
  weatherLoading.value = false
  // 只有在尝试获取天气后才显示错误
  if (hasAttemptedWeatherFetch.value && (!newWeather || newWeather.length === 0)) {
    weatherError.value = '天气数据获取失败'
  } else {
    weatherError.value = ''
  }
}, { immediate: true })

// 监听位置变化，重置天气状态
watch(() => props.data.location, () => {
  // 当位置改变时，重置所有天气相关状态
  weatherLoading.value = false
  weatherError.value = ''
  hasAttemptedWeatherFetch.value = false
}, { deep: true })

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    month: 'short', 
    day: 'numeric',
    weekday: 'short'
  })
}

const getLocationDisplayName = () => {
  if (!props.data.location.locationName) {
    return '获取中...'
  }
  
  const { name, level, province, parent } = props.data.location.locationName
  
  // 根据级别显示不同的信息
  switch (level) {
    case 'province':
      return `${name}`
    case 'city':
      return `${name}市${province ? `, ${province}` : ''}`
    case 'county':
      return `${name}${parent ? `, ${parent}市` : ''}${province ? `, ${province}` : ''}`
    case 'town':
      return `${name}${parent ? `, ${parent}` : ''}${province ? `, ${province}` : ''}`
    case 'village':
      return `${name}${parent ? `, ${parent}` : ''}${province ? `, ${province}` : ''}`
    default:
      return name
  }
}
</script>

<style scoped>
.info-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #42b883;
  color: white;
}

.popup-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.popup-content {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-section h4 {
  margin: 0 0 1rem 0;
  color: #42b883;
  font-size: 1rem;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #666;
}

.value {
  color: #333;
  font-weight: 600;
}

.weather-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.weather-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.weather-date {
  font-weight: 500;
  color: #42b883;
  min-width: 80px;
}

.weather-details {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.weather-desc {
  color: #666;
}

.weather-temp {
  color: #e74c3c;
  font-weight: 600;
}

.weather-precip {
  color: #3498db;
  font-weight: 600;
}

.weather-center {
  text-align: center;
  padding: 2rem 1rem;
}

.weather-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.prompt-text {
  margin: 0.5rem 0 1.5rem 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.error-text {
  margin: 0.5rem 0 1.5rem 0;
  color: #dc2626;
  font-size: 0.9rem;
}

.weather-btn-center {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 200px;
}

.weather-btn-center:hover:not(:disabled) {
  background: #2980b9;
}

.weather-btn-center:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}


@media (max-width: 768px) {
  .info-popup {
    width: 95%;
    max-height: 90vh;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .weather-details {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }
}
</style>