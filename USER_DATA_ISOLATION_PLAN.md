# 🔒 用户数据隔离方案

## 🎯 方案说明

提供两种方式，确保用户只能使用自己的数据：

### 方案 1：数据隔离（云存储）
- ✅ 每个用户登录后只能看到自己的数据
- ✅ 数据存储在云端，跨设备同步
- ✅ 自动隔离，安全可靠

### 方案 2：混合存储（推荐）
- ✅ 用户可以选择：**本地存储** 或 **云存储**
- ✅ 本地存储：数据保存在浏览器，完全私有
- ✅ 云存储：数据同步到云端，跨设备访问
- ✅ 可以随时切换存储方式

---

## 🔐 方案 1：数据隔离（云存储）

### 工作原理

使用 **Row Level Security (RLS)** 实现数据隔离：

```sql
-- 用户只能查看自己的数据
CREATE POLICY "Users can view own data"
  ON user_data_sets FOR SELECT
  USING (auth.uid() = user_id);
```

**效果**：
- ✅ 用户 A 登录后，只能看到用户 A 的数据
- ✅ 用户 B 登录后，只能看到用户 B 的数据
- ✅ 用户之间完全隔离，无法互相访问

### 实现方式

1. **用户登录/注册**
   - 邮箱登录
   - 匿名登录（自动创建临时账号）
   - 第三方登录（GitHub、Google）

2. **数据查询自动过滤**
   ```typescript
   // 自动只查询当前用户的数据
   const { data } = await supabase
     .from('user_data_sets')
     .select('*')
     // 不需要手动添加 WHERE user_id = xxx
     // RLS 策略会自动过滤
   ```

3. **数据保存自动关联**
   ```typescript
   // 自动关联当前用户 ID
   await supabase
     .from('user_data_sets')
     .insert({
       name: '数据集',
       user_id: auth.uid() // 自动获取当前用户 ID
     })
   ```

---

## 🎛️ 方案 2：混合存储（推荐）

### 用户选择界面

```
┌─────────────────────────────────┐
│   数据存储方式                    │
├─────────────────────────────────┤
│  ○ 本地存储（推荐）              │
│    数据保存在浏览器，完全私有      │
│    不会上传到云端                 │
│                                  │
│  ○ 云存储（同步）                │
│    数据同步到云端，跨设备访问      │
│    需要登录账号                   │
└─────────────────────────────────┘
```

### 工作流程

```
用户打开应用
    ↓
选择存储方式
    ↓
┌───────────────┬───────────────┐
│  本地存储      │   云存储       │
│  (localStorage)│  (Supabase)   │
└───────────────┴───────────────┘
    ↓                ↓
完全私有        需要登录
不跨设备同步    跨设备同步
```

### 实现架构

```
StorageService (统一接口)
    ├── LocalStorageAdapter (本地存储)
    └── CloudStorageAdapter (云存储)
```

**优点**：
- ✅ 用户有选择权
- ✅ 隐私敏感用户可以使用本地存储
- ✅ 需要同步的用户可以使用云存储
- ✅ 代码统一，易于维护

---

## 💻 实现代码

### 1. 存储适配器接口

```typescript
// src/services/storage/IStorageAdapter.ts
export interface IStorageAdapter {
  // 加载所有数据集
  loadDataSets(): Promise<UserDataSet[]>
  
  // 保存数据集
  saveDataSet(dataSet: UserDataSet): Promise<boolean>
  
  // 删除数据集
  deleteDataSet(id: string): Promise<boolean>
  
  // 更新数据集
  updateDataSet(id: string, dataSet: UserDataSet): Promise<boolean>
  
  // 获取存储信息
  getStorageInfo(): Promise<StorageInfo>
}
```

### 2. 本地存储适配器

```typescript
// src/services/storage/LocalStorageAdapter.ts
import { UserDataStorageService } from '../userDataStorageService'
import type { IStorageAdapter } from './IStorageAdapter'
import type { UserDataSet, StorageInfo } from '@/types/userData'

export class LocalStorageAdapter implements IStorageAdapter {
  async loadDataSets(): Promise<UserDataSet[]> {
    return UserDataStorageService.loadDataSets()
  }

  async saveDataSet(dataSet: UserDataSet): Promise<boolean> {
    return UserDataStorageService.addDataSet(dataSet)
  }

  async deleteDataSet(id: string): Promise<boolean> {
    return UserDataStorageService.deleteDataSet(id)
  }

  async updateDataSet(id: string, dataSet: UserDataSet): Promise<boolean> {
    return UserDataStorageService.updateDataSet(id, dataSet)
  }

  async getStorageInfo(): Promise<StorageInfo> {
    return UserDataStorageService.getStorageInfo()
  }
}
```

### 3. 云存储适配器

```typescript
// src/services/storage/CloudStorageAdapter.ts
import { supabase } from '../supabaseService'
import type { IStorageAdapter } from './IStorageAdapter'
import type { UserDataSet, StorageInfo } from '@/types/userData'

export class CloudStorageAdapter implements IStorageAdapter {
  private async getUserId(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id || null
  }

  async loadDataSets(): Promise<UserDataSet[]> {
    const userId = await this.getUserId()
    if (!userId) {
      throw new Error('请先登录')
    }

    const { data, error } = await supabase
      .from('user_data_sets')
      .select(`
        *,
        user_data_points (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return this.transformData(data)
  }

  async saveDataSet(dataSet: UserDataSet): Promise<boolean> {
    const userId = await this.getUserId()
    if (!userId) {
      throw new Error('请先登录')
    }

    // 实现保存逻辑...
    return true
  }

  async deleteDataSet(id: string): Promise<boolean> {
    // 实现删除逻辑...
    return true
  }

  async updateDataSet(id: string, dataSet: UserDataSet): Promise<boolean> {
    // 实现更新逻辑...
    return true
  }

  async getStorageInfo(): Promise<StorageInfo> {
    // 实现存储信息获取...
    return {
      usedBytes: 0,
      usedKB: 0,
      usedMB: 0,
      totalMB: 500, // 500MB 免费额度
      remainingMB: 500,
      usagePercent: 0
    }
  }

  private transformData(data: any[]): UserDataSet[] {
    // 转换数据格式...
    return []
  }
}
```

### 4. 统一存储服务

```typescript
// src/services/storage/StorageService.ts
import { LocalStorageAdapter } from './LocalStorageAdapter'
import { CloudStorageAdapter } from './CloudStorageAdapter'
import type { IStorageAdapter } from './IStorageAdapter'
import type { UserDataSet, StorageInfo } from '@/types/userData'

export type StorageType = 'local' | 'cloud'

export class StorageService {
  private adapter: IStorageAdapter
  private storageType: StorageType

  constructor(storageType: StorageType = 'local') {
    this.storageType = storageType
    this.adapter = storageType === 'local' 
      ? new LocalStorageAdapter()
      : new CloudStorageAdapter()
  }

  // 切换存储方式
  switchStorage(type: StorageType) {
    this.storageType = type
    this.adapter = type === 'local'
      ? new LocalStorageAdapter()
      : new CloudStorageAdapter()
  }

  // 获取当前存储类型
  getStorageType(): StorageType {
    return this.storageType
  }

  // 委托所有方法到适配器
  async loadDataSets(): Promise<UserDataSet[]> {
    return this.adapter.loadDataSets()
  }

  async saveDataSet(dataSet: UserDataSet): Promise<boolean> {
    return this.adapter.saveDataSet(dataSet)
  }

  async deleteDataSet(id: string): Promise<boolean> {
    return this.adapter.deleteDataSet(id)
  }

  async updateDataSet(id: string, dataSet: UserDataSet): Promise<boolean> {
    return this.adapter.updateDataSet(id, dataSet)
  }

  async getStorageInfo(): Promise<StorageInfo> {
    return this.adapter.getStorageInfo()
  }
}
```

### 5. 用户设置管理

```typescript
// src/services/storage/StorageSettings.ts
export class StorageSettings {
  private static readonly SETTINGS_KEY = 'storage_settings'

  static getStorageType(): StorageType {
    const settings = localStorage.getItem(this.SETTINGS_KEY)
    if (!settings) return 'local' // 默认本地存储

    try {
      const parsed = JSON.parse(settings)
      return parsed.storageType || 'local'
    } catch {
      return 'local'
    }
  }

  static setStorageType(type: StorageType) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify({
      storageType: type,
      updatedAt: new Date().toISOString()
    }))
  }
}
```

---

## 🎨 UI 实现

### 存储方式选择组件

```vue
<!-- src/components/StorageSettingsPanel.vue -->
<template>
  <div class="storage-settings">
    <h3>数据存储方式</h3>
    
    <div class="storage-options">
      <label class="storage-option">
        <input 
          type="radio" 
          value="local" 
          v-model="selectedType"
          @change="handleStorageChange"
        />
        <div class="option-content">
          <strong>本地存储（推荐）</strong>
          <p>数据保存在浏览器，完全私有，不会上传到云端</p>
          <ul>
            <li>✅ 数据完全私有</li>
            <li>✅ 不需要登录</li>
            <li>⚠️ 不跨设备同步</li>
            <li>⚠️ 清除浏览器数据会丢失</li>
          </ul>
        </div>
      </label>

      <label class="storage-option">
        <input 
          type="radio" 
          value="cloud" 
          v-model="selectedType"
          @change="handleStorageChange"
        />
        <div class="option-content">
          <strong>云存储（同步）</strong>
          <p>数据同步到云端，可在多设备访问</p>
          <ul>
            <li>✅ 跨设备同步</li>
            <li>✅ 数据备份</li>
            <li>⚠️ 需要登录账号</li>
            <li>⚠️ 数据存储在云端</li>
          </ul>
        </div>
      </label>
    </div>

    <!-- 如果选择云存储，显示登录按钮 -->
    <div v-if="selectedType === 'cloud' && !isLoggedIn" class="login-prompt">
      <p>使用云存储需要登录账号</p>
      <button @click="handleLogin">登录 / 注册</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { StorageSettings } from '@/services/storage/StorageSettings'
import type { StorageType } from '@/services/storage/StorageService'

const selectedType = ref<StorageType>('local')
const isLoggedIn = ref(false)

onMounted(() => {
  selectedType.value = StorageSettings.getStorageType()
})

const handleStorageChange = () => {
  StorageSettings.setStorageType(selectedType.value)
  // 触发存储服务切换
  // emit('storage-changed', selectedType.value)
}

const handleLogin = () => {
  // 打开登录对话框
}
</script>
```

---

## 📊 方案对比

| 特性 | 本地存储 | 云存储 |
|------|---------|--------|
| **数据隐私** | ✅ 完全私有 | ⚠️ 存储在云端 |
| **跨设备同步** | ❌ 不支持 | ✅ 支持 |
| **需要登录** | ❌ 不需要 | ✅ 需要 |
| **数据备份** | ❌ 无 | ✅ 自动备份 |
| **存储空间** | 5MB | 500MB |
| **网络依赖** | ❌ 不需要 | ✅ 需要 |

---

## 🚀 实施步骤

### 阶段 1：实现适配器模式（2-3 小时）

1. ✅ 创建 `IStorageAdapter` 接口
2. ✅ 实现 `LocalStorageAdapter`
3. ✅ 实现 `CloudStorageAdapter`
4. ✅ 创建 `StorageService` 统一服务

### 阶段 2：添加用户设置（1-2 小时）

1. ✅ 创建 `StorageSettings` 服务
2. ✅ 创建存储方式选择组件
3. ✅ 集成到侧边栏设置菜单

### 阶段 3：更新应用代码（2-3 小时）

1. ✅ 替换所有 `UserDataStorageService` 调用
2. ✅ 使用 `StorageService` 统一接口
3. ✅ 处理存储方式切换

### 阶段 4：测试和优化（1-2 小时）

1. ✅ 测试本地存储功能
2. ✅ 测试云存储功能
3. ✅ 测试存储方式切换
4. ✅ 优化用户体验

---

## ✅ 推荐方案

**建议使用方案 2：混合存储**

**原因**：
- ✅ 用户有选择权，更灵活
- ✅ 隐私敏感用户可以使用本地存储
- ✅ 需要同步的用户可以使用云存储
- ✅ 代码架构清晰，易于维护
- ✅ 可以逐步迁移，不影响现有用户

---

## 📝 已实现的代码

### ✅ 已完成

1. **存储适配器接口** (`src/services/storage/IStorageAdapter.ts`)
   - 定义了统一的存储操作接口

2. **本地存储适配器** (`src/services/storage/LocalStorageAdapter.ts`)
   - 实现了基于 localStorage 的存储

3. **存储设置管理** (`src/services/storage/StorageSettings.ts`)
   - 管理用户的存储方式选择

4. **统一存储服务** (`src/services/storage/StorageService.ts`)
   - 提供统一的存储接口，支持切换

5. **存储设置面板** (`src/components/StorageSettingsPanel.vue`)
   - UI 组件，让用户选择存储方式

### 🔄 待完成

1. **云存储适配器** (`src/services/storage/CloudStorageAdapter.ts`)
   - 需要集成 Supabase
   - 需要实现用户认证

2. **集成到应用**
   - 替换 `UserDataStorageService` 调用
   - 添加存储设置到侧边栏

3. **数据迁移工具**
   - 从本地存储迁移到云存储
   - 从云存储迁移到本地存储

---

## 📝 下一步

### 选项 1：继续使用本地存储（当前状态）

✅ **已完成**：
- 用户数据存储在浏览器 localStorage
- 每个用户的数据完全隔离（因为 localStorage 是按域名隔离的）
- 不需要登录，完全私有

✅ **效果**：
- 用户 A 在浏览器 A 中的数据，用户 B 看不到
- 用户 A 在浏览器 B 中也看不到（因为是本地存储）

### 选项 2：实现云存储（需要 Supabase）

🔄 **待完成**：
1. 注册 Supabase 账号
2. 创建数据库表
3. 实现 `CloudStorageAdapter`
4. 添加用户认证功能
5. 集成到应用

### 选项 3：混合模式（推荐）

🔄 **待完成**：
1. 完成选项 2 的所有步骤
2. 让用户可以选择使用本地存储或云存储
3. 添加数据迁移工具

---

## 🎯 推荐实施路径

### 阶段 1：当前状态（已完成）

- ✅ 使用 localStorage 存储
- ✅ 每个用户数据完全隔离
- ✅ 无需登录，完全私有

**说明**：
- 当前使用 localStorage，每个浏览器实例的数据是独立的
- 用户 A 在浏览器 A 中导入的数据，只有用户 A 在浏览器 A 中能看到
- 这是最简单、最私有的方案

### 阶段 2：添加存储方式选择（可选）

如果你想给用户更多选择：
1. 集成存储设置面板到侧边栏
2. 让用户可以选择存储方式
3. 目前只有本地存储可用，云存储显示"即将推出"

### 阶段 3：实现云存储（未来）

如果需要跨设备同步：
1. 注册 Supabase
2. 实现云存储适配器
3. 添加用户认证
4. 实现数据同步

---

## ✅ 回答你的问题

**"可以让用户都使用自己的数据吗？"**

**答案：是的！**

### 当前实现（本地存储）

✅ **每个用户的数据完全隔离**：
- 用户 A 在浏览器 A 中的数据，只有用户 A 在浏览器 A 能看到
- 用户 B 在浏览器 B 中的数据，只有用户 B 在浏览器 B 能看到
- 数据存储在各自的浏览器 localStorage 中，完全独立

✅ **隐私保护**：
- 数据不上传到服务器
- 数据完全存储在用户本地浏览器
- 其他用户无法访问

### 未来实现（云存储）

✅ **每个用户的数据完全隔离**：
- 使用 Row Level Security (RLS) 策略
- 用户 A 登录后，只能看到用户 A 的数据
- 用户 B 登录后，只能看到用户 B 的数据
- 数据库层面自动隔离，无法互相访问

---

## 🚀 现在可以做什么？

1. **继续使用当前方案**（推荐）
   - 数据完全私有，无需登录
   - 每个用户数据自动隔离

2. **添加存储设置面板**
   - 让用户了解存储方式
   - 为未来云存储功能做准备

3. **实现云存储功能**
   - 需要 Supabase 账号
   - 需要实现用户认证
   - 可以实现跨设备同步

需要我帮你做什么？🎉

