import type { ImportedGeoPoint } from '@/types'

export interface LyrFeature {
  id: number
  longitude: number
  latitude: number
  altitude?: number
  attributes: Record<string, any>
}

export class LyrParser {
  private static instance: LyrParser

  public static getInstance(): LyrParser {
    if (!LyrParser.instance) {
      LyrParser.instance = new LyrParser()
    }
    return LyrParser.instance
  }

  // 解析Lyr文件
  public async parseLyrFile(file: File): Promise<ImportedGeoPoint[]> {
    try {
      const text = await file.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(text, 'text/xml')
      
      // 检查XML解析是否成功
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Lyr文件格式错误：无法解析XML')
      }

      return this.extractFeaturesFromXml(xmlDoc)
    } catch (error) {
      console.error('解析Lyr文件失败:', error)
      throw new Error('Lyr文件解析失败：' + (error as Error).message)
    }
  }

  // 从XML中提取要素
  private extractFeaturesFromXml(xmlDoc: Document): ImportedGeoPoint[] {
    const features: ImportedGeoPoint[] = []
    
    // 查找要素集合
    const featureClasses = xmlDoc.getElementsByTagName('FeatureClass')
    if (featureClasses.length === 0) {
      throw new Error('Lyr文件中未找到要素类')
    }

    for (let i = 0; i < featureClasses.length; i++) {
      const featureClass = featureClasses[i]
      const featuresInClass = this.parseFeatureClass(featureClass)
      features.push(...featuresInClass)
    }

    if (features.length === 0) {
      throw new Error('Lyr文件中未找到有效的要素数据')
    }

    return features
  }

  // 解析要素类
  private parseFeatureClass(featureClass: Element): ImportedGeoPoint[] {
    const features: ImportedGeoPoint[] = []
    
    // 查找要素
    const featuresElements = featureClass.getElementsByTagName('Feature')
    if (featuresElements.length === 0) {
      // 尝试其他可能的标签名
      const alternativeTags = ['Point', 'Polygon', 'Polyline', 'Geometry']
      for (const tag of alternativeTags) {
        const elements = featureClass.getElementsByTagName(tag)
        if (elements.length > 0) {
          for (let i = 0; i < elements.length; i++) {
            const feature = this.parseFeature(elements[i], i + 1)
            if (feature) {
              features.push(feature)
            }
          }
          break
        }
      }
    } else {
      for (let i = 0; i < featuresElements.length; i++) {
        const feature = this.parseFeature(featuresElements[i], i + 1)
        if (feature) {
          features.push(feature)
        }
      }
    }

    return features
  }

  // 解析单个要素
  private parseFeature(featureElement: Element, id: number): ImportedGeoPoint | null {
    try {
      // 查找坐标信息
      const coordinates = this.extractCoordinates(featureElement)
      if (!coordinates) {
        return null
      }

      // 查找属性信息
      const attributes = this.extractAttributes(featureElement)
      
      // 构建植被类型描述
      const vegetationType = this.buildVegetationType(attributes)

      return {
        id,
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
        altitude: coordinates.altitude || 0,
        vegetationType
      }
    } catch (error) {
      console.warn(`解析要素${id}失败:`, error)
      return null
    }
  }

  // 提取坐标信息
  private extractCoordinates(element: Element): { longitude: number; latitude: number; altitude?: number } | null {
    // 尝试多种坐标提取方法
    
    // 方法1: 查找X, Y坐标
    const xElement = element.querySelector('X, x, Longitude, longitude, LON, lon')
    const yElement = element.querySelector('Y, y, Latitude, latitude, LAT, lat')
    const zElement = element.querySelector('Z, z, Altitude, altitude, ELEVATION, elevation')

    if (xElement && yElement) {
      const x = parseFloat(xElement.textContent || '0')
      const y = parseFloat(yElement.textContent || '0')
      const z = zElement ? parseFloat(zElement.textContent || '0') : undefined

      if (!isNaN(x) && !isNaN(y)) {
        return { longitude: x, latitude: y, altitude: z }
      }
    }

    // 方法2: 查找坐标数组
    const coordElements = element.querySelectorAll('Coordinate, Point, Vertex')
    if (coordElements.length > 0) {
      const coords = Array.from(coordElements).map(el => {
        const text = el.textContent || ''
        const parts = text.split(/[,\s]+/).map(p => parseFloat(p)).filter(n => !isNaN(n))
        return parts
      }).filter(parts => parts.length >= 2)

      if (coords.length > 0) {
        const firstCoord = coords[0]
        return {
          longitude: firstCoord[0],
          latitude: firstCoord[1],
          altitude: firstCoord[2]
        }
      }
    }

    // 方法3: 查找几何信息
    const geometryElement = element.querySelector('Geometry, Shape, Geom')
    if (geometryElement) {
      return this.extractCoordinates(geometryElement)
    }

    return null
  }

  // 提取属性信息
  private extractAttributes(element: Element): Record<string, any> {
    const attributes: Record<string, any> = {}
    
    // 查找属性字段
    const fieldElements = element.querySelectorAll('Field, Attribute, Property')
    fieldElements.forEach(field => {
      const name = field.getAttribute('name') || field.getAttribute('Name') || field.tagName
      const value = field.textContent || field.getAttribute('value') || ''
      if (name && value) {
        attributes[name] = value
      }
    })

    // 查找子元素作为属性
    const childElements = element.children
    for (let i = 0; i < childElements.length; i++) {
      const child = childElements[i]
      if (child.tagName !== 'Geometry' && child.tagName !== 'Shape' && child.tagName !== 'Geom') {
        attributes[child.tagName] = child.textContent || ''
      }
    }

    return attributes
  }

  // 构建植被类型描述
  private buildVegetationType(attributes: Record<string, any>): string {
    const parts: string[] = []
    
    // 常见的植被类型字段
    const vegetationFields = ['Vegetation', 'Crop', 'LandUse', 'Type', 'Name', '作物', '植被', '土地利用']
    const plantingTimeFields = ['PlantingTime', 'PlantTime', 'Season', '种植时间', '种植季节']
    const notesFields = ['Notes', 'Remark', 'Description', '备注', '描述']

    // 提取植被类型
    for (const field of vegetationFields) {
      if (attributes[field]) {
        parts.push(attributes[field])
        break
      }
    }

    // 提取种植时间
    for (const field of plantingTimeFields) {
      if (attributes[field]) {
        parts.push(`种植时间:${attributes[field]}`)
        break
      }
    }

    // 提取备注
    for (const field of notesFields) {
      if (attributes[field]) {
        parts.push(`备注:${attributes[field]}`)
        break
      }
    }

    // 如果没有找到特定字段，使用所有属性
    if (parts.length === 0) {
      const allAttributes = Object.entries(attributes)
        .filter(([key, value]) => value && typeof value === 'string')
        .map(([key, value]) => `${key}:${value}`)
        .slice(0, 3) // 只取前3个属性
      
      if (allAttributes.length > 0) {
        parts.push(allAttributes.join(' '))
      }
    }

    return parts.length > 0 ? parts.join(' ') : '未知植被类型'
  }
}
