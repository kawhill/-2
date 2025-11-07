// 本地存储适配器
import { UserDataStorageService } from '../userDataStorageService'
import type { IStorageAdapter } from './IStorageAdapter'
import type { UserDataSet, StorageInfo } from '@/types/userData'

/**
 * 本地存储适配器
 * 使用 localStorage 存储用户数据
 */
export class LocalStorageAdapter implements IStorageAdapter {
  /**
   * 加载所有数据集
   */
  async loadDataSets(): Promise<UserDataSet[]> {
    try {
      return UserDataStorageService.loadDataSets()
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
      return UserDataStorageService.addDataSet(dataSet)
    } catch (error) {
      console.error('本地存储保存失败:', error)
      return false
    }
  }

  /**
   * 删除数据集
   */
  async deleteDataSet(id: string): Promise<boolean> {
    try {
      return UserDataStorageService.deleteDataSet(id)
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
      return UserDataStorageService.updateDataSet(id, dataSet)
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
      return UserDataStorageService.getStorageInfo()
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

