<template>
  <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>📋 分区管理</h3>
        <button @click="close" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <!-- 分区列表 -->
        <div v-if="regionDataSets.length > 0" class="region-list">
          <div 
            v-for="dataSet in regionDataSets" 
            :key="dataSet.id"
            class="region-item"
          >
            <div class="region-info">
              <div class="region-name-row">
                <span class="region-icon">🎯</span>
                <span class="region-name">{{ dataSet.regionName }}</span>
                <span class="region-badge">{{ dataSet.points.length }} 个点</span>
              </div>
              <div class="region-meta">
                <span class="dataset-name">数据集：{{ dataSet.name }}</span>
                <span class="region-date">创建：{{ formatDate(dataSet.createdAt) }}</span>
              </div>
            </div>
            <div class="region-actions">
              <button @click="handleViewRegion(dataSet)" class="btn-view">查看</button>
              <button @click="handleRenameRegion(dataSet)" class="btn-rename">重命名</button>
              <button @click="handleDeleteRegion(dataSet)" class="btn-delete">删除</button>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="empty-state">
          <div class="empty-icon">📭</div>
          <p class="empty-text">暂无分区数据</p>
          <p class="empty-hint">导入数据时可以填写分区名称</p>
        </div>
      </div>
    </div>
    
    <!-- 重命名对话框 -->
    <div v-if="showRenameDialog" class="confirm-overlay" @click="cancelRename">
      <div class="confirm-dialog rename-dialog" @click.stop>
        <div class="confirm-header rename-header">
          <h4>✏️ 重命名分区</h4>
        </div>
        <div class="confirm-body">
          <div class="rename-input-group">
            <label>原分区名称：</label>
            <div class="old-name">{{ renamingRegion?.regionName }}</div>
          </div>
          <div class="rename-input-group">
            <label>新分区名称：</label>
            <input 
              v-model="newRegionName" 
              type="text" 
              class="rename-input"
              placeholder="请输入新分区名称"
              @keyup.enter="confirmRename"
              @keyup.esc="cancelRename"
              ref="renameInputRef"
            />
          </div>
          <p class="rename-hint">💡 修改后将在分区切换菜单中显示新名称</p>
        </div>
        <div class="confirm-actions">
          <button @click="cancelRename" class="btn-cancel">取消</button>
          <button @click="confirmRename" class="btn-confirm-rename" :disabled="!newRegionName || newRegionName.trim() === ''">确认重命名</button>
        </div>
      </div>
    </div>

    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="confirm-overlay" @click="cancelDelete">
      <div class="confirm-dialog" @click.stop>
        <div class="confirm-header">
          <h4>⚠️ 确认删除</h4>
        </div>
        <div class="confirm-body">
          <p>确定要删除分区 <strong>"{{ deletingRegion?.regionName }}"</strong> 吗？</p>
          <p class="confirm-warning">此操作不可恢复，将删除该分区的所有数据点（{{ deletingRegion?.points.length }} 个）</p>
        </div>
        <div class="confirm-actions">
          <button @click="cancelDelete" class="btn-cancel">取消</button>
          <button @click="confirmDelete" class="btn-confirm-delete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { UserDataSet } from '@/types/userData'
import { UserDataStorageService } from '@/services/userDataStorageService'

const props = defineProps<{
  visible: boolean
  dataSets: UserDataSet[]
}>()

const emit = defineEmits<{
  close: []
  regionDeleted: []
  regionRenamed: []
  viewRegion: [dataSet: UserDataSet]
}>()

// 计算有分区名称的数据集
const regionDataSets = computed(() => {
  return props.dataSets.filter(dataSet => dataSet.regionName && dataSet.regionName.trim() !== '')
})

// 重命名相关状态
const showRenameDialog = ref(false)
const renamingRegion = ref<UserDataSet | null>(null)
const newRegionName = ref('')
const renameInputRef = ref<HTMLInputElement>()

// 删除相关状态
const showDeleteConfirm = ref(false)
const deletingRegion = ref<UserDataSet | null>(null)

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 关闭面板
const close = () => {
  emit('close')
  showDeleteConfirm.value = false
  deletingRegion.value = null
  showRenameDialog.value = false
  renamingRegion.value = null
  newRegionName.value = ''
}

// 点击遮罩层关闭
const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    close()
  }
}

// 查看分区
const handleViewRegion = (dataSet: UserDataSet) => {
  emit('viewRegion', dataSet)
  close()
}

// 重命名分区
const handleRenameRegion = (dataSet: UserDataSet) => {
  renamingRegion.value = dataSet
  newRegionName.value = dataSet.regionName || ''
  showRenameDialog.value = true
  
  // 自动聚焦输入框
  nextTick(() => {
    renameInputRef.value?.focus()
    renameInputRef.value?.select()
  })
}

// 取消重命名
const cancelRename = () => {
  showRenameDialog.value = false
  renamingRegion.value = null
  newRegionName.value = ''
}

// 确认重命名
const confirmRename = () => {
  if (!renamingRegion.value || !newRegionName.value.trim()) return
  
  const trimmedName = newRegionName.value.trim()
  
  // 检查是否与其他分区名称重复
  const existingRegion = regionDataSets.value.find(
    ds => ds.id !== renamingRegion.value!.id && ds.regionName === trimmedName
  )
  
  if (existingRegion) {
    alert('分区名称已存在，请使用其他名称')
    return
  }
  
  // 更新数据集
  const updatedDataSet: UserDataSet = {
    ...renamingRegion.value,
    regionName: trimmedName,
    updatedAt: new Date().toISOString()
  }
  
  const success = UserDataStorageService.updateDataSet(renamingRegion.value.id, updatedDataSet)
  
  if (success) {
    console.log('✅ 已重命名分区:', renamingRegion.value.regionName, '->', trimmedName)
    emit('regionRenamed')
    cancelRename()
  } else {
    alert('重命名失败，请重试')
  }
}

// 删除分区
const handleDeleteRegion = (dataSet: UserDataSet) => {
  deletingRegion.value = dataSet
  showDeleteConfirm.value = true
}

// 取消删除
const cancelDelete = () => {
  showDeleteConfirm.value = false
  deletingRegion.value = null
}

// 确认删除
const confirmDelete = () => {
  if (!deletingRegion.value) return
  
  const success = UserDataStorageService.deleteDataSet(deletingRegion.value.id)
  
  if (success) {
    console.log('✅ 已删除分区:', deletingRegion.value.regionName)
    emit('regionDeleted')
    cancelDelete()
    close()
  } else {
    alert('删除失败，请重试')
  }
}

// 监听 visible 变化，重置状态
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    showDeleteConfirm.value = false
    deletingRegion.value = null
    showRenameDialog.value = false
    renamingRegion.value = null
    newRegionName.value = ''
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.region-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.region-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s;
}

.region-item:hover {
  background: #e9ecef;
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.region-info {
  flex: 1;
}

.region-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.region-icon {
  font-size: 20px;
}

.region-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.region-badge {
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
}

.region-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #666;
}

.dataset-name,
.region-date {
  color: #888;
}

.region-actions {
  display: flex;
  gap: 8px;
}

.btn-view,
.btn-rename,
.btn-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-view {
  background: #3498db;
  color: white;
}

.btn-view:hover {
  background: #2980b9;
}

.btn-rename {
  background: #f39c12;
  color: white;
}

.btn-rename:hover {
  background: #e67e22;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background: #c0392b;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 18px;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.empty-hint {
  font-size: 14px;
  color: #888;
  margin: 0;
}

/* 确认对话框 */
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.confirm-dialog {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.confirm-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff3cd;
  border-radius: 12px 12px 0 0;
}

.confirm-header h4 {
  margin: 0;
  color: #856404;
  font-size: 16px;
}

.confirm-body {
  padding: 24px;
}

.confirm-body p {
  margin: 0 0 12px 0;
  color: #333;
  line-height: 1.6;
}

.confirm-body strong {
  color: #e74c3c;
}

.confirm-warning {
  color: #e74c3c;
  font-size: 14px;
  font-weight: 500;
}

.confirm-actions {
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm-delete {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f0f0f0;
  color: #333;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-confirm-delete {
  background: #e74c3c;
  color: white;
}

.btn-confirm-delete:hover {
  background: #c0392b;
}

/* 重命名对话框特殊样式 */
.rename-dialog {
  max-width: 450px;
}

.rename-header {
  background: #fff9e6;
}

.rename-header h4 {
  color: #856404;
}

.rename-input-group {
  margin-bottom: 16px;
}

.rename-input-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.old-name {
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.rename-input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.rename-input:focus {
  outline: none;
  border-color: #f39c12;
  box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
}

.rename-hint {
  margin-top: 12px;
  font-size: 12px;
  color: #888;
  font-style: italic;
}

.btn-confirm-rename {
  background: #f39c12;
  color: white;
}

.btn-confirm-rename:hover:not(:disabled) {
  background: #e67e22;
}

.btn-confirm-rename:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }
  
  .region-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .region-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>

