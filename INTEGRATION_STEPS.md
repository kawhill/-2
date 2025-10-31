# 🔗 数据导入功能集成步骤

## 📋 需要修改的文件

1. ✅ **已创建**：
   - `src/types/userData.ts`
   - `src/services/userDataStorageService.ts`
   - `src/services/dataParserService.ts`
   - `src/components/DataImportPanel.vue`

2. ⏳ **需要修改**：
   - `src/components/Sidebar.vue`
   - `src/components/MapComponent.vue`
   - `src/App.vue`

---

## 🔧 修改 Sidebar.vue

### 1. 在 `<script setup>` 开头添加导入

在 Sidebar.vue 的 script setup 部分（大约第200行），添加：

```typescript
// 在现有导入后添加
import DataImportPanel from './DataImportPanel.vue'
import { UserDataStorageService } from '@/services/userDataStorageService'
import type { UserDataSet } from '@/types/userData'

// 添加新的响应式状态
const showImportModal = ref(false)
const showManagerModal = ref(false)
const userDataSets = ref<UserDataSet[]>([])
```

### 2. 在 `onMounted` 中加载用户数据

找到 `onMounted`（大约第250行），在里面添加：

```typescript
onMounted(() => {
  // ...现有代码...
  
  // 加载用户数据
  loadUserData()
})

// 添加新方法
const loadUserData = () => {
  userDataSets.value = UserDataStorageService.loadDataSets()
  console.log('✅ 已加载用户数据', userDataSets.value.length, '个数据集')
}
```

### 3. 修改 `showImportData` 和 `showExportData` 方法

找到这两个方法（大约第336-342行），替换为：

```typescript
// 显示导入数据面板
const showImportData = () => {
  showImportModal.value = true
  // 关闭所有其他模态框
  showCityModal.value = false
  showCoordinateModal.value = false
}

// 显示导出数据（管理面板）
const showExportData = () => {
  showManagerModal.value = true
  showCityModal.value = false
  showCoordinateModal.value = false
}

// 处理导入成功
const handleImportSuccess = (dataSet: UserDataSet) => {
  loadUserData() // 重新加载数据
  emit('userDataUpdated', userDataSets.value) // 通知父组件
}

// 关闭导入面板
const closeImportModal = () => {
  showImportModal.value = false
}

// 关闭管理面板
const closeManagerModal = () => {
  showManagerModal.value = false
}
```

### 4. 在模板末尾添加新组件

在 Sidebar.vue 的 `</template>` 标签前（最后），添加：

```vue
<!-- 数据导入面板 -->
<DataImportPanel 
  v-if="showImportModal"
  @close="closeImportModal"
  @import-success="handleImportSuccess"
  @manage-data="showExportData"
/>

<!-- TODO: 数据管理面板（下一步创建） -->
```

### 5. 添加 emit 定义

在 Sidebar.vue 的 defineEmits 中（大约第210行）添加：

```typescript
const emit = defineEmits<{
  // ...现有的 emits...
  userDataUpdated: [dataSets: UserDataSet[]]
}>()
```

---

## 🗺️ 修改 MapComponent.vue

### 1. 添加 props

在 MapComponent.vue 的 defineProps 中添加：

```typescript
const props = defineProps<{
  onLocationClick: (data: MapClickData) => void
  importedPoints?: ImportedGeoPoint[]
  userDataSets?: UserDataSet[]  // 新增
}>()
```

### 2. 导入类型

在文件顶部添加：

```typescript
import type { UserDataSet } from '@/types/userData'
```

### 3. 添加显示用户数据的函数

在 MapComponent.vue 的 script 中添加：

```typescript
// 显示用户数据点
const displayUserData = () => {
  if (!map || !props.userDataSets) return
  
  // 清除旧的用户数据标记
  // ... (如果需要)
  
  // 添加新的用户数据标记
  props.userDataSets.forEach(dataSet => {
    dataSet.points.forEach(point => {
      // 创建用户数据点标记（用绿色区分）
      const userIcon = L.divIcon({
        className: 'user-point-marker',
        html: `<div style="
          background-color: #00ff00;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
      
      const marker = L.marker([point.latitude, point.longitude], { icon: userIcon })
        .addTo(map!)
        .bindPopup(`
          <div>
            <h4>${point.name}</h4>
            <p>作物：${point.cropType || '未知'}</p>
            <p>海拔：${point.altitude || '未知'}m</p>
          </div>
        `)
      
      marker.on('click', () => {
        handleUserPointClick(point)
      })
    })
  })
}

// 处理用户数据点点击
const handleUserPointClick = (point: any) => {
  // 触发位置点击事件
  emit('locationClick', {
    location: {
      lat: point.latitude,
      lng: point.longitude,
      elevation: point.altitude
    },
    cropInfo: point.cropType ? {
      name: point.cropType,
      plantingTime: point.plantingTime || '--',
      growthStage: '--',
      area: point.area || 0,
      notes: point.notes || '--'
    } : undefined,
    weatherForecast: []
  })
}
```

### 4. 监听 userDataSets 变化

```typescript
// 监听用户数据变化
watch(() => props.userDataSets, () => {
  displayUserData()
}, { deep: true })

// 在 initMap 或 onMounted 中调用
onMounted(() => {
  initMap()
  displayUserData() // 初始化时显示用户数据
})
```

---

## 📱 修改 App.vue

### 1. 添加导入和状态

在 App.vue 的 script setup 部分：

```typescript
import { UserDataStorageService } from '@/services/userDataStorageService'
import type { UserDataSet } from '@/types/userData'

const userDataSets = ref<UserDataSet[]>([])

// 页面加载时恢复用户数据
onMounted(() => {
  loadImportedPoints()
  loadUserData()
})

const loadUserData = () => {
  userDataSets.value = UserDataStorageService.loadDataSets()
  console.log('✅ App: 已加载用户数据', userDataSets.value.length, '个数据集')
}

// 处理用户数据更新
const handleUserDataUpdated = (dataSets: UserDataSet[]) => {
  userDataSets.value = dataSets
  console.log('✅ App: 用户数据已更新')
}
```

### 2. 修改模板

```vue
<template>
  <div class="app">
    <header class="app-header">
      <p>点击地图获取地理信息和天气数据</p>
    </header>
    
    <main class="app-main">
      <div class="map-wrapper">
        <Sidebar 
          @region-navigate="handleRegionNavigate"
          @user-data-updated="handleUserDataUpdated"
        />
        
        <MapComponent 
          @location-click="handleLocationClick" 
          :imported-points="importedPoints"
          :user-data-sets="userDataSets"
        />
      </div>
      
      <InfoPopup
        :visible="popupVisible"
        :data="clickData"
        :generating="generatingAdvice"
        @close="closePopup"
        @generate-advice="generateAdvice"
        @generate-weather="generateWeather"
      />
    </main>
  </div>
</template>
```

---

## ✅ 完成后的功能

1. ✅ 用户点击"数据导入" → "导入数据"
2. ✅ 弹出导入面板
3. ✅ 选择 Excel/CSV/JSON 文件
4. ✅ 预览数据并确认导入
5. ✅ 数据保存到 localStorage
6. ✅ 在地图上显示用户数据点（绿色标记）
7. ✅ 点击用户数据点查看详情
8. ✅ 关闭网页后数据仍然保留

---

## 🎯 测试步骤

1. 启动应用：`npm run dev`
2. 点击侧边栏"数据导入" → "导入数据"
3. 上传测试文件（Excel/CSV/JSON）
4. 查看数据预览
5. 确认导入
6. 在地图上看到绿色标记
7. 刷新页面，数据仍然存在

---

## 📁 测试数据示例

创建一个 `test-data.csv` 文件：

```csv
点名称,经度,纬度,海拔,作物类型,种植时间,备注
测试点1,108.16036,30.42730,144.3,水稻,3-8月,土壤肥沃
测试点2,108.16048,30.42774,145.6,小麦,10-次年5月,排水良好
测试点3,108.16176,30.42800,147.7,玉米,4-9月,灌溉便利
```

---

## 🚨 注意事项

1. 确保所有依赖已安装：`npm install xlsx uuid`
2. 确保 TypeScript 类型正确
3. 检查浏览器控制台是否有错误
4. 测试数据导入、显示、持久化

---

## 下一步

完成上述修改后，您的应用就具备完整的用户数据导入功能了！

如果需要更多功能（如数据管理面板），可以继续添加。

