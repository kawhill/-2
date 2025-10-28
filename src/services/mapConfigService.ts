// 地图配置服务
export interface MapLayer {
  name: string
  url: string
  attribution: string
  maxZoom?: number
  minZoom?: number
}

export class MapConfigService {
  private static instance: MapConfigService
  
  public static getInstance(): MapConfigService {
    if (!MapConfigService.instance) {
      MapConfigService.instance = new MapConfigService()
    }
    return MapConfigService.instance
  }

  // 获取可用的地图图层
  getMapLayers(): MapLayer[] {
    return [
      {
        name: 'Esri卫星图',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '© Esri',
        maxZoom: 20,
        minZoom: 1
      },
      {
        name: '高德街道图',
        url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        attribution: '© 高德地图',
        subdomains: ['1', '2', '3', '4'],
        maxZoom: 20,
        minZoom: 1
      },
      {
        name: '高德卫星图',
        url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        attribution: '© 高德地图',
        subdomains: ['1', '2', '3', '4'],
        maxZoom: 20,
        minZoom: 1
      }
    ]
  }

  // 获取默认地图图层
  getDefaultLayer(): MapLayer {
    return this.getMapLayers()[0] // 默认使用Esri卫星图
  }

  // 获取可用的卫星图层
  getSatelliteLayers(): MapLayer[] {
    return this.getMapLayers().filter(layer => 
      layer.name.includes('卫星图') || layer.name.includes('Imagery')
    )
  }

  // 获取中国主要城市坐标
  getChineseCities(): Array<{name: string, lat: number, lng: number}> {
    return [
      { name: '北京', lat: 39.9042, lng: 116.4074 },
      { name: '上海', lat: 31.2304, lng: 121.4737 },
      { name: '广州', lat: 23.1291, lng: 113.2644 },
      { name: '深圳', lat: 22.5431, lng: 114.0579 },
      { name: '杭州', lat: 30.2741, lng: 120.1551 },
      { name: '南京', lat: 32.0603, lng: 118.7969 },
      { name: '武汉', lat: 30.5928, lng: 114.3055 },
      { name: '成都', lat: 30.5728, lng: 104.0668 },
      { name: '西安', lat: 34.3416, lng: 108.9398 },
      { name: '重庆', lat: 29.4316, lng: 106.9123 },
      { name: '天津', lat: 39.3434, lng: 117.3616 },
      { name: '苏州', lat: 31.2989, lng: 120.5853 },
      { name: '青岛', lat: 36.0986, lng: 120.3719 },
      { name: '长沙', lat: 28.2278, lng: 112.9388 },
      { name: '大连', lat: 38.9140, lng: 121.6147 },
      { name: '厦门', lat: 24.4798, lng: 118.0819 },
      { name: '无锡', lat: 31.4912, lng: 120.3124 },
      { name: '福州', lat: 26.0745, lng: 119.2965 },
      { name: '济南', lat: 36.6512, lng: 117.1201 },
      { name: '宁波', lat: 29.8683, lng: 121.5440 },
      { name: '温州', lat: 28.0006, lng: 120.6994 },
      { name: '佛山', lat: 23.0215, lng: 113.1214 },
      { name: '东莞', lat: 23.0205, lng: 113.7518 },
      { name: '中山', lat: 22.5211, lng: 113.3824 },
      { name: '珠海', lat: 22.2707, lng: 113.5767 },
      { name: '汕头', lat: 23.3541, lng: 116.6819 },
      { name: '江门', lat: 22.6109, lng: 113.0815 },
      { name: '湛江', lat: 21.2707, lng: 110.3647 },
      { name: '茂名', lat: 21.6618, lng: 110.9192 },
      { name: '肇庆', lat: 23.0515, lng: 112.4655 },
      { name: '惠州', lat: 23.1107, lng: 114.4165 },
      { name: '梅州', lat: 24.2886, lng: 116.1176 },
      { name: '汕尾', lat: 22.7869, lng: 115.3752 },
      { name: '河源', lat: 23.7432, lng: 114.6978 },
      { name: '阳江', lat: 21.8579, lng: 111.9822 },
      { name: '清远', lat: 23.6850, lng: 113.0512 },
      { name: '韶关', lat: 24.8104, lng: 113.5915 },
      { name: '揭阳', lat: 23.5497, lng: 116.3728 },
      { name: '潮州', lat: 23.6569, lng: 116.6226 },
      { name: '云浮', lat: 22.9152, lng: 112.0445 }
    ]
  }
}
