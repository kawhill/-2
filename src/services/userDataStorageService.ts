// 用户数据存储服务
import type { UserDataSet, UserDataPoint, StorageInfo } from '@/types/userData'

/**
 * 用户数据存储服务
 * 使用 localStorage 存储用户导入的数据
 */
export class UserDataStorageService {
  private static readonly STORAGE_KEY = 'user_data_sets'
  private static readonly VERSION = '1.0'
  private static readonly MAX_STORAGE_MB = 5 // 5MB 限制

  /**
   * 保存所有数据集
   */
  static saveDataSets(dataSets: UserDataSet[]): boolean {
    try {
      const data = {
        version: this.VERSION,
        dataSets: dataSets,
        lastUpdated: new Date().toISOString()
      }
      
      const dataStr = JSON.stringify(data)
      
      // 检查存储空间
      if (dataStr.length > this.MAX_STORAGE_MB * 1024 * 1024) {
        console.error('数据超出存储限制')
        return false
      }
      
      localStorage.setItem(this.STORAGE_KEY, dataStr)
      
      // 立即验证保存是否成功
      const verifyStr = localStorage.getItem(this.STORAGE_KEY)
      if (!verifyStr || verifyStr !== dataStr) {
        console.error('❌ 保存验证失败：数据未正确保存到 localStorage')
        return false
      }
      
      console.log('✅ 数据已保存并验证成功', dataSets.length, '个数据集，大小:', (dataStr.length / 1024).toFixed(2), 'KB')
      return true
    } catch (error) {
      console.error('❌ 保存数据失败:', error)
      return false
    }
  }

  /**
   * 加载所有数据集
   */
  static loadDataSets(): UserDataSet[] {
    try {
      const dataStr = localStorage.getItem(this.STORAGE_KEY)
      if (!dataStr) {
        console.log('⚠️ 没有找到用户数据（localStorage为空）')
        return []
      }

      console.log('📦 从localStorage读取数据，大小:', (dataStr.length / 1024).toFixed(2), 'KB')
      
      const data = JSON.parse(dataStr)
      
      // 验证数据格式
      if (!data.dataSets || !Array.isArray(data.dataSets)) {
        console.warn('⚠️ 数据格式错误，无法解析')
        return []
      }

      console.log('✅ 已加载', data.dataSets.length, '个数据集')
      
      // 详细列出所有数据集
      data.dataSets.forEach((ds: UserDataSet, index: number) => {
        console.log(`  - 数据集 ${index + 1}: "${ds.name}" (ID: ${ds.id.substring(0, 8)}..., 分区: ${ds.regionName || '无'}, ${ds.points.length} 个点)`)
      })
      
      return data.dataSets
    } catch (error) {
      console.error('❌ 加载数据失败:', error)
      console.error('错误详情:', error instanceof Error ? error.message : String(error))
      return []
    }
  }

  /**
   * 添加新数据集
   */
  static addDataSet(dataSet: UserDataSet): boolean {
    try {
      const dataSets = this.loadDataSets()
      dataSets.push(dataSet)
      return this.saveDataSets(dataSets)
    } catch (error) {
      console.error('❌ 添加数据集失败:', error)
      return false
    }
  }

  /**
   * 更新数据集
   */
  static updateDataSet(id: string, updatedDataSet: UserDataSet): boolean {
    try {
      const dataSets = this.loadDataSets()
      const index = dataSets.findIndex(ds => ds.id === id)
      
      if (index === -1) {
        console.error('未找到数据集:', id)
        return false
      }

      dataSets[index] = {
        ...updatedDataSet,
        updatedAt: new Date().toISOString()
      }
      
      return this.saveDataSets(dataSets)
    } catch (error) {
      console.error('❌ 更新数据集失败:', error)
      return false
    }
  }

  /**
   * 删除数据集
   */
  static deleteDataSet(id: string): boolean {
    try {
      const dataSets = this.loadDataSets()
      const filteredDataSets = dataSets.filter(ds => ds.id !== id)
      
      if (filteredDataSets.length === dataSets.length) {
        console.warn('未找到要删除的数据集:', id)
        return false
      }

      console.log('✅ 已删除数据集:', id)
      return this.saveDataSets(filteredDataSets)
    } catch (error) {
      console.error('❌ 删除数据集失败:', error)
      return false
    }
  }

  /**
   * 获取单个数据集
   */
  static getDataSet(id: string): UserDataSet | null {
    try {
      const dataSets = this.loadDataSets()
      return dataSets.find(ds => ds.id === id) || null
    } catch (error) {
      console.error('❌ 获取数据集失败:', error)
      return null
    }
  }

  /**
   * 清空所有数据
   */
  static clearAll(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      console.log('✅ 已清空所有用户数据')
      return true
    } catch (error) {
      console.error('❌ 清空数据失败:', error)
      return false
    }
  }

  /**
   * 获取存储信息
   */
  static getStorageInfo(): StorageInfo {
    try {
      let totalBytes = 0
      
      // 计算所有 localStorage 使用的空间
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalBytes += (localStorage[key].length + key.length) * 2 // UTF-16 编码，每个字符2字节
        }
      }

      const usedKB = totalBytes / 1024
      const usedMB = usedKB / 1024
      const totalMB = this.MAX_STORAGE_MB
      const remainingMB = Math.max(0, totalMB - usedMB)
      const usagePercent = (usedMB / totalMB) * 100

      return {
        usedBytes: totalBytes,
        usedKB: parseFloat(usedKB.toFixed(2)),
        usedMB: parseFloat(usedMB.toFixed(2)),
        totalMB,
        remainingMB: parseFloat(remainingMB.toFixed(2)),
        usagePercent: parseFloat(usagePercent.toFixed(2))
      }
    } catch (error) {
      console.error('❌ 获取存储信息失败:', error)
      return {
        usedBytes: 0,
        usedKB: 0,
        usedMB: 0,
        totalMB: this.MAX_STORAGE_MB,
        remainingMB: this.MAX_STORAGE_MB,
        usagePercent: 0
      }
    }
  }

  /**
   * 检查是否有足够空间
   */
  static hasEnoughSpace(estimatedSizeMB: number): boolean {
    const info = this.getStorageInfo()
    return info.remainingMB >= estimatedSizeMB
  }

  /**
   * 导出数据为 JSON 字符串
   */
  static exportAsJSON(): string {
    const dataSets = this.loadDataSets()
    return JSON.stringify(dataSets, null, 2)
  }

  /**
   * 从 JSON 字符串导入数据
   */
  static importFromJSON(jsonStr: string): boolean {
    try {
      const dataSets = JSON.parse(jsonStr)
      
      if (!Array.isArray(dataSets)) {
        console.error('导入的数据格式错误')
        return false
      }

      return this.saveDataSets(dataSets)
    } catch (error) {
      console.error('❌ 导入数据失败:', error)
      return false
    }
  }

  /**
   * 获取所有数据点的总数
   */
  static getTotalPointsCount(): number {
    const dataSets = this.loadDataSets()
    return dataSets.reduce((total, ds) => total + ds.points.length, 0)
  }

  /**
   * 搜索数据点
   */
  static searchPoints(keyword: string): UserDataPoint[] {
    const dataSets = this.loadDataSets()
    const allPoints: UserDataPoint[] = []

    dataSets.forEach(ds => {
      ds.points.forEach(point => {
        if (
          point.name.includes(keyword) ||
          point.cropType?.includes(keyword) ||
          point.notes?.includes(keyword)
        ) {
          allPoints.push(point)
        }
      })
    })

    return allPoints
  }
}

