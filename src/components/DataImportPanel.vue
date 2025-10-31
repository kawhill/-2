<template>
  <div class="modal-overlay" @click="handleClose">
    <div class="modal-content data-import-panel" @click.stop>
      <div class="modal-header">
        <h3>📥 导入我的数据</h3>
        <button class="modal-close" @click="handleClose">×</button>
      </div>

      <div class="modal-body">
        <!-- 步骤指示器 -->
        <div class="steps-indicator">
          <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">选择文件</div>
          </div>
          <div class="step-line" :class="{ active: currentStep > 1 }"></div>
          <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">预览数据</div>
          </div>
          <div class="step-line" :class="{ active: currentStep > 2 }"></div>
          <div class="step" :class="{ active: currentStep >= 3 }">
            <div class="step-number">3</div>
            <div class="step-label">完成导入</div>
          </div>
        </div>

        <!-- 步骤 1: 文件上传 -->
        <div v-if="currentStep === 1" class="step-content">
          <div class="upload-area" 
               :class="{ 'drag-over': isDragOver }"
               @drop.prevent="handleDrop"
               @dragover.prevent="isDragOver = true"
               @dragleave.prevent="isDragOver = false">
            <input type="file" 
                   ref="fileInput" 
                   accept=".xlsx,.xls,.csv,.json" 
                   @change="handleFileSelect"
                   style="display: none">
            <div class="upload-icon">📁</div>
            <p class="upload-text">拖拽文件到此处或点击选择</p>
            <button class="btn-primary" @click="$refs.fileInput.click()">选择文件</button>
            <div class="supported-formats">
              <p>支持的格式：</p>
              <div class="format-tags">
                <span class="format-tag">Excel (.xlsx, .xls)</span>
                <span class="format-tag">CSV (.csv)</span>
                <span class="format-tag">JSON (.json)</span>
              </div>
            </div>
          </div>

          <div class="template-section">
            <p class="template-title">📝 数据格式示例</p>
            <div class="template-image-container">
              <img :src="templateImageUrl" alt="数据模板示例" class="template-image" />
            </div>
            <p class="template-hint">💡 提示：请按照上图格式准备您的数据文件（支持 Excel、CSV、JSON）</p>
          </div>

          <!-- 解析中的提示 -->
          <div v-if="isParsing" class="parsing-overlay">
            <div class="spinner"></div>
            <p>正在解析文件...</p>
          </div>
        </div>

        <!-- 步骤 2: 数据预览 -->
        <div v-if="currentStep === 2" class="step-content">
          <div class="preview-header">
            <h4>数据预览</h4>
            <div class="preview-stats">
              <span class="stat-item">
                <span class="stat-label">检测到：</span>
                <span class="stat-value">{{ parsedData.length }} 个数据点</span>
              </span>
            </div>
          </div>

          <!-- 验证结果 -->
          <div v-if="validationResult" class="validation-result">
            <div class="validation-item success" v-if="validationResult.validCount > 0">
              <span class="icon">✅</span>
              <span>验证通过：{{ validationResult.validCount }} 条</span>
            </div>
            <div class="validation-item warning" v-if="validationResult.warnings.length > 0">
              <span class="icon">⚠️</span>
              <span>警告：{{ validationResult.warnings.length }} 条</span>
              <span class="warning-detail">（缺少可选字段，不影响导入）</span>
            </div>
            <div class="validation-item error" v-if="validationResult.errors.length > 0">
              <span class="icon">❌</span>
              <span>错误：{{ validationResult.errors.length }} 条</span>
            </div>
          </div>

          <!-- 数据表格预览 (前10条) -->
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>点名称</th>
                  <th>经度</th>
                  <th>纬度</th>
                  <th>海拔</th>
                  <th>作物类型</th>
                  <th>蒸散发量</th>
                  <th>土壤属性</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(point, index) in previewData" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ point.name }}</td>
                  <td>{{ point.longitude.toFixed(5) }}</td>
                  <td>{{ point.latitude.toFixed(5) }}</td>
                  <td>{{ point.altitude || '-' }}</td>
                  <td>{{ point.cropType || '-' }}</td>
                  <td>{{ point.evapotranspiration || '-' }}</td>
                  <td>{{ point.soilType || '-' }}</td>
                  <td>{{ point.notes || '-' }}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="parsedData.length > 10" class="preview-note">
              仅显示前 10 条数据，共 {{ parsedData.length }} 条
            </p>
          </div>

          <!-- 数据集名称输入 -->
          <div class="dataset-name-input">
            <label>数据集名称：</label>
            <input type="text" 
                   v-model="datasetName" 
                   placeholder="例如：2024年春季调查数据"
                   @keyup.enter="confirmImport">
          </div>

          <!-- 分区名称输入 -->
          <div class="region-name-input">
            <label>分区名称：<span class="optional-hint">（可选，用于分区管理）</span></label>
            <input type="text" 
                   v-model="regionName" 
                   placeholder="例如：石宝镇、A区、试验田1号"
                   @keyup.enter="confirmImport">
            <p class="input-hint">💡 填写分区名称后，可以在侧边栏"分区管理"中快速切换到该区域查看数据</p>
          </div>

          <!-- 按钮组 -->
          <div class="button-group">
            <button class="btn-secondary" @click="backToUpload">重新选择</button>
            <button class="btn-primary" 
                    @click="confirmImport"
                    :disabled="!datasetName || validationResult.errors.length > 0">
              确认导入
            </button>
          </div>
        </div>

        <!-- 步骤 3: 导入完成 -->
        <div v-if="currentStep === 3" class="step-content">
          <div class="success-message">
            <div class="success-icon">✅</div>
            <h3>导入成功！</h3>
            <p>已成功导入 <strong>{{ importedCount }}</strong> 个数据点</p>
            <p class="success-note">数据已保存到浏览器本地，关闭网页后仍会保留</p>
          </div>

          <div class="next-steps">
            <h4>接下来您可以：</h4>
            <div class="action-cards">
              <div class="action-card" @click="viewOnMap">
                <span class="card-icon">🗺️</span>
                <span class="card-text">在地图上查看</span>
              </div>
              <div class="action-card" @click="manageData">
                <span class="card-icon">📊</span>
                <span class="card-text">管理数据</span>
              </div>
              <div class="action-card" @click="importMore">
                <span class="card-icon">📥</span>
                <span class="card-text">继续导入</span>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button class="btn-primary" @click="handleClose">完成</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { DataParserService } from '@/services/dataParserService'
import { UserDataStorageService } from '@/services/userDataStorageService'
import type { UserDataPoint, UserDataSet, ValidationResult } from '@/types/userData'

// Props
const emit = defineEmits<{
  close: []
  importSuccess: [dataSet: UserDataSet]
  manageData: []
}>()

// 模板图片URL（使用绝对路径访问 public 文件夹）
const templateImageUrl = '/daorumuban.png'

// 状态
const currentStep = ref(1)
const isDragOver = ref(false)
const isParsing = ref(false)
const fileInput = ref<HTMLInputElement>()
const parsedData = ref<UserDataPoint[]>([])
const validationResult = ref<ValidationResult | null>(null)
const datasetName = ref('')
const regionName = ref('')
const importedCount = ref(0)

// 预览数据（仅前10条）
const previewData = computed(() => parsedData.value.slice(0, 10))

/**
 * 处理文件选择
 */
const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    await parseFile(file)
  }
}

/**
 * 处理拖拽上传
 */
const handleDrop = async (event: DragEvent) => {
  isDragOver.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    await parseFile(file)
  }
}

/**
 * 解析文件
 */
const parseFile = async (file: File) => {
  try {
    isParsing.value = true
    
    // 解析文件
    parsedData.value = await DataParserService.parseFile(file)
    
    // 验证数据
    validationResult.value = DataParserService.validateData(parsedData.value)
    
    // 自动生成数据集名称
    const now = new Date()
    datasetName.value = `${file.name.replace(/\.[^/.]+$/, '')}_${now.getMonth() + 1}月${now.getDate()}日`
    
    // 进入预览步骤
    currentStep.value = 2
  } catch (error) {
    console.error('文件解析失败:', error)
    alert(`文件解析失败: ${error.message}`)
  } finally {
    isParsing.value = false
  }
}

/**
 * 确认导入
 */
const confirmImport = () => {
  try {
    // 创建数据集
    const dataSet: UserDataSet = {
      id: uuidv4(),
      name: datasetName.value,
      regionName: regionName.value.trim() || undefined, // 如果有分区名称则保存
      description: `包含 ${parsedData.value.length} 个数据点`,
      points: parsedData.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // 保存到 localStorage
    const success = UserDataStorageService.addDataSet(dataSet)
    
    if (success) {
      // 再次验证数据是否真的保存了
      const verifyDataSets = UserDataStorageService.loadDataSets()
      const saved = verifyDataSets.find(ds => ds.id === dataSet.id)
      
      if (!saved) {
        console.error('❌ 数据保存验证失败：导入后立即检查数据不存在')
        alert('数据保存失败，请检查浏览器设置或使用导出功能备份数据')
        return
      }
      
      importedCount.value = parsedData.value.length
      currentStep.value = 3
      
      // 通知父组件
      emit('importSuccess', dataSet)
      
      console.log('✅ 导入成功，数据已保存到 localStorage，可以在控制台运行以下命令验证：')
      console.log('localStorage.getItem("user_data_sets")')
    } else {
      alert('保存失败，可能是存储空间不足或浏览器限制了存储权限')
    }
  } catch (error) {
    console.error('导入失败:', error)
    alert(`导入失败: ${error.message}`)
  }
}

/**
 * 返回上传步骤
 */
const backToUpload = () => {
  currentStep.value = 1
  parsedData.value = []
  validationResult.value = null
  datasetName.value = ''
  regionName.value = ''
}

/**
 * 在地图上查看
 */
const viewOnMap = () => {
  handleClose()
  // 触发地图更新（通过父组件）
}

/**
 * 管理数据
 */
const manageData = () => {
  emit('manageData')
}

/**
 * 继续导入
 */
const importMore = () => {
  currentStep.value = 1
  parsedData.value = []
  validationResult.value = null
  datasetName.value = ''
  regionName.value = ''
  importedCount.value = 0
}

/**
 * 关闭面板
 */
const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.data-import-panel {
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

/* 模态框标题 */
.modal-header {
  padding: 20px;
  border-bottom: 1px solid #ddd;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px 8px 0 0;
}

.modal-header h3 {
  margin: 0;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px;
}

/* 步骤指示器 */
.steps-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step.active .step-number {
  background: #4CAF50;
  color: white;
}

.step.completed .step-number {
  background: #2196F3;
  color: white;
}

.step-label {
  font-size: 13px;
  color: #333;
  font-weight: 500;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.step.active .step-label {
  color: #4CAF50;
  font-weight: bold;
  background: #e8f5e9;
}

.step.completed .step-label {
  color: #2196F3;
  background: #e3f2fd;
}

.step-line {
  width: 80px;
  height: 3px;
  background: #e0e0e0;
  margin: 0 10px;
  transition: all 0.3s;
  border-radius: 2px;
}

.step-line.active {
  background: #4CAF50;
  box-shadow: 0 0 4px rgba(76, 175, 80, 0.3);
}

/* 上传区域 */
.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: #4CAF50;
  background: #f0f8f0;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.upload-text {
  margin: 16px 0;
  color: #666;
}

.supported-formats {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.format-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
}

.format-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

/* 模板区域 */
.template-section {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  border: 2px dashed #667eea;
}

.template-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.template-image-container {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  overflow-x: auto;
}

.template-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  display: block;
}

.template-iframe {
  width: 100%;
  height: 140px;
  border: none;
  border-radius: 4px;
  display: block;
}

.template-hint {
  text-align: center;
  font-size: 13px;
  color: #555;
  margin: 0;
  font-style: italic;
}

/* 解析中 */
.parsing-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 预览区域 */
.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-header h4 {
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.preview-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.stat-label {
  color: #333;
  font-weight: 500;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.stat-value {
  font-weight: bold;
  color: #4CAF50;
  background: #e8f5e9;
  padding: 4px 12px;
  border-radius: 4px;
}

/* 验证结果 */
.validation-result {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
}

.validation-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.validation-item.success {
  color: #4CAF50;
}

.validation-item.warning {
  color: #ff9800;
}

.validation-item.error {
  color: #f44336;
}

.warning-detail {
  font-size: 12px;
  color: #666;
  margin-left: 8px;
  font-style: italic;
}

/* 数据表格 */
.data-table-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: auto;
  margin-bottom: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  background: white;
}

.data-table th,
.data-table td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
}

.data-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  font-size: 14px;
  position: sticky;
  top: 0;
  z-index: 10;
  text-align: center;
  white-space: nowrap;
}

.data-table td {
  background: white;
}

/* 点名称和备注列左对齐，其他列居中对齐 */
.data-table td:nth-child(2),
.data-table td:nth-child(9) {
  text-align: left;
}

.data-table td:not(:nth-child(2)):not(:nth-child(9)) {
  text-align: center;
}

.data-table tbody tr:nth-child(even) {
  background: #f8f9fa;
}

.data-table tbody tr:nth-child(odd) {
  background: white;
}

.data-table tr:hover {
  background: #e3f2fd !important;
  transition: background 0.2s;
}

.data-table td:first-child {
  font-weight: bold;
  color: #667eea;
}

.preview-note {
  text-align: center;
  color: #666;
  font-size: 12px;
  margin-top: 8px;
}

/* 数据集名称输入 */
.dataset-name-input,
.region-name-input {
  margin: 16px 0;
}

.dataset-name-input label,
.region-name-input label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.optional-hint {
  font-weight: normal;
  color: #999;
  font-size: 12px;
}

.dataset-name-input input,
.region-name-input input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.dataset-name-input input:focus,
.region-name-input input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.input-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

/* 成功消息 */
.success-message {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.success-message h3 {
  color: #4CAF50;
  margin-bottom: 8px;
}

.success-note {
  color: #666;
  font-size: 14px;
  margin-top: 16px;
}

/* 下一步操作 */
.next-steps {
  margin-top: 32px;
}

.next-steps h4 {
  margin-bottom: 16px;
  text-align: center;
}

.action-cards {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.action-card {
  flex: 1;
  max-width: 150px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.action-card:hover {
  background: #e3f2fd;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 32px;
}

.card-text {
  font-size: 14px;
  font-weight: bold;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

/* 响应式 */
@media (max-width: 768px) {
  .data-import-panel {
    width: 95%;
    max-height: 95vh;
  }

  .steps-indicator {
    padding: 10px;
  }

  .step-line {
    width: 40px;
  }

  .action-cards {
    flex-direction: column;
  }

  .action-card {
    max-width: 100%;
  }
}
</style>

