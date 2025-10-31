// 用户数据类型定义

/**
 * 用户数据点接口
 */
export interface UserDataPoint {
  id: string                    // 唯一标识
  name: string                  // 点名称
  longitude: number             // 经度
  latitude: number              // 纬度
  altitude?: number             // 海拔（可选）
  cropType?: string             // 作物类型（可选）
  plantingTime?: string         // 种植时间（可选）
  evapotranspiration?: number   // 蒸散发量（可选）
  soilType?: string             // 土壤属性（可选）
  notes?: string                // 备注（可选）
  tags?: string[]               // 标签（可选）
  customData?: Record<string, any>  // 自定义字段（可选）
  createdAt: string             // 创建时间
  updatedAt: string             // 更新时间
}

/**
 * 用户数据集接口
 */
export interface UserDataSet {
  id: string                    // 数据集ID
  name: string                  // 数据集名称
  regionName?: string           // 分区名称（用于分区管理）
  description?: string          // 描述
  points: UserDataPoint[]       // 包含的数据点
  createdAt: string             // 创建时间
  updatedAt: string             // 更新时间
}

/**
 * 数据验证结果
 */
export interface ValidationResult {
  isValid: boolean              // 是否验证通过
  validCount: number            // 有效数据数量
  invalidCount: number          // 无效数据数量
  warnings: ValidationWarning[] // 警告信息
  errors: ValidationError[]     // 错误信息
}

/**
 * 验证警告
 */
export interface ValidationWarning {
  row: number                   // 行号
  field: string                 // 字段名
  message: string               // 警告信息
}

/**
 * 验证错误
 */
export interface ValidationError {
  row: number                   // 行号
  field: string                 // 字段名
  message: string               // 错误信息
}

/**
 * 存储信息
 */
export interface StorageInfo {
  usedBytes: number             // 已使用字节数
  usedKB: number                // 已使用KB
  usedMB: number                // 已使用MB
  totalMB: number               // 总容量MB
  remainingMB: number           // 剩余容量MB
  usagePercent: number          // 使用百分比
}

/**
 * 文件类型枚举
 */
export enum FileType {
  EXCEL = 'excel',
  CSV = 'csv',
  JSON = 'json',
  LYR = 'lyr'
}

/**
 * 导出格式枚举
 */
export enum ExportFormat {
  JSON = 'json',
  CSV = 'csv',
  EXCEL = 'excel'
}

