// 统一存储服务
import { LocalStorageAdapter } from './LocalStorageAdapter'
import { StorageSettings } from './StorageSettings'
import type { IStorageAdapter } from './IStorageAdapter'
import type { StorageType } from './StorageSettings'
import type { UserDataSet, StorageInfo } from '@/types/userData'

/**
 * 统一存储服务
 * 提供统一的存储接口，支持本地存储和云存储切换
 */
export class StorageService {
  private adapter: IStorageAdapter
  private storageType: StorageType

  constructor(storageType?: StorageType) {
    this.storageType = storageType || StorageSettings.getStorageType()
    this.adapter = this.createAdapter(this.storageType)
  }

  /**
   * 创建适配器
   */
  private createAdapter(type: StorageType): IStorageAdapter {
    if (type === 'local') {
      return new LocalStorageAdapter()
    } else {
      // 云存储适配器（待实现）
      // 暂时返回本地存储适配器作为后备
      console.warn('⚠️ 云存储适配器尚未实现，使用本地存储作为后备')
      return new LocalStorageAdapter()
    }
  }

  /**
   * 切换存储方式
   */
  async switchStorage(type: StorageType): Promise<boolean> {
    try {
      // 检查新存储方式是否可用
      const newAdapter = type === 'local' 
        ? new LocalStorageAdapter()
        : null // 云存储适配器待实现

      if (!newAdapter) {
        console.error('云存储适配器尚未实现')
        return false
      }

      const isAvailable = await newAdapter.isAvailable()
      if (!isAvailable) {
        console.error('存储方式不可用:', type)
        return false
      }

      // 切换存储方式
      this.storageType = type
      this.adapter = newAdapter
      StorageSettings.setStorageType(type)

      console.log('✅ 存储方式已切换为:', type)
      return true
    } catch (error) {
      console.error('切换存储方式失败:', error)
      return false
    }
  }

  /**
   * 获取当前存储类型
   */
  getStorageType(): StorageType {
    return this.storageType
  }

  /**
   * 加载所有数据集
   */
  async loadDataSets(): Promise<UserDataSet[]> {
    try {
      return await this.adapter.loadDataSets()
    } catch (error) {
      console.error('加载数据失败:', error)
      return []
    }
  }

  /**
   * 保存数据集
   */
  async saveDataSet(dataSet: UserDataSet): Promise<boolean> {
    try {
      return await this.adapter.saveDataSet(dataSet)
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
      return await this.adapter.deleteDataSet(id)
    } catch (error) {
      console.error('删除数据失败:', error)
      return false
    }
  }

  /**
   * 更新数据集
   */
  async updateDataSet(id: string, dataSet: UserDataSet): Promise<boolean> {
    try {
      return await this.adapter.updateDataSet(id, dataSet)
    } catch (error) {
      console.error('更新数据失败:', error)
      return false
    }
  }

  /**
   * 获取存储信息
   */
  async getStorageInfo(): Promise<StorageInfo> {
    try {
      return await this.adapter.getStorageInfo()
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
   * 检查当前存储是否可用
   */
  async isAvailable(): Promise<boolean> {
    try {
      return await this.adapter.isAvailable()
    } catch {
      return false
    }
  }
}

// 导出单例实例
export const storageService = new StorageService()

