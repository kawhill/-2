# 🚀 Supabase 云存储详细实施指南

## 📋 目录

1. [准备工作](#准备工作)
2. [数据库设置](#数据库设置)
3. [项目配置](#项目配置)
4. [代码实现](#代码实现)
5. [用户认证](#用户认证)
6. [数据迁移](#数据迁移)
7. [测试验证](#测试验证)
8. [故障排除](#故障排除)

---

## 第一步：准备工作

### 1.1 获取 Supabase 项目信息

1. 登录 Supabase 控制台：https://app.supabase.com
2. 选择你的项目
3. 进入 **Settings** → **API**
4. 记录以下信息：
   - **Project URL**：`https://xxxxx.supabase.co`
   - **anon/public key**：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（保密，不要暴露在前端）

### 1.2 检查项目状态

确保项目状态为 **Active**，数据库已创建。

---

## 第二步：数据库设置

### 2.1 打开 SQL 编辑器

1. 在 Supabase 控制台，点击左侧菜单 **SQL Editor**
2. 点击 **New query**

### 2.2 创建数据库表

复制以下 SQL 并执行：

```sql
-- ============================================
-- 1. 创建用户数据集表
-- ============================================
CREATE TABLE IF NOT EXISTS user_data_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  region_name TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. 创建用户数据点表
-- ============================================
CREATE TABLE IF NOT EXISTS user_data_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_set_id UUID REFERENCES user_data_sets(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  altitude DOUBLE PRECISION,
  crop_type TEXT,
  planting_time TEXT,
  evapotranspiration DOUBLE PRECISION,
  soil_type TEXT,
  notes TEXT,
  tags TEXT[],
  custom_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. 创建索引（提高查询性能）
-- ============================================
CREATE INDEX IF NOT EXISTS idx_data_points_data_set_id 
  ON user_data_points(data_set_id);
  
CREATE INDEX IF NOT EXISTS idx_data_sets_user_id 
  ON user_data_sets(user_id);
  
CREATE INDEX IF NOT EXISTS idx_data_points_location 
  ON user_data_points(latitude, longitude);

-- ============================================
-- 4. 启用 Row Level Security (RLS)
-- ============================================
ALTER TABLE user_data_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_data_points ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. 创建 RLS 策略：用户数据集
-- ============================================

-- 先删除已存在的策略（如果存在）
DROP POLICY IF EXISTS "Users can view own data sets" ON user_data_sets;
DROP POLICY IF EXISTS "Users can insert own data sets" ON user_data_sets;
DROP POLICY IF EXISTS "Users can update own data sets" ON user_data_sets;
DROP POLICY IF EXISTS "Users can delete own data sets" ON user_data_sets;

-- 查询策略：用户只能查看自己的数据集
CREATE POLICY "Users can view own data sets"
  ON user_data_sets FOR SELECT
  USING (auth.uid() = user_id);

-- 插入策略：用户只能创建自己的数据集
CREATE POLICY "Users can insert own data sets"
  ON user_data_sets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 更新策略：用户只能更新自己的数据集
CREATE POLICY "Users can update own data sets"
  ON user_data_sets FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 删除策略：用户只能删除自己的数据集
CREATE POLICY "Users can delete own data sets"
  ON user_data_sets FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 6. 创建 RLS 策略：用户数据点
-- ============================================

-- 先删除已存在的策略（如果存在）
DROP POLICY IF EXISTS "Users can view own data points" ON user_data_points;
DROP POLICY IF EXISTS "Users can insert own data points" ON user_data_points;
DROP POLICY IF EXISTS "Users can update own data points" ON user_data_points;
DROP POLICY IF EXISTS "Users can delete own data points" ON user_data_points;

-- 查询策略：用户只能查看自己数据集中的数据点
CREATE POLICY "Users can view own data points"
  ON user_data_points FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

-- 插入策略：用户只能在自己的数据集中插入数据点
CREATE POLICY "Users can insert own data points"
  ON user_data_points FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

-- 更新策略：用户只能更新自己数据集中的数据点
CREATE POLICY "Users can update own data points"
  ON user_data_points FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

-- 删除策略：用户只能删除自己数据集中的数据点
CREATE POLICY "Users can delete own data points"
  ON user_data_points FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

-- ============================================
-- 7. 创建自动更新时间戳的触发器
-- ============================================

-- 创建更新 updated_at 的函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 先删除已存在的触发器（如果存在）
DROP TRIGGER IF EXISTS update_user_data_sets_updated_at ON user_data_sets;
DROP TRIGGER IF EXISTS update_user_data_points_updated_at ON user_data_points;

-- 为 user_data_sets 表创建触发器
CREATE TRIGGER update_user_data_sets_updated_at
  BEFORE UPDATE ON user_data_sets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 为 user_data_points 表创建触发器
CREATE TRIGGER update_user_data_points_updated_at
  BEFORE UPDATE ON user_data_points
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 2.3 验证表创建成功

执行以下查询验证（可以单独执行每个查询）：

**查询 1：检查表是否存在**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('user_data_sets', 'user_data_points');
```

**查询 2：检查 RLS 是否启用**
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('user_data_sets', 'user_data_points');
```

**查询 3：检查策略是否存在**
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('user_data_sets', 'user_data_points');
```

**预期结果**：
- 查询 1 应该返回 2 行：`user_data_sets` 和 `user_data_points`
- 查询 2 应该返回 2 行，且 `rowsecurity` 列都为 `true`
- 查询 3 应该返回 8 行（每个表 4 个策略）

**或者使用更简单的方法**：
在 Supabase 控制台的左侧菜单中：
1. 点击 **Table Editor**
2. 应该能看到 `user_data_sets` 和 `user_data_points` 两个表
3. 点击表名，查看表结构是否正确

---

## 第三步：项目配置

### 3.1 安装 Supabase 客户端

```bash
npm install @supabase/supabase-js
```

### 3.2 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```env
# Supabase 配置
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ 重要**：
- 将 `your-project-id` 替换为你的项目 ID
- 将 `your-anon-key-here` 替换为你的 anon key
- **不要**提交 `.env.local` 到 Git（已在 `.gitignore` 中）

### 3.3 验证环境变量

创建测试文件 `test-supabase.ts`（临时文件，测试后删除）：

```typescript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...')
```

运行 `npm run dev`，在控制台检查是否正确加载。

---

## 第四步：代码实现

### 4.1 创建 Supabase 服务

创建 `src/services/supabase/supabaseClient.ts`：

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
```

### 4.2 创建云存储适配器

创建 `src/services/storage/CloudStorageAdapter.ts`：

```typescript
import type { UserDataSet, UserDataPoint } from '@/types/userData'
import type { IStorageAdapter } from './IStorageAdapter'
import { supabase } from '@/services/supabase/supabaseClient'

export class CloudStorageAdapter implements IStorageAdapter {
  /**
   * 获取当前用户 ID
   */
  private async getUserId(): Promise<string | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('获取用户失败:', error)
        return null
      }
      return user?.id || null
    } catch (error) {
      console.error('获取用户 ID 异常:', error)
      return null
    }
  }

  /**
   * 加载所有数据集
   */
  async loadDataSets(): Promise<UserDataSet[]> {
    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.warn('⚠️ 未登录，无法加载云端数据')
        return []
      }

      // 查询数据集及其关联的数据点
      const { data, error } = await supabase
        .from('user_data_sets')
        .select(`
          *,
          user_data_points (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ 加载数据失败:', error)
        throw error
      }

      if (!data || data.length === 0) {
        console.log('📦 云端暂无数据')
        return []
      }

      // 转换数据格式
      const dataSets: UserDataSet[] = data.map((ds: any) => ({
        id: ds.id,
        name: ds.name,
        regionName: ds.region_name || undefined,
        description: ds.description || undefined,
        points: (ds.user_data_points || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          longitude: p.longitude,
          latitude: p.latitude,
          altitude: p.altitude || undefined,
          cropType: p.crop_type || undefined,
          plantingTime: p.planting_time || undefined,
          evapotranspiration: p.evapotranspiration !== null ? p.evapotranspiration : undefined,
          soilType: p.soil_type || undefined,
          notes: p.notes || undefined,
          tags: p.tags || undefined,
          customData: p.custom_data || undefined,
          createdAt: p.created_at,
          updatedAt: p.updated_at
        })),
        createdAt: ds.created_at,
        updatedAt: ds.updated_at
      }))

      console.log('✅ 已从云端加载', dataSets.length, '个数据集')
      return dataSets
    } catch (error) {
      console.error('❌ 加载云端数据失败:', error)
      return []
    }
  }

  /**
   * 保存所有数据集
   */
  async saveDataSets(dataSets: UserDataSet[]): Promise<boolean> {
    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法保存到云端')
        return false
      }

      // 批量保存数据集
      for (const dataSet of dataSets) {
        const success = await this.addDataSet(dataSet)
        if (!success) {
          console.error('❌ 保存数据集失败:', dataSet.name)
          return false
        }
      }

      console.log('✅ 已保存', dataSets.length, '个数据集到云端')
      return true
    } catch (error) {
      console.error('❌ 保存数据失败:', error)
      return false
    }
  }

  /**
   * 添加数据集
   */
  async addDataSet(dataSet: UserDataSet): Promise<boolean> {
    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法添加数据集')
        return false
      }

      // 1. 保存数据集信息
      const { data: dsData, error: dsError } = await supabase
        .from('user_data_sets')
        .upsert({
          id: dataSet.id,
          user_id: userId,
          name: dataSet.name,
          region_name: dataSet.regionName || null,
          description: dataSet.description || null,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (dsError) {
        console.error('❌ 保存数据集失败:', dsError)
        throw dsError
      }

      // 2. 删除旧的数据点（如果存在）
      await supabase
        .from('user_data_points')
        .delete()
        .eq('data_set_id', dataSet.id)

      // 3. 插入新的数据点
      if (dataSet.points.length > 0) {
        const points = dataSet.points.map(p => ({
          id: p.id,
          data_set_id: dataSet.id,
          name: p.name,
          longitude: p.longitude,
          latitude: p.latitude,
          altitude: p.altitude || null,
          crop_type: p.cropType || null,
          planting_time: p.plantingTime || null,
          evapotranspiration: p.evapotranspiration !== undefined ? p.evapotranspiration : null,
          soil_type: p.soilType || null,
          notes: p.notes || null,
          tags: p.tags || null,
          custom_data: p.customData || null,
          created_at: p.createdAt || new Date().toISOString(),
          updated_at: p.updatedAt || new Date().toISOString()
        }))

        const { error: pointsError } = await supabase
          .from('user_data_points')
          .insert(points)

        if (pointsError) {
          console.error('❌ 保存数据点失败:', pointsError)
          throw pointsError
        }
      }

      console.log('✅ 已保存数据集到云端:', dataSet.name)
      return true
    } catch (error) {
      console.error('❌ 添加数据集失败:', error)
      return false
    }
  }

  /**
   * 更新数据集
   */
  async updateDataSet(id: string, updatedDataSet: UserDataSet): Promise<boolean> {
    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法更新数据集')
        return false
      }

      // 更新数据集信息
      const { error: dsError } = await supabase
        .from('user_data_sets')
        .update({
          name: updatedDataSet.name,
          region_name: updatedDataSet.regionName || null,
          description: updatedDataSet.description || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', userId)

      if (dsError) {
        console.error('❌ 更新数据集失败:', dsError)
        throw dsError
      }

      // 删除旧的数据点
      await supabase
        .from('user_data_points')
        .delete()
        .eq('data_set_id', id)

      // 插入新的数据点
      if (updatedDataSet.points.length > 0) {
        const points = updatedDataSet.points.map(p => ({
          id: p.id,
          data_set_id: id,
          name: p.name,
          longitude: p.longitude,
          latitude: p.latitude,
          altitude: p.altitude || null,
          crop_type: p.cropType || null,
          planting_time: p.plantingTime || null,
          evapotranspiration: p.evapotranspiration !== undefined ? p.evapotranspiration : null,
          soil_type: p.soilType || null,
          notes: p.notes || null,
          tags: p.tags || null,
          custom_data: p.customData || null,
          created_at: p.createdAt || new Date().toISOString(),
          updated_at: p.updatedAt || new Date().toISOString()
        }))

        const { error: pointsError } = await supabase
          .from('user_data_points')
          .insert(points)

        if (pointsError) {
          console.error('❌ 更新数据点失败:', pointsError)
          throw pointsError
        }
      }

      console.log('✅ 已更新数据集:', updatedDataSet.name)
      return true
    } catch (error) {
      console.error('❌ 更新数据集失败:', error)
      return false
    }
  }

  /**
   * 删除数据集
   */
  async deleteDataSet(id: string): Promise<boolean> {
    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法删除数据集')
        return false
      }

      // 删除数据集（级联删除会自动删除关联的数据点）
      const { error } = await supabase
        .from('user_data_sets')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)

      if (error) {
        console.error('❌ 删除数据集失败:', error)
        throw error
      }

      console.log('✅ 已删除数据集:', id)
      return true
    } catch (error) {
      console.error('❌ 删除数据集失败:', error)
      return false
    }
  }

  /**
   * 清空所有数据
   */
  async clearAll(): Promise<boolean> {
    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法清空数据')
        return false
      }

      // 删除该用户的所有数据集（级联删除会自动删除关联的数据点）
      const { error } = await supabase
        .from('user_data_sets')
        .delete()
        .eq('user_id', userId)

      if (error) {
        console.error('❌ 清空数据失败:', error)
        throw error
      }

      console.log('✅ 已清空所有云端数据')
      return true
    } catch (error) {
      console.error('❌ 清空数据失败:', error)
      return false
    }
  }

  /**
   * 获取存储信息（云端不适用，返回默认值）
   */
  async getStorageInfo() {
    return {
      usedMB: 0,
      totalMB: 500, // Supabase 免费额度
      usagePercent: 0
    }
  }
}
```

### 4.3 更新 StorageService

更新 `src/services/storage/StorageService.ts`，添加云存储支持：

```typescript
import { ref, watch } from 'vue'
import type { UserDataSet } from '@/types/userData'
import type { IStorageAdapter } from './IStorageAdapter'
import { LocalStorageAdapter } from './LocalStorageAdapter'
import { CloudStorageAdapter } from './CloudStorageAdapter' // 新增
import { StorageSettings, type StorageType } from './StorageSettings'

class StorageService implements IStorageAdapter {
  private currentAdapter: IStorageAdapter

  constructor() {
    this.currentAdapter = this.getAdapter(StorageSettings.currentType)
    watch(() => StorageSettings.currentType, (newType) => {
      this.currentAdapter = this.getAdapter(newType)
      console.log(`🔄 StorageService: 切换到 ${newType} 存储`)
    })
  }

  private getAdapter(type: StorageType): IStorageAdapter {
    switch (type) {
      case 'local':
        return new LocalStorageAdapter()
      case 'cloud':
        return new CloudStorageAdapter() // 新增
      default:
        return new LocalStorageAdapter()
    }
  }

  async loadDataSets(): Promise<UserDataSet[]> {
    return this.currentAdapter.loadDataSets()
  }

  async saveDataSets(dataSets: UserDataSet[]): Promise<boolean> {
    return this.currentAdapter.saveDataSets(dataSets)
  }

  async addDataSet(dataSet: UserDataSet): Promise<boolean> {
    return this.currentAdapter.addDataSet(dataSet)
  }

  async updateDataSet(id: string, updatedDataSet: UserDataSet): Promise<boolean> {
    return this.currentAdapter.updateDataSet(id, updatedDataSet)
  }

  async deleteDataSet(id: string): Promise<boolean> {
    return this.currentAdapter.deleteDataSet(id)
  }

  async clearAll(): Promise<boolean> {
    return this.currentAdapter.clearAll()
  }

  async getStorageInfo() {
    return this.currentAdapter.getStorageInfo ? this.currentAdapter.getStorageInfo() : { usedMB: 0, totalMB: 0, usagePercent: 0 }
  }
}

export const storageService = new StorageService()
```

---

## 第五步：用户认证

### 5.1 创建认证服务

创建 `src/services/auth/authService.ts`：

```typescript
import { supabase } from '@/services/supabase/supabaseClient'
import type { User } from '@supabase/supabase-js'

export class AuthService {
  /**
   * 获取当前用户
   */
  static async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      console.error('获取用户失败:', error)
      return null
    }
    return user
  }

  /**
   * 匿名登录（自动创建匿名账号）
   */
  static async signInAnonymously(): Promise<{ success: boolean, error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) {
        console.error('匿名登录失败:', error)
        return { success: false, error: error.message }
      }
      console.log('✅ 匿名登录成功')
      return { success: true }
    } catch (error: any) {
      console.error('匿名登录异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 邮箱注册
   */
  static async signUp(email: string, password: string): Promise<{ success: boolean, error?: string }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) {
        console.error('注册失败:', error)
        return { success: false, error: error.message }
      }
      console.log('✅ 注册成功')
      return { success: true }
    } catch (error: any) {
      console.error('注册异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 邮箱登录
   */
  static async signIn(email: string, password: string): Promise<{ success: boolean, error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        console.error('登录失败:', error)
        return { success: false, error: error.message }
      }
      console.log('✅ 登录成功')
      return { success: true }
    } catch (error: any) {
      console.error('登录异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 登出
   */
  static async signOut(): Promise<{ success: boolean, error?: string }> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('登出失败:', error)
        return { success: false, error: error.message }
      }
      console.log('✅ 登出成功')
      return { success: true }
    } catch (error: any) {
      console.error('登出异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 监听认证状态变化
   */
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
}
```

### 5.2 创建登录组件

创建 `src/components/AuthPanel.vue`：

```vue
<template>
  <div class="modal-overlay" @click="handleClose">
    <div class="modal-content auth-panel" @click.stop>
      <div class="modal-header">
        <h3>🔐 登录 / 注册</h3>
        <button class="modal-close" @click="handleClose">×</button>
      </div>

      <div class="modal-body">
        <!-- 当前用户信息 -->
        <div v-if="currentUser" class="user-info">
          <div class="user-avatar">👤</div>
          <div class="user-details">
            <p class="user-email">{{ currentUser.email || '匿名用户' }}</p>
            <p class="user-id">ID: {{ currentUser.id.substring(0, 8) }}...</p>
          </div>
          <button @click="handleSignOut" class="btn-signout">登出</button>
        </div>

        <!-- 登录/注册表单 -->
        <div v-else class="auth-forms">
          <!-- 匿名登录 -->
          <div class="auth-section">
            <h4>快速开始</h4>
            <p class="section-hint">无需注册，自动创建匿名账号</p>
            <button @click="handleAnonymousSignIn" class="btn-primary btn-anonymous" :disabled="loading">
              {{ loading ? '登录中...' : '匿名登录' }}
            </button>
          </div>

          <div class="divider">
            <span>或</span>
          </div>

          <!-- 邮箱登录 -->
          <div class="auth-section">
            <h4>{{ isLogin ? '登录' : '注册' }}</h4>
            <div class="form-group">
              <label>邮箱</label>
              <input 
                v-model="email" 
                type="email" 
                placeholder="your@email.com"
                :disabled="loading"
              />
            </div>
            <div class="form-group">
              <label>密码</label>
              <input 
                v-model="password" 
                type="password" 
                placeholder="至少6个字符"
                :disabled="loading"
              />
            </div>
            <button @click="handleEmailAuth" class="btn-primary" :disabled="loading || !email || !password">
              {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
            </button>
            <p class="switch-mode">
              {{ isLogin ? '还没有账号？' : '已有账号？' }}
              <a @click="isLogin = !isLogin" class="link">{{ isLogin ? '注册' : '登录' }}</a>
            </p>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="error-message">
          ❌ {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { AuthService } from '@/services/auth/authService'
import type { User } from '@supabase/supabase-js'

const emit = defineEmits(['close', 'auth-success'])

const currentUser = ref<User | null>(null)
const email = ref('')
const password = ref('')
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

let authStateSubscription: any = null

// 加载当前用户
const loadCurrentUser = async () => {
  currentUser.value = await AuthService.getCurrentUser()
}

// 监听认证状态变化
onMounted(() => {
  loadCurrentUser()
  authStateSubscription = AuthService.onAuthStateChange((user) => {
    currentUser.value = user
    if (user) {
      emit('auth-success')
    }
  })
})

onUnmounted(() => {
  if (authStateSubscription) {
    authStateSubscription.data.subscription.unsubscribe()
  }
})

// 匿名登录
const handleAnonymousSignIn = async () => {
  loading.value = true
  error.value = ''
  const result = await AuthService.signInAnonymously()
  loading.value = false
  if (result.success) {
    handleClose()
  } else {
    error.value = result.error || '登录失败'
  }
}

// 邮箱登录/注册
const handleEmailAuth = async () => {
  loading.value = true
  error.value = ''
  
  const result = isLogin.value
    ? await AuthService.signIn(email.value, password.value)
    : await AuthService.signUp(email.value, password.value)
  
  loading.value = false
  
  if (result.success) {
    handleClose()
  } else {
    error.value = result.error || (isLogin.value ? '登录失败' : '注册失败')
  }
}

// 登出
const handleSignOut = async () => {
  loading.value = true
  error.value = ''
  const result = await AuthService.signOut()
  loading.value = false
  if (result.success) {
    currentUser.value = null
  } else {
    error.value = result.error || '登出失败'
  }
}

// 关闭面板
const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
/* 样式代码...（参考其他面板的样式） */
</style>
```

---

## 第六步：数据迁移

### 6.1 创建数据迁移工具

创建 `src/services/migration/dataMigrationService.ts`：

```typescript
import { LocalStorageAdapter } from '@/services/storage/LocalStorageAdapter'
import { CloudStorageAdapter } from '@/services/storage/CloudStorageAdapter'
import type { UserDataSet } from '@/types/userData'

export class DataMigrationService {
  /**
   * 从本地存储迁移到云端
   */
  static async migrateToCloud(): Promise<{ success: boolean, count: number, error?: string }> {
    try {
      // 1. 从本地加载数据
      const localAdapter = new LocalStorageAdapter()
      const localDataSets = await localAdapter.loadDataSets()

      if (localDataSets.length === 0) {
        return { success: true, count: 0 }
      }

      // 2. 保存到云端
      const cloudAdapter = new CloudStorageAdapter()
      const success = await cloudAdapter.saveDataSets(localDataSets)

      if (!success) {
        return { success: false, count: 0, error: '保存到云端失败' }
      }

      return { success: true, count: localDataSets.length }
    } catch (error: any) {
      console.error('迁移失败:', error)
      return { success: false, count: 0, error: error.message }
    }
  }

  /**
   * 从云端迁移到本地
   */
  static async migrateToLocal(): Promise<{ success: boolean, count: number, error?: string }> {
    try {
      // 1. 从云端加载数据
      const cloudAdapter = new CloudStorageAdapter()
      const cloudDataSets = await cloudAdapter.loadDataSets()

      if (cloudDataSets.length === 0) {
        return { success: true, count: 0 }
      }

      // 2. 保存到本地
      const localAdapter = new LocalStorageAdapter()
      const success = await localAdapter.saveDataSets(cloudDataSets)

      if (!success) {
        return { success: false, count: 0, error: '保存到本地失败' }
      }

      return { success: true, count: cloudDataSets.length }
    } catch (error: any) {
      console.error('迁移失败:', error)
      return { success: false, count: 0, error: error.message }
    }
  }

  /**
   * 双向同步（合并本地和云端数据）
   */
  static async syncBothWays(): Promise<{ success: boolean, localCount: number, cloudCount: number, error?: string }> {
    try {
      const localAdapter = new LocalStorageAdapter()
      const cloudAdapter = new CloudStorageAdapter()

      const localDataSets = await localAdapter.loadDataSets()
      const cloudDataSets = await cloudAdapter.loadDataSets()

      // 合并数据（以云端为主）
      const mergedDataSets = [...cloudDataSets]
      
      // 添加本地独有的数据
      localDataSets.forEach(local => {
        if (!cloudDataSets.find(c => c.id === local.id)) {
          mergedDataSets.push(local)
        }
      })

      // 保存到两端
      await localAdapter.saveDataSets(mergedDataSets)
      await cloudAdapter.saveDataSets(mergedDataSets)

      return { 
        success: true, 
        localCount: localDataSets.length, 
        cloudCount: cloudDataSets.length 
      }
    } catch (error: any) {
      console.error('同步失败:', error)
      return { 
        success: false, 
        localCount: 0, 
        cloudCount: 0, 
        error: error.message 
      }
    }
  }
}
```

---

## 第七步：测试验证

### 7.1 测试步骤

1. **测试匿名登录**
   ```typescript
   // 在浏览器控制台运行
   import { AuthService } from '@/services/auth/authService'
   await AuthService.signInAnonymously()
   ```

2. **测试数据保存**
   ```typescript
   import { storageService } from '@/services/storage/StorageService'
   import { StorageSettings } from '@/services/storage/StorageSettings'
   
   StorageSettings.currentType = 'cloud'
   const testDataSet = { /* 测试数据 */ }
   await storageService.addDataSet(testDataSet)
   ```

3. **测试数据加载**
   ```typescript
   const dataSets = await storageService.loadDataSets()
   console.log('加载的数据集:', dataSets)
   ```

4. **在 Supabase 控制台验证**
   - 进入 **Table Editor**
   - 查看 `user_data_sets` 和 `user_data_points` 表
   - 确认数据已保存

### 7.2 验证 RLS 策略

1. 创建两个测试账号
2. 分别登录并创建数据
3. 验证每个账号只能看到自己的数据

---

## 第八步：故障排除

### 常见问题

1. **环境变量未加载**
   - 检查 `.env.local` 文件是否存在
   - 重启开发服务器
   - 检查变量名是否正确（必须以 `VITE_` 开头）

2. **RLS 策略阻止访问**
   - 检查用户是否已登录
   - 检查 RLS 策略是否正确创建
   - 在 Supabase 控制台测试 SQL 查询

3. **数据格式不匹配**
   - 检查数据库表结构
   - 检查数据转换逻辑
   - 查看浏览器控制台错误

4. **网络连接问题**
   - 检查 Supabase URL 是否正确
   - 检查 API Key 是否正确
   - 检查网络连接

---

## ✅ 完成检查清单

- [ ] Supabase 项目已创建
- [ ] 数据库表已创建
- [ ] RLS 策略已配置
- [ ] 环境变量已配置
- [ ] 代码已实现
- [ ] 认证功能已测试
- [ ] 数据保存已测试
- [ ] 数据加载已测试
- [ ] 多设备同步已测试

---

## 🎉 下一步

完成以上步骤后，你的应用就可以使用 Supabase 云存储了！

如果需要帮助，请告诉我你遇到的问题。

