// 存储适配器接口
import type { UserDataSet, StorageInfo } from '@/types/userData'

/**
 * 存储适配器接口
 * 定义统一的存储操作接口，支持不同的存储实现
 */
export interface IStorageAdapter {
  /**
   * 加载所有数据集
   */
  loadDataSets(): Promise<UserDataSet[]>

  /**
   * 保存数据集
   */
  saveDataSet(dataSet: UserDataSet): Promise<boolean>

  /**
   * 删除数据集
   */
  deleteDataSet(id: string): Promise<boolean>

  /**
   * 更新数据集
   */
  updateDataSet(id: string, dataSet: UserDataSet): Promise<boolean>

  /**
   * 获取存储信息
   */
  getStorageInfo(): Promise<StorageInfo>

  /**
   * 检查是否可用（例如：云存储需要登录）
   */
  isAvailable(): Promise<boolean>
}

