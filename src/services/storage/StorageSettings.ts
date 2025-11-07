// 存储设置管理
export type StorageType = 'local' | 'cloud'

/**
 * 存储设置管理
 * 管理用户的存储方式选择
 */
export class StorageSettings {
  private static readonly SETTINGS_KEY = 'storage_settings'

  /**
   * 获取存储类型
   */
  static getStorageType(): StorageType {
    try {
      const settings = localStorage.getItem(this.SETTINGS_KEY)
      if (!settings) {
        return 'local' // 默认本地存储
      }

      const parsed = JSON.parse(settings)
      return parsed.storageType || 'local'
    } catch (error) {
      console.error('读取存储设置失败:', error)
      return 'local'
    }
  }

  /**
   * 设置存储类型
   */
  static setStorageType(type: StorageType): void {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify({
        storageType: type,
        updatedAt: new Date().toISOString()
      }))
      console.log('✅ 存储方式已切换为:', type)
    } catch (error) {
      console.error('保存存储设置失败:', error)
    }
  }

  /**
   * 清除存储设置
   */
  static clear(): void {
    try {
      localStorage.removeItem(this.SETTINGS_KEY)
    } catch (error) {
      console.error('清除存储设置失败:', error)
    }
  }
}

