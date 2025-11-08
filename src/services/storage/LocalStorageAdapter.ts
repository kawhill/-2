// 本地存储适配器
import { AuthService } from '../auth/authService'
import type { IStorageAdapter } from './IStorageAdapter'
import type { UserDataSet, StorageInfo } from '@/types/userData'

/**
 * 本地存储适配器
 * 使用 localStorage 存储用户数据，按用户ID隔离
 */
export class LocalStorageAdapter implements IStorageAdapter {
  /**
   * 获取当前用户ID，用于数据隔离
   */
  private async getUserId(): Promise<string | null> {
    try {
      const user = await AuthService.getCurrentUser()
      return user?.id || null
    } catch (error) {
      console.error('获取用户ID失败:', error)
      return null
    }
  }

  /**
   * 获取存储键（包含用户ID）
   */
  private async getStorageKey(): Promise<string> {
    const userId = await this.getUserId()
    if (userId) {
      return `user_data_sets_${userId}`
    }
    // 如果没有用户ID，使用默认键（向后兼容）
    return 'user_data_sets'
  }

  /**
   * 加载所有数据集
   */
  async loadDataSets(): Promise<UserDataSet[]> {
    try {
      const storageKey = await this.getStorageKey()
      const userId = await this.getUserId()
      
      console.log(`📦 从本地存储加载数据 (用户: ${userId || '未登录'}, 键: ${storageKey})`)
      
      // 使用自定义存储键加载数据
      const dataStr = localStorage.getItem(storageKey)
      if (!dataStr) {
        console.log('⚠️ 没有找到用户数据（localStorage为空）')
        return []
      }

      const data = JSON.parse(dataStr)
      
      // 验证数据格式
      if (!data.dataSets || !Array.isArray(data.dataSets)) {
        console.warn('⚠️ 数据格式错误，无法解析')
        return []
      }

      console.log('✅ 已加载', data.dataSets.length, '个数据集')
      return data.dataSets
    } catch (error) {
      console.error('本地存储加载失败:', error)
      return []
    }
  }

  /**
   * 保存数据集
   */
  async saveDataSet(dataSet: UserDataSet): Promise<boolean> {
    try {
      const dataSets = await this.loadDataSets()
      dataSets.push(dataSet)
      return await this.saveAllDataSets(dataSets)
    } catch (error) {
      console.error('本地存储保存失败:', error)
      return false
    }
  }

  /**
   * 保存所有数据集
   */
  private async saveAllDataSets(dataSets: UserDataSet[]): Promise<boolean> {
    try {
      const storageKey = await this.getStorageKey()
      const userId = await this.getUserId()
      
      const data = {
        version: '1.0',
        userId: userId,
        dataSets: dataSets,
        lastUpdated: new Date().toISOString()
      }
      
      const dataStr = JSON.stringify(data)
      localStorage.setItem(storageKey, dataStr)
      
      console.log(`✅ 数据已保存 (用户: ${userId || '未登录'}, 键: ${storageKey}, ${dataSets.length} 个数据集)`)
      return true
    } catch (error) {
      console.error('保存数据失败:', error)
      return false
    }
  }

  /**
   * 删除数据集
   */
  async deleteDataSet(id: string): Promise<boolean> {
    try {
      const dataSets = await this.loadDataSets()
      const filteredDataSets = dataSets.filter(ds => ds.id !== id)
      
      if (filteredDataSets.length === dataSets.length) {
        console.warn('未找到要删除的数据集:', id)
        return false
      }

      return await this.saveAllDataSets(filteredDataSets)
    } catch (error) {
      console.error('本地存储删除失败:', error)
      return false
    }
  }

  /**
   * 更新数据集
   */
  async updateDataSet(id: string, dataSet: UserDataSet): Promise<boolean> {
    try {
      const dataSets = await this.loadDataSets()
      const index = dataSets.findIndex(ds => ds.id === id)
      
      if (index === -1) {
        console.error('未找到数据集:', id)
        return false
      }

      dataSets[index] = {
        ...dataSet,
        updatedAt: new Date().toISOString()
      }
      
      return await this.saveAllDataSets(dataSets)
    } catch (error) {
      console.error('本地存储更新失败:', error)
      return false
    }
  }

  /**
   * 获取存储信息
   */
  async getStorageInfo(): Promise<StorageInfo> {
    try {
      const storageKey = await this.getStorageKey()
      const dataStr = localStorage.getItem(storageKey)
      
      const usedBytes = dataStr ? new Blob([dataStr]).size : 0
      const usedKB = usedBytes / 1024
      const usedMB = usedKB / 1024
      const totalMB = 5
      const remainingMB = Math.max(0, totalMB - usedMB)
      const usagePercent = (usedMB / totalMB) * 100

      return {
        usedBytes,
        usedKB: parseFloat(usedKB.toFixed(2)),
        usedMB: parseFloat(usedMB.toFixed(2)),
        totalMB,
        remainingMB: parseFloat(remainingMB.toFixed(2)),
        usagePercent: parseFloat(usagePercent.toFixed(2))
      }
    } catch (error) {
      console.error('获取存储信息失败:', error)
      return {
        usedBytes: 0,
        usedKB: 0,
        usedMB: 0,
        totalMB: 5,
        remainingMB: 5,
        usagePercent: 0
      }
    }
  }

  /**
   * 检查是否可用（本地存储始终可用）
   */
  async isAvailable(): Promise<boolean> {
    try {
      // 检查 localStorage 是否可用
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }
}

