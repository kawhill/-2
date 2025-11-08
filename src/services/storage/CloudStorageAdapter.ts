import type { UserDataSet, UserDataPoint, StorageInfo } from '@/types/userData'
import type { IStorageAdapter } from './IStorageAdapter'
import { supabase } from '@/services/supabase/supabaseClient'

export class CloudStorageAdapter implements IStorageAdapter {
  /**
   * 检查 Supabase 是否可用
   */
  private checkSupabase(): boolean {
    if (!supabase) {
      console.error('❌ Supabase 未配置，请检查环境变量')
      return false
    }
    return true
  }

  /**
   * 获取当前用户 ID
   */
  private async getUserId(): Promise<string | null> {
    if (!this.checkSupabase()) return null

    try {
      const { data: { user }, error } = await supabase!.auth.getUser()
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
    if (!this.checkSupabase()) return []

    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.warn('⚠️ 未登录，无法加载云端数据')
        return []
      }

      // 查询数据集及其关联的数据点
      const { data, error } = await supabase!
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
   * 保存数据集（实现接口）
   */
  async saveDataSet(dataSet: UserDataSet): Promise<boolean> {
    return this.addDataSet(dataSet)
  }

  /**
   * 添加数据集（内部方法）
   */
  private async addDataSet(dataSet: UserDataSet): Promise<boolean> {
    if (!this.checkSupabase()) return false

    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法添加数据集')
        return false
      }

      // 1. 保存数据集信息
      const { data: dsData, error: dsError } = await supabase!
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
      await supabase!
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

        const { error: pointsError } = await supabase!
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
    if (!this.checkSupabase()) return false

    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法更新数据集')
        return false
      }

      // 更新数据集信息
      const { error: dsError } = await supabase!
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
      await supabase!
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

        const { error: pointsError } = await supabase!
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
    if (!this.checkSupabase()) return false

    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法删除数据集')
        return false
      }

      // 删除数据集（级联删除会自动删除关联的数据点）
      const { error } = await supabase!
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
    if (!this.checkSupabase()) return false

    try {
      const userId = await this.getUserId()
      if (!userId) {
        console.error('❌ 未登录，无法清空数据')
        return false
      }

      // 删除该用户的所有数据集（级联删除会自动删除关联的数据点）
      const { error } = await supabase!
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
  async getStorageInfo(): Promise<StorageInfo> {
    return {
      usedBytes: 0,
      usedKB: 0,
      usedMB: 0,
      totalMB: 500, // Supabase 免费额度
      remainingMB: 500,
      usagePercent: 0
    }
  }

  /**
   * 检查是否可用（需要登录）
   */
  async isAvailable(): Promise<boolean> {
    if (!this.checkSupabase()) return false
    const userId = await this.getUserId()
    return userId !== null
  }
}

