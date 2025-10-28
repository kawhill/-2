// 全国完整城市数据库服务
import { allCountiesData } from '@/data/allCountiesData'

export interface CityInfo {
  name: string
  lat: number
  lng: number
  level: 'province' | 'city' | 'county' | 'town' | 'village'
  parent?: string
  province?: string
}

export class CompleteCityDatabaseService {
  private static instance: CompleteCityDatabaseService
  private cities: CityInfo[] = []
  
  public static getInstance(): CompleteCityDatabaseService {
    if (!CompleteCityDatabaseService.instance) {
      CompleteCityDatabaseService.instance = new CompleteCityDatabaseService()
      CompleteCityDatabaseService.instance.initCities()
    }
    return CompleteCityDatabaseService.instance
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

    // 地级市和县级市
    const cities = [
      // 直辖市
      { name: '北京', lat: 39.9042, lng: 116.4074, level: 'city' as const, parent: '北京市', province: '北京市' },
      { name: '上海', lat: 31.2304, lng: 121.4737, level: 'city' as const, parent: '上海市', province: '上海市' },
      { name: '天津', lat: 39.3434, lng: 117.3616, level: 'city' as const, parent: '天津市', province: '天津市' },
      { name: '重庆', lat: 29.4316, lng: 106.9123, level: 'city' as const, parent: '重庆市', province: '重庆市' },
      
      // 河北省
      { name: '石家庄', lat: 38.0428, lng: 114.5149, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '唐山', lat: 39.6309, lng: 118.1802, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '秦皇岛', lat: 39.9398, lng: 119.5866, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '邯郸', lat: 36.6256, lng: 114.4907, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '邢台', lat: 37.0706, lng: 114.5048, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '保定', lat: 38.8510, lng: 115.4648, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '张家口', lat: 40.8244, lng: 114.8875, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '承德', lat: 40.9724, lng: 117.9338, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '沧州', lat: 38.3106, lng: 116.8388, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '廊坊', lat: 39.5239, lng: 116.7036, level: 'city' as const, parent: '河北省', province: '河北省' },
      { name: '衡水', lat: 37.7389, lng: 115.6702, level: 'city' as const, parent: '河北省', province: '河北省' },
      
      // 山西省
      { name: '太原', lat: 37.8735, lng: 112.5489, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '大同', lat: 40.0768, lng: 113.3001, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '阳泉', lat: 37.8569, lng: 113.5802, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '长治', lat: 36.1954, lng: 113.1163, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '晋城', lat: 35.4907, lng: 112.8513, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '朔州', lat: 39.3313, lng: 112.4329, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '晋中', lat: 37.6870, lng: 112.7365, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '运城', lat: 35.0228, lng: 111.0039, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '忻州', lat: 38.4167, lng: 112.7333, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '临汾', lat: 36.0882, lng: 111.5189, level: 'city' as const, parent: '山西省', province: '山西省' },
      { name: '吕梁', lat: 37.5183, lng: 111.1343, level: 'city' as const, parent: '山西省', province: '山西省' },
      
      // 江苏省
      { name: '南京', lat: 32.0603, lng: 118.7969, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '无锡', lat: 31.4912, lng: 120.3124, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '徐州', lat: 34.2619, lng: 117.1859, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '常州', lat: 31.8114, lng: 119.9740, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '苏州', lat: 31.2989, lng: 120.5853, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '南通', lat: 31.9802, lng: 120.8943, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '连云港', lat: 34.5965, lng: 119.1788, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '淮安', lat: 33.6104, lng: 119.0151, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '盐城', lat: 33.3474, lng: 120.1636, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '扬州', lat: 32.3932, lng: 119.4213, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '镇江', lat: 32.2044, lng: 119.4528, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '泰州', lat: 32.4849, lng: 119.9082, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      { name: '宿迁', lat: 33.9630, lng: 118.2752, level: 'city' as const, parent: '江苏省', province: '江苏省' },
      
      // 浙江省
      { name: '杭州', lat: 30.2741, lng: 120.1551, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '宁波', lat: 29.8683, lng: 121.5440, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '温州', lat: 28.0006, lng: 120.6994, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '嘉兴', lat: 30.7462, lng: 120.7555, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '湖州', lat: 30.8703, lng: 120.1033, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '绍兴', lat: 30.0024, lng: 120.5821, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '金华', lat: 29.1078, lng: 119.6495, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '衢州', lat: 28.9706, lng: 118.8729, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '舟山', lat: 30.0360, lng: 122.2072, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '台州', lat: 28.6564, lng: 121.4206, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '丽水', lat: 28.4514, lng: 119.9229, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      
      // 广东省
      { name: '广州', lat: 23.1291, lng: 113.2644, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '韶关', lat: 24.8104, lng: 113.5915, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '深圳', lat: 22.5431, lng: 114.0579, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '珠海', lat: 22.2707, lng: 113.5767, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '汕头', lat: 23.3541, lng: 116.6819, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '佛山', lat: 23.0215, lng: 113.1214, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '江门', lat: 22.6109, lng: 113.0815, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '湛江', lat: 21.2707, lng: 110.3647, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '茂名', lat: 21.6618, lng: 110.9192, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '肇庆', lat: 23.0515, lng: 112.4655, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '惠州', lat: 23.1107, lng: 114.4165, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '梅州', lat: 24.2886, lng: 116.1176, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '汕尾', lat: 22.7869, lng: 115.3752, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '河源', lat: 23.7432, lng: 114.6978, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '阳江', lat: 21.8579, lng: 111.9822, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '清远', lat: 23.6850, lng: 113.0512, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '东莞', lat: 23.0205, lng: 113.7518, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '中山', lat: 22.5211, lng: 113.3824, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '潮州', lat: 23.6569, lng: 116.6226, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '揭阳', lat: 23.5497, lng: 116.3728, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '云浮', lat: 22.9152, lng: 112.0445, level: 'city' as const, parent: '广东省', province: '广东省' },
      
      // 山东省
      { name: '济南', lat: 36.6512, lng: 117.1201, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '青岛', lat: 36.0986, lng: 120.3719, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '淄博', lat: 36.8131, lng: 118.0549, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '枣庄', lat: 34.8107, lng: 117.3238, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '东营', lat: 37.4342, lng: 118.6746, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '烟台', lat: 37.4638, lng: 121.4479, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '潍坊', lat: 36.7069, lng: 119.1078, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '济宁', lat: 35.4088, lng: 116.5873, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '泰安', lat: 36.1944, lng: 117.0889, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '威海', lat: 37.5017, lng: 122.1207, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '日照', lat: 35.4164, lng: 119.5269, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '临沂', lat: 35.1047, lng: 118.3563, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '德州', lat: 37.4342, lng: 116.3575, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '聊城', lat: 36.4570, lng: 115.9805, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '滨州', lat: 37.3835, lng: 117.9707, level: 'city' as const, parent: '山东省', province: '山东省' },
      { name: '菏泽', lat: 35.2344, lng: 115.4697, level: 'city' as const, parent: '山东省', province: '山东省' },
      
      // 河南省
      { name: '郑州', lat: 34.7655, lng: 113.6254, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '开封', lat: 34.7971, lng: 114.3074, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '洛阳', lat: 34.6197, lng: 112.4540, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '平顶山', lat: 33.7662, lng: 113.1927, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '安阳', lat: 36.1036, lng: 114.3924, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '鹤壁', lat: 35.7482, lng: 114.2973, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '新乡', lat: 35.3030, lng: 113.9268, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '焦作', lat: 35.2390, lng: 113.2418, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '濮阳', lat: 35.7682, lng: 115.0413, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '许昌', lat: 34.0224, lng: 113.8261, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '漯河', lat: 33.5814, lng: 114.0264, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '三门峡', lat: 34.7726, lng: 111.2001, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '南阳', lat: 32.9908, lng: 112.5283, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '商丘', lat: 34.4371, lng: 115.6505, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '信阳', lat: 32.1234, lng: 114.0750, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '周口', lat: 33.6204, lng: 114.6496, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '驻马店', lat: 32.9773, lng: 114.0250, level: 'city' as const, parent: '河南省', province: '河南省' },
      { name: '济源', lat: 35.0900, lng: 112.5900, level: 'city' as const, parent: '河南省', province: '河南省' },
      
      // 四川省
      { name: '成都', lat: 30.5728, lng: 104.0668, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '自贡', lat: 29.3390, lng: 104.7784, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '攀枝花', lat: 26.5823, lng: 101.7186, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '泸州', lat: 28.8717, lng: 105.4433, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '德阳', lat: 31.1268, lng: 104.3980, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '绵阳', lat: 31.4675, lng: 104.6791, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '广元', lat: 32.4355, lng: 105.8298, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '遂宁', lat: 30.5328, lng: 105.5929, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '内江', lat: 29.5802, lng: 105.0584, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '乐山', lat: 29.6004, lng: 103.7657, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '南充', lat: 30.8378, lng: 106.1107, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '眉山', lat: 30.0611, lng: 103.8485, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '宜宾', lat: 28.7519, lng: 104.6432, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '广安', lat: 30.4564, lng: 106.6334, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '达州', lat: 31.2096, lng: 107.5023, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '雅安', lat: 29.9816, lng: 103.0133, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '巴中', lat: 31.8588, lng: 106.7579, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '资阳', lat: 30.1286, lng: 104.6419, level: 'city' as const, parent: '四川省', province: '四川省' },
      
      // 湖北省
      { name: '武汉', lat: 30.5928, lng: 114.3055, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '黄石', lat: 30.2010, lng: 115.0385, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '十堰', lat: 32.6294, lng: 110.7879, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '宜昌', lat: 30.7026, lng: 111.2865, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '襄阳', lat: 32.0089, lng: 112.1227, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '鄂州', lat: 30.3965, lng: 114.8948, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '荆门', lat: 31.0354, lng: 112.1993, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '孝感', lat: 30.9246, lng: 113.9169, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '荆州', lat: 30.3352, lng: 112.2397, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '黄冈', lat: 30.4539, lng: 114.8724, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '咸宁', lat: 29.8413, lng: 114.3225, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '随州', lat: 31.6901, lng: 113.3825, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      
      // 湖南省
      { name: '长沙', lat: 28.2278, lng: 112.9388, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '株洲', lat: 27.8358, lng: 113.1340, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '湘潭', lat: 27.8297, lng: 112.9441, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '衡阳', lat: 26.8982, lng: 112.5719, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '邵阳', lat: 27.2389, lng: 111.4677, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '岳阳', lat: 29.3572, lng: 113.1289, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '常德', lat: 29.0317, lng: 111.6985, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '张家界', lat: 29.1274, lng: 110.4792, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '益阳', lat: 28.5539, lng: 112.3550, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '郴州', lat: 25.8004, lng: 113.0147, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '永州', lat: 26.4203, lng: 111.6123, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '怀化', lat: 27.5695, lng: 109.9785, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      { name: '娄底', lat: 27.7000, lng: 111.9946, level: 'city' as const, parent: '湖南省', province: '湖南省' },
      
      // 安徽省
      { name: '合肥', lat: 31.8612, lng: 117.2838, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '芜湖', lat: 31.3529, lng: 118.3765, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '蚌埠', lat: 32.9397, lng: 117.3647, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '淮南', lat: 32.6264, lng: 116.9999, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '马鞍山', lat: 31.6894, lng: 118.5100, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '淮北', lat: 33.9548, lng: 116.7983, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '铜陵', lat: 30.9456, lng: 117.8121, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '安庆', lat: 30.5255, lng: 117.0536, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '黄山', lat: 29.7147, lng: 118.3370, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '滁州', lat: 32.3012, lng: 118.3163, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '阜阳', lat: 32.8969, lng: 115.8197, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '宿州', lat: 33.6339, lng: 116.9784, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '六安', lat: 31.7529, lng: 116.5078, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '亳州', lat: 33.8693, lng: 115.7789, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '池州', lat: 30.6648, lng: 117.4916, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      { name: '宣城', lat: 30.9457, lng: 118.7588, level: 'city' as const, parent: '安徽省', province: '安徽省' },
      
      // 福建省
      { name: '福州', lat: 26.0745, lng: 119.2965, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '厦门', lat: 24.4798, lng: 118.0819, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '莆田', lat: 25.4541, lng: 119.0078, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '三明', lat: 26.2654, lng: 117.6390, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '泉州', lat: 24.8739, lng: 118.5814, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '漳州', lat: 24.5130, lng: 117.6762, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '南平', lat: 26.6415, lng: 118.1777, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '龙岩', lat: 25.0916, lng: 117.0179, level: 'city' as const, parent: '福建省', province: '福建省' },
      { name: '宁德', lat: 26.6592, lng: 119.5272, level: 'city' as const, parent: '福建省', province: '福建省' },
      
      // 江西省
      { name: '南昌', lat: 28.6765, lng: 115.8922, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '景德镇', lat: 29.2926, lng: 117.2147, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '萍乡', lat: 27.6229, lng: 113.8546, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '九江', lat: 29.7051, lng: 116.0021, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '新余', lat: 27.8178, lng: 114.9173, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '鹰潭', lat: 28.2602, lng: 117.0692, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '赣州', lat: 25.8311, lng: 114.9336, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '吉安', lat: 27.1117, lng: 114.9668, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '宜春', lat: 27.8043, lng: 114.4168, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '抚州', lat: 27.9492, lng: 116.3582, level: 'city' as const, parent: '江西省', province: '江西省' },
      { name: '上饶', lat: 28.4544, lng: 117.9434, level: 'city' as const, parent: '江西省', province: '江西省' },
      
      // 辽宁省
      { name: '沈阳', lat: 41.8057, lng: 123.4315, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '大连', lat: 38.9140, lng: 121.6147, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '鞍山', lat: 41.1086, lng: 122.9946, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '抚顺', lat: 41.8808, lng: 123.9572, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '本溪', lat: 41.2979, lng: 123.7669, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '丹东', lat: 40.1299, lng: 124.3947, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '锦州', lat: 41.0951, lng: 121.1270, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '营口', lat: 40.6670, lng: 122.2350, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '阜新', lat: 42.0216, lng: 121.6703, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '辽阳', lat: 41.2694, lng: 123.2374, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '盘锦', lat: 41.1198, lng: 122.0707, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '铁岭', lat: 42.2237, lng: 123.7260, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '朝阳', lat: 41.5737, lng: 120.4512, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      { name: '葫芦岛', lat: 40.7110, lng: 120.8369, level: 'city' as const, parent: '辽宁省', province: '辽宁省' },
      
      // 吉林省
      { name: '长春', lat: 43.8868, lng: 125.3245, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      { name: '吉林', lat: 43.8436, lng: 126.5496, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      { name: '四平', lat: 43.1703, lng: 124.3648, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      { name: '辽源', lat: 42.9027, lng: 125.1353, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      { name: '通化', lat: 41.7284, lng: 125.9397, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      { name: '白山', lat: 41.9431, lng: 126.4281, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      { name: '松原', lat: 45.1360, lng: 124.8259, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      { name: '白城', lat: 45.6196, lng: 122.8387, level: 'city' as const, parent: '吉林省', province: '吉林省' },
      
      // 黑龙江省
      { name: '哈尔滨', lat: 45.7732, lng: 126.6617, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '齐齐哈尔', lat: 47.3543, lng: 123.9182, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '鸡西', lat: 45.2952, lng: 130.9693, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '鹤岗', lat: 47.3499, lng: 130.2979, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '双鸭山', lat: 46.6434, lng: 131.1591, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '大庆', lat: 46.5907, lng: 125.1031, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '伊春', lat: 47.7280, lng: 128.8993, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '佳木斯', lat: 46.8000, lng: 130.3167, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '七台河', lat: 45.7710, lng: 131.0031, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '牡丹江', lat: 44.5517, lng: 129.6332, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '黑河', lat: 50.2450, lng: 127.5285, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      { name: '绥化', lat: 46.6532, lng: 126.9900, level: 'city' as const, parent: '黑龙江省', province: '黑龙江省' },
      
      // 陕西省
      { name: '西安', lat: 34.3416, lng: 108.9398, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '铜川', lat: 34.9084, lng: 108.9796, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '宝鸡', lat: 34.3619, lng: 107.2379, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '咸阳', lat: 34.3296, lng: 108.7096, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '渭南', lat: 34.4994, lng: 109.4907, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '延安', lat: 36.5965, lng: 109.4907, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '汉中', lat: 33.0778, lng: 107.0260, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '榆林', lat: 38.2902, lng: 109.7346, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '安康', lat: 32.6903, lng: 109.0293, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      { name: '商洛', lat: 33.8683, lng: 109.9402, level: 'city' as const, parent: '陕西省', province: '陕西省' },
      
      // 甘肃省
      { name: '兰州', lat: 36.0611, lng: 103.8343, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '嘉峪关', lat: 39.7731, lng: 98.2891, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '金昌', lat: 38.5142, lng: 102.1880, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '白银', lat: 36.5457, lng: 104.1377, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '天水', lat: 34.5809, lng: 105.7249, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '武威', lat: 37.9282, lng: 102.6347, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '张掖', lat: 38.9259, lng: 100.4498, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '平凉', lat: 35.5430, lng: 106.6847, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '酒泉', lat: 39.7324, lng: 98.4944, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '庆阳', lat: 35.7090, lng: 107.6436, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '定西', lat: 35.5806, lng: 104.6263, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      { name: '陇南', lat: 33.3886, lng: 104.9214, level: 'city' as const, parent: '甘肃省', province: '甘肃省' },
      
      // 青海省
      { name: '西宁', lat: 36.6232, lng: 101.7782, level: 'city' as const, parent: '青海省', province: '青海省' },
      { name: '海东', lat: 36.5029, lng: 102.1043, level: 'city' as const, parent: '青海省', province: '青海省' },
      
      // 宁夏回族自治区
      { name: '银川', lat: 38.4872, lng: 106.2309, level: 'city' as const, parent: '宁夏回族自治区', province: '宁夏回族自治区' },
      { name: '石嘴山', lat: 39.0192, lng: 106.3833, level: 'city' as const, parent: '宁夏回族自治区', province: '宁夏回族自治区' },
      { name: '吴忠', lat: 37.9862, lng: 106.1994, level: 'city' as const, parent: '宁夏回族自治区', province: '宁夏回族自治区' },
      { name: '固原', lat: 36.0159, lng: 106.2853, level: 'city' as const, parent: '宁夏回族自治区', province: '宁夏回族自治区' },
      { name: '中卫', lat: 37.5002, lng: 105.1968, level: 'city' as const, parent: '宁夏回族自治区', province: '宁夏回族自治区' },
      
      // 新疆维吾尔自治区
      { name: '乌鲁木齐', lat: 43.7928, lng: 87.6177, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '克拉玛依', lat: 45.5959, lng: 84.8904, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '吐鲁番', lat: 42.9514, lng: 89.1895, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '哈密', lat: 42.8339, lng: 93.5146, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '昌吉', lat: 44.0146, lng: 87.3082, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '博尔塔拉', lat: 44.9053, lng: 82.0748, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '巴音郭楞', lat: 41.7683, lng: 86.1506, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '阿克苏', lat: 41.1688, lng: 80.2606, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '克孜勒苏', lat: 39.7145, lng: 76.1704, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '喀什', lat: 39.4704, lng: 75.9898, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '和田', lat: 37.1142, lng: 79.9222, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '伊犁', lat: 43.9168, lng: 81.3179, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '塔城', lat: 46.7453, lng: 82.9803, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      { name: '阿勒泰', lat: 47.8489, lng: 88.1318, level: 'city' as const, parent: '新疆维吾尔自治区', province: '新疆维吾尔自治区' },
      
      // 西藏自治区
      { name: '拉萨', lat: 29.6465, lng: 91.1172, level: 'city' as const, parent: '西藏自治区', province: '西藏自治区' },
      { name: '日喀则', lat: 29.2670, lng: 88.8806, level: 'city' as const, parent: '西藏自治区', province: '西藏自治区' },
      { name: '昌都', lat: 31.1406, lng: 97.1784, level: 'city' as const, parent: '西藏自治区', province: '西藏自治区' },
      { name: '林芝', lat: 29.6547, lng: 94.3614, level: 'city' as const, parent: '西藏自治区', province: '西藏自治区' },
      { name: '山南', lat: 29.2290, lng: 91.7731, level: 'city' as const, parent: '西藏自治区', province: '西藏自治区' },
      { name: '那曲', lat: 31.4762, lng: 92.0512, level: 'city' as const, parent: '西藏自治区', province: '西藏自治区' },
      { name: '阿里', lat: 32.5011, lng: 80.1058, level: 'city' as const, parent: '西藏自治区', province: '西藏自治区' },
      
      // 云南省
      { name: '昆明', lat: 25.0389, lng: 102.7183, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '曲靖', lat: 25.4900, lng: 103.7962, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '玉溪', lat: 24.3444, lng: 102.5439, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '保山', lat: 25.1116, lng: 99.1618, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '昭通', lat: 27.3382, lng: 103.7167, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '丽江', lat: 26.8550, lng: 100.2277, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '普洱', lat: 22.7778, lng: 100.9781, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '临沧', lat: 23.8833, lng: 100.0833, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '楚雄', lat: 25.0453, lng: 101.5460, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '红河', lat: 23.3642, lng: 103.1548, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '文山', lat: 23.3692, lng: 104.2442, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '西双版纳', lat: 22.0094, lng: 100.7959, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '大理', lat: 25.6065, lng: 100.2676, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '德宏', lat: 24.4333, lng: 98.5833, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '怒江', lat: 25.8500, lng: 98.8500, level: 'city' as const, parent: '云南省', province: '云南省' },
      { name: '迪庆', lat: 27.8333, lng: 99.7000, level: 'city' as const, parent: '云南省', province: '云南省' },
      
      // 贵州省
      { name: '贵阳', lat: 26.5783, lng: 106.7135, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '六盘水', lat: 26.5934, lng: 104.8304, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '遵义', lat: 27.7255, lng: 106.9274, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '安顺', lat: 26.2456, lng: 105.9462, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '毕节', lat: 27.3017, lng: 105.2850, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '铜仁', lat: 27.7183, lng: 109.1916, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '黔西南', lat: 25.0881, lng: 104.8976, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '黔东南', lat: 26.5834, lng: 107.9774, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      { name: '黔南', lat: 26.2582, lng: 107.5172, level: 'city' as const, parent: '贵州省', province: '贵州省' },
      
      // 广西壮族自治区
      { name: '南宁', lat: 22.8170, lng: 108.3669, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '柳州', lat: 24.3146, lng: 109.4281, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '桂林', lat: 25.2342, lng: 110.1994, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '梧州', lat: 23.4851, lng: 111.2791, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '北海', lat: 21.4733, lng: 109.1201, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '防城港', lat: 21.6174, lng: 108.3544, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '钦州', lat: 21.9667, lng: 108.6548, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '贵港', lat: 23.0936, lng: 109.5996, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '玉林', lat: 22.6314, lng: 110.1549, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '百色', lat: 23.9018, lng: 106.6184, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '贺州', lat: 24.4141, lng: 111.5666, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '河池', lat: 24.6922, lng: 108.0856, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '来宾', lat: 23.7338, lng: 109.2298, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      { name: '崇左', lat: 22.4041, lng: 107.3647, level: 'city' as const, parent: '广西壮族自治区', province: '广西壮族自治区' },
      
      // 海南省
      { name: '海口', lat: 20.0311, lng: 110.3312, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '三亚', lat: 18.2528, lng: 109.5119, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '三沙', lat: 16.8333, lng: 112.3333, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '儋州', lat: 19.5209, lng: 109.5807, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '五指山', lat: 18.7769, lng: 109.5169, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '琼海', lat: 19.2460, lng: 110.4668, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '文昌', lat: 19.6129, lng: 110.7539, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '万宁', lat: 18.7947, lng: 110.3888, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '东方', lat: 19.0953, lng: 108.6538, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '定安', lat: 19.6814, lng: 110.3589, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '屯昌', lat: 19.3606, lng: 110.1028, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '澄迈', lat: 19.7389, lng: 110.0068, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '临高', lat: 19.9120, lng: 109.6905, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '白沙', lat: 19.2256, lng: 109.4526, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '昌江', lat: 19.2982, lng: 109.0556, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '乐东', lat: 18.7506, lng: 109.1754, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '陵水', lat: 18.5050, lng: 110.0372, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '保亭', lat: 18.6364, lng: 109.7026, level: 'city' as const, parent: '海南省', province: '海南省' },
      { name: '琼中', lat: 19.0356, lng: 109.8384, level: 'city' as const, parent: '海南省', province: '海南省' },
      
      // 内蒙古自治区
      { name: '呼和浩特', lat: 40.8175, lng: 111.7656, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '包头', lat: 40.6562, lng: 109.8057, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '乌海', lat: 39.6737, lng: 106.7958, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '赤峰', lat: 42.2578, lng: 118.8869, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '通辽', lat: 43.6174, lng: 122.2637, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '鄂尔多斯', lat: 39.6083, lng: 109.7811, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '呼伦贝尔', lat: 49.2116, lng: 119.7657, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '巴彦淖尔', lat: 40.7432, lng: 107.3877, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '乌兰察布', lat: 40.9948, lng: 113.1337, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '兴安盟', lat: 46.0763, lng: 122.0703, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '锡林郭勒盟', lat: 43.9334, lng: 116.0470, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' },
      { name: '阿拉善盟', lat: 38.8519, lng: 105.7289, level: 'city' as const, parent: '内蒙古自治区', province: '内蒙古自治区' }
    ]

    // 县级行政区（重要县和县级市）
    const counties = [
      // 河北省所有县（91个）
      // 石家庄市
      { name: '赵县', lat: 37.7500, lng: 114.7667, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '行唐县', lat: 38.4333, lng: 114.5500, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '灵寿县', lat: 38.3167, lng: 114.3833, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '平山县', lat: 38.2500, lng: 114.2000, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '井陉县', lat: 38.0333, lng: 114.1333, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '元氏县', lat: 37.7667, lng: 114.5167, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '高邑县', lat: 37.6167, lng: 114.6167, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '无极县', lat: 38.1833, lng: 114.9667, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '深泽县', lat: 38.1833, lng: 115.2000, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '正定县', lat: 38.1475, lng: 114.5700, level: 'county' as const, parent: '石家庄', province: '河北省' },
      { name: '赞皇县', lat: 37.6667, lng: 114.3833, level: 'county' as const, parent: '石家庄', province: '河北省' },
      
      // 唐山市
      { name: '玉田县', lat: 39.8833, lng: 117.7333, level: 'county' as const, parent: '唐山', province: '河北省' },
      { name: '迁西县', lat: 40.1500, lng: 118.3167, level: 'county' as const, parent: '唐山', province: '河北省' },
      { name: '乐亭县', lat: 39.4167, lng: 118.9000, level: 'county' as const, parent: '唐山', province: '河北省' },
      { name: '滦南县', lat: 39.5000, lng: 118.6833, level: 'county' as const, parent: '唐山', province: '河北省' },
      { name: '迁安市', lat: 39.9984, lng: 118.7007, level: 'county' as const, parent: '唐山', province: '河北省' },
      { name: '遵化市', lat: 40.1884, lng: 117.9651, level: 'county' as const, parent: '唐山', province: '河北省' },
      
      // 秦皇岛市
      { name: '昌黎县', lat: 39.7000, lng: 119.1667, level: 'county' as const, parent: '秦皇岛', province: '河北省' },
      { name: '卢龙县', lat: 39.8833, lng: 118.8667, level: 'county' as const, parent: '秦皇岛', province: '河北省' },
      
      // 邯郸市
      { name: '磁县', lat: 36.3500, lng: 114.3667, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '邱县', lat: 36.8167, lng: 115.1667, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '魏县', lat: 36.3500, lng: 114.9333, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '涉县', lat: 36.5667, lng: 113.6833, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '大名县', lat: 36.2833, lng: 115.1500, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '成安县', lat: 36.4333, lng: 114.6833, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '临漳县', lat: 36.3333, lng: 114.6167, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '馆陶县', lat: 36.5333, lng: 115.3000, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '广平县', lat: 36.4833, lng: 114.9500, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '曲周县', lat: 36.7667, lng: 114.9500, level: 'county' as const, parent: '邯郸', province: '河北省' },
      { name: '鸡泽县', lat: 36.9167, lng: 114.8667, level: 'county' as const, parent: '邯郸', province: '河北省' },
      
      // 邢台市
      { name: '威县', lat: 36.9833, lng: 115.2500, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '广宗县', lat: 37.0667, lng: 115.1333, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '巨鹿县', lat: 37.2167, lng: 115.0333, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '临城县', lat: 37.4333, lng: 114.5000, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '临西县', lat: 36.8667, lng: 115.5000, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '柏乡县', lat: 37.4833, lng: 114.6833, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '隆尧县', lat: 37.3500, lng: 114.7500, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '清河县', lat: 37.0667, lng: 115.6667, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '内丘县', lat: 37.2833, lng: 114.5167, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '宁晋县', lat: 37.6167, lng: 114.9167, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '平乡县', lat: 37.0667, lng: 115.0333, level: 'county' as const, parent: '邢台', province: '河北省' },
      { name: '新河县', lat: 37.5167, lng: 115.2500, level: 'county' as const, parent: '邢台', province: '河北省' },
      
      // 保定市
      { name: '雄县', lat: 38.9833, lng: 116.1000, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '易县', lat: 39.3500, lng: 115.5000, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '唐县', lat: 38.7500, lng: 114.9833, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '蠡县', lat: 38.4833, lng: 115.5833, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '博野县', lat: 38.4500, lng: 115.4500, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '定兴县', lat: 39.2667, lng: 115.7667, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '安新县', lat: 38.9333, lng: 115.9333, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '涞源县', lat: 39.3500, lng: 114.6833, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '阜平县', lat: 38.8500, lng: 114.1833, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '高阳县', lat: 38.6833, lng: 115.7667, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '涞水县', lat: 39.4000, lng: 115.7167, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '望都县', lat: 38.7000, lng: 115.1333, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '顺平县', lat: 38.8333, lng: 115.1333, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '曲阳县', lat: 38.6167, lng: 114.7000, level: 'county' as const, parent: '保定', province: '河北省' },
      { name: '容城县', lat: 39.0500, lng: 115.8667, level: 'county' as const, parent: '保定', province: '河北省' },
      
      // 张家口市
      { name: '蔚县', lat: 39.8333, lng: 114.5667, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '赤城县', lat: 40.9167, lng: 115.8333, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '沽源县', lat: 41.6667, lng: 115.7000, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '怀安县', lat: 40.6667, lng: 114.4167, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '怀来县', lat: 40.4000, lng: 115.5167, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '康保县', lat: 41.8500, lng: 114.6000, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '涿鹿县', lat: 40.3667, lng: 115.2167, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '张北县', lat: 41.1500, lng: 114.7167, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '尚义县', lat: 41.0833, lng: 113.9667, level: 'county' as const, parent: '张家口', province: '河北省' },
      { name: '阳原县', lat: 40.1167, lng: 114.1500, level: 'county' as const, parent: '张家口', province: '河北省' },
      
      // 承德市
      { name: '承德县', lat: 40.7667, lng: 118.1667, level: 'county' as const, parent: '承德', province: '河北省' },
      { name: '兴隆县', lat: 40.4167, lng: 117.5000, level: 'county' as const, parent: '承德', province: '河北省' },
      { name: '隆化县', lat: 41.3167, lng: 117.7333, level: 'county' as const, parent: '承德', province: '河北省' },
      { name: '滦平县', lat: 40.9333, lng: 117.3333, level: 'county' as const, parent: '承德', province: '河北省' },
      
      // 沧州市
      { name: '沧县', lat: 38.3167, lng: 116.8667, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '青县', lat: 38.5833, lng: 116.8000, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '献县', lat: 38.1833, lng: 116.1333, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '东光县', lat: 37.8833, lng: 116.5333, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '海兴县', lat: 38.1333, lng: 117.5000, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '盐山县', lat: 38.0500, lng: 117.2167, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '吴桥县', lat: 37.6167, lng: 116.3833, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '肃宁县', lat: 38.4333, lng: 115.8333, level: 'county' as const, parent: '沧州', province: '河北省' },
      { name: '南皮县', lat: 38.0333, lng: 116.7000, level: 'county' as const, parent: '沧州', province: '河北省' },
      
      // 廊坊市
      { name: '文安县', lat: 38.8667, lng: 116.4667, level: 'county' as const, parent: '廊坊', province: '河北省' },
      { name: '固安县', lat: 39.4333, lng: 116.3000, level: 'county' as const, parent: '廊坊', province: '河北省' },
      { name: '永清县', lat: 39.3167, lng: 116.5000, level: 'county' as const, parent: '廊坊', province: '河北省' },
      { name: '大城县', lat: 38.7000, lng: 116.6333, level: 'county' as const, parent: '廊坊', province: '河北省' },
      { name: '香河县', lat: 39.7667, lng: 117.0000, level: 'county' as const, parent: '廊坊', province: '河北省' },
      { name: '霸州市', lat: 39.1244, lng: 116.3913, level: 'county' as const, parent: '廊坊', province: '河北省' },
      { name: '三河市', lat: 39.9824, lng: 117.0782, level: 'county' as const, parent: '廊坊', province: '河北省' },
      
      // 衡水市
      { name: '景县', lat: 37.6833, lng: 116.2667, level: 'county' as const, parent: '衡水', province: '河北省' },
      { name: '安平县', lat: 38.2333, lng: 115.5167, level: 'county' as const, parent: '衡水', province: '河北省' },
      { name: '阜城县', lat: 37.8667, lng: 116.1333, level: 'county' as const, parent: '衡水', province: '河北省' },
      { name: '故城县', lat: 37.3500, lng: 115.9667, level: 'county' as const, parent: '衡水', province: '河北省' },
      { name: '枣强县', lat: 37.5167, lng: 115.7167, level: 'county' as const, parent: '衡水', province: '河北省' },
      { name: '武邑县', lat: 37.8167, lng: 115.8833, level: 'county' as const, parent: '衡水', province: '河北省' },
      { name: '武强县', lat: 38.0333, lng: 115.9833, level: 'county' as const, parent: '衡水', province: '河北省' },
      { name: '饶阳县', lat: 38.2333, lng: 115.7333, level: 'county' as const, parent: '衡水', province: '河北省' },
      
      // 山西省所有县（80个）
      // 太原市
      { name: '阳曲县', lat: 38.0667, lng: 112.6667, level: 'county' as const, parent: '太原', province: '山西省' },
      { name: '娄烦县', lat: 38.0667, lng: 111.8000, level: 'county' as const, parent: '太原', province: '山西省' },
      { name: '清徐县', lat: 37.6000, lng: 112.3500, level: 'county' as const, parent: '太原', province: '山西省' },
      
      // 大同市
      { name: '左云县', lat: 40.0167, lng: 112.7000, level: 'county' as const, parent: '大同', province: '山西省' },
      { name: '阳高县', lat: 40.3667, lng: 113.7500, level: 'county' as const, parent: '大同', province: '山西省' },
      { name: '天镇县', lat: 40.4167, lng: 114.0833, level: 'county' as const, parent: '大同', province: '山西省' },
      { name: '浑源县', lat: 39.7000, lng: 113.6833, level: 'county' as const, parent: '大同', province: '山西省' },
      { name: '广灵县', lat: 39.7667, lng: 114.2833, level: 'county' as const, parent: '大同', province: '山西省' },
      { name: '灵丘县', lat: 39.4333, lng: 114.2333, level: 'county' as const, parent: '大同', province: '山西省' },
      
      // 阳泉市
      { name: '盂县', lat: 38.0833, lng: 113.4000, level: 'county' as const, parent: '阳泉', province: '山西省' },
      { name: '平定县', lat: 37.8000, lng: 113.6167, level: 'county' as const, parent: '阳泉', province: '山西省' },
      
      // 长治市
      { name: '沁县', lat: 36.7500, lng: 112.6833, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '壶关县', lat: 36.1167, lng: 113.2000, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '沁源县', lat: 36.5000, lng: 112.3333, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '长子县', lat: 36.1167, lng: 112.8833, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '襄垣县', lat: 36.5333, lng: 113.0333, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '武乡县', lat: 36.8333, lng: 112.8667, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '黎城县', lat: 36.5000, lng: 113.3833, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '平顺县', lat: 36.2000, lng: 113.4333, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '陵川县', lat: 35.7833, lng: 113.2667, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '沁水县', lat: 35.6833, lng: 112.1833, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '泽州县', lat: 35.5000, lng: 112.8333, level: 'county' as const, parent: '长治', province: '山西省' },
      { name: '阳城县', lat: 35.4833, lng: 112.4167, level: 'county' as const, parent: '长治', province: '山西省' },
      
      // 朔州市
      { name: '应县', lat: 39.5667, lng: 113.1833, level: 'county' as const, parent: '朔州', province: '山西省' },
      { name: '右玉县', lat: 40.1833, lng: 112.4667, level: 'county' as const, parent: '朔州', province: '山西省' },
      { name: '山阴县', lat: 39.5167, lng: 112.8167, level: 'county' as const, parent: '朔州', province: '山西省' },
      
      // 晋中市
      { name: '祁县', lat: 37.3500, lng: 112.3333, level: 'county' as const, parent: '晋中', province: '山西省' },
      { name: '灵石县', lat: 36.8500, lng: 111.7667, level: 'county' as const, parent: '晋中', province: '山西省' },
      { name: '榆社县', lat: 37.0667, lng: 112.9667, level: 'county' as const, parent: '晋中', province: '山西省' },
      { name: '左权县', lat: 37.0667, lng: 113.3667, level: 'county' as const, parent: '晋中', province: '山西省' },
      { name: '和顺县', lat: 37.3333, lng: 113.5667, level: 'county' as const, parent: '晋中', province: '山西省' },
      { name: '昔阳县', lat: 37.6167, lng: 113.7000, level: 'county' as const, parent: '晋中', province: '山西省' },
      { name: '平遥县', lat: 37.2000, lng: 112.1833, level: 'county' as const, parent: '晋中', province: '山西省' },
      { name: '寿阳县', lat: 37.8833, lng: 113.1667, level: 'county' as const, parent: '晋中', province: '山西省' },
      
      // 运城市
      { name: '夏县', lat: 35.1333, lng: 111.2167, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '绛县', lat: 35.4833, lng: 111.5667, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '临猗县', lat: 35.1333, lng: 110.7667, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '芮城县', lat: 34.6833, lng: 110.6833, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '万荣县', lat: 35.4167, lng: 110.8333, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '新绛县', lat: 35.6167, lng: 111.2167, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '垣曲县', lat: 35.3000, lng: 111.6667, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '稷山县', lat: 35.6000, lng: 110.9667, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '闻喜县', lat: 35.3500, lng: 111.2167, level: 'county' as const, parent: '运城', province: '山西省' },
      { name: '平陆县', lat: 34.8333, lng: 111.2167, level: 'county' as const, parent: '运城', province: '山西省' },
      
      // 忻州市
      { name: '代县', lat: 39.0667, lng: 112.9500, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '保德县', lat: 39.0167, lng: 111.0833, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '定襄县', lat: 38.4833, lng: 112.9500, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '五台县', lat: 38.7167, lng: 113.2500, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '河曲县', lat: 39.3833, lng: 111.1333, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '繁峙县', lat: 39.1833, lng: 113.2667, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '偏关县', lat: 39.4333, lng: 111.5000, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '宁武县', lat: 39.0000, lng: 112.3000, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '静乐县', lat: 38.3500, lng: 111.9333, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '神池县', lat: 39.0833, lng: 112.2000, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '五寨县', lat: 38.9167, lng: 111.8500, level: 'county' as const, parent: '忻州', province: '山西省' },
      { name: '岢岚县', lat: 38.7000, lng: 111.5667, level: 'county' as const, parent: '忻州', province: '山西省' },
      
      // 临汾市
      { name: '古县', lat: 36.2667, lng: 111.9167, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '蒲县', lat: 36.4167, lng: 111.0833, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '吉县', lat: 36.0833, lng: 110.6667, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '隰县', lat: 36.6833, lng: 110.9333, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '襄汾县', lat: 35.8667, lng: 111.4333, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '洪洞县', lat: 36.2500, lng: 111.6667, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '安泽县', lat: 36.1500, lng: 112.2500, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '曲沃县', lat: 35.6333, lng: 111.4667, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '浮山县', lat: 35.9667, lng: 111.8333, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '翼城县', lat: 35.7333, lng: 111.7167, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '乡宁县', lat: 35.9667, lng: 110.8333, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '汾西县', lat: 36.6500, lng: 111.5667, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '永和县', lat: 36.7667, lng: 110.6333, level: 'county' as const, parent: '临汾', province: '山西省' },
      { name: '大宁县', lat: 36.4667, lng: 110.7500, level: 'county' as const, parent: '临汾', province: '山西省' },
      
      // 吕梁市
      { name: '岚县', lat: 38.2833, lng: 111.6667, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '兴县', lat: 38.4667, lng: 111.1167, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '临县', lat: 37.9500, lng: 110.9833, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '交城县', lat: 37.5500, lng: 112.1500, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '文水县', lat: 37.4333, lng: 112.0167, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '方山县', lat: 37.8833, lng: 111.2333, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '交口县', lat: 36.9667, lng: 111.2000, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '柳林县', lat: 37.4333, lng: 110.8833, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '中阳县', lat: 37.3500, lng: 111.1833, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '石楼县', lat: 36.9833, lng: 110.8333, level: 'county' as const, parent: '吕梁', province: '山西省' },
      { name: '江宁县', lat: 31.9500, lng: 118.8500, level: 'county' as const, parent: '南京', province: '江苏省' },
      { name: '江浦县', lat: 32.0667, lng: 118.6167, level: 'county' as const, parent: '南京', province: '江苏省' },
      { name: '六合县', lat: 32.3500, lng: 118.8333, level: 'county' as const, parent: '南京', province: '江苏省' },
      { name: '溧水县', lat: 31.6500, lng: 119.0167, level: 'county' as const, parent: '南京', province: '江苏省' },
      { name: '高淳县', lat: 31.3333, lng: 118.8833, level: 'county' as const, parent: '南京', province: '江苏省' },
      { name: '昆山市', lat: 31.3856, lng: 120.9805, level: 'county' as const, parent: '苏州', province: '江苏省' },
      { name: '张家港市', lat: 31.8756, lng: 120.5558, level: 'county' as const, parent: '苏州', province: '江苏省' },
      { name: '常熟市', lat: 31.6538, lng: 120.7485, level: 'county' as const, parent: '苏州', province: '江苏省' },
      { name: '太仓市', lat: 31.4598, lng: 121.1123, level: 'county' as const, parent: '苏州', province: '江苏省' },
      { name: '江阴市', lat: 31.9200, lng: 120.2440, level: 'county' as const, parent: '无锡', province: '江苏省' },
      { name: '宜兴市', lat: 31.3644, lng: 119.8236, level: 'county' as const, parent: '无锡', province: '江苏省' },
      { name: '溧阳市', lat: 31.4167, lng: 119.4833, level: 'county' as const, parent: '常州', province: '江苏省' },
      { name: '金坛市', lat: 31.7333, lng: 119.5667, level: 'county' as const, parent: '常州', province: '江苏省' },
      
      // 浙江省部分县
      { name: '萧山县', lat: 30.1667, lng: 120.2500, level: 'county' as const, parent: '杭州', province: '浙江省' },
      { name: '余杭县', lat: 30.4167, lng: 120.3000, level: 'county' as const, parent: '杭州', province: '浙江省' },
      { name: '临安县', lat: 30.2333, lng: 119.7167, level: 'county' as const, parent: '杭州', province: '浙江省' },
      { name: '富阳县', lat: 30.0500, lng: 119.9500, level: 'county' as const, parent: '杭州', province: '浙江省' },
      { name: '桐庐县', lat: 29.8000, lng: 119.6833, level: 'county' as const, parent: '杭州', province: '浙江省' },
      { name: '淳安县', lat: 29.6000, lng: 119.0333, level: 'county' as const, parent: '杭州', province: '浙江省' },
      { name: '建德县', lat: 29.4833, lng: 119.2833, level: 'county' as const, parent: '杭州', province: '浙江省' },
      { name: '慈溪市', lat: 30.1694, lng: 121.2665, level: 'county' as const, parent: '宁波', province: '浙江省' },
      { name: '余姚市', lat: 30.0372, lng: 121.1546, level: 'county' as const, parent: '宁波', province: '浙江省' },
      { name: '奉化市', lat: 29.6626, lng: 121.4069, level: 'county' as const, parent: '宁波', province: '浙江省' },
      { name: '象山县', lat: 29.4767, lng: 121.8693, level: 'county' as const, parent: '宁波', province: '浙江省' },
      { name: '宁海县', lat: 29.2878, lng: 121.4296, level: 'county' as const, parent: '宁波', province: '浙江省' },
      { name: '瑞安市', lat: 27.7783, lng: 120.6542, level: 'county' as const, parent: '温州', province: '浙江省' },
      { name: '乐清市', lat: 28.1129, lng: 120.9671, level: 'county' as const, parent: '温州', province: '浙江省' },
      { name: '永嘉县', lat: 28.1534, lng: 120.6906, level: 'county' as const, parent: '温州', province: '浙江省' },
      { name: '平阳县', lat: 27.6622, lng: 120.5658, level: 'county' as const, parent: '温州', province: '浙江省' },
      { name: '苍南县', lat: 27.5174, lng: 120.4261, level: 'county' as const, parent: '温州', province: '浙江省' },
      
      // 广东省部分县
      { name: '番禺县', lat: 23.0000, lng: 113.3833, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '花县', lat: 23.3667, lng: 113.2000, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '从化县', lat: 23.5500, lng: 113.5833, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '增城县', lat: 23.2833, lng: 113.8167, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '龙门县', lat: 23.7333, lng: 114.2500, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '新丰县', lat: 24.0667, lng: 114.2000, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '佛冈县', lat: 23.8833, lng: 113.5333, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '清远县', lat: 23.7000, lng: 113.0167, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '英德县', lat: 24.1667, lng: 113.4000, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '阳山县', lat: 24.4833, lng: 112.6333, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '连县', lat: 24.7833, lng: 112.3833, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '连山县', lat: 24.5667, lng: 112.0833, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '连南县', lat: 24.7167, lng: 112.2833, level: 'county' as const, parent: '广州', province: '广东省' },
      { name: '宝安区', lat: 22.5553, lng: 113.8831, level: 'county' as const, parent: '深圳', province: '广东省' },
      { name: '龙岗区', lat: 22.7208, lng: 114.2514, level: 'county' as const, parent: '深圳', province: '广东省' },
      { name: '南山区', lat: 22.5314, lng: 113.9308, level: 'county' as const, parent: '深圳', province: '广东省' },
      { name: '福田区', lat: 22.5232, lng: 114.0556, level: 'county' as const, parent: '深圳', province: '广东省' },
      { name: '罗湖区', lat: 22.5482, lng: 114.1239, level: 'county' as const, parent: '深圳', province: '广东省' },
      { name: '盐田区', lat: 22.5565, lng: 114.2369, level: 'county' as const, parent: '深圳', province: '广东省' },
      
      // 山东省部分县
      { name: '即墨市', lat: 36.3833, lng: 120.4500, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '胶州市', lat: 36.2667, lng: 120.0000, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '平度市', lat: 36.7833, lng: 119.9500, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '莱西市', lat: 36.8667, lng: 120.5167, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '城阳区', lat: 36.3000, lng: 120.3833, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '崂山区', lat: 36.1500, lng: 120.4167, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '黄岛区', lat: 36.0333, lng: 120.1833, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '李沧区', lat: 36.1500, lng: 120.4333, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '市北区', lat: 36.0833, lng: 120.3833, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '市南区', lat: 36.0667, lng: 120.3833, level: 'county' as const, parent: '青岛', province: '山东省' },
      { name: '章丘市', lat: 36.7167, lng: 117.5333, level: 'county' as const, parent: '济南', province: '山东省' },
      { name: '平阴县', lat: 36.2833, lng: 116.4500, level: 'county' as const, parent: '济南', province: '山东省' },
      { name: '济阳县', lat: 36.9833, lng: 117.2167, level: 'county' as const, parent: '济南', province: '山东省' },
      { name: '商河县', lat: 37.3167, lng: 117.1500, level: 'county' as const, parent: '济南', province: '山东省' },
      
      // 河南省部分县
      { name: '巩义市', lat: 34.7500, lng: 112.9833, level: 'county' as const, parent: '郑州', province: '河南省' },
      { name: '荥阳市', lat: 34.7833, lng: 113.3833, level: 'county' as const, parent: '郑州', province: '河南省' },
      { name: '新密市', lat: 34.5333, lng: 113.3833, level: 'county' as const, parent: '郑州', province: '河南省' },
      { name: '新郑市', lat: 34.4000, lng: 113.7333, level: 'county' as const, parent: '郑州', province: '河南省' },
      { name: '登封市', lat: 34.4500, lng: 113.0333, level: 'county' as const, parent: '郑州', province: '河南省' },
      { name: '中牟县', lat: 34.7167, lng: 114.0167, level: 'county' as const, parent: '郑州', province: '河南省' },
      { name: '偃师市', lat: 34.7167, lng: 112.7833, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '孟津县', lat: 34.8333, lng: 112.4333, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '新安县', lat: 34.7167, lng: 112.1333, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '栾川县', lat: 33.7833, lng: 111.6167, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '嵩县', lat: 34.1333, lng: 112.0833, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '汝阳县', lat: 34.1500, lng: 112.4667, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '宜阳县', lat: 34.5167, lng: 112.1833, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '洛宁县', lat: 34.3833, lng: 111.6500, level: 'county' as const, parent: '洛阳', province: '河南省' },
      { name: '伊川县', lat: 34.4167, lng: 112.4167, level: 'county' as const, parent: '洛阳', province: '河南省' },
      
      // 四川省部分县
      { name: '都江堰市', lat: 31.0333, lng: 103.6167, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '彭州市', lat: 30.9833, lng: 103.9333, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '邛崃市', lat: 30.4167, lng: 103.4667, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '崇州市', lat: 30.6333, lng: 103.6667, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '金堂县', lat: 30.8667, lng: 104.4167, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '双流县', lat: 30.5667, lng: 103.9167, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '郫县', lat: 30.8167, lng: 103.8833, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '大邑县', lat: 30.5833, lng: 103.5167, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '蒲江县', lat: 30.2000, lng: 103.5000, level: 'county' as const, parent: '成都', province: '四川省' },
      { name: '新津县', lat: 30.4167, lng: 103.8167, level: 'county' as const, parent: '成都', province: '四川省' },
      
      // 湖北省部分县
      { name: '黄陂区', lat: 30.8833, lng: 114.3667, level: 'county' as const, parent: '武汉', province: '湖北省' },
      { name: '新洲区', lat: 30.8333, lng: 114.8000, level: 'county' as const, parent: '武汉', province: '湖北省' },
      { name: '江夏区', lat: 30.3500, lng: 114.3167, level: 'county' as const, parent: '武汉', province: '湖北省' },
      { name: '蔡甸区', lat: 30.5833, lng: 114.0333, level: 'county' as const, parent: '武汉', province: '湖北省' },
      { name: '汉南区', lat: 30.3167, lng: 114.0833, level: 'county' as const, parent: '武汉', province: '湖北省' },
      { name: '东西湖区', lat: 30.6167, lng: 114.1333, level: 'county' as const, parent: '武汉', province: '湖北省' },
      
      // 湖南省部分县
      { name: '长沙县', lat: 28.2333, lng: 113.0833, level: 'county' as const, parent: '长沙', province: '湖南省' },
      { name: '望城县', lat: 28.3667, lng: 112.8167, level: 'county' as const, parent: '长沙', province: '湖南省' },
      { name: '浏阳市', lat: 28.1500, lng: 113.6333, level: 'county' as const, parent: '长沙', province: '湖南省' },
      { name: '宁乡县', lat: 28.2500, lng: 112.5500, level: 'county' as const, parent: '长沙', province: '湖南省' },
      
      // 安徽省部分县
      { name: '长丰县', lat: 32.4833, lng: 117.1667, level: 'county' as const, parent: '合肥', province: '安徽省' },
      { name: '肥东县', lat: 31.8667, lng: 117.4667, level: 'county' as const, parent: '合肥', province: '安徽省' },
      { name: '肥西县', lat: 31.7000, lng: 117.1667, level: 'county' as const, parent: '合肥', province: '安徽省' },
      { name: '庐江县', lat: 31.2500, lng: 117.2833, level: 'county' as const, parent: '合肥', province: '安徽省' },
      { name: '巢湖市', lat: 31.6000, lng: 117.8667, level: 'county' as const, parent: '合肥', province: '安徽省' },
      
      // 福建省部分县
      { name: '闽侯县', lat: 26.1500, lng: 119.1333, level: 'county' as const, parent: '福州', province: '福建省' },
      { name: '连江县', lat: 26.2000, lng: 119.5333, level: 'county' as const, parent: '福州', province: '福建省' },
      { name: '罗源县', lat: 26.4833, lng: 119.5500, level: 'county' as const, parent: '福州', province: '福建省' },
      { name: '闽清县', lat: 26.2167, lng: 118.8667, level: 'county' as const, parent: '福州', province: '福建省' },
      { name: '永泰县', lat: 25.8667, lng: 118.9333, level: 'county' as const, parent: '福州', province: '福建省' },
      { name: '平潭县', lat: 25.5000, lng: 119.7833, level: 'county' as const, parent: '福州', province: '福建省' },
      { name: '福清市', lat: 25.7167, lng: 119.3833, level: 'county' as const, parent: '福州', province: '福建省' },
      { name: '长乐市', lat: 25.9667, lng: 119.5167, level: 'county' as const, parent: '福州', province: '福建省' },
      
      // 江西省部分县
      { name: '南昌县', lat: 28.5500, lng: 115.9333, level: 'county' as const, parent: '南昌', province: '江西省' },
      { name: '新建县', lat: 28.6833, lng: 115.8167, level: 'county' as const, parent: '南昌', province: '江西省' },
      { name: '安义县', lat: 28.8500, lng: 115.5500, level: 'county' as const, parent: '南昌', province: '江西省' },
      { name: '进贤县', lat: 28.3667, lng: 116.2667, level: 'county' as const, parent: '南昌', province: '江西省' },
      
      // 辽宁省部分县
      { name: '辽中县', lat: 41.5167, lng: 122.7333, level: 'county' as const, parent: '沈阳', province: '辽宁省' },
      { name: '康平县', lat: 42.7500, lng: 123.3500, level: 'county' as const, parent: '沈阳', province: '辽宁省' },
      { name: '法库县', lat: 42.5000, lng: 123.4000, level: 'county' as const, parent: '沈阳', province: '辽宁省' },
      { name: '新民市', lat: 41.9833, lng: 122.8333, level: 'county' as const, parent: '沈阳', province: '辽宁省' },
      
      // 吉林省部分县
      { name: '农安县', lat: 44.4167, lng: 125.1833, level: 'county' as const, parent: '长春', province: '吉林省' },
      { name: '九台市', lat: 44.1500, lng: 125.8333, level: 'county' as const, parent: '长春', province: '吉林省' },
      { name: '榆树市', lat: 44.8333, lng: 126.5333, level: 'county' as const, parent: '长春', province: '吉林省' },
      { name: '德惠市', lat: 44.5333, lng: 125.7000, level: 'county' as const, parent: '长春', province: '吉林省' },
      
      // 黑龙江省部分县
      { name: '呼兰区', lat: 45.9833, lng: 126.5833, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '阿城区', lat: 45.5333, lng: 126.9667, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '双城市', lat: 45.3667, lng: 126.3167, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '尚志市', lat: 45.2167, lng: 127.9667, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '五常市', lat: 44.9167, lng: 127.1667, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '巴彦县', lat: 46.0833, lng: 127.4000, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '木兰县', lat: 45.9500, lng: 128.0333, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '通河县', lat: 45.9667, lng: 128.7333, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      { name: '延寿县', lat: 45.4500, lng: 128.3167, level: 'county' as const, parent: '哈尔滨', province: '黑龙江省' },
      
      // 陕西省部分县
      { name: '蓝田县', lat: 34.1500, lng: 109.3167, level: 'county' as const, parent: '西安', province: '陕西省' },
      { name: '周至县', lat: 34.1667, lng: 108.2167, level: 'county' as const, parent: '西安', province: '陕西省' },
      { name: '户县', lat: 34.1000, lng: 108.6000, level: 'county' as const, parent: '西安', province: '陕西省' },
      { name: '高陵县', lat: 34.5333, lng: 109.0833, level: 'county' as const, parent: '西安', province: '陕西省' },
      
      // 甘肃省部分县
      { name: '永登县', lat: 36.7333, lng: 103.2667, level: 'county' as const, parent: '兰州', province: '甘肃省' },
      { name: '皋兰县', lat: 36.3333, lng: 103.9500, level: 'county' as const, parent: '兰州', province: '甘肃省' },
      { name: '榆中县', lat: 35.8333, lng: 104.1167, level: 'county' as const, parent: '兰州', province: '甘肃省' },
      
      // 云南省部分县
      { name: '呈贡县', lat: 24.8833, lng: 102.8000, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '晋宁县', lat: 24.6667, lng: 102.5833, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '富民县', lat: 25.2167, lng: 102.4833, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '宜良县', lat: 24.9167, lng: 103.1333, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '石林县', lat: 24.7667, lng: 103.2667, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '嵩明县', lat: 25.3333, lng: 103.0333, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '禄劝县', lat: 25.5500, lng: 102.4667, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '寻甸县', lat: 25.5667, lng: 103.2500, level: 'county' as const, parent: '昆明', province: '云南省' },
      { name: '安宁市', lat: 24.9167, lng: 102.4833, level: 'county' as const, parent: '昆明', province: '云南省' },
      
      // 贵州省部分县
      { name: '开阳县', lat: 27.0667, lng: 106.9667, level: 'county' as const, parent: '贵阳', province: '贵州省' },
      { name: '息烽县', lat: 27.0833, lng: 106.7333, level: 'county' as const, parent: '贵阳', province: '贵州省' },
      { name: '修文县', lat: 26.8333, lng: 106.5833, level: 'county' as const, parent: '贵阳', province: '贵州省' },
      { name: '清镇市', lat: 26.5500, lng: 106.4667, level: 'county' as const, parent: '贵阳', province: '贵州省' },
      
      // 广西壮族自治区部分县
      { name: '武鸣县', lat: 23.1667, lng: 108.2667, level: 'county' as const, parent: '南宁', province: '广西壮族自治区' },
      { name: '隆安县', lat: 23.1833, lng: 107.6833, level: 'county' as const, parent: '南宁', province: '广西壮族自治区' },
      { name: '马山县', lat: 23.7167, lng: 108.1667, level: 'county' as const, parent: '南宁', province: '广西壮族自治区' },
      { name: '上林县', lat: 23.4333, lng: 108.6000, level: 'county' as const, parent: '南宁', province: '广西壮族自治区' },
      { name: '宾阳县', lat: 23.2167, lng: 108.8167, level: 'county' as const, parent: '南宁', province: '广西壮族自治区' },
      { name: '横县', lat: 22.6833, lng: 109.2667, level: 'county' as const, parent: '南宁', province: '广西壮族自治区' }
    ]

    // 镇级行政区（部分重要镇）
    const towns = [
      // 江苏省部分镇
      { name: '东山镇', lat: 31.2667, lng: 120.4333, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '木渎镇', lat: 31.2833, lng: 120.5167, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '甪直镇', lat: 31.2667, lng: 120.8667, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '周庄镇', lat: 31.1167, lng: 120.8500, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '同里镇', lat: 31.1667, lng: 120.7333, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '锦溪镇', lat: 31.1833, lng: 120.9167, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '千灯镇', lat: 31.2000, lng: 120.9500, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '巴城镇', lat: 31.4000, lng: 120.8500, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '陆家镇', lat: 31.3167, lng: 121.0667, level: 'town' as const, parent: '苏州', province: '江苏省' },
      { name: '花桥镇', lat: 31.3000, lng: 121.1000, level: 'town' as const, parent: '苏州', province: '江苏省' },
      
      // 浙江省部分镇
      { name: '乌镇', lat: 30.7500, lng: 120.4833, level: 'town' as const, parent: '嘉兴', province: '浙江省' },
      { name: '西塘镇', lat: 30.9500, lng: 120.8833, level: 'town' as const, parent: '嘉兴', province: '浙江省' },
      { name: '南浔镇', lat: 30.8667, lng: 120.4167, level: 'town' as const, parent: '湖州', province: '浙江省' },
      { name: '新市镇', lat: 30.6167, lng: 120.2833, level: 'town' as const, parent: '湖州', province: '浙江省' },
      { name: '塘栖镇', lat: 30.4000, lng: 120.1833, level: 'town' as const, parent: '杭州', province: '浙江省' },
      { name: '临浦镇', lat: 30.1667, lng: 120.2167, level: 'town' as const, parent: '杭州', province: '浙江省' },
      { name: '瓜沥镇', lat: 30.1833, lng: 120.3500, level: 'town' as const, parent: '杭州', province: '浙江省' },
      { name: '义桥镇', lat: 30.1333, lng: 120.2667, level: 'town' as const, parent: '杭州', province: '浙江省' },
      { name: '闻堰镇', lat: 30.1500, lng: 120.2333, level: 'town' as const, parent: '杭州', province: '浙江省' },
      { name: '浦阳镇', lat: 30.1000, lng: 120.2000, level: 'town' as const, parent: '杭州', province: '浙江省' },
      
      // 广东省部分镇
      { name: '虎门镇', lat: 22.8167, lng: 113.6667, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '长安镇', lat: 22.8000, lng: 113.8000, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '厚街镇', lat: 22.9333, lng: 113.6667, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '塘厦镇', lat: 22.8167, lng: 114.0833, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '凤岗镇', lat: 22.7500, lng: 114.1333, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '清溪镇', lat: 22.8333, lng: 114.1500, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '樟木头镇', lat: 22.9000, lng: 114.0667, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '大朗镇', lat: 22.9333, lng: 113.9333, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '黄江镇', lat: 22.8667, lng: 114.0000, level: 'town' as const, parent: '东莞', province: '广东省' },
      { name: '常平镇', lat: 22.9833, lng: 114.0167, level: 'town' as const, parent: '东莞', province: '广东省' },
      
      // 山东省部分镇
      { name: '即墨镇', lat: 36.3833, lng: 120.4500, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '胶州镇', lat: 36.2667, lng: 120.0000, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '平度镇', lat: 36.7833, lng: 119.9500, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '莱西镇', lat: 36.8667, lng: 120.5167, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '城阳镇', lat: 36.3000, lng: 120.3833, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '崂山镇', lat: 36.1500, lng: 120.4167, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '黄岛镇', lat: 36.0333, lng: 120.1833, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '李沧镇', lat: 36.1500, lng: 120.4333, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '市北镇', lat: 36.0833, lng: 120.3833, level: 'town' as const, parent: '青岛', province: '山东省' },
      { name: '市南镇', lat: 36.0667, lng: 120.3833, level: 'town' as const, parent: '青岛', province: '山东省' }
    ]

    // 乡级行政区（部分重要乡）
    const villages = [
      // 江苏省部分乡
      { name: '太湖乡', lat: 31.2000, lng: 120.3000, level: 'village' as const, parent: '苏州', province: '江苏省' },
      { name: '阳澄湖乡', lat: 31.4000, lng: 120.8000, level: 'village' as const, parent: '苏州', province: '江苏省' },
      { name: '金鸡湖乡', lat: 31.3167, lng: 120.6667, level: 'village' as const, parent: '苏州', province: '江苏省' },
      { name: '独墅湖乡', lat: 31.2833, lng: 120.7000, level: 'village' as const, parent: '苏州', province: '江苏省' },
      { name: '石湖乡', lat: 31.2500, lng: 120.6167, level: 'village' as const, parent: '苏州', province: '江苏省' },
      
      // 浙江省部分乡
      { name: '西湖乡', lat: 30.2500, lng: 120.1333, level: 'village' as const, parent: '杭州', province: '浙江省' },
      { name: '千岛湖乡', lat: 29.6000, lng: 119.0333, level: 'village' as const, parent: '杭州', province: '浙江省' },
      { name: '钱塘江乡', lat: 30.3000, lng: 120.2000, level: 'village' as const, parent: '杭州', province: '浙江省' },
      { name: '富春江乡', lat: 30.0500, lng: 119.9500, level: 'village' as const, parent: '杭州', province: '浙江省' },
      { name: '新安江乡', lat: 29.4833, lng: 119.2833, level: 'village' as const, parent: '杭州', province: '浙江省' },
      
      // 广东省部分乡
      { name: '珠江乡', lat: 23.1000, lng: 113.3000, level: 'village' as const, parent: '广州', province: '广东省' },
      { name: '白云山乡', lat: 23.1833, lng: 113.2833, level: 'village' as const, parent: '广州', province: '广东省' },
      { name: '越秀山乡', lat: 23.1333, lng: 113.2667, level: 'village' as const, parent: '广州', province: '广东省' },
      { name: '荔湾乡', lat: 23.1167, lng: 113.2333, level: 'village' as const, parent: '广州', province: '广东省' },
      { name: '海珠乡', lat: 23.1000, lng: 113.2667, level: 'village' as const, parent: '广州', province: '广东省' },
      
      // 山东省部分乡
      { name: '崂山乡', lat: 36.1500, lng: 120.4167, level: 'village' as const, parent: '青岛', province: '山东省' },
      { name: '胶州湾乡', lat: 36.2000, lng: 120.2000, level: 'village' as const, parent: '青岛', province: '山东省' },
      { name: '黄海乡', lat: 36.0000, lng: 120.3000, level: 'village' as const, parent: '青岛', province: '山东省' },
      { name: '渤海乡', lat: 36.5000, lng: 120.0000, level: 'village' as const, parent: '青岛', province: '山东省' },
      { name: '东海乡', lat: 35.8000, lng: 120.5000, level: 'village' as const, parent: '青岛', province: '山东省' }
    ]

    // 合并所有城市数据
    this.cities = [...provinces, ...cities, ...counties, ...towns, ...villages, ...allCountiesData.map(county => ({
      name: county.name,
      lat: county.lat,
      lng: county.lng,
      level: county.level === 'autonomous_county' ? 'county' as const : county.level,
      parent: county.parent,
      province: county.province
    }))]
  }

  // 搜索城市
  searchCities(query: string): CityInfo[] {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase().trim()
    const results: CityInfo[] = []
    
    // 精确匹配优先
    const exactMatches = this.cities.filter(city => 
      city.name.toLowerCase() === searchTerm
    )
    results.push(...exactMatches)
    
    // 开头匹配
    const startMatches = this.cities.filter(city => 
      city.name.toLowerCase().startsWith(searchTerm) && 
      !results.includes(city)
    )
    results.push(...startMatches)
    
    // 包含匹配
    const containsMatches = this.cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm) && 
      !results.includes(city)
    )
    results.push(...containsMatches)
    
    // 省份匹配
    const provinceMatches = this.cities.filter(city => 
      city.province && city.province.toLowerCase().includes(searchTerm) && 
      !results.includes(city)
    )
    results.push(...provinceMatches)
    
    // 父级城市匹配
    const parentMatches = this.cities.filter(city => 
      city.parent && city.parent.toLowerCase().includes(searchTerm) && 
      !results.includes(city)
    )
    results.push(...parentMatches)
    
    // 返回前50个结果
    return results.slice(0, 50)
  }

  // 获取热门城市（用于快速定位）
  getHotCities(): CityInfo[] {
    return [
      { name: '北京', lat: 39.9042, lng: 116.4074, level: 'city' as const, parent: '北京市', province: '北京市' },
      { name: '上海', lat: 31.2304, lng: 121.4737, level: 'city' as const, parent: '上海市', province: '上海市' },
      { name: '广州', lat: 23.1291, lng: 113.2644, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '深圳', lat: 22.5431, lng: 114.0579, level: 'city' as const, parent: '广东省', province: '广东省' },
      { name: '杭州', lat: 30.2741, lng: 120.1551, level: 'city' as const, parent: '浙江省', province: '浙江省' },
      { name: '成都', lat: 30.5728, lng: 104.0668, level: 'city' as const, parent: '四川省', province: '四川省' },
      { name: '武汉', lat: 30.5928, lng: 114.3055, level: 'city' as const, parent: '湖北省', province: '湖北省' },
      { name: '西安', lat: 34.3416, lng: 108.9398, level: 'city' as const, parent: '陕西省', province: '陕西省' }
    ]
  }

  // 获取所有城市
  getAllCities(): CityInfo[] {
    return this.cities
  }

  // 按级别获取城市
  getCitiesByLevel(level: string): CityInfo[] {
    return this.cities.filter(city => city.level === level)
  }

  // 按省份获取城市
  getCitiesByProvince(province: string): CityInfo[] {
    return this.cities.filter(city => city.province === province)
  }
}
