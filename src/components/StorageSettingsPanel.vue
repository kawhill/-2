<!-- 存储设置面板 -->
<template>
  <div class="storage-settings-panel">
    <div class="panel-header">
      <h3>🔒 数据存储方式</h3>
      <p class="subtitle">选择数据存储位置，保护您的隐私</p>
    </div>

    <div class="storage-options">
      <!-- 本地存储选项 -->
      <label class="storage-option" :class="{ active: selectedType === 'local' }">
        <div class="option-header">
          <input 
            type="radio" 
            value="local" 
            v-model="selectedType"
            @change="handleStorageChange"
          />
          <div class="option-title">
            <strong>💾 本地存储（推荐）</strong>
            <span class="badge recommended" v-if="selectedType === 'local'">当前使用</span>
          </div>
        </div>
        <div class="option-content">
          <p>数据保存在您的浏览器中，完全私有，不会上传到云端</p>
          <ul class="feature-list">
            <li class="feature-item positive">✅ 数据完全私有，不上传云端</li>
            <li class="feature-item positive">✅ 不需要登录账号</li>
            <li class="feature-item positive">✅ 访问速度快，无需网络</li>
            <li class="feature-item negative">⚠️ 不跨设备同步</li>
            <li class="feature-item negative">⚠️ 清除浏览器数据会丢失</li>
            <li class="feature-item info">📦 存储空间：5MB</li>
          </ul>
        </div>
      </label>

      <!-- 云存储选项 -->
      <label class="storage-option" :class="{ active: selectedType === 'cloud' }">
        <div class="option-header">
          <input 
            type="radio" 
            value="cloud" 
            v-model="selectedType"
            @change="handleStorageChange"
          />
          <div class="option-title">
            <strong>☁️ 云存储（同步）</strong>
            <span class="badge" v-if="selectedType === 'cloud'">当前使用</span>
            <span class="badge coming-soon" v-if="selectedType !== 'cloud'">即将推出</span>
          </div>
        </div>
        <div class="option-content">
          <p>数据同步到云端，可在多设备访问和编辑</p>
          <ul class="feature-list">
            <li class="feature-item positive">✅ 跨设备同步数据</li>
            <li class="feature-item positive">✅ 自动数据备份</li>
            <li class="feature-item positive">✅ 多设备同时编辑</li>
            <li class="feature-item negative">⚠️ 需要登录账号</li>
            <li class="feature-item negative">⚠️ 需要网络连接</li>
            <li class="feature-item info">📦 存储空间：500MB（免费）</li>
          </ul>
        </div>
      </label>
    </div>

    <!-- 切换提示 -->
    <div v-if="showSwitchTip" class="switch-tip">
      <p>💡 切换存储方式后，新数据将保存到新的存储位置</p>
      <p class="warning">⚠️ 请注意：本地存储和云存储的数据是独立的，不会自动迁移</p>
    </div>

    <!-- 当前存储信息 -->
    <div class="storage-info" v-if="storageInfo">
      <h4>存储信息</h4>
      <div class="info-item">
        <span>已使用：</span>
        <span>{{ storageInfo.usedMB.toFixed(2) }} MB / {{ storageInfo.totalMB }} MB</span>
      </div>
      <div class="info-progress">
        <div 
          class="progress-bar" 
          :style="{ width: storageInfo.usagePercent + '%' }"
        ></div>
      </div>
      <div class="info-item">
        <span>剩余空间：</span>
        <span>{{ storageInfo.remainingMB.toFixed(2) }} MB</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { StorageSettings } from '@/services/storage/StorageSettings'
import { storageService } from '@/services/storage/StorageService'
import type { StorageType } from '@/services/storage/StorageSettings'
import type { StorageInfo } from '@/types/userData'

const selectedType = ref<StorageType>('local')
const storageInfo = ref<StorageInfo | null>(null)
const showSwitchTip = ref(false)

onMounted(async () => {
  selectedType.value = StorageSettings.getStorageType()
  await loadStorageInfo()
})

const loadStorageInfo = async () => {
  try {
    storageInfo.value = await storageService.getStorageInfo()
  } catch (error) {
    console.error('加载存储信息失败:', error)
  }
}

const handleStorageChange = async () => {
  try {
    const success = await storageService.switchStorage(selectedType.value)
    if (success) {
      StorageSettings.setStorageType(selectedType.value)
      showSwitchTip.value = true
      await loadStorageInfo()
      
      // 3秒后隐藏提示
      setTimeout(() => {
        showSwitchTip.value = false
      }, 3000)
    } else {
      // 切换失败，恢复原值
      selectedType.value = StorageSettings.getStorageType()
      alert('切换存储方式失败，请稍后重试')
    }
  } catch (error) {
    console.error('切换存储方式失败:', error)
    selectedType.value = StorageSettings.getStorageType()
    alert('切换存储方式失败: ' + (error instanceof Error ? error.message : String(error)))
  }
}
</script>

<style scoped>
.storage-settings-panel {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.panel-header {
  margin-bottom: 24px;
}

.panel-header h3 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 14px;
}

.storage-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.storage-option {
  display: block;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.storage-option:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.storage-option.active {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.option-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.option-header input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.option-title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: normal;
  background: rgba(255, 255, 255, 0.2);
}

.badge.recommended {
  background: #4caf50;
  color: white;
}

.badge.coming-soon {
  background: #ff9800;
  color: white;
}

.option-content {
  margin-left: 32px;
}

.option-content p {
  margin: 0 0 12px 0;
  opacity: 0.9;
  line-height: 1.5;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-item {
  font-size: 14px;
  line-height: 1.5;
}

.feature-item.positive {
  color: #4caf50;
}

.feature-item.negative {
  color: #ff9800;
}

.feature-item.info {
  color: #2196f3;
}

.switch-tip {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
}

.switch-tip p {
  margin: 4px 0;
  font-size: 14px;
  line-height: 1.5;
}

.switch-tip .warning {
  color: #ff9800;
  font-weight: 500;
}

.storage-info {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 16px;
}

.storage-info h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-progress {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .storage-settings-panel {
    padding: 16px;
  }

  .option-content {
    margin-left: 0;
  }
}
</style>

