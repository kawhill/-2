// 城市数据库服务
export interface CityInfo {
  name: string
  lat: number
  lng: number
  level: 'province' | 'city' | 'county' | 'town' | 'village'
  parent?: string
}

export class CityDatabaseService {
  private static instance: CityDatabaseService
  private cities: CityInfo[] = []
  
  public static getInstance(): CityDatabaseService {
    if (!CityDatabaseService.instance) {
      CityDatabaseService.instance = new CityDatabaseService()
      CityDatabaseService.instance.initCities()
    }
    return CityDatabaseService.instance
  }

  private initCities() {
    // 省级行政区
    const provinces = [
      { name: '北京市', lat: 39.9042, lng: 116.4074, level: 'province' as const },
      { name: '上海市', lat: 31.2304, lng: 121.4737, level: 'province' as const },
      { name: '天津市', lat: 39.3434, lng: 117.3616, level: 'province' as const },
      { name: '重庆市', lat: 29.4316, lng: 106.9123, level: 'province' as const },
      { name: '河北省', lat: 38.0428, lng: 114.5149, level: 'province' as const },
      { name: '山西省', lat: 37.8735, lng: 112.5489, level: 'province' as const },
      { name: '内蒙古自治区', lat: 40.8175, lng: 111.7656, level: 'province' as const },
      { name: '辽宁省', lat: 41.8057, lng: 123.4315, level: 'province' as const },
      { name: '吉林省', lat: 43.8868, lng: 125.3245, level: 'province' as const },
      { name: '黑龙江省', lat: 45.7732, lng: 126.6617, level: 'province' as const },
      { name: '江苏省', lat: 32.0603, lng: 118.7969, level: 'province' as const },
      { name: '浙江省', lat: 30.2741, lng: 120.1551, level: 'province' as const },
      { name: '安徽省', lat: 31.8612, lng: 117.2838, level: 'province' as const },
      { name: '福建省', lat: 26.0745, lng: 119.2965, level: 'province' as const },
      { name: '江西省', lat: 28.6765, lng: 115.8922, level: 'province' as const },
      { name: '山东省', lat: 36.6512, lng: 117.1201, level: 'province' as const },
      { name: '河南省', lat: 34.7655, lng: 113.6254, level: 'province' as const },
      { name: '湖北省', lat: 30.5928, lng: 114.3055, level: 'province' as const },
      { name: '湖南省', lat: 28.2278, lng: 112.9388, level: 'province' as const },
      { name: '广东省', lat: 23.1291, lng: 113.2644, level: 'province' as const },
      { name: '广西壮族自治区', lat: 22.8170, lng: 108.3669, level: 'province' as const },
      { name: '海南省', lat: 20.0311, lng: 110.3312, level: 'province' as const },
      { name: '四川省', lat: 30.5728, lng: 104.0668, level: 'province' as const },
      { name: '贵州省', lat: 26.5783, lng: 106.7135, level: 'province' as const },
      { name: '云南省', lat: 25.0389, lng: 102.7183, level: 'province' as const },
      { name: '西藏自治区', lat: 29.6465, lng: 91.1172, level: 'province' as const },
      { name: '陕西省', lat: 34.3416, lng: 108.9398, level: 'province' as const },
      { name: '甘肃省', lat: 36.0611, lng: 103.8343, level: 'province' as const },
      { name: '青海省', lat: 36.6232, lng: 101.7782, level: 'province' as const },
      { name: '宁夏回族自治区', lat: 38.4872, lng: 106.2309, level: 'province' as const },
      { name: '新疆维吾尔自治区', lat: 43.7928, lng: 87.6177, level: 'province' as const },
      { name: '香港特别行政区', lat: 22.3193, lng: 114.1694, level: 'province' as const },
      { name: '澳门特别行政区', lat: 22.1987, lng: 113.5439, level: 'province' as const },
      { name: '台湾省', lat: 25.0330, lng: 121.5654, level: 'province' as const }
    ]

    // 主要城市
    const majorCities = [
      // 直辖市
      { name: '北京', lat: 39.9042, lng: 116.4074, level: 'city' as const, parent: '北京市' },
      { name: '上海', lat: 31.2304, lng: 121.4737, level: 'city' as const, parent: '上海市' },
      { name: '天津', lat: 39.3434, lng: 117.3616, level: 'city' as const, parent: '天津市' },
      { name: '重庆', lat: 29.4316, lng: 106.9123, level: 'city' as const, parent: '重庆市' },
      
      // 省会城市
      { name: '石家庄', lat: 38.0428, lng: 114.5149, level: 'city' as const, parent: '河北省' },
      { name: '太原', lat: 37.8735, lng: 112.5489, level: 'city' as const, parent: '山西省' },
      { name: '呼和浩特', lat: 40.8175, lng: 111.7656, level: 'city' as const, parent: '内蒙古自治区' },
      { name: '沈阳', lat: 41.8057, lng: 123.4315, level: 'city' as const, parent: '辽宁省' },
      { name: '长春', lat: 43.8868, lng: 125.3245, level: 'city' as const, parent: '吉林省' },
      { name: '哈尔滨', lat: 45.7732, lng: 126.6617, level: 'city' as const, parent: '黑龙江省' },
      { name: '南京', lat: 32.0603, lng: 118.7969, level: 'city' as const, parent: '江苏省' },
      { name: '杭州', lat: 30.2741, lng: 120.1551, level: 'city' as const, parent: '浙江省' },
      { name: '合肥', lat: 31.8612, lng: 117.2838, level: 'city' as const, parent: '安徽省' },
      { name: '福州', lat: 26.0745, lng: 119.2965, level: 'city' as const, parent: '福建省' },
      { name: '南昌', lat: 28.6765, lng: 115.8922, level: 'city' as const, parent: '江西省' },
      { name: '济南', lat: 36.6512, lng: 117.1201, level: 'city' as const, parent: '山东省' },
      { name: '郑州', lat: 34.7655, lng: 113.6254, level: 'city' as const, parent: '河南省' },
      { name: '武汉', lat: 30.5928, lng: 114.3055, level: 'city' as const, parent: '湖北省' },
      { name: '长沙', lat: 28.2278, lng: 112.9388, level: 'city' as const, parent: '湖南省' },
      { name: '广州', lat: 23.1291, lng: 113.2644, level: 'city' as const, parent: '广东省' },
      { name: '南宁', lat: 22.8170, lng: 108.3669, level: 'city' as const, parent: '广西壮族自治区' },
      { name: '海口', lat: 20.0311, lng: 110.3312, level: 'city' as const, parent: '海南省' },
      { name: '成都', lat: 30.5728, lng: 104.0668, level: 'city' as const, parent: '四川省' },
      { name: '贵阳', lat: 26.5783, lng: 106.7135, level: 'city' as const, parent: '贵州省' },
      { name: '昆明', lat: 25.0389, lng: 102.7183, level: 'city' as const, parent: '云南省' },
      { name: '拉萨', lat: 29.6465, lng: 91.1172, level: 'city' as const, parent: '西藏自治区' },
      { name: '西安', lat: 34.3416, lng: 108.9398, level: 'city' as const, parent: '陕西省' },
      { name: '兰州', lat: 36.0611, lng: 103.8343, level: 'city' as const, parent: '甘肃省' },
      { name: '西宁', lat: 36.6232, lng: 101.7782, level: 'city' as const, parent: '青海省' },
      { name: '银川', lat: 38.4872, lng: 106.2309, level: 'city' as const, parent: '宁夏回族自治区' },
      { name: '乌鲁木齐', lat: 43.7928, lng: 87.6177, level: 'city' as const, parent: '新疆维吾尔自治区' },
      
      // 重要地级市
      { name: '深圳', lat: 22.5431, lng: 114.0579, level: 'city' as const, parent: '广东省' },
      { name: '苏州', lat: 31.2989, lng: 120.5853, level: 'city' as const, parent: '江苏省' },
      { name: '青岛', lat: 36.0986, lng: 120.3719, level: 'city' as const, parent: '山东省' },
      { name: '大连', lat: 38.9140, lng: 121.6147, level: 'city' as const, parent: '辽宁省' },
      { name: '厦门', lat: 24.4798, lng: 118.0819, level: 'city' as const, parent: '福建省' },
      { name: '无锡', lat: 31.4912, lng: 120.3124, level: 'city' as const, parent: '江苏省' },
      { name: '宁波', lat: 29.8683, lng: 121.5440, level: 'city' as const, parent: '浙江省' },
      { name: '温州', lat: 28.0006, lng: 120.6994, level: 'city' as const, parent: '浙江省' },
      { name: '佛山', lat: 23.0215, lng: 113.1214, level: 'city' as const, parent: '广东省' },
      { name: '东莞', lat: 23.0205, lng: 113.7518, level: 'city' as const, parent: '广东省' },
      { name: '中山', lat: 22.5211, lng: 113.3824, level: 'city' as const, parent: '广东省' },
      { name: '珠海', lat: 22.2707, lng: 113.5767, level: 'city' as const, parent: '广东省' },
      { name: '汕头', lat: 23.3541, lng: 116.6819, level: 'city' as const, parent: '广东省' },
      { name: '江门', lat: 22.6109, lng: 113.0815, level: 'city' as const, parent: '广东省' },
      { name: '湛江', lat: 21.2707, lng: 110.3647, level: 'city' as const, parent: '广东省' },
      { name: '茂名', lat: 21.6618, lng: 110.9192, level: 'city' as const, parent: '广东省' },
      { name: '肇庆', lat: 23.0515, lng: 112.4655, level: 'city' as const, parent: '广东省' },
      { name: '惠州', lat: 23.1107, lng: 114.4165, level: 'city' as const, parent: '广东省' },
      { name: '梅州', lat: 24.2886, lng: 116.1176, level: 'city' as const, parent: '广东省' },
      { name: '汕尾', lat: 22.7869, lng: 115.3752, level: 'city' as const, parent: '广东省' },
      { name: '河源', lat: 23.7432, lng: 114.6978, level: 'city' as const, parent: '广东省' },
      { name: '阳江', lat: 21.8579, lng: 111.9822, level: 'city' as const, parent: '广东省' },
      { name: '清远', lat: 23.6850, lng: 113.0512, level: 'city' as const, parent: '广东省' },
      { name: '韶关', lat: 24.8104, lng: 113.5915, level: 'city' as const, parent: '广东省' },
      { name: '揭阳', lat: 23.5497, lng: 116.3728, level: 'city' as const, parent: '广东省' },
      { name: '潮州', lat: 23.6569, lng: 116.6226, level: 'city' as const, parent: '广东省' },
      { name: '云浮', lat: 22.9152, lng: 112.0445, level: 'city' as const, parent: '广东省' }
    ]

    // 合并所有城市数据
    this.cities = [...provinces, ...majorCities]
  }

  // 搜索城市
  searchCities(query: string): CityInfo[] {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase().trim()
    return this.cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm) ||
      city.name.includes(query)
    ).slice(0, 20) // 限制返回结果数量
  }

  // 获取热门城市（用于快速定位）
  getHotCities(): CityInfo[] {
    return [
      { name: '北京', lat: 39.9042, lng: 116.4074, level: 'city' as const, parent: '北京市' },
      { name: '上海', lat: 31.2304, lng: 121.4737, level: 'city' as const, parent: '上海市' },
      { name: '广州', lat: 23.1291, lng: 113.2644, level: 'city' as const, parent: '广东省' },
      { name: '深圳', lat: 22.5431, lng: 114.0579, level: 'city' as const, parent: '广东省' },
      { name: '杭州', lat: 30.2741, lng: 120.1551, level: 'city' as const, parent: '浙江省' },
      { name: '成都', lat: 30.5728, lng: 104.0668, level: 'city' as const, parent: '四川省' },
      { name: '武汉', lat: 30.5928, lng: 114.3055, level: 'city' as const, parent: '湖北省' },
      { name: '西安', lat: 34.3416, lng: 108.9398, level: 'city' as const, parent: '陕西省' }
    ]
  }

  // 获取所有城市
  getAllCities(): CityInfo[] {
    return this.cities
  }
}
