// 数据文件解析服务
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid'
import type { UserDataPoint, ValidationResult, ValidationError, ValidationWarning, FileType } from '@/types/userData'

/**
 * 数据文件解析服务
 * 支持 Excel, CSV, JSON 格式
 */
export class DataParserService {
  
  /**
   * 解析文件（自动检测格式）
   */
  static async parseFile(file: File): Promise<UserDataPoint[]> {
    const fileType = this.detectFileType(file)
    
    switch (fileType) {
      case 'excel':
        return await this.parseExcel(file)
      case 'csv':
        return await this.parseCSV(file)
      case 'json':
        return await this.parseJSON(file)
      default:
        throw new Error(`不支持的文件类型: ${file.name}`)
    }
  }

  /**
   * 检测文件类型
   */
  private static detectFileType(file: File): FileType {
    const ext = file.name.split('.').pop()?.toLowerCase()
    
    switch (ext) {
      case 'xlsx':
      case 'xls':
        return 'excel' as FileType
      case 'csv':
        return 'csv' as FileType
      case 'json':
        return 'json' as FileType
      case 'lyr':
        return 'lyr' as FileType
      default:
        throw new Error(`不支持的文件扩展名: .${ext}`)
    }
  }

  /**
   * 解析 Excel 文件
   */
  private static async parseExcel(file: File): Promise<UserDataPoint[]> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      
      // 读取第一个工作表
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      
      // 转换为 JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
      
      // 转换为标准格式
      return this.convertToUserDataPoints(jsonData)
    } catch (error) {
      console.error('解析 Excel 失败:', error)
      throw new Error('Excel 文件解析失败')
    }
  }

  /**
   * 解析 CSV 文件
   */
  private static async parseCSV(file: File): Promise<UserDataPoint[]> {
    try {
      const text = await file.text()
      const lines = text.split('\n').filter(line => line.trim())
      
      if (lines.length === 0) {
        throw new Error('CSV 文件为空')
      }

      // 解析表头
      const headers = this.parseCSVLine(lines[0])
      
      // 解析数据行
      const jsonData = []
      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCSVLine(lines[i])
        if (values.length === headers.length) {
          const row: any = {}
          headers.forEach((header, index) => {
            row[header.trim()] = values[index].trim()
          })
          jsonData.push(row)
        }
      }

      return this.convertToUserDataPoints(jsonData)
    } catch (error) {
      console.error('解析 CSV 失败:', error)
      throw new Error('CSV 文件解析失败')
    }
  }

  /**
   * 解析 CSV 行（处理引号和逗号）
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current)
    return result
  }

  /**
   * 解析 JSON 文件
   */
  private static async parseJSON(file: File): Promise<UserDataPoint[]> {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      // 支持两种格式：
      // 1. 数组格式：[{...}, {...}]
      // 2. 对象格式：{points: [{...}, {...}]}
      let jsonData = Array.isArray(data) ? data : (data.points || [])
      
      return this.convertToUserDataPoints(jsonData)
    } catch (error) {
      console.error('解析 JSON 失败:', error)
      throw new Error('JSON 文件解析失败')
    }
  }

  /**
   * 将原始数据转换为标准格式
   */
  private static convertToUserDataPoints(rawData: any[]): UserDataPoint[] {
    const points: UserDataPoint[] = []
    
    rawData.forEach((row, index) => {
      try {
        // 字段映射（支持多种字段名）
        const longitude = this.extractNumber(row, [
          'longitude', 'lng', 'lon', 'x', '经度', 'jingdu'
        ])
        
        const latitude = this.extractNumber(row, [
          'latitude', 'lat', 'y', '纬度', 'weidu'
        ])

        // 必须有经纬度
        if (longitude === null || latitude === null) {
          console.warn(`第 ${index + 1} 行缺少经纬度，跳过`)
          return
        }

        const point: UserDataPoint = {
          id: uuidv4(),
          name: this.extractString(row, ['name', 'pointName', '点名称', '名称']) || `点${index + 1}`,
          longitude: longitude!,
          latitude: latitude!,
          altitude: this.extractNumber(row, ['altitude', 'alt', 'elevation', '海拔', 'haiba']),
          cropType: this.extractString(row, ['cropType', 'crop', '作物类型', '作物', 'zuowu']),
          plantingTime: this.extractString(row, ['plantingTime', '种植时间', 'zhongzhishijian']),
          evapotranspiration: this.extractNumber(row, ['evapotranspiration', 'ET', 'et', '蒸散发量', 'zhengsan', '蒸散']),
          soilType: this.extractString(row, ['soilType', 'soil', '土壤属性', '土壤类型', '土壤', 'turang']),
          notes: this.extractString(row, ['notes', 'note', 'remark', '备注', 'beizhu']),
          tags: this.extractArray(row, ['tags', '标签', 'biaoqian']),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        points.push(point)
      } catch (error) {
        console.warn(`第 ${index + 1} 行数据格式错误，跳过:`, error)
      }
    })

    return points
  }

  /**
   * 提取数字字段（支持多个可能的字段名）
   */
  private static extractNumber(row: any, possibleFields: string[]): number | undefined {
    for (const field of possibleFields) {
      if (row[field] !== undefined && row[field] !== null && row[field] !== '') {
        const num = Number(row[field])
        if (!isNaN(num)) {
          return num
        }
      }
    }
    return undefined
  }

  /**
   * 提取字符串字段
   */
  private static extractString(row: any, possibleFields: string[]): string | undefined {
    for (const field of possibleFields) {
      if (row[field] !== undefined && row[field] !== null && row[field] !== '') {
        return String(row[field])
      }
    }
    return undefined
  }

  /**
   * 提取数组字段
   */
  private static extractArray(row: any, possibleFields: string[]): string[] | undefined {
    for (const field of possibleFields) {
      if (row[field]) {
        if (Array.isArray(row[field])) {
          return row[field]
        } else if (typeof row[field] === 'string') {
          // 尝试用逗号分隔
          return row[field].split(',').map((s: string) => s.trim())
        }
      }
    }
    return undefined
  }

  /**
   * 验证数据
   */
  static validateData(points: UserDataPoint[]): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []
    let validCount = 0

    points.forEach((point, index) => {
      let isValid = true

      // 检查经度范围
      if (point.longitude < -180 || point.longitude > 180) {
        errors.push({
          row: index + 1,
          field: 'longitude',
          message: `经度超出范围(-180~180): ${point.longitude}`
        })
        isValid = false
      }

      // 检查纬度范围
      if (point.latitude < -90 || point.latitude > 90) {
        errors.push({
          row: index + 1,
          field: 'latitude',
          message: `纬度超出范围(-90~90): ${point.latitude}`
        })
        isValid = false
      }

      // 警告：缺少可选字段
      if (!point.altitude) {
        warnings.push({
          row: index + 1,
          field: 'altitude',
          message: '缺少海拔信息'
        })
      }

      if (!point.cropType) {
        warnings.push({
          row: index + 1,
          field: 'cropType',
          message: '缺少作物类型'
        })
      }

      if (isValid) {
        validCount++
      }
    })

    return {
      isValid: errors.length === 0,
      validCount,
      invalidCount: points.length - validCount,
      warnings,
      errors
    }
  }

  /**
   * 生成示例模板数据（用于下载模板）
   */
  static generateTemplateData(): any[] {
    return [
      {
        '点名称': '示例点1',
        '经度': 108.16036,
        '纬度': 30.42730,
        '海拔': 144.3,
        '作物类型': '水稻',
        '种植时间': '3-8月',
        '面积': 5.5,
        '备注': '土壤肥沃，灌溉条件好'
      },
      {
        '点名称': '示例点2',
        '经度': 108.16048,
        '纬度': 30.42774,
        '海拔': 145.6,
        '作物类型': '小麦',
        '种植时间': '10-次年5月',
        '面积': 3.2,
        '备注': '排水良好'
      }
    ]
  }

  /**
   * 导出为 Excel 模板
   */
  static downloadTemplate(): void {
    const data = this.generateTemplateData()
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '数据模板')
    XLSX.writeFile(workbook, '农业数据导入模板.xlsx')
  }
}

