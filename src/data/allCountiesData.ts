// 全国所有县级行政区数据
export interface CountyData {
  name: string
  lat: number
  lng: number
  level: 'county' | 'autonomous_county'
  parent: string
  province: string
}

// 河北省所有县（91个）
export const hebeiCounties: CountyData[] = [
  // 石家庄市
  { name: '赵县', lat: 37.7500, lng: 114.7667, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '行唐县', lat: 38.4333, lng: 114.5500, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '灵寿县', lat: 38.3167, lng: 114.3833, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '平山县', lat: 38.2500, lng: 114.2000, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '井陉县', lat: 38.0333, lng: 114.1333, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '元氏县', lat: 37.7667, lng: 114.5167, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '高邑县', lat: 37.6167, lng: 114.6167, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '无极县', lat: 38.1833, lng: 114.9667, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '深泽县', lat: 38.1833, lng: 115.2000, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '正定县', lat: 38.1475, lng: 114.5700, level: 'county', parent: '石家庄', province: '河北省' },
  { name: '赞皇县', lat: 37.6667, lng: 114.3833, level: 'county', parent: '石家庄', province: '河北省' },
  
  // 唐山市
  { name: '玉田县', lat: 39.8833, lng: 117.7333, level: 'county', parent: '唐山', province: '河北省' },
  { name: '迁西县', lat: 40.1500, lng: 118.3167, level: 'county', parent: '唐山', province: '河北省' },
  { name: '乐亭县', lat: 39.4167, lng: 118.9000, level: 'county', parent: '唐山', province: '河北省' },
  { name: '滦南县', lat: 39.5000, lng: 118.6833, level: 'county', parent: '唐山', province: '河北省' },
  { name: '迁安市', lat: 39.9984, lng: 118.7007, level: 'county', parent: '唐山', province: '河北省' },
  { name: '遵化市', lat: 40.1884, lng: 117.9651, level: 'county', parent: '唐山', province: '河北省' },
  
  // 秦皇岛市
  { name: '昌黎县', lat: 39.7000, lng: 119.1667, level: 'county', parent: '秦皇岛', province: '河北省' },
  { name: '卢龙县', lat: 39.8833, lng: 118.8667, level: 'county', parent: '秦皇岛', province: '河北省' },
  
  // 邯郸市
  { name: '磁县', lat: 36.3500, lng: 114.3667, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '邱县', lat: 36.8167, lng: 115.1667, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '魏县', lat: 36.3500, lng: 114.9333, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '涉县', lat: 36.5667, lng: 113.6833, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '大名县', lat: 36.2833, lng: 115.1500, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '成安县', lat: 36.4333, lng: 114.6833, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '临漳县', lat: 36.3333, lng: 114.6167, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '馆陶县', lat: 36.5333, lng: 115.3000, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '广平县', lat: 36.4833, lng: 114.9500, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '曲周县', lat: 36.7667, lng: 114.9500, level: 'county', parent: '邯郸', province: '河北省' },
  { name: '鸡泽县', lat: 36.9167, lng: 114.8667, level: 'county', parent: '邯郸', province: '河北省' },
  
  // 邢台市
  { name: '威县', lat: 36.9833, lng: 115.2500, level: 'county', parent: '邢台', province: '河北省' },
  { name: '广宗县', lat: 37.0667, lng: 115.1333, level: 'county', parent: '邢台', province: '河北省' },
  { name: '巨鹿县', lat: 37.2167, lng: 115.0333, level: 'county', parent: '邢台', province: '河北省' },
  { name: '临城县', lat: 37.4333, lng: 114.5000, level: 'county', parent: '邢台', province: '河北省' },
  { name: '临西县', lat: 36.8667, lng: 115.5000, level: 'county', parent: '邢台', province: '河北省' },
  { name: '柏乡县', lat: 37.4833, lng: 114.6833, level: 'county', parent: '邢台', province: '河北省' },
  { name: '隆尧县', lat: 37.3500, lng: 114.7500, level: 'county', parent: '邢台', province: '河北省' },
  { name: '清河县', lat: 37.0667, lng: 115.6667, level: 'county', parent: '邢台', province: '河北省' },
  { name: '内丘县', lat: 37.2833, lng: 114.5167, level: 'county', parent: '邢台', province: '河北省' },
  { name: '宁晋县', lat: 37.6167, lng: 114.9167, level: 'county', parent: '邢台', province: '河北省' },
  { name: '平乡县', lat: 37.0667, lng: 115.0333, level: 'county', parent: '邢台', province: '河北省' },
  { name: '新河县', lat: 37.5167, lng: 115.2500, level: 'county', parent: '邢台', province: '河北省' },
  
  // 保定市
  { name: '雄县', lat: 38.9833, lng: 116.1000, level: 'county', parent: '保定', province: '河北省' },
  { name: '易县', lat: 39.3500, lng: 115.5000, level: 'county', parent: '保定', province: '河北省' },
  { name: '唐县', lat: 38.7500, lng: 114.9833, level: 'county', parent: '保定', province: '河北省' },
  { name: '蠡县', lat: 38.4833, lng: 115.5833, level: 'county', parent: '保定', province: '河北省' },
  { name: '博野县', lat: 38.4500, lng: 115.4500, level: 'county', parent: '保定', province: '河北省' },
  { name: '定兴县', lat: 39.2667, lng: 115.7667, level: 'county', parent: '保定', province: '河北省' },
  { name: '安新县', lat: 38.9333, lng: 115.9333, level: 'county', parent: '保定', province: '河北省' },
  { name: '涞源县', lat: 39.3500, lng: 114.6833, level: 'county', parent: '保定', province: '河北省' },
  { name: '阜平县', lat: 38.8500, lng: 114.1833, level: 'county', parent: '保定', province: '河北省' },
  { name: '高阳县', lat: 38.6833, lng: 115.7667, level: 'county', parent: '保定', province: '河北省' },
  { name: '涞水县', lat: 39.4000, lng: 115.7167, level: 'county', parent: '保定', province: '河北省' },
  { name: '望都县', lat: 38.7000, lng: 115.1333, level: 'county', parent: '保定', province: '河北省' },
  { name: '顺平县', lat: 38.8333, lng: 115.1333, level: 'county', parent: '保定', province: '河北省' },
  { name: '曲阳县', lat: 38.6167, lng: 114.7000, level: 'county', parent: '保定', province: '河北省' },
  { name: '容城县', lat: 39.0500, lng: 115.8667, level: 'county', parent: '保定', province: '河北省' },
  
  // 张家口市
  { name: '蔚县', lat: 39.8333, lng: 114.5667, level: 'county', parent: '张家口', province: '河北省' },
  { name: '赤城县', lat: 40.9167, lng: 115.8333, level: 'county', parent: '张家口', province: '河北省' },
  { name: '沽源县', lat: 41.6667, lng: 115.7000, level: 'county', parent: '张家口', province: '河北省' },
  { name: '怀安县', lat: 40.6667, lng: 114.4167, level: 'county', parent: '张家口', province: '河北省' },
  { name: '怀来县', lat: 40.4000, lng: 115.5167, level: 'county', parent: '张家口', province: '河北省' },
  { name: '康保县', lat: 41.8500, lng: 114.6000, level: 'county', parent: '张家口', province: '河北省' },
  { name: '涿鹿县', lat: 40.3667, lng: 115.2167, level: 'county', parent: '张家口', province: '河北省' },
  { name: '张北县', lat: 41.1500, lng: 114.7167, level: 'county', parent: '张家口', province: '河北省' },
  { name: '尚义县', lat: 41.0833, lng: 113.9667, level: 'county', parent: '张家口', province: '河北省' },
  { name: '阳原县', lat: 40.1167, lng: 114.1500, level: 'county', parent: '张家口', province: '河北省' },
  
  // 承德市
  { name: '承德县', lat: 40.7667, lng: 118.1667, level: 'county', parent: '承德', province: '河北省' },
  { name: '兴隆县', lat: 40.4167, lng: 117.5000, level: 'county', parent: '承德', province: '河北省' },
  { name: '隆化县', lat: 41.3167, lng: 117.7333, level: 'county', parent: '承德', province: '河北省' },
  { name: '滦平县', lat: 40.9333, lng: 117.3333, level: 'county', parent: '承德', province: '河北省' },
  
  // 沧州市
  { name: '沧县', lat: 38.3167, lng: 116.8667, level: 'county', parent: '沧州', province: '河北省' },
  { name: '青县', lat: 38.5833, lng: 116.8000, level: 'county', parent: '沧州', province: '河北省' },
  { name: '献县', lat: 38.1833, lng: 116.1333, level: 'county', parent: '沧州', province: '河北省' },
  { name: '东光县', lat: 37.8833, lng: 116.5333, level: 'county', parent: '沧州', province: '河北省' },
  { name: '海兴县', lat: 38.1333, lng: 117.5000, level: 'county', parent: '沧州', province: '河北省' },
  { name: '盐山县', lat: 38.0500, lng: 117.2167, level: 'county', parent: '沧州', province: '河北省' },
  { name: '吴桥县', lat: 37.6167, lng: 116.3833, level: 'county', parent: '沧州', province: '河北省' },
  { name: '肃宁县', lat: 38.4333, lng: 115.8333, level: 'county', parent: '沧州', province: '河北省' },
  { name: '南皮县', lat: 38.0333, lng: 116.7000, level: 'county', parent: '沧州', province: '河北省' },
  
  // 廊坊市
  { name: '文安县', lat: 38.8667, lng: 116.4667, level: 'county', parent: '廊坊', province: '河北省' },
  { name: '固安县', lat: 39.4333, lng: 116.3000, level: 'county', parent: '廊坊', province: '河北省' },
  { name: '永清县', lat: 39.3167, lng: 116.5000, level: 'county', parent: '廊坊', province: '河北省' },
  { name: '大城县', lat: 38.7000, lng: 116.6333, level: 'county', parent: '廊坊', province: '河北省' },
  { name: '香河县', lat: 39.7667, lng: 117.0000, level: 'county', parent: '廊坊', province: '河北省' },
  { name: '霸州市', lat: 39.1244, lng: 116.3913, level: 'county', parent: '廊坊', province: '河北省' },
  { name: '三河市', lat: 39.9824, lng: 117.0782, level: 'county', parent: '廊坊', province: '河北省' },
  
  // 衡水市
  { name: '景县', lat: 37.6833, lng: 116.2667, level: 'county', parent: '衡水', province: '河北省' },
  { name: '安平县', lat: 38.2333, lng: 115.5167, level: 'county', parent: '衡水', province: '河北省' },
  { name: '阜城县', lat: 37.8667, lng: 116.1333, level: 'county', parent: '衡水', province: '河北省' },
  { name: '故城县', lat: 37.3500, lng: 115.9667, level: 'county', parent: '衡水', province: '河北省' },
  { name: '枣强县', lat: 37.5167, lng: 115.7167, level: 'county', parent: '衡水', province: '河北省' },
  { name: '武邑县', lat: 37.8167, lng: 115.8833, level: 'county', parent: '衡水', province: '河北省' },
  { name: '武强县', lat: 38.0333, lng: 115.9833, level: 'county', parent: '衡水', province: '河北省' },
  { name: '饶阳县', lat: 38.2333, lng: 115.7333, level: 'county', parent: '衡水', province: '河北省' }
]

// 河北省自治县（6个）
export const hebeiAutonomousCounties: CountyData[] = [
  { name: '青龙满族自治县', lat: 40.4000, lng: 118.9500, level: 'autonomous_county', parent: '秦皇岛', province: '河北省' },
  { name: '大厂回族自治县', lat: 39.8833, lng: 116.9833, level: 'autonomous_county', parent: '廊坊', province: '河北省' },
  { name: '孟村回族自治县', lat: 38.0667, lng: 117.1000, level: 'autonomous_county', parent: '沧州', province: '河北省' },
  { name: '宽城满族自治县', lat: 40.6000, lng: 118.4833, level: 'autonomous_county', parent: '承德', province: '河北省' },
  { name: '丰宁满族自治县', lat: 41.2000, lng: 116.6500, level: 'autonomous_county', parent: '承德', province: '河北省' },
  { name: '围场满族蒙古族自治县', lat: 41.9333, lng: 117.7500, level: 'autonomous_county', parent: '承德', province: '河北省' }
]

// 合并所有县数据
export const allCountiesData: CountyData[] = [
  ...hebeiCounties,
  ...hebeiAutonomousCounties,
  
  // 山西省所有县（80个）
  // 太原市
  { name: '阳曲县', lat: 38.0667, lng: 112.6667, level: 'county', parent: '太原', province: '山西省' },
  { name: '娄烦县', lat: 38.0667, lng: 111.8000, level: 'county', parent: '太原', province: '山西省' },
  { name: '清徐县', lat: 37.6000, lng: 112.3500, level: 'county', parent: '太原', province: '山西省' },
  
  // 大同市
  { name: '左云县', lat: 40.0167, lng: 112.7000, level: 'county', parent: '大同', province: '山西省' },
  { name: '阳高县', lat: 40.3667, lng: 113.7500, level: 'county', parent: '大同', province: '山西省' },
  { name: '天镇县', lat: 40.4167, lng: 114.0833, level: 'county', parent: '大同', province: '山西省' },
  { name: '浑源县', lat: 39.7000, lng: 113.6833, level: 'county', parent: '大同', province: '山西省' },
  { name: '广灵县', lat: 39.7667, lng: 114.2833, level: 'county', parent: '大同', province: '山西省' },
  { name: '灵丘县', lat: 39.4333, lng: 114.2333, level: 'county', parent: '大同', province: '山西省' },
  
  // 阳泉市
  { name: '盂县', lat: 38.0833, lng: 113.4000, level: 'county', parent: '阳泉', province: '山西省' },
  { name: '平定县', lat: 37.8000, lng: 113.6167, level: 'county', parent: '阳泉', province: '山西省' },
  
  // 长治市
  { name: '沁县', lat: 36.7500, lng: 112.6833, level: 'county', parent: '长治', province: '山西省' },
  { name: '壶关县', lat: 36.1167, lng: 113.2000, level: 'county', parent: '长治', province: '山西省' },
  { name: '沁源县', lat: 36.5000, lng: 112.3333, level: 'county', parent: '长治', province: '山西省' },
  { name: '长子县', lat: 36.1167, lng: 112.8833, level: 'county', parent: '长治', province: '山西省' },
  { name: '襄垣县', lat: 36.5333, lng: 113.0333, level: 'county', parent: '长治', province: '山西省' },
  { name: '武乡县', lat: 36.8333, lng: 112.8667, level: 'county', parent: '长治', province: '山西省' },
  { name: '黎城县', lat: 36.5000, lng: 113.3833, level: 'county', parent: '长治', province: '山西省' },
  { name: '平顺县', lat: 36.2000, lng: 113.4333, level: 'county', parent: '长治', province: '山西省' },
  { name: '陵川县', lat: 35.7833, lng: 113.2667, level: 'county', parent: '长治', province: '山西省' },
  { name: '沁水县', lat: 35.6833, lng: 112.1833, level: 'county', parent: '长治', province: '山西省' },
  { name: '泽州县', lat: 35.5000, lng: 112.8333, level: 'county', parent: '长治', province: '山西省' },
  { name: '阳城县', lat: 35.4833, lng: 112.4167, level: 'county', parent: '长治', province: '山西省' },
  
  // 朔州市
  { name: '应县', lat: 39.5667, lng: 113.1833, level: 'county', parent: '朔州', province: '山西省' },
  { name: '右玉县', lat: 40.1833, lng: 112.4667, level: 'county', parent: '朔州', province: '山西省' },
  { name: '山阴县', lat: 39.5167, lng: 112.8167, level: 'county', parent: '朔州', province: '山西省' },
  
  // 晋中市
  { name: '祁县', lat: 37.3500, lng: 112.3333, level: 'county', parent: '晋中', province: '山西省' },
  { name: '灵石县', lat: 36.8500, lng: 111.7667, level: 'county', parent: '晋中', province: '山西省' },
  { name: '榆社县', lat: 37.0667, lng: 112.9667, level: 'county', parent: '晋中', province: '山西省' },
  { name: '左权县', lat: 37.0667, lng: 113.3667, level: 'county', parent: '晋中', province: '山西省' },
  { name: '和顺县', lat: 37.3333, lng: 113.5667, level: 'county', parent: '晋中', province: '山西省' },
  { name: '昔阳县', lat: 37.6167, lng: 113.7000, level: 'county', parent: '晋中', province: '山西省' },
  { name: '平遥县', lat: 37.2000, lng: 112.1833, level: 'county', parent: '晋中', province: '山西省' },
  { name: '寿阳县', lat: 37.8833, lng: 113.1667, level: 'county', parent: '晋中', province: '山西省' },
  
  // 运城市
  { name: '夏县', lat: 35.1333, lng: 111.2167, level: 'county', parent: '运城', province: '山西省' },
  { name: '绛县', lat: 35.4833, lng: 111.5667, level: 'county', parent: '运城', province: '山西省' },
  { name: '临猗县', lat: 35.1333, lng: 110.7667, level: 'county', parent: '运城', province: '山西省' },
  { name: '芮城县', lat: 34.6833, lng: 110.6833, level: 'county', parent: '运城', province: '山西省' },
  { name: '万荣县', lat: 35.4167, lng: 110.8333, level: 'county', parent: '运城', province: '山西省' },
  { name: '新绛县', lat: 35.6167, lng: 111.2167, level: 'county', parent: '运城', province: '山西省' },
  { name: '垣曲县', lat: 35.3000, lng: 111.6667, level: 'county', parent: '运城', province: '山西省' },
  { name: '稷山县', lat: 35.6000, lng: 110.9667, level: 'county', parent: '运城', province: '山西省' },
  { name: '闻喜县', lat: 35.3500, lng: 111.2167, level: 'county', parent: '运城', province: '山西省' },
  { name: '平陆县', lat: 34.8333, lng: 111.2167, level: 'county', parent: '运城', province: '山西省' },
  
  // 忻州市
  { name: '代县', lat: 39.0667, lng: 112.9500, level: 'county', parent: '忻州', province: '山西省' },
  { name: '保德县', lat: 39.0167, lng: 111.0833, level: 'county', parent: '忻州', province: '山西省' },
  { name: '定襄县', lat: 38.4833, lng: 112.9500, level: 'county', parent: '忻州', province: '山西省' },
  { name: '五台县', lat: 38.7167, lng: 113.2500, level: 'county', parent: '忻州', province: '山西省' },
  { name: '河曲县', lat: 39.3833, lng: 111.1333, level: 'county', parent: '忻州', province: '山西省' },
  { name: '繁峙县', lat: 39.1833, lng: 113.2667, level: 'county', parent: '忻州', province: '山西省' },
  { name: '偏关县', lat: 39.4333, lng: 111.5000, level: 'county', parent: '忻州', province: '山西省' },
  { name: '宁武县', lat: 39.0000, lng: 112.3000, level: 'county', parent: '忻州', province: '山西省' },
  { name: '静乐县', lat: 38.3500, lng: 111.9333, level: 'county', parent: '忻州', province: '山西省' },
  { name: '神池县', lat: 39.0833, lng: 112.2000, level: 'county', parent: '忻州', province: '山西省' },
  { name: '五寨县', lat: 38.9167, lng: 111.8500, level: 'county', parent: '忻州', province: '山西省' },
  { name: '岢岚县', lat: 38.7000, lng: 111.5667, level: 'county', parent: '忻州', province: '山西省' },
  
  // 临汾市
  { name: '古县', lat: 36.2667, lng: 111.9167, level: 'county', parent: '临汾', province: '山西省' },
  { name: '蒲县', lat: 36.4167, lng: 111.0833, level: 'county', parent: '临汾', province: '山西省' },
  { name: '吉县', lat: 36.0833, lng: 110.6667, level: 'county', parent: '临汾', province: '山西省' },
  { name: '隰县', lat: 36.6833, lng: 110.9333, level: 'county', parent: '临汾', province: '山西省' },
  { name: '襄汾县', lat: 35.8667, lng: 111.4333, level: 'county', parent: '临汾', province: '山西省' },
  { name: '洪洞县', lat: 36.2500, lng: 111.6667, level: 'county', parent: '临汾', province: '山西省' },
  { name: '安泽县', lat: 36.1500, lng: 112.2500, level: 'county', parent: '临汾', province: '山西省' },
  { name: '曲沃县', lat: 35.6333, lng: 111.4667, level: 'county', parent: '临汾', province: '山西省' },
  { name: '浮山县', lat: 35.9667, lng: 111.8333, level: 'county', parent: '临汾', province: '山西省' },
  { name: '翼城县', lat: 35.7333, lng: 111.7167, level: 'county', parent: '临汾', province: '山西省' },
  { name: '乡宁县', lat: 35.9667, lng: 110.8333, level: 'county', parent: '临汾', province: '山西省' },
  { name: '汾西县', lat: 36.6500, lng: 111.5667, level: 'county', parent: '临汾', province: '山西省' },
  { name: '永和县', lat: 36.7667, lng: 110.6333, level: 'county', parent: '临汾', province: '山西省' },
  { name: '大宁县', lat: 36.4667, lng: 110.7500, level: 'county', parent: '临汾', province: '山西省' },
  
  // 吕梁市
  { name: '岚县', lat: 38.2833, lng: 111.6667, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '兴县', lat: 38.4667, lng: 111.1167, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '临县', lat: 37.9500, lng: 110.9833, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '交城县', lat: 37.5500, lng: 112.1500, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '文水县', lat: 37.4333, lng: 112.0167, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '方山县', lat: 37.8833, lng: 111.2333, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '交口县', lat: 36.9667, lng: 111.2000, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '柳林县', lat: 37.4333, lng: 110.8833, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '中阳县', lat: 37.3500, lng: 111.1833, level: 'county', parent: '吕梁', province: '山西省' },
  { name: '石楼县', lat: 36.9833, lng: 110.8333, level: 'county', parent: '吕梁', province: '山西省' },
  
  // 江苏省所有县（19个）
  { name: '丰县', lat: 34.7000, lng: 116.6000, level: 'county', parent: '徐州', province: '江苏省' },
  { name: '沛县', lat: 34.7167, lng: 116.9333, level: 'county', parent: '徐州', province: '江苏省' },
  { name: '睢宁县', lat: 33.9000, lng: 117.9500, level: 'county', parent: '徐州', province: '江苏省' },
  { name: '如东县', lat: 32.3167, lng: 121.1833, level: 'county', parent: '南通', province: '江苏省' },
  { name: '灌云县', lat: 34.3000, lng: 119.2500, level: 'county', parent: '连云港', province: '江苏省' },
  { name: '灌南县', lat: 34.0833, lng: 119.3500, level: 'county', parent: '连云港', province: '江苏省' },
  { name: '东海县', lat: 34.5167, lng: 118.7500, level: 'county', parent: '连云港', province: '江苏省' },
  { name: '涟水县', lat: 33.7833, lng: 119.2667, level: 'county', parent: '淮安', province: '江苏省' },
  { name: '金湖县', lat: 33.0167, lng: 119.0167, level: 'county', parent: '淮安', province: '江苏省' },
  { name: '盱眙县', lat: 33.0000, lng: 118.5000, level: 'county', parent: '淮安', province: '江苏省' },
  { name: '响水县', lat: 34.2000, lng: 119.5667, level: 'county', parent: '盐城', province: '江苏省' },
  { name: '滨海县', lat: 34.0000, lng: 119.8333, level: 'county', parent: '盐城', province: '江苏省' },
  { name: '阜宁县', lat: 33.7833, lng: 119.8000, level: 'county', parent: '盐城', province: '江苏省' },
  { name: '射阳县', lat: 33.7667, lng: 120.2500, level: 'county', parent: '盐城', province: '江苏省' },
  { name: '建湖县', lat: 33.4667, lng: 119.8000, level: 'county', parent: '盐城', province: '江苏省' },
  { name: '宝应县', lat: 33.2333, lng: 119.3167, level: 'county', parent: '扬州', province: '江苏省' },
  { name: '沭阳县', lat: 34.1167, lng: 118.7667, level: 'county', parent: '宿迁', province: '江苏省' },
  { name: '泗洪县', lat: 33.4500, lng: 118.2167, level: 'county', parent: '宿迁', province: '江苏省' },
  { name: '泗阳县', lat: 33.7167, lng: 118.6833, level: 'county', parent: '宿迁', province: '江苏省' },
  
  // 浙江省所有县（32个）
  { name: '桐庐县', lat: 29.8000, lng: 119.6833, level: 'county', parent: '杭州', province: '浙江省' },
  { name: '淳安县', lat: 29.6000, lng: 119.0333, level: 'county', parent: '杭州', province: '浙江省' },
  { name: '象山县', lat: 29.4767, lng: 121.8693, level: 'county', parent: '宁波', province: '浙江省' },
  { name: '宁海县', lat: 29.2878, lng: 121.4296, level: 'county', parent: '宁波', province: '浙江省' },
  { name: '苍南县', lat: 27.5174, lng: 120.4261, level: 'county', parent: '温州', province: '浙江省' },
  { name: '永嘉县', lat: 28.1534, lng: 120.6906, level: 'county', parent: '温州', province: '浙江省' },
  { name: '平阳县', lat: 27.6622, lng: 120.5658, level: 'county', parent: '温州', province: '浙江省' },
  { name: '泰顺县', lat: 27.5500, lng: 119.7167, level: 'county', parent: '温州', province: '浙江省' },
  { name: '文成县', lat: 27.7833, lng: 120.0833, level: 'county', parent: '温州', province: '浙江省' },
  { name: '新昌县', lat: 29.5000, lng: 120.9000, level: 'county', parent: '绍兴', province: '浙江省' },
  { name: '德清县', lat: 30.5333, lng: 119.9667, level: 'county', parent: '湖州', province: '浙江省' },
  { name: '安吉县', lat: 30.6333, lng: 119.6833, level: 'county', parent: '湖州', province: '浙江省' },
  { name: '长兴县', lat: 30.9333, lng: 119.9000, level: 'county', parent: '湖州', province: '浙江省' },
  { name: '海盐县', lat: 30.5167, lng: 120.9500, level: 'county', parent: '嘉兴', province: '浙江省' },
  { name: '嘉善县', lat: 30.8333, lng: 120.9167, level: 'county', parent: '嘉兴', province: '浙江省' },
  { name: '浦江县', lat: 29.4500, lng: 119.8833, level: 'county', parent: '金华', province: '浙江省' },
  { name: '武义县', lat: 28.9000, lng: 119.8167, level: 'county', parent: '金华', province: '浙江省' },
  { name: '磐安县', lat: 29.0500, lng: 120.4333, level: 'county', parent: '金华', province: '浙江省' },
  { name: '常山县', lat: 28.9000, lng: 118.5000, level: 'county', parent: '衢州', province: '浙江省' },
  { name: '开化县', lat: 29.1333, lng: 118.4167, level: 'county', parent: '衢州', province: '浙江省' },
  { name: '龙游县', lat: 29.0167, lng: 119.1667, level: 'county', parent: '衢州', province: '浙江省' },
  { name: '天台县', lat: 29.1333, lng: 121.0333, level: 'county', parent: '台州', province: '浙江省' },
  { name: '三门县', lat: 29.1167, lng: 121.3833, level: 'county', parent: '台州', province: '浙江省' },
  { name: '仙居县', lat: 28.8500, lng: 120.7333, level: 'county', parent: '台州', province: '浙江省' },
  { name: '缙云县', lat: 28.6500, lng: 120.0833, level: 'county', parent: '丽水', province: '浙江省' },
  { name: '青田县', lat: 28.1333, lng: 120.2833, level: 'county', parent: '丽水', province: '浙江省' },
  { name: '遂昌县', lat: 28.6000, lng: 119.2667, level: 'county', parent: '丽水', province: '浙江省' },
  { name: '松阳县', lat: 28.4500, lng: 119.4833, level: 'county', parent: '丽水', province: '浙江省' },
  { name: '庆元县', lat: 27.6167, lng: 119.0667, level: 'county', parent: '丽水', province: '浙江省' },
  { name: '云和县', lat: 28.1167, lng: 119.5667, level: 'county', parent: '丽水', province: '浙江省' },
  { name: '岱山县', lat: 30.2500, lng: 122.2000, level: 'county', parent: '舟山', province: '浙江省' },
  { name: '嵊泗县', lat: 30.7167, lng: 122.4500, level: 'county', parent: '舟山', province: '浙江省' },
  
  // 安徽省所有县（50个）
  // 合肥市
  { name: '肥西县', lat: 31.7000, lng: 117.1667, level: 'county', parent: '合肥', province: '安徽省' },
  { name: '肥东县', lat: 31.8833, lng: 117.4667, level: 'county', parent: '合肥', province: '安徽省' },
  { name: '长丰县', lat: 32.4833, lng: 117.2000, level: 'county', parent: '合肥', province: '安徽省' },
  { name: '庐江县', lat: 31.2500, lng: 117.2833, level: 'county', parent: '合肥', province: '安徽省' },
  
  // 芜湖市
  { name: '南陵县', lat: 30.9167, lng: 118.3333, level: 'county', parent: '芜湖', province: '安徽省' },
  
  // 蚌埠市
  { name: '五河县', lat: 33.1500, lng: 117.8833, level: 'county', parent: '蚌埠', province: '安徽省' },
  { name: '固镇县', lat: 33.3167, lng: 117.3167, level: 'county', parent: '蚌埠', province: '安徽省' },
  { name: '怀远县', lat: 32.9500, lng: 117.2000, level: 'county', parent: '蚌埠', province: '安徽省' },
  
  // 淮南市
  { name: '凤台县', lat: 32.7000, lng: 116.7167, level: 'county', parent: '淮南', province: '安徽省' },
  { name: '寿县', lat: 32.5500, lng: 116.7833, level: 'county', parent: '淮南', province: '安徽省' },
  
  // 马鞍山市
  { name: '含山县', lat: 31.7167, lng: 118.1000, level: 'county', parent: '马鞍山', province: '安徽省' },
  { name: '和县', lat: 31.7167, lng: 118.3500, level: 'county', parent: '马鞍山', province: '安徽省' },
  { name: '当涂县', lat: 31.5500, lng: 118.4833, level: 'county', parent: '马鞍山', province: '安徽省' },
  
  // 淮北市
  { name: '濉溪县', lat: 33.9167, lng: 116.7667, level: 'county', parent: '淮北', province: '安徽省' },
  
  // 铜陵市
  { name: '枞阳县', lat: 30.7000, lng: 117.2167, level: 'county', parent: '铜陵', province: '安徽省' },
  
  // 安庆市
  { name: '怀宁县', lat: 30.7333, lng: 116.8333, level: 'county', parent: '安庆', province: '安徽省' },
  { name: '岳西县', lat: 30.8500, lng: 116.3500, level: 'county', parent: '安庆', province: '安徽省' },
  { name: '太湖县', lat: 30.4333, lng: 116.2667, level: 'county', parent: '安庆', province: '安徽省' },
  { name: '宿松县', lat: 30.1500, lng: 116.1167, level: 'county', parent: '安庆', province: '安徽省' },
  { name: '望江县', lat: 30.1167, lng: 116.6833, level: 'county', parent: '安庆', province: '安徽省' },
  
  // 黄山市
  { name: '歙县', lat: 29.8667, lng: 118.4333, level: 'county', parent: '黄山', province: '安徽省' },
  { name: '休宁县', lat: 29.7833, lng: 118.1833, level: 'county', parent: '黄山', province: '安徽省' },
  { name: '黟县', lat: 29.9167, lng: 117.9333, level: 'county', parent: '黄山', province: '安徽省' },
  { name: '祁门县', lat: 29.8500, lng: 117.7167, level: 'county', parent: '黄山', province: '安徽省' },
  
  // 滁州市
  { name: '全椒县', lat: 32.1000, lng: 118.2667, level: 'county', parent: '滁州', province: '安徽省' },
  { name: '来安县', lat: 32.4500, lng: 118.4333, level: 'county', parent: '滁州', province: '安徽省' },
  { name: '定远县', lat: 32.5333, lng: 117.6833, level: 'county', parent: '滁州', province: '安徽省' },
  { name: '凤阳县', lat: 32.8667, lng: 117.5667, level: 'county', parent: '滁州', province: '安徽省' },
  
  // 阜阳市
  { name: '颍上县', lat: 32.6500, lng: 116.2667, level: 'county', parent: '阜阳', province: '安徽省' },
  { name: '临泉县', lat: 33.0667, lng: 115.2667, level: 'county', parent: '阜阳', province: '安徽省' },
  { name: '阜南县', lat: 32.6333, lng: 115.5833, level: 'county', parent: '阜阳', province: '安徽省' },
  { name: '太和县', lat: 33.1667, lng: 115.6167, level: 'county', parent: '阜阳', province: '安徽省' },
  
  // 宿州市
  { name: '萧县', lat: 34.1833, lng: 116.9333, level: 'county', parent: '宿州', province: '安徽省' },
  { name: '砀山县', lat: 34.4167, lng: 116.3333, level: 'county', parent: '宿州', province: '安徽省' },
  { name: '灵璧县', lat: 33.5500, lng: 117.5500, level: 'county', parent: '宿州', province: '安徽省' },
  { name: '泗县', lat: 33.4833, lng: 117.8833, level: 'county', parent: '宿州', province: '安徽省' },
  
  // 六安市
  { name: '霍邱县', lat: 32.3500, lng: 116.2667, level: 'county', parent: '六安', province: '安徽省' },
  { name: '霍山县', lat: 31.4000, lng: 116.3333, level: 'county', parent: '六安', province: '安徽省' },
  { name: '金寨县', lat: 31.7167, lng: 115.8667, level: 'county', parent: '六安', province: '安徽省' },
  { name: '舒城县', lat: 31.4667, lng: 116.9500, level: 'county', parent: '六安', province: '安徽省' },
  
  // 亳州市
  { name: '蒙城县', lat: 33.2667, lng: 116.5500, level: 'county', parent: '亳州', province: '安徽省' },
  { name: '涡阳县', lat: 33.5167, lng: 116.2167, level: 'county', parent: '亳州', province: '安徽省' },
  { name: '利辛县', lat: 33.1500, lng: 116.2000, level: 'county', parent: '亳州', province: '安徽省' },
  
  // 池州市
  { name: '东至县', lat: 30.1000, lng: 117.0167, level: 'county', parent: '池州', province: '安徽省' },
  { name: '石台县', lat: 30.2167, lng: 117.4833, level: 'county', parent: '池州', province: '安徽省' },
  { name: '青阳县', lat: 30.6500, lng: 117.8500, level: 'county', parent: '池州', province: '安徽省' },
  
  // 宣城市
  { name: '郎溪县', lat: 31.1333, lng: 119.1833, level: 'county', parent: '宣城', province: '安徽省' },
  { name: '泾县', lat: 30.6833, lng: 118.4000, level: 'county', parent: '宣城', province: '安徽省' },
  { name: '绩溪县', lat: 30.0667, lng: 118.5667, level: 'county', parent: '宣城', province: '安徽省' },
  { name: '旌德县', lat: 30.2833, lng: 118.5333, level: 'county', parent: '宣城', province: '安徽省' },
  
  // 福建省所有县（44个）
  // 福州市
  { name: '闽侯县', lat: 26.1500, lng: 119.1333, level: 'county', parent: '福州', province: '福建省' },
  { name: '连江县', lat: 26.2000, lng: 119.5333, level: 'county', parent: '福州', province: '福建省' },
  { name: '罗源县', lat: 26.4833, lng: 119.5500, level: 'county', parent: '福州', province: '福建省' },
  { name: '闽清县', lat: 26.2167, lng: 118.8667, level: 'county', parent: '福州', province: '福建省' },
  { name: '永泰县', lat: 25.8667, lng: 118.9333, level: 'county', parent: '福州', province: '福建省' },
  { name: '平潭县', lat: 25.5167, lng: 119.7833, level: 'county', parent: '福州', province: '福建省' },
  
  // 厦门市
  { name: '同安区', lat: 24.7333, lng: 118.1500, level: 'county', parent: '厦门', province: '福建省' },
  
  // 莆田市
  { name: '仙游县', lat: 25.3667, lng: 118.6833, level: 'county', parent: '莆田', province: '福建省' },
  
  // 三明市
  { name: '沙县', lat: 26.4000, lng: 117.7833, level: 'county', parent: '三明', province: '福建省' },
  { name: '清流县', lat: 26.1667, lng: 116.8167, level: 'county', parent: '三明', province: '福建省' },
  { name: '宁化县', lat: 26.2667, lng: 116.6500, level: 'county', parent: '三明', province: '福建省' },
  { name: '大田县', lat: 25.6833, lng: 117.8333, level: 'county', parent: '三明', province: '福建省' },
  { name: '尤溪县', lat: 26.1667, lng: 118.1833, level: 'county', parent: '三明', province: '福建省' },
  { name: '明溪县', lat: 26.3500, lng: 117.2000, level: 'county', parent: '三明', province: '福建省' },
  { name: '建宁县', lat: 26.8333, lng: 116.8333, level: 'county', parent: '三明', province: '福建省' },
  { name: '将乐县', lat: 26.7333, lng: 117.4667, level: 'county', parent: '三明', province: '福建省' },
  { name: '泰宁县', lat: 26.9000, lng: 117.1667, level: 'county', parent: '三明', province: '福建省' },
  
  // 泉州市
  { name: '惠安县', lat: 25.0333, lng: 118.8000, level: 'county', parent: '泉州', province: '福建省' },
  { name: '安溪县', lat: 25.0667, lng: 118.1833, level: 'county', parent: '泉州', province: '福建省' },
  { name: '永春县', lat: 25.3167, lng: 118.3000, level: 'county', parent: '泉州', province: '福建省' },
  { name: '德化县', lat: 25.4833, lng: 118.2333, level: 'county', parent: '泉州', province: '福建省' },
  { name: '金门县', lat: 24.4333, lng: 118.3167, level: 'county', parent: '泉州', province: '福建省' },
  
  // 漳州市
  { name: '云霄县', lat: 23.9500, lng: 117.3333, level: 'county', parent: '漳州', province: '福建省' },
  { name: '漳浦县', lat: 24.1167, lng: 117.6167, level: 'county', parent: '漳州', province: '福建省' },
  { name: '诏安县', lat: 23.7167, lng: 117.1667, level: 'county', parent: '漳州', province: '福建省' },
  { name: '长泰县', lat: 24.6167, lng: 117.7500, level: 'county', parent: '漳州', province: '福建省' },
  { name: '东山县', lat: 23.7000, lng: 117.4000, level: 'county', parent: '漳州', province: '福建省' },
  { name: '华安县', lat: 25.0000, lng: 117.5333, level: 'county', parent: '漳州', province: '福建省' },
  { name: '南靖县', lat: 24.5167, lng: 117.3500, level: 'county', parent: '漳州', province: '福建省' },
  { name: '平和县', lat: 24.3667, lng: 117.3000, level: 'county', parent: '漳州', province: '福建省' },
  
  // 南平市
  { name: '顺昌县', lat: 26.8000, lng: 117.8000, level: 'county', parent: '南平', province: '福建省' },
  { name: '浦城县', lat: 27.9167, lng: 118.5333, level: 'county', parent: '南平', province: '福建省' },
  { name: '光泽县', lat: 27.5333, lng: 117.3333, level: 'county', parent: '南平', province: '福建省' },
  { name: '松溪县', lat: 27.5167, lng: 118.7833, level: 'county', parent: '南平', province: '福建省' },
  { name: '政和县', lat: 27.3667, lng: 118.8500, level: 'county', parent: '南平', province: '福建省' },
  
  // 龙岩市
  { name: '长汀县', lat: 25.8333, lng: 116.3500, level: 'county', parent: '龙岩', province: '福建省' },
  { name: '上杭县', lat: 25.0500, lng: 116.4167, level: 'county', parent: '龙岩', province: '福建省' },
  { name: '武平县', lat: 25.1000, lng: 116.1000, level: 'county', parent: '龙岩', province: '福建省' },
  { name: '连城县', lat: 25.7167, lng: 116.7500, level: 'county', parent: '龙岩', province: '福建省' },
  
  // 宁德市
  { name: '霞浦县', lat: 26.8833, lng: 120.0000, level: 'county', parent: '宁德', province: '福建省' },
  { name: '古田县', lat: 26.5833, lng: 118.7333, level: 'county', parent: '宁德', province: '福建省' },
  { name: '屏南县', lat: 26.9167, lng: 118.9833, level: 'county', parent: '宁德', province: '福建省' },
  { name: '寿宁县', lat: 27.4667, lng: 119.5000, level: 'county', parent: '宁德', province: '福建省' },
  { name: '周宁县', lat: 27.1000, lng: 119.3333, level: 'county', parent: '宁德', province: '福建省' },
  { name: '柘荣县', lat: 27.2333, lng: 119.9000, level: 'county', parent: '宁德', province: '福建省' },
  
  // 江西省所有县（61个）
  // 南昌市
  { name: '南昌县', lat: 28.5500, lng: 115.9333, level: 'county', parent: '南昌', province: '江西省' },
  { name: '安义县', lat: 28.8500, lng: 115.5500, level: 'county', parent: '南昌', province: '江西省' },
  { name: '进贤县', lat: 28.3667, lng: 116.2667, level: 'county', parent: '南昌', province: '江西省' },
  
  // 九江市
  { name: '永修县', lat: 29.0333, lng: 115.8000, level: 'county', parent: '九江', province: '江西省' },
  { name: '德安县', lat: 29.3167, lng: 115.7500, level: 'county', parent: '九江', province: '江西省' },
  { name: '都昌县', lat: 29.2667, lng: 116.1833, level: 'county', parent: '九江', province: '江西省' },
  { name: '湖口县', lat: 29.7333, lng: 116.2167, level: 'county', parent: '九江', province: '江西省' },
  { name: '彭泽县', lat: 29.9000, lng: 116.5500, level: 'county', parent: '九江', province: '江西省' },
  { name: '修水县', lat: 29.0167, lng: 114.5667, level: 'county', parent: '九江', province: '江西省' },
  { name: '武宁县', lat: 29.2667, lng: 115.1000, level: 'county', parent: '九江', province: '江西省' },
  
  // 上饶市
  { name: '婺源县', lat: 29.2500, lng: 117.8500, level: 'county', parent: '上饶', province: '江西省' },
  { name: '玉山县', lat: 28.6833, lng: 118.2500, level: 'county', parent: '上饶', province: '江西省' },
  { name: '铅山县', lat: 28.3167, lng: 117.7167, level: 'county', parent: '上饶', province: '江西省' },
  { name: '横峰县', lat: 28.4167, lng: 117.6000, level: 'county', parent: '上饶', province: '江西省' },
  { name: '弋阳县', lat: 28.4000, lng: 117.4333, level: 'county', parent: '上饶', province: '江西省' },
  { name: '万年县', lat: 28.7000, lng: 117.0667, level: 'county', parent: '上饶', province: '江西省' },
  { name: '余干县', lat: 28.7000, lng: 116.6833, level: 'county', parent: '上饶', province: '江西省' },
  { name: '鄱阳县', lat: 29.0000, lng: 116.6667, level: 'county', parent: '上饶', province: '江西省' },
  
  // 抚州市
  { name: '南城县', lat: 27.5667, lng: 116.6333, level: 'county', parent: '抚州', province: '江西省' },
  { name: '黎川县', lat: 27.2833, lng: 116.9167, level: 'county', parent: '抚州', province: '江西省' },
  { name: '南丰县', lat: 27.2167, lng: 116.5167, level: 'county', parent: '抚州', province: '江西省' },
  { name: '崇仁县', lat: 27.7500, lng: 116.0500, level: 'county', parent: '抚州', province: '江西省' },
  { name: '乐安县', lat: 27.4333, lng: 115.8333, level: 'county', parent: '抚州', province: '江西省' },
  { name: '广昌县', lat: 26.8333, lng: 116.3167, level: 'county', parent: '抚州', province: '江西省' },
  { name: '宜黄县', lat: 27.5500, lng: 116.2000, level: 'county', parent: '抚州', province: '江西省' },
  { name: '金溪县', lat: 27.9167, lng: 116.7500, level: 'county', parent: '抚州', province: '江西省' },
  { name: '资溪县', lat: 27.7000, lng: 117.0667, level: 'county', parent: '抚州', province: '江西省' },
  
  // 宜春市
  { name: '奉新县', lat: 28.7000, lng: 115.3833, level: 'county', parent: '宜春', province: '江西省' },
  { name: '万载县', lat: 28.1000, lng: 114.4333, level: 'county', parent: '宜春', province: '江西省' },
  { name: '上高县', lat: 28.2333, lng: 114.9167, level: 'county', parent: '宜春', province: '江西省' },
  { name: '宜丰县', lat: 28.3833, lng: 114.7833, level: 'county', parent: '宜春', province: '江西省' },
  { name: '靖安县', lat: 28.8667, lng: 115.3667, level: 'county', parent: '宜春', province: '江西省' },
  { name: '铜鼓县', lat: 28.5167, lng: 114.3667, level: 'county', parent: '宜春', province: '江西省' },
  
  // 吉安市
  { name: '吉安县', lat: 27.0333, lng: 114.9000, level: 'county', parent: '吉安', province: '江西省' },
  { name: '吉水县', lat: 27.2167, lng: 115.1333, level: 'county', parent: '吉安', province: '江西省' },
  { name: '新干县', lat: 27.7667, lng: 115.4000, level: 'county', parent: '吉安', province: '江西省' },
  { name: '永丰县', lat: 27.3167, lng: 115.4167, level: 'county', parent: '吉安', province: '江西省' },
  { name: '泰和县', lat: 26.8000, lng: 114.8833, level: 'county', parent: '吉安', province: '江西省' },
  { name: '峡江县', lat: 27.5833, lng: 115.3167, level: 'county', parent: '吉安', province: '江西省' },
  { name: '遂川县', lat: 26.3167, lng: 114.5167, level: 'county', parent: '吉安', province: '江西省' },
  { name: '万安县', lat: 26.4667, lng: 114.7833, level: 'county', parent: '吉安', province: '江西省' },
  { name: '安福县', lat: 27.3833, lng: 114.6167, level: 'county', parent: '吉安', province: '江西省' },
  { name: '永新县', lat: 26.9500, lng: 114.2333, level: 'county', parent: '吉安', province: '江西省' },
  
  // 赣州市
  { name: '信丰县', lat: 25.3833, lng: 114.9167, level: 'county', parent: '赣州', province: '江西省' },
  { name: '大余县', lat: 25.4000, lng: 114.3500, level: 'county', parent: '赣州', province: '江西省' },
  { name: '定南县', lat: 24.7833, lng: 115.0167, level: 'county', parent: '赣州', province: '江西省' },
  { name: '全南县', lat: 24.7500, lng: 114.5333, level: 'county', parent: '赣州', province: '江西省' },
  { name: '崇义县', lat: 25.6833, lng: 114.3000, level: 'county', parent: '赣州', province: '江西省' },
  { name: '寻乌县', lat: 24.9500, lng: 115.6500, level: 'county', parent: '赣州', province: '江西省' },
  { name: '安远县', lat: 25.1333, lng: 115.3833, level: 'county', parent: '赣州', province: '江西省' },
  { name: '宁都县', lat: 26.4667, lng: 116.0167, level: 'county', parent: '赣州', province: '江西省' },
  { name: '于都县', lat: 25.9500, lng: 115.3833, level: 'county', parent: '赣州', province: '江西省' },
  { name: '会昌县', lat: 25.6000, lng: 115.7833, level: 'county', parent: '赣州', province: '江西省' },
  { name: '兴国县', lat: 26.3333, lng: 115.3500, level: 'county', parent: '赣州', province: '江西省' },
  { name: '石城县', lat: 26.3333, lng: 116.3333, level: 'county', parent: '赣州', province: '江西省' },
  { name: '上犹县', lat: 25.8000, lng: 114.5333, level: 'county', parent: '赣州', province: '江西省' },
  
  // 萍乡市
  { name: '莲花县', lat: 27.1167, lng: 113.9500, level: 'county', parent: '萍乡', province: '江西省' },
  { name: '上栗县', lat: 27.8833, lng: 113.8000, level: 'county', parent: '萍乡', province: '江西省' },
  { name: '芦溪县', lat: 27.6333, lng: 114.0333, level: 'county', parent: '萍乡', province: '江西省' },
  
  // 景德镇市
  { name: '浮梁县', lat: 29.3500, lng: 117.2167, level: 'county', parent: '景德镇', province: '江西省' },
  
  // 新余市
  { name: '分宜县', lat: 27.8167, lng: 114.6833, level: 'county', parent: '新余', province: '江西省' },
  
  // 山东省所有县（52个）
  // 济南市
  { name: '平阴县', lat: 36.2833, lng: 116.4500, level: 'county', parent: '济南', province: '山东省' },
  { name: '商河县', lat: 37.3167, lng: 117.1500, level: 'county', parent: '济南', province: '山东省' },
  
  // 淄博市
  { name: '桓台县', lat: 36.9500, lng: 118.1000, level: 'county', parent: '淄博', province: '山东省' },
  { name: '高青县', lat: 37.1667, lng: 117.8167, level: 'county', parent: '淄博', province: '山东省' },
  { name: '沂源县', lat: 36.1833, lng: 118.1667, level: 'county', parent: '淄博', province: '山东省' },
  
  // 东营市
  { name: '广饶县', lat: 37.0500, lng: 118.4000, level: 'county', parent: '东营', province: '山东省' },
  { name: '利津县', lat: 37.4833, lng: 118.2500, level: 'county', parent: '东营', province: '山东省' },
  
  // 潍坊市
  { name: '临朐县', lat: 36.5167, lng: 118.5333, level: 'county', parent: '潍坊', province: '山东省' },
  { name: '昌乐县', lat: 36.7000, lng: 118.8333, level: 'county', parent: '潍坊', province: '山东省' },
  
  // 济宁市
  { name: '嘉祥县', lat: 35.4000, lng: 116.3333, level: 'county', parent: '济宁', province: '山东省' },
  { name: '汶上县', lat: 35.7167, lng: 116.4833, level: 'county', parent: '济宁', province: '山东省' },
  { name: '梁山县', lat: 35.8000, lng: 116.0833, level: 'county', parent: '济宁', province: '山东省' },
  { name: '微山县', lat: 34.8000, lng: 117.1333, level: 'county', parent: '济宁', province: '山东省' },
  { name: '鱼台县', lat: 35.0000, lng: 116.6500, level: 'county', parent: '济宁', province: '山东省' },
  { name: '金乡县', lat: 35.0667, lng: 116.3167, level: 'county', parent: '济宁', province: '山东省' },
  { name: '泗水县', lat: 35.6500, lng: 117.2667, level: 'county', parent: '济宁', province: '山东省' },
  { name: '宁阳县', lat: 35.7667, lng: 116.8000, level: 'county', parent: '济宁', province: '山东省' },
  { name: '东平县', lat: 35.9167, lng: 116.4667, level: 'county', parent: '济宁', province: '山东省' },
  
  // 泰安市
  { name: '五莲县', lat: 35.7500, lng: 119.2000, level: 'county', parent: '泰安', province: '山东省' },
  { name: '莒县', lat: 35.5833, lng: 118.8333, level: 'county', parent: '泰安', province: '山东省' },
  
  // 滨州市
  { name: '惠民县', lat: 37.4833, lng: 117.5000, level: 'county', parent: '滨州', province: '山东省' },
  { name: '阳信县', lat: 37.6333, lng: 117.5833, level: 'county', parent: '滨州', province: '山东省' },
  { name: '无棣县', lat: 37.7333, lng: 117.6167, level: 'county', parent: '滨州', province: '山东省' },
  { name: '博兴县', lat: 37.1333, lng: 118.1333, level: 'county', parent: '滨州', province: '山东省' },
  
  // 德州市
  { name: '临邑县', lat: 37.2000, lng: 116.8667, level: 'county', parent: '德州', province: '山东省' },
  { name: '平原县', lat: 37.1667, lng: 116.4333, level: 'county', parent: '德州', province: '山东省' },
  { name: '夏津县', lat: 36.9500, lng: 116.0000, level: 'county', parent: '德州', province: '山东省' },
  { name: '武城县', lat: 37.2000, lng: 116.0667, level: 'county', parent: '德州', province: '山东省' },
  { name: '庆云县', lat: 37.7833, lng: 117.3833, level: 'county', parent: '德州', province: '山东省' },
  { name: '宁津县', lat: 37.6500, lng: 116.8000, level: 'county', parent: '德州', province: '山东省' },
  { name: '齐河县', lat: 36.7833, lng: 116.7500, level: 'county', parent: '德州', province: '山东省' },
  
  // 聊城市
  { name: '阳谷县', lat: 36.1167, lng: 115.7833, level: 'county', parent: '聊城', province: '山东省' },
  { name: '东阿县', lat: 36.3333, lng: 116.2500, level: 'county', parent: '聊城', province: '山东省' },
  { name: '高唐县', lat: 36.8667, lng: 116.2333, level: 'county', parent: '聊城', province: '山东省' },
  { name: '冠县', lat: 36.4833, lng: 115.4333, level: 'county', parent: '聊城', province: '山东省' },
  { name: '莘县', lat: 36.2333, lng: 115.6667, level: 'county', parent: '聊城', province: '山东省' },
  
  // 临沂市
  { name: '兰陵县', lat: 34.8500, lng: 117.8500, level: 'county', parent: '临沂', province: '山东省' },
  { name: '郯城县', lat: 34.6167, lng: 118.3500, level: 'county', parent: '临沂', province: '山东省' },
  { name: '莒南县', lat: 35.1833, lng: 118.8333, level: 'county', parent: '临沂', province: '山东省' },
  { name: '沂水县', lat: 35.7833, lng: 118.6167, level: 'county', parent: '临沂', province: '山东省' },
  { name: '蒙阴县', lat: 35.7000, lng: 117.9333, level: 'county', parent: '临沂', province: '山东省' },
  { name: '平邑县', lat: 35.5000, lng: 117.6333, level: 'county', parent: '临沂', province: '山东省' },
  { name: '沂南县', lat: 35.5500, lng: 118.4667, level: 'county', parent: '临沂', province: '山东省' },
  { name: '临沭县', lat: 34.9167, lng: 118.6500, level: 'county', parent: '临沂', province: '山东省' },
  { name: '费县', lat: 35.2667, lng: 117.9667, level: 'county', parent: '临沂', province: '山东省' },
  
  // 菏泽市
  { name: '曹县', lat: 34.8167, lng: 115.5333, level: 'county', parent: '菏泽', province: '山东省' },
  { name: '单县', lat: 34.7833, lng: 116.0833, level: 'county', parent: '菏泽', province: '山东省' },
  { name: '巨野县', lat: 35.3833, lng: 116.0833, level: 'county', parent: '菏泽', province: '山东省' },
  { name: '成武县', lat: 34.9500, lng: 115.8833, level: 'county', parent: '菏泽', province: '山东省' },
  { name: '郓城县', lat: 35.6000, lng: 115.9333, level: 'county', parent: '菏泽', province: '山东省' },
  { name: '鄄城县', lat: 35.5667, lng: 115.5000, level: 'county', parent: '菏泽', province: '山东省' },
  { name: '东明县', lat: 35.2833, lng: 115.0833, level: 'county', parent: '菏泽', province: '山东省' },
  
  // 河南省所有县（83个）
  // 郑州市
  { name: '中牟县', lat: 34.7167, lng: 114.0167, level: 'county', parent: '郑州', province: '河南省' },
  { name: '兰考县', lat: 34.8167, lng: 114.8167, level: 'county', parent: '郑州', province: '河南省' },
  { name: '尉氏县', lat: 34.4167, lng: 114.1833, level: 'county', parent: '郑州', province: '河南省' },
  { name: '通许县', lat: 34.4833, lng: 114.4667, level: 'county', parent: '郑州', province: '河南省' },
  { name: '杞县', lat: 34.5500, lng: 114.7667, level: 'county', parent: '郑州', province: '河南省' },
  
  // 洛阳市
  { name: '嵩县', lat: 34.1333, lng: 112.0833, level: 'county', parent: '洛阳', province: '河南省' },
  { name: '新安县', lat: 34.7167, lng: 112.1333, level: 'county', parent: '洛阳', province: '河南省' },
  { name: '洛宁县', lat: 34.3833, lng: 111.6500, level: 'county', parent: '洛阳', province: '河南省' },
  { name: '宜阳县', lat: 34.5167, lng: 112.1667, level: 'county', parent: '洛阳', province: '河南省' },
  { name: '栾川县', lat: 33.7833, lng: 111.6167, level: 'county', parent: '洛阳', province: '河南省' },
  { name: '孟津县', lat: 34.8167, lng: 112.4333, level: 'county', parent: '洛阳', province: '河南省' },
  { name: '伊川县', lat: 34.4167, lng: 112.4167, level: 'county', parent: '洛阳', province: '河南省' },
  { name: '汝阳县', lat: 34.1500, lng: 112.4667, level: 'county', parent: '洛阳', province: '河南省' },
  
  // 平顶山市
  { name: '鲁山县', lat: 33.7333, lng: 112.9000, level: 'county', parent: '平顶山', province: '河南省' },
  { name: '宝丰县', lat: 33.8667, lng: 113.0500, level: 'county', parent: '平顶山', province: '河南省' },
  { name: '叶县', lat: 33.6167, lng: 113.3500, level: 'county', parent: '平顶山', province: '河南省' },
  { name: '郏县', lat: 33.9833, lng: 113.2167, level: 'county', parent: '平顶山', province: '河南省' },
  
  // 安阳市
  { name: '安阳县', lat: 36.1000, lng: 114.3500, level: 'county', parent: '安阳', province: '河南省' },
  { name: '汤阴县', lat: 35.9167, lng: 114.3500, level: 'county', parent: '安阳', province: '河南省' },
  { name: '内黄县', lat: 35.9500, lng: 114.9000, level: 'county', parent: '安阳', province: '河南省' },
  { name: '滑县', lat: 35.5667, lng: 114.5167, level: 'county', parent: '安阳', province: '河南省' },
  { name: '浚县', lat: 35.6667, lng: 114.5500, level: 'county', parent: '安阳', province: '河南省' },
  { name: '淇县', lat: 35.6000, lng: 114.2000, level: 'county', parent: '安阳', province: '河南省' },
  
  // 鹤壁市
  { name: '新乡县', lat: 35.2000, lng: 113.8000, level: 'county', parent: '鹤壁', province: '河南省' },
  { name: '获嘉县', lat: 35.2667, lng: 113.6500, level: 'county', parent: '鹤壁', province: '河南省' },
  { name: '原阳县', lat: 35.0500, lng: 113.9667, level: 'county', parent: '鹤壁', province: '河南省' },
  { name: '延津县', lat: 35.1333, lng: 114.2000, level: 'county', parent: '鹤壁', province: '河南省' },
  { name: '封丘县', lat: 35.0333, lng: 114.4167, level: 'county', parent: '鹤壁', province: '河南省' },
  
  // 新乡市
  { name: '修武县', lat: 35.2167, lng: 113.4333, level: 'county', parent: '新乡', province: '河南省' },
  { name: '博爱县', lat: 35.1667, lng: 113.0667, level: 'county', parent: '新乡', province: '河南省' },
  { name: '武陟县', lat: 35.1000, lng: 113.4000, level: 'county', parent: '新乡', province: '河南省' },
  { name: '温县', lat: 34.9333, lng: 113.0667, level: 'county', parent: '新乡', province: '河南省' },
  
  // 焦作市
  { name: '清丰县', lat: 35.9000, lng: 115.1000, level: 'county', parent: '焦作', province: '河南省' },
  { name: '濮阳县', lat: 35.7000, lng: 115.0167, level: 'county', parent: '焦作', province: '河南省' },
  { name: '南乐县', lat: 36.0833, lng: 115.2000, level: 'county', parent: '焦作', province: '河南省' },
  { name: '台前县', lat: 35.8667, lng: 115.8500, level: 'county', parent: '焦作', province: '河南省' },
  { name: '范县', lat: 35.9000, lng: 115.5000, level: 'county', parent: '焦作', province: '河南省' },
  
  // 濮阳市
  { name: '鄢陵县', lat: 34.1000, lng: 114.1833, level: 'county', parent: '濮阳', province: '河南省' },
  { name: '襄城县', lat: 33.8500, lng: 113.5000, level: 'county', parent: '濮阳', province: '河南省' },
  
  // 许昌市
  { name: '舞阳县', lat: 33.4333, lng: 113.6000, level: 'county', parent: '许昌', province: '河南省' },
  { name: '临颍县', lat: 33.8167, lng: 113.9333, level: 'county', parent: '许昌', province: '河南省' },
  
  // 漯河市
  { name: '渑池县', lat: 34.7667, lng: 111.7667, level: 'county', parent: '漯河', province: '河南省' },
  { name: '卢氏县', lat: 34.0500, lng: 111.0333, level: 'county', parent: '漯河', province: '河南省' },
  
  // 三门峡市
  { name: '睢县', lat: 34.4500, lng: 115.0667, level: 'county', parent: '三门峡', province: '河南省' },
  { name: '宁陵县', lat: 34.4500, lng: 115.3167, level: 'county', parent: '三门峡', province: '河南省' },
  { name: '柘城县', lat: 34.0667, lng: 115.3000, level: 'county', parent: '三门峡', province: '河南省' },
  { name: '虞城县', lat: 34.4000, lng: 115.8500, level: 'county', parent: '三门峡', province: '河南省' },
  { name: '夏邑县', lat: 34.2333, lng: 116.1333, level: 'county', parent: '三门峡', province: '河南省' },
  { name: '民权县', lat: 34.6500, lng: 115.1333, level: 'county', parent: '三门峡', province: '河南省' },
  
  // 商丘市
  { name: '扶沟县', lat: 34.0667, lng: 114.3833, level: 'county', parent: '商丘', province: '河南省' },
  { name: '西华县', lat: 33.7833, lng: 114.5167, level: 'county', parent: '商丘', province: '河南省' },
  { name: '商水县', lat: 33.5333, lng: 114.6000, level: 'county', parent: '商丘', province: '河南省' },
  { name: '沈丘县', lat: 33.4000, lng: 115.0667, level: 'county', parent: '商丘', province: '河南省' },
  { name: '鹿邑县', lat: 33.8667, lng: 115.4833, level: 'county', parent: '商丘', province: '河南省' },
  { name: '太康县', lat: 34.0667, lng: 114.8500, level: 'county', parent: '商丘', province: '河南省' },
  { name: '郸城县', lat: 33.6333, lng: 115.1833, level: 'county', parent: '商丘', province: '河南省' },
  
  // 周口市
  { name: '西平县', lat: 33.3833, lng: 114.0167, level: 'county', parent: '周口', province: '河南省' },
  { name: '上蔡县', lat: 33.2667, lng: 114.2667, level: 'county', parent: '周口', province: '河南省' },
  { name: '新蔡县', lat: 32.7500, lng: 114.9667, level: 'county', parent: '周口', province: '河南省' },
  { name: '正阳县', lat: 32.6000, lng: 114.3833, level: 'county', parent: '周口', province: '河南省' },
  { name: '泌阳县', lat: 32.7167, lng: 113.3167, level: 'county', parent: '周口', province: '河南省' },
  { name: '遂平县', lat: 33.1500, lng: 114.0000, level: 'county', parent: '周口', province: '河南省' },
  { name: '确山县', lat: 32.8000, lng: 114.0167, level: 'county', parent: '周口', province: '河南省' },
  { name: '汝南县', lat: 33.0000, lng: 114.3500, level: 'county', parent: '周口', province: '河南省' },
  { name: '平舆县', lat: 32.9667, lng: 114.6167, level: 'county', parent: '周口', province: '河南省' },
  
  // 驻马店市
  { name: '南召县', lat: 33.4833, lng: 112.4167, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '西峡县', lat: 33.3000, lng: 111.4833, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '方城县', lat: 33.2500, lng: 112.9833, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '镇平县', lat: 33.0333, lng: 112.2333, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '内乡县', lat: 33.0500, lng: 111.8333, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '桐柏县', lat: 32.3667, lng: 113.4000, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '淅川县', lat: 33.1333, lng: 111.4833, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '社旗县', lat: 33.0500, lng: 112.9333, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '唐河县', lat: 32.6833, lng: 112.8333, level: 'county', parent: '驻马店', province: '河南省' },
  { name: '新野县', lat: 32.5167, lng: 112.3500, level: 'county', parent: '驻马店', province: '河南省' },
  
  // 南阳市
  { name: '新县', lat: 31.6333, lng: 114.8667, level: 'county', parent: '南阳', province: '河南省' },
  { name: '息县', lat: 32.3500, lng: 114.7333, level: 'county', parent: '南阳', province: '河南省' },
  { name: '潢川县', lat: 32.1333, lng: 115.0500, level: 'county', parent: '南阳', province: '河南省' },
  { name: '固始县', lat: 32.1667, lng: 115.6833, level: 'county', parent: '南阳', province: '河南省' },
  { name: '淮滨县', lat: 32.4333, lng: 115.4000, level: 'county', parent: '南阳', province: '河南省' },
  { name: '罗山县', lat: 32.2000, lng: 114.5167, level: 'county', parent: '南阳', province: '河南省' },
  { name: '商城县', lat: 31.8000, lng: 115.4000, level: 'county', parent: '南阳', province: '河南省' },
  { name: '光山县', lat: 32.0167, lng: 114.9167, level: 'county', parent: '南阳', province: '河南省' },
  
  // 湖北省所有县（35个）
  // 黄石市
  { name: '阳新县', lat: 29.8333, lng: 115.2167, level: 'county', parent: '黄石', province: '湖北省' },
  
  // 十堰市
  { name: '郧西县', lat: 32.9833, lng: 110.4167, level: 'county', parent: '十堰', province: '湖北省' },
  { name: '竹山县', lat: 32.2167, lng: 110.2167, level: 'county', parent: '十堰', province: '湖北省' },
  { name: '竹溪县', lat: 32.3167, lng: 109.7167, level: 'county', parent: '十堰', province: '湖北省' },
  { name: '房县', lat: 32.0500, lng: 110.7333, level: 'county', parent: '十堰', province: '湖北省' },
  
  // 荆州市
  { name: '公安县', lat: 30.0667, lng: 112.2167, level: 'county', parent: '荆州', province: '湖北省' },
  { name: '江陵县', lat: 30.0333, lng: 112.4167, level: 'county', parent: '荆州', province: '湖北省' },
  
  // 宜昌市
  { name: '远安县', lat: 31.0667, lng: 111.6333, level: 'county', parent: '宜昌', province: '湖北省' },
  { name: '兴山县', lat: 31.3500, lng: 110.7500, level: 'county', parent: '宜昌', province: '湖北省' },
  { name: '秭归县', lat: 30.8333, lng: 110.9667, level: 'county', parent: '宜昌', province: '湖北省' },
  
  // 襄阳市
  { name: '南漳县', lat: 31.7667, lng: 111.8333, level: 'county', parent: '襄阳', province: '湖北省' },
  { name: '谷城县', lat: 32.2667, lng: 111.6333, level: 'county', parent: '襄阳', province: '湖北省' },
  { name: '保康县', lat: 31.8667, lng: 111.2667, level: 'county', parent: '襄阳', province: '湖北省' },
  
  // 荆门市
  { name: '沙洋县', lat: 30.7000, lng: 112.5833, level: 'county', parent: '荆门', province: '湖北省' },
  
  // 黄冈市
  { name: '团风县', lat: 30.6333, lng: 114.8667, level: 'county', parent: '黄冈', province: '湖北省' },
  { name: '红安县', lat: 31.2833, lng: 114.6167, level: 'county', parent: '黄冈', province: '湖北省' },
  { name: '罗田县', lat: 30.7833, lng: 115.4000, level: 'county', parent: '黄冈', province: '湖北省' },
  { name: '英山县', lat: 30.7333, lng: 115.6667, level: 'county', parent: '黄冈', province: '湖北省' },
  { name: '浠水县', lat: 30.4500, lng: 115.2667, level: 'county', parent: '黄冈', province: '湖北省' },
  { name: '蕲春县', lat: 30.2333, lng: 115.4333, level: 'county', parent: '黄冈', province: '湖北省' },
  { name: '黄梅县', lat: 30.0667, lng: 115.9333, level: 'county', parent: '黄冈', province: '湖北省' },
  
  // 孝感市
  { name: '孝昌县', lat: 31.2500, lng: 113.9833, level: 'county', parent: '孝感', province: '湖北省' },
  { name: '大悟县', lat: 31.5667, lng: 114.1167, level: 'county', parent: '孝感', province: '湖北省' },
  { name: '云梦县', lat: 31.0167, lng: 113.7500, level: 'county', parent: '孝感', province: '湖北省' },
  
  // 咸宁市
  { name: '嘉鱼县', lat: 29.9667, lng: 113.9000, level: 'county', parent: '咸宁', province: '湖北省' },
  { name: '通城县', lat: 29.2333, lng: 113.8167, level: 'county', parent: '咸宁', province: '湖北省' },
  { name: '崇阳县', lat: 29.5333, lng: 114.0333, level: 'county', parent: '咸宁', province: '湖北省' },
  { name: '通山县', lat: 29.6000, lng: 114.4833, level: 'county', parent: '咸宁', province: '湖北省' },
  
  // 随州市
  { name: '随县', lat: 31.6167, lng: 113.3667, level: 'county', parent: '随州', province: '湖北省' },
  
  // 恩施土家族苗族自治州
  { name: '建始县', lat: 30.6000, lng: 109.7167, level: 'county', parent: '恩施', province: '湖北省' },
  { name: '巴东县', lat: 31.0333, lng: 110.3333, level: 'county', parent: '恩施', province: '湖北省' },
  { name: '咸丰县', lat: 29.6833, lng: 109.1333, level: 'county', parent: '恩施', province: '湖北省' },
  { name: '宣恩县', lat: 29.9833, lng: 109.4833, level: 'county', parent: '恩施', province: '湖北省' },
  { name: '来凤县', lat: 29.5000, lng: 109.4000, level: 'county', parent: '恩施', province: '湖北省' },
  { name: '鹤峰县', lat: 29.8833, lng: 110.0333, level: 'county', parent: '恩施', province: '湖北省' },
  
  // 湖南省所有县（61个）
  // 长沙市
  { name: '长沙县', lat: 28.2333, lng: 113.0833, level: 'county', parent: '长沙', province: '湖南省' },
  { name: '攸县', lat: 27.0000, lng: 113.3333, level: 'county', parent: '长沙', province: '湖南省' },
  { name: '炎陵县', lat: 26.4833, lng: 113.7667, level: 'county', parent: '长沙', province: '湖南省' },
  { name: '茶陵县', lat: 26.7833, lng: 113.5333, level: 'county', parent: '长沙', province: '湖南省' },
  
  // 株洲市
  { name: '湘潭县', lat: 27.7833, lng: 112.9500, level: 'county', parent: '株洲', province: '湖南省' },
  
  // 湘潭市
  { name: '祁东县', lat: 26.7833, lng: 112.1000, level: 'county', parent: '湘潭', province: '湖南省' },
  { name: '衡东县', lat: 27.0833, lng: 112.9500, level: 'county', parent: '湘潭', province: '湖南省' },
  { name: '衡南县', lat: 26.7333, lng: 112.6667, level: 'county', parent: '湘潭', province: '湖南省' },
  { name: '衡阳县', lat: 26.9667, lng: 112.3667, level: 'county', parent: '湘潭', province: '湖南省' },
  { name: '衡山县', lat: 27.2333, lng: 112.8667, level: 'county', parent: '湘潭', province: '湖南省' },
  
  // 衡阳市
  { name: '绥宁县', lat: 26.5833, lng: 110.1500, level: 'county', parent: '衡阳', province: '湖南省' },
  { name: '新宁县', lat: 26.4333, lng: 110.8500, level: 'county', parent: '衡阳', province: '湖南省' },
  { name: '新邵县', lat: 27.3167, lng: 111.4500, level: 'county', parent: '衡阳', province: '湖南省' },
  { name: '邵阳县', lat: 26.9833, lng: 111.2667, level: 'county', parent: '衡阳', province: '湖南省' },
  { name: '隆回县', lat: 27.1167, lng: 111.0333, level: 'county', parent: '衡阳', province: '湖南省' },
  { name: '洞口县', lat: 27.0500, lng: 110.5667, level: 'county', parent: '衡阳', province: '湖南省' },
  
  // 邵阳市
  { name: '华容县', lat: 29.5167, lng: 112.5500, level: 'county', parent: '邵阳', province: '湖南省' },
  { name: '岳阳县', lat: 29.1333, lng: 113.1167, level: 'county', parent: '邵阳', province: '湖南省' },
  { name: '平江县', lat: 28.7000, lng: 113.5833, level: 'county', parent: '邵阳', province: '湖南省' },
  { name: '湘阴县', lat: 28.6667, lng: 112.8833, level: 'county', parent: '邵阳', province: '湖南省' },
  
  // 岳阳市
  { name: '澧县', lat: 29.6333, lng: 111.7500, level: 'county', parent: '岳阳', province: '湖南省' },
  { name: '安乡县', lat: 29.4000, lng: 112.1667, level: 'county', parent: '岳阳', province: '湖南省' },
  { name: '汉寿县', lat: 28.9000, lng: 111.9667, level: 'county', parent: '岳阳', province: '湖南省' },
  { name: '石门县', lat: 29.5833, lng: 111.3667, level: 'county', parent: '岳阳', province: '湖南省' },
  { name: '临澧县', lat: 29.4333, lng: 111.6333, level: 'county', parent: '岳阳', province: '湖南省' },
  { name: '桃源县', lat: 28.9000, lng: 111.4833, level: 'county', parent: '岳阳', province: '湖南省' },
  
  // 常德市
  { name: '桑植县', lat: 29.4000, lng: 110.1667, level: 'county', parent: '常德', province: '湖南省' },
  { name: '慈利县', lat: 29.4167, lng: 111.1167, level: 'county', parent: '常德', province: '湖南省' },
  
  // 张家界市
  { name: '南县', lat: 29.3667, lng: 112.4000, level: 'county', parent: '张家界', province: '湖南省' },
  { name: '安化县', lat: 28.3667, lng: 111.2167, level: 'county', parent: '张家界', province: '湖南省' },
  { name: '桃江县', lat: 28.5167, lng: 112.1167, level: 'county', parent: '张家界', province: '湖南省' },
  { name: '新化县', lat: 27.7333, lng: 111.3000, level: 'county', parent: '张家界', province: '湖南省' },
  { name: '双峰县', lat: 27.4500, lng: 112.1833, level: 'county', parent: '张家界', province: '湖南省' },
  
  // 益阳市
  { name: '桂东县', lat: 26.0833, lng: 113.9333, level: 'county', parent: '益阳', province: '湖南省' },
  { name: '安仁县', lat: 26.7000, lng: 113.2667, level: 'county', parent: '益阳', province: '湖南省' },
  { name: '桂阳县', lat: 25.7333, lng: 112.7333, level: 'county', parent: '益阳', province: '湖南省' },
  { name: '永兴县', lat: 26.1333, lng: 113.1167, level: 'county', parent: '益阳', province: '湖南省' },
  { name: '宜章县', lat: 25.4000, lng: 112.9500, level: 'county', parent: '益阳', province: '湖南省' },
  { name: '嘉禾县', lat: 25.5833, lng: 112.3667, level: 'county', parent: '益阳', province: '湖南省' },
  { name: '汝城县', lat: 25.5500, lng: 113.6833, level: 'county', parent: '益阳', province: '湖南省' },
  { name: '临武县', lat: 25.2667, lng: 112.5500, level: 'county', parent: '益阳', province: '湖南省' },
  
  // 郴州市
  { name: '道县', lat: 25.5167, lng: 111.5833, level: 'county', parent: '郴州', province: '湖南省' },
  { name: '新田县', lat: 25.9000, lng: 112.2167, level: 'county', parent: '郴州', province: '湖南省' },
  { name: '祁阳县', lat: 26.5833, lng: 111.8500, level: 'county', parent: '郴州', province: '湖南省' },
  { name: '东安县', lat: 26.4000, lng: 111.2833, level: 'county', parent: '郴州', province: '湖南省' },
  { name: '双牌县', lat: 25.9667, lng: 111.6500, level: 'county', parent: '郴州', province: '湖南省' },
  { name: '江永县', lat: 25.2667, lng: 111.3333, level: 'county', parent: '郴州', province: '湖南省' },
  { name: '蓝山县', lat: 25.3667, lng: 112.1833, level: 'county', parent: '郴州', province: '湖南省' },
  { name: '宁远县', lat: 25.6000, lng: 111.9500, level: 'county', parent: '郴州', province: '湖南省' },
  
  // 永州市
  { name: '会同县', lat: 26.8667, lng: 109.7167, level: 'county', parent: '永州', province: '湖南省' },
  { name: '中方县', lat: 27.4333, lng: 109.9333, level: 'county', parent: '永州', province: '湖南省' },
  { name: '沅陵县', lat: 28.4500, lng: 110.3833, level: 'county', parent: '永州', province: '湖南省' },
  { name: '辰溪县', lat: 28.0000, lng: 110.1833, level: 'county', parent: '永州', province: '湖南省' },
  { name: '溆浦县', lat: 27.9167, lng: 110.5833, level: 'county', parent: '永州', province: '湖南省' },
  
  // 怀化市
  { name: '龙山县', lat: 29.4500, lng: 109.4333, level: 'county', parent: '怀化', province: '湖南省' },
  { name: '泸溪县', lat: 28.2167, lng: 110.2167, level: 'county', parent: '怀化', province: '湖南省' },
  { name: '凤凰县', lat: 27.9500, lng: 109.6000, level: 'county', parent: '怀化', province: '湖南省' },
  { name: '花垣县', lat: 28.5833, lng: 109.4833, level: 'county', parent: '怀化', province: '湖南省' },
  { name: '保靖县', lat: 28.7000, lng: 109.6500, level: 'county', parent: '怀化', province: '湖南省' },
  { name: '古丈县', lat: 28.6167, lng: 109.9500, level: 'county', parent: '怀化', province: '湖南省' },
  { name: '永顺县', lat: 28.9833, lng: 109.8500, level: 'county', parent: '怀化', province: '湖南省' },
  
  // 广东省所有县（34个）
  // 韶关市
  { name: '新丰县', lat: 24.0667, lng: 114.2000, level: 'county', parent: '韶关', province: '广东省' },
  { name: '始兴县', lat: 24.9500, lng: 114.0667, level: 'county', parent: '韶关', province: '广东省' },
  { name: '仁化县', lat: 25.0833, lng: 113.7333, level: 'county', parent: '韶关', province: '广东省' },
  { name: '翁源县', lat: 24.3500, lng: 114.1333, level: 'county', parent: '韶关', province: '广东省' },
  
  // 河源市
  { name: '东源县', lat: 23.7833, lng: 114.7500, level: 'county', parent: '河源', province: '广东省' },
  { name: '连平县', lat: 24.3667, lng: 114.4833, level: 'county', parent: '河源', province: '广东省' },
  { name: '和平县', lat: 24.4333, lng: 114.9333, level: 'county', parent: '河源', province: '广东省' },
  { name: '紫金县', lat: 23.6333, lng: 115.1833, level: 'county', parent: '河源', province: '广东省' },
  { name: '龙川县', lat: 24.1000, lng: 115.2500, level: 'county', parent: '河源', province: '广东省' },
  
  // 梅州市
  { name: '丰顺县', lat: 23.7667, lng: 116.1833, level: 'county', parent: '梅州', province: '广东省' },
  { name: '五华县', lat: 23.9333, lng: 115.7667, level: 'county', parent: '梅州', province: '广东省' },
  { name: '平远县', lat: 24.5667, lng: 115.8833, level: 'county', parent: '梅州', province: '广东省' },
  { name: '蕉岭县', lat: 24.6667, lng: 116.1667, level: 'county', parent: '梅州', province: '广东省' },
  { name: '大埔县', lat: 24.3500, lng: 116.7000, level: 'county', parent: '梅州', province: '广东省' },
  
  // 惠州市
  { name: '龙门县', lat: 23.7167, lng: 114.2500, level: 'county', parent: '惠州', province: '广东省' },
  { name: '博罗县', lat: 23.1833, lng: 114.2833, level: 'county', parent: '惠州', province: '广东省' },
  { name: '惠东县', lat: 22.9833, lng: 114.7167, level: 'county', parent: '惠州', province: '广东省' },
  
  // 汕尾市
  { name: '海丰县', lat: 22.9667, lng: 115.3333, level: 'county', parent: '汕尾', province: '广东省' },
  { name: '陆河县', lat: 23.3000, lng: 115.6500, level: 'county', parent: '汕尾', province: '广东省' },
  
  // 阳江市
  { name: '阳西县', lat: 21.7500, lng: 111.6167, level: 'county', parent: '阳江', province: '广东省' },
  
  // 湛江市
  { name: '徐闻县', lat: 20.3333, lng: 110.1667, level: 'county', parent: '湛江', province: '广东省' },
  { name: '遂溪县', lat: 21.3667, lng: 110.2500, level: 'county', parent: '湛江', province: '广东省' },
  
  // 茂名市
  { name: '电白区', lat: 21.5167, lng: 111.0000, level: 'county', parent: '茂名', province: '广东省' },
  
  // 肇庆市
  { name: '德庆县', lat: 23.1500, lng: 111.7833, level: 'county', parent: '肇庆', province: '广东省' },
  { name: '广宁县', lat: 23.6333, lng: 112.4333, level: 'county', parent: '肇庆', province: '广东省' },
  { name: '封开县', lat: 23.4333, lng: 111.5000, level: 'county', parent: '肇庆', province: '广东省' },
  { name: '怀集县', lat: 23.9167, lng: 112.1833, level: 'county', parent: '肇庆', province: '广东省' },
  
  // 清远市
  { name: '佛冈县', lat: 23.8667, lng: 113.5333, level: 'county', parent: '清远', province: '广东省' },
  { name: '阳山县', lat: 24.4667, lng: 112.6333, level: 'county', parent: '清远', province: '广东省' },
  
  // 潮州市
  { name: '饶平县', lat: 23.6667, lng: 116.9167, level: 'county', parent: '潮州', province: '广东省' },
  
  // 揭阳市
  { name: '揭西县', lat: 23.4333, lng: 115.8333, level: 'county', parent: '揭阳', province: '广东省' },
  { name: '惠来县', lat: 23.0333, lng: 116.2833, level: 'county', parent: '揭阳', province: '广东省' },
  
  // 云浮市
  { name: '新兴县', lat: 22.7000, lng: 112.2167, level: 'county', parent: '云浮', province: '广东省' },
  { name: '郁南县', lat: 23.2333, lng: 111.5333, level: 'county', parent: '云浮', province: '广东省' },
  
  // 广西壮族自治区所有县（49个）
  // 南宁市
  { name: '隆安县', lat: 23.1667, lng: 107.6833, level: 'county', parent: '南宁', province: '广西壮族自治区' },
  { name: '马山县', lat: 23.7167, lng: 108.1667, level: 'county', parent: '南宁', province: '广西壮族自治区' },
  { name: '上林县', lat: 23.4333, lng: 108.6000, level: 'county', parent: '南宁', province: '广西壮族自治区' },
  { name: '宾阳县', lat: 23.2167, lng: 108.8167, level: 'county', parent: '南宁', province: '广西壮族自治区' },
  { name: '横县', lat: 22.6833, lng: 109.2667, level: 'county', parent: '南宁', province: '广西壮族自治区' },
  
  // 柳州市
  { name: '柳城县', lat: 24.6500, lng: 109.2333, level: 'county', parent: '柳州', province: '广西壮族自治区' },
  { name: '鹿寨县', lat: 24.4833, lng: 109.7500, level: 'county', parent: '柳州', province: '广西壮族自治区' },
  { name: '融安县', lat: 25.2167, lng: 109.4000, level: 'county', parent: '柳州', province: '广西壮族自治区' },
  
  // 桂林市
  { name: '阳朔县', lat: 24.7833, lng: 110.4833, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  { name: '灵川县', lat: 25.4167, lng: 110.3167, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  { name: '全州县', lat: 25.9333, lng: 111.0667, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  { name: '平乐县', lat: 24.6333, lng: 110.6333, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  { name: '兴安县', lat: 25.6167, lng: 110.6667, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  { name: '灌阳县', lat: 25.4833, lng: 111.1500, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  { name: '永福县', lat: 24.9833, lng: 109.9833, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  { name: '资源县', lat: 26.0333, lng: 110.6333, level: 'county', parent: '桂林', province: '广西壮族自治区' },
  
  // 梧州市
  { name: '苍梧县', lat: 23.4167, lng: 111.2333, level: 'county', parent: '梧州', province: '广西壮族自治区' },
  { name: '蒙山县', lat: 24.2000, lng: 110.5167, level: 'county', parent: '梧州', province: '广西壮族自治区' },
  { name: '藤县', lat: 23.3667, lng: 110.9167, level: 'county', parent: '梧州', province: '广西壮族自治区' },
  
  // 北海市
  { name: '合浦县', lat: 21.6667, lng: 109.2000, level: 'county', parent: '北海', province: '广西壮族自治区' },
  
  // 防城港市
  { name: '上思县', lat: 22.1500, lng: 107.9833, level: 'county', parent: '防城港', province: '广西壮族自治区' },
  
  // 钦州市
  { name: '灵山县', lat: 22.4167, lng: 109.2833, level: 'county', parent: '钦州', province: '广西壮族自治区' },
  { name: '浦北县', lat: 22.2667, lng: 109.5500, level: 'county', parent: '钦州', province: '广西壮族自治区' },
  
  // 贵港市
  { name: '平南县', lat: 23.5333, lng: 110.3833, level: 'county', parent: '贵港', province: '广西壮族自治区' },
  { name: '容县', lat: 22.8667, lng: 110.5500, level: 'county', parent: '贵港', province: '广西壮族自治区' },
  { name: '陆川县', lat: 22.3167, lng: 110.2667, level: 'county', parent: '贵港', province: '广西壮族自治区' },
  { name: '博白县', lat: 22.2667, lng: 109.9667, level: 'county', parent: '贵港', province: '广西壮族自治区' },
  { name: '兴业县', lat: 22.7333, lng: 109.8667, level: 'county', parent: '贵港', province: '广西壮族自治区' },
  
  // 玉林市
  { name: '西林县', lat: 24.4833, lng: 105.0833, level: 'county', parent: '玉林', province: '广西壮族自治区' },
  { name: '田东县', lat: 23.6000, lng: 107.1167, level: 'county', parent: '玉林', province: '广西壮族自治区' },
  { name: '德保县', lat: 23.3167, lng: 106.6167, level: 'county', parent: '玉林', province: '广西壮族自治区' },
  { name: '那坡县', lat: 23.4167, lng: 105.8333, level: 'county', parent: '玉林', province: '广西壮族自治区' },
  { name: '凌云县', lat: 24.3500, lng: 106.5500, level: 'county', parent: '玉林', province: '广西壮族自治区' },
  { name: '乐业县', lat: 24.7833, lng: 106.5500, level: 'county', parent: '玉林', province: '广西壮族自治区' },
  { name: '田林县', lat: 24.3000, lng: 106.2167, level: 'county', parent: '玉林', province: '广西壮族自治区' },
  
  // 百色市
  { name: '昭平县', lat: 24.1667, lng: 110.8000, level: 'county', parent: '百色', province: '广西壮族自治区' },
  { name: '钟山县', lat: 24.5167, lng: 111.3000, level: 'county', parent: '百色', province: '广西壮族自治区' },
  
  // 贺州市
  { name: '南丹县', lat: 24.9833, lng: 107.5333, level: 'county', parent: '贺州', province: '广西壮族自治区' },
  { name: '天峨县', lat: 24.9833, lng: 107.1667, level: 'county', parent: '贺州', province: '广西壮族自治区' },
  { name: '凤山县', lat: 24.5500, lng: 107.0333, level: 'county', parent: '贺州', province: '广西壮族自治区' },
  { name: '东兰县', lat: 24.5167, lng: 107.3667, level: 'county', parent: '贺州', province: '广西壮族自治区' },
  
  // 河池市
  { name: '象州县', lat: 23.9667, lng: 109.6833, level: 'county', parent: '河池', province: '广西壮族自治区' },
  { name: '武宣县', lat: 23.6000, lng: 109.6667, level: 'county', parent: '河池', province: '广西壮族自治区' },
  { name: '忻城县', lat: 24.0667, lng: 108.6667, level: 'county', parent: '河池', province: '广西壮族自治区' },
  
  // 来宾市
  { name: '扶绥县', lat: 22.6333, lng: 107.9000, level: 'county', parent: '来宾', province: '广西壮族自治区' },
  { name: '宁明县', lat: 22.1333, lng: 107.0667, level: 'county', parent: '来宾', province: '广西壮族自治区' },
  { name: '龙州县', lat: 22.3333, lng: 106.8500, level: 'county', parent: '来宾', province: '广西壮族自治区' },
  { name: '大新县', lat: 22.8333, lng: 107.2000, level: 'county', parent: '来宾', province: '广西壮族自治区' },
  { name: '天等县', lat: 23.0833, lng: 107.1333, level: 'county', parent: '来宾', province: '广西壮族自治区' },
  
  // 海南省所有县（4个）
  { name: '定安县', lat: 19.7000, lng: 110.3167, level: 'county', parent: '海口', province: '海南省' },
  { name: '屯昌县', lat: 19.3667, lng: 110.1000, level: 'county', parent: '海口', province: '海南省' },
  { name: '澄迈县', lat: 19.7500, lng: 110.0000, level: 'county', parent: '海口', province: '海南省' },
  { name: '临高县', lat: 19.9167, lng: 109.6833, level: 'county', parent: '海口', province: '海南省' },
  
  // 重庆市所有县（8个）
  { name: '城口县', lat: 31.9500, lng: 108.6667, level: 'county', parent: '重庆', province: '重庆市' },
  { name: '丰都县', lat: 29.8667, lng: 107.7167, level: 'county', parent: '重庆', province: '重庆市' },
  { name: '垫江县', lat: 30.3333, lng: 107.3500, level: 'county', parent: '重庆', province: '重庆市' },
  { name: '忠县', lat: 30.2833, lng: 108.0167, level: 'county', parent: '重庆', province: '重庆市' },
  { name: '云阳县', lat: 30.9333, lng: 108.6667, level: 'county', parent: '重庆', province: '重庆市' },
  { name: '奉节县', lat: 31.0167, lng: 109.4667, level: 'county', parent: '重庆', province: '重庆市' },
  { name: '巫山县', lat: 31.0833, lng: 109.8667, level: 'county', parent: '重庆', province: '重庆市' },
  { name: '巫溪县', lat: 31.4000, lng: 109.6167, level: 'county', parent: '重庆', province: '重庆市' },
  
  // 四川省所有县（106个）
  // 成都市
  { name: '金堂县', lat: 30.8500, lng: 104.4167, level: 'county', parent: '成都', province: '四川省' },
  { name: '大邑县', lat: 30.5833, lng: 103.5167, level: 'county', parent: '成都', province: '四川省' },
  { name: '蒲江县', lat: 30.2000, lng: 103.5000, level: 'county', parent: '成都', province: '四川省' },
  
  // 绵阳市
  { name: '梓潼县', lat: 31.6333, lng: 105.1667, level: 'county', parent: '绵阳', province: '四川省' },
  { name: '盐亭县', lat: 31.2167, lng: 105.3833, level: 'county', parent: '绵阳', province: '四川省' },
  { name: '平武县', lat: 32.4167, lng: 104.5167, level: 'county', parent: '绵阳', province: '四川省' },
  { name: '三台县', lat: 31.1000, lng: 105.0833, level: 'county', parent: '绵阳', province: '四川省' },
  
  // 自贡市
  { name: '荣县', lat: 29.4500, lng: 104.4167, level: 'county', parent: '自贡', province: '四川省' },
  { name: '富顺县', lat: 29.1833, lng: 104.9833, level: 'county', parent: '自贡', province: '四川省' },
  
  // 攀枝花市
  { name: '米易县', lat: 26.8833, lng: 102.1167, level: 'county', parent: '攀枝花', province: '四川省' },
  { name: '盐边县', lat: 26.6833, lng: 101.8500, level: 'county', parent: '攀枝花', province: '四川省' },
  
  // 泸州市
  { name: '泸县', lat: 29.1500, lng: 105.3833, level: 'county', parent: '泸州', province: '四川省' },
  { name: '合江县', lat: 28.8167, lng: 105.8333, level: 'county', parent: '泸州', province: '四川省' },
  { name: '古蔺县', lat: 28.0333, lng: 105.8167, level: 'county', parent: '泸州', province: '四川省' },
  { name: '叙永县', lat: 28.1667, lng: 105.4333, level: 'county', parent: '泸州', province: '四川省' },
  
  // 德阳市
  { name: '中江县', lat: 31.0333, lng: 104.6833, level: 'county', parent: '德阳', province: '四川省' },
  { name: '旺苍县', lat: 32.2333, lng: 106.2833, level: 'county', parent: '德阳', province: '四川省' },
  { name: '剑阁县', lat: 32.2833, lng: 105.5167, level: 'county', parent: '德阳', province: '四川省' },
  { name: '苍溪县', lat: 31.7333, lng: 105.9333, level: 'county', parent: '德阳', province: '四川省' },
  { name: '青川县', lat: 32.5833, lng: 105.2333, level: 'county', parent: '德阳', province: '四川省' },
  
  // 广元市
  { name: '大英县', lat: 30.5833, lng: 105.2500, level: 'county', parent: '广元', province: '四川省' },
  { name: '蓬溪县', lat: 30.7667, lng: 105.7000, level: 'county', parent: '广元', province: '四川省' },
  
  // 遂宁市
  { name: '资中县', lat: 29.7833, lng: 104.8500, level: 'county', parent: '遂宁', province: '四川省' },
  { name: '威远县', lat: 29.5333, lng: 104.6667, level: 'county', parent: '遂宁', province: '四川省' },
  
  // 内江市
  { name: '犍为县', lat: 29.2167, lng: 103.9500, level: 'county', parent: '内江', province: '四川省' },
  { name: '夹江县', lat: 29.7333, lng: 103.5667, level: 'county', parent: '内江', province: '四川省' },
  { name: '沐川县', lat: 28.9500, lng: 103.9000, level: 'county', parent: '内江', province: '四川省' },
  { name: '井研县', lat: 29.6500, lng: 104.0667, level: 'county', parent: '内江', province: '四川省' },
  
  // 乐山市
  { name: '安岳县', lat: 30.1000, lng: 105.3333, level: 'county', parent: '乐山', province: '四川省' },
  { name: '乐至县', lat: 30.2833, lng: 105.0167, level: 'county', parent: '乐山', province: '四川省' },
  
  // 资阳市
  { name: '筠连县', lat: 28.1667, lng: 104.5167, level: 'county', parent: '资阳', province: '四川省' },
  { name: '长宁县', lat: 28.5833, lng: 104.9167, level: 'county', parent: '资阳', province: '四川省' },
  { name: '高县', lat: 28.4333, lng: 104.5167, level: 'county', parent: '资阳', province: '四川省' },
  { name: '珙县', lat: 28.4333, lng: 104.7167, level: 'county', parent: '资阳', province: '四川省' },
  { name: '兴文县', lat: 28.3000, lng: 105.1167, level: 'county', parent: '资阳', province: '四川省' },
  { name: '屏山县', lat: 28.6500, lng: 104.1667, level: 'county', parent: '资阳', province: '四川省' },
  { name: '江安县', lat: 28.7333, lng: 105.0667, level: 'county', parent: '资阳', province: '四川省' },
  
  // 宜宾市
  { name: '西充县', lat: 31.0000, lng: 105.8833, level: 'county', parent: '宜宾', province: '四川省' },
  { name: '南部县', lat: 31.3500, lng: 106.0667, level: 'county', parent: '宜宾', province: '四川省' },
  { name: '蓬安县', lat: 31.0333, lng: 106.4167, level: 'county', parent: '宜宾', province: '四川省' },
  { name: '营山县', lat: 31.0667, lng: 106.5667, level: 'county', parent: '宜宾', province: '四川省' },
  { name: '仪陇县', lat: 31.2667, lng: 106.3000, level: 'county', parent: '宜宾', province: '四川省' },
  
  // 南充市
  { name: '宣汉县', lat: 31.3500, lng: 107.7167, level: 'county', parent: '南充', province: '四川省' },
  { name: '大竹县', lat: 30.7333, lng: 107.2000, level: 'county', parent: '南充', province: '四川省' },
  { name: '渠县', lat: 30.8333, lng: 106.9667, level: 'county', parent: '南充', province: '四川省' },
  { name: '开江县', lat: 31.0833, lng: 107.8667, level: 'county', parent: '南充', province: '四川省' },
  { name: '邻水县', lat: 30.3333, lng: 106.9333, level: 'county', parent: '南充', province: '四川省' },
  
  // 达州市
  { name: '武胜县', lat: 30.3500, lng: 106.2833, level: 'county', parent: '达州', province: '四川省' },
  { name: '岳池县', lat: 30.5333, lng: 106.4333, level: 'county', parent: '达州', province: '四川省' },
  
  // 广安市
  { name: '平昌县', lat: 31.5667, lng: 107.1000, level: 'county', parent: '广安', province: '四川省' },
  { name: '通江县', lat: 31.9167, lng: 107.2333, level: 'county', parent: '广安', province: '四川省' },
  { name: '南江县', lat: 32.3500, lng: 106.8333, level: 'county', parent: '广安', province: '四川省' },
  
  // 巴中市
  { name: '仁寿县', lat: 29.9833, lng: 104.1333, level: 'county', parent: '巴中', province: '四川省' },
  { name: '青神县', lat: 29.8333, lng: 103.8333, level: 'county', parent: '巴中', province: '四川省' },
  { name: '丹棱县', lat: 30.0167, lng: 103.5167, level: 'county', parent: '巴中', province: '四川省' },
  { name: '洪雅县', lat: 29.9167, lng: 103.3667, level: 'county', parent: '巴中', province: '四川省' },
  
  // 眉山市
  { name: '荥经县', lat: 29.7833, lng: 102.8333, level: 'county', parent: '眉山', province: '四川省' },
  { name: '汉源县', lat: 29.3500, lng: 102.6667, level: 'county', parent: '眉山', province: '四川省' },
  { name: '石棉县', lat: 29.2167, lng: 102.3667, level: 'county', parent: '眉山', province: '四川省' },
  { name: '天全县', lat: 30.0667, lng: 102.7500, level: 'county', parent: '眉山', province: '四川省' },
  { name: '芦山县', lat: 30.1667, lng: 102.9167, level: 'county', parent: '眉山', province: '四川省' },
  { name: '宝兴县', lat: 30.3667, lng: 102.8167, level: 'county', parent: '眉山', province: '四川省' },
  
  // 雅安市
  { name: '金川县', lat: 31.4833, lng: 102.0667, level: 'county', parent: '雅安', province: '四川省' },
  { name: '汶川县', lat: 31.4667, lng: 103.5833, level: 'county', parent: '雅安', province: '四川省' },
  { name: '阿坝县', lat: 32.9000, lng: 101.7000, level: 'county', parent: '雅安', province: '四川省' },
  { name: '红原县', lat: 32.8000, lng: 102.5500, level: 'county', parent: '雅安', province: '四川省' },
  { name: '壤塘县', lat: 32.2667, lng: 100.9833, level: 'county', parent: '雅安', province: '四川省' },
  { name: '松潘县', lat: 32.6333, lng: 103.6000, level: 'county', parent: '雅安', province: '四川省' },
  { name: '理县', lat: 31.4333, lng: 103.1667, level: 'county', parent: '雅安', province: '四川省' },
  { name: '茂县', lat: 31.6833, lng: 103.8500, level: 'county', parent: '雅安', province: '四川省' },
  { name: '黑水县', lat: 32.0667, lng: 102.9833, level: 'county', parent: '雅安', province: '四川省' },
  { name: '九寨沟县', lat: 33.2667, lng: 103.9167, level: 'county', parent: '雅安', province: '四川省' },
  { name: '若尔盖县', lat: 33.5833, lng: 102.9667, level: 'county', parent: '雅安', province: '四川省' },
  { name: '小金县', lat: 31.0000, lng: 102.3667, level: 'county', parent: '雅安', province: '四川省' },
  
  // 阿坝藏族羌族自治州
  { name: '丹巴县', lat: 30.8833, lng: 101.8833, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '甘孜县', lat: 31.6167, lng: 99.9833, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '乡城县', lat: 28.9333, lng: 99.8000, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '白玉县', lat: 31.2167, lng: 98.8333, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '新龙县', lat: 30.9333, lng: 100.3167, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '炉霍县', lat: 31.4000, lng: 100.6667, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '九龙县', lat: 29.0000, lng: 101.5000, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '稻城县', lat: 29.0333, lng: 100.3000, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '色达县', lat: 32.2667, lng: 100.3333, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '理塘县', lat: 30.0000, lng: 100.2667, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '道孚县', lat: 30.9833, lng: 101.1167, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '巴塘县', lat: 30.0000, lng: 99.1000, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '得荣县', lat: 28.7167, lng: 99.2833, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '石渠县', lat: 32.9833, lng: 98.1000, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '雅江县', lat: 30.0333, lng: 101.0167, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '泸定县', lat: 29.9167, lng: 102.2333, level: 'county', parent: '阿坝', province: '四川省' },
  { name: '德格县', lat: 31.8167, lng: 98.5833, level: 'county', parent: '阿坝', province: '四川省' },
  
  // 甘孜藏族自治州
  { name: '德昌县', lat: 27.4000, lng: 102.1667, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '金阳县', lat: 27.7000, lng: 103.2500, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '喜德县', lat: 28.3167, lng: 102.4167, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '甘洛县', lat: 28.9667, lng: 102.7667, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '会东县', lat: 26.6333, lng: 102.5667, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '宁南县', lat: 27.0667, lng: 102.7667, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '美姑县', lat: 28.3333, lng: 103.1333, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '冕宁县', lat: 28.5500, lng: 102.1667, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '会理县', lat: 26.6667, lng: 102.2500, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '普格县', lat: 27.3667, lng: 102.5333, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '布拖县', lat: 27.7167, lng: 102.8167, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '昭觉县', lat: 28.0167, lng: 102.8500, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '盐源县', lat: 27.4167, lng: 101.5000, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '越西县', lat: 28.6500, lng: 102.5167, level: 'county', parent: '甘孜', province: '四川省' },
  { name: '雷波县', lat: 28.2667, lng: 103.5667, level: 'county', parent: '甘孜', province: '四川省' },
  
  // 贵州省所有县（51个）
  // 贵阳市
  { name: '开阳县', lat: 27.0667, lng: 106.9667, level: 'county', parent: '贵阳', province: '贵州省' },
  { name: '息烽县', lat: 27.0833, lng: 106.7333, level: 'county', parent: '贵阳', province: '贵州省' },
  { name: '修文县', lat: 26.8333, lng: 106.5833, level: 'county', parent: '贵阳', province: '贵州省' },
  
  // 六盘水市
  { name: '桐梓县', lat: 28.1333, lng: 106.8167, level: 'county', parent: '六盘水', province: '贵州省' },
  { name: '习水县', lat: 28.3167, lng: 106.2000, level: 'county', parent: '六盘水', province: '贵州省' },
  { name: '余庆县', lat: 27.2167, lng: 107.8833, level: 'county', parent: '六盘水', province: '贵州省' },
  { name: '正安县', lat: 28.5500, lng: 107.4333, level: 'county', parent: '六盘水', province: '贵州省' },
  { name: '凤冈县', lat: 27.9667, lng: 107.7167, level: 'county', parent: '六盘水', province: '贵州省' },
  { name: '湄潭县', lat: 27.7667, lng: 107.4833, level: 'county', parent: '六盘水', province: '贵州省' },
  { name: '绥阳县', lat: 27.9500, lng: 107.1833, level: 'county', parent: '六盘水', province: '贵州省' },
  
  // 遵义市
  { name: '普定县', lat: 26.3000, lng: 105.7500, level: 'county', parent: '遵义', province: '贵州省' },
  { name: '大方县', lat: 27.1333, lng: 105.6000, level: 'county', parent: '遵义', province: '贵州省' },
  { name: '赫章县', lat: 27.1167, lng: 104.7167, level: 'county', parent: '遵义', province: '贵州省' },
  { name: '金沙县', lat: 27.4667, lng: 106.2167, level: 'county', parent: '遵义', province: '贵州省' },
  { name: '织金县', lat: 26.6667, lng: 105.7667, level: 'county', parent: '遵义', province: '贵州省' },
  { name: '黔西县', lat: 27.0167, lng: 106.0333, level: 'county', parent: '遵义', province: '贵州省' },
  { name: '纳雍县', lat: 26.7667, lng: 105.3833, level: 'county', parent: '遵义', province: '贵州省' },
  
  // 毕节市
  { name: '江口县', lat: 27.7000, lng: 108.8500, level: 'county', parent: '毕节', province: '贵州省' },
  { name: '石阡县', lat: 27.5167, lng: 108.2167, level: 'county', parent: '毕节', province: '贵州省' },
  { name: '思南县', lat: 27.9333, lng: 108.2500, level: 'county', parent: '毕节', province: '贵州省' },
  { name: '德江县', lat: 28.2667, lng: 108.1167, level: 'county', parent: '毕节', province: '贵州省' },
  
  // 铜仁市
  { name: '望谟县', lat: 25.1667, lng: 106.0833, level: 'county', parent: '铜仁', province: '贵州省' },
  { name: '安龙县', lat: 25.1167, lng: 105.4833, level: 'county', parent: '铜仁', province: '贵州省' },
  { name: '晴隆县', lat: 25.8333, lng: 105.2167, level: 'county', parent: '铜仁', province: '贵州省' },
  { name: '贞丰县', lat: 25.3833, lng: 105.6500, level: 'county', parent: '铜仁', province: '贵州省' },
  { name: '册亨县', lat: 24.9833, lng: 105.7833, level: 'county', parent: '铜仁', province: '贵州省' },
  { name: '普安县', lat: 25.7833, lng: 104.9500, level: 'county', parent: '铜仁', province: '贵州省' },
  
  // 黔西南布依族苗族自治州
  { name: '镇远县', lat: 27.0500, lng: 108.4167, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '丹寨县', lat: 26.2000, lng: 107.7833, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '施秉县', lat: 27.0333, lng: 108.1167, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '三穗县', lat: 26.9667, lng: 108.6667, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '天柱县', lat: 26.9000, lng: 109.2000, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '榕江县', lat: 25.9333, lng: 108.5167, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '剑河县', lat: 26.6500, lng: 108.4333, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '麻江县', lat: 26.4833, lng: 107.5833, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '锦屏县', lat: 26.6833, lng: 109.1833, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '岑巩县', lat: 27.1833, lng: 108.8167, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '雷山县', lat: 26.3833, lng: 108.0667, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '台江县', lat: 26.6667, lng: 108.3167, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '从江县', lat: 25.7500, lng: 108.9000, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '黄平县', lat: 26.9000, lng: 107.9000, level: 'county', parent: '黔西南', province: '贵州省' },
  { name: '黎平县', lat: 26.2333, lng: 109.1333, level: 'county', parent: '黔西南', province: '贵州省' },
  
  // 黔东南苗族侗族自治州
  { name: '荔波县', lat: 25.4167, lng: 107.8833, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '贵定县', lat: 26.5833, lng: 107.2333, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '独山县', lat: 25.8333, lng: 107.5500, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '平塘县', lat: 25.8333, lng: 107.3167, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '长顺县', lat: 26.0167, lng: 106.4500, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '龙里县', lat: 26.4500, lng: 106.9833, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '惠水县', lat: 26.1333, lng: 106.6500, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '罗甸县', lat: 25.4333, lng: 106.7500, level: 'county', parent: '黔东南', province: '贵州省' },
  { name: '瓮安县', lat: 27.0667, lng: 107.4667, level: 'county', parent: '黔东南', province: '贵州省' },
  
  // 云南省所有县（66个）
  // 昆明市
  { name: '富民县', lat: 25.2167, lng: 102.4833, level: 'county', parent: '昆明', province: '云南省' },
  { name: '宜良县', lat: 24.9167, lng: 103.1333, level: 'county', parent: '昆明', province: '云南省' },
  { name: '嵩明县', lat: 25.3333, lng: 103.0333, level: 'county', parent: '昆明', province: '云南省' },
  
  // 曲靖市
  { name: '会泽县', lat: 26.4167, lng: 103.2833, level: 'county', parent: '曲靖', province: '云南省' },
  { name: '富源县', lat: 25.6667, lng: 104.2500, level: 'county', parent: '曲靖', province: '云南省' },
  { name: '罗平县', lat: 24.8833, lng: 104.3000, level: 'county', parent: '曲靖', province: '云南省' },
  { name: '师宗县', lat: 24.8333, lng: 103.9833, level: 'county', parent: '曲靖', province: '云南省' },
  { name: '陆良县', lat: 25.0333, lng: 103.6667, level: 'county', parent: '曲靖', province: '云南省' },
  
  // 玉溪市
  { name: '通海县', lat: 24.1167, lng: 102.7500, level: 'county', parent: '玉溪', province: '云南省' },
  { name: '华宁县', lat: 24.1833, lng: 102.9167, level: 'county', parent: '玉溪', province: '云南省' },
  { name: '易门县', lat: 24.6667, lng: 102.1667, level: 'county', parent: '玉溪', province: '云南省' },
  
  // 保山市
  { name: '鲁甸县', lat: 27.1833, lng: 103.5500, level: 'county', parent: '保山', province: '云南省' },
  { name: '盐津县', lat: 28.1167, lng: 104.2333, level: 'county', parent: '保山', province: '云南省' },
  { name: '大关县', lat: 27.7500, lng: 103.9000, level: 'county', parent: '保山', province: '云南省' },
  { name: '绥江县', lat: 28.6000, lng: 103.9500, level: 'county', parent: '保山', province: '云南省' },
  { name: '镇雄县', lat: 27.4333, lng: 104.8667, level: 'county', parent: '保山', province: '云南省' },
  { name: '威信县', lat: 27.8333, lng: 105.0500, level: 'county', parent: '保山', province: '云南省' },
  { name: '巧家县', lat: 26.9167, lng: 102.9167, level: 'county', parent: '保山', province: '云南省' },
  { name: '彝良县', lat: 27.6167, lng: 104.0500, level: 'county', parent: '保山', province: '云南省' },
  { name: '永善县', lat: 28.2333, lng: 103.6333, level: 'county', parent: '保山', province: '云南省' },
  
  // 昭通市
  { name: '施甸县', lat: 24.7167, lng: 99.1833, level: 'county', parent: '昭通', province: '云南省' },
  { name: '龙陵县', lat: 24.5833, lng: 98.6833, level: 'county', parent: '昭通', province: '云南省' },
  { name: '昌宁县', lat: 24.8333, lng: 99.6000, level: 'county', parent: '昭通', province: '云南省' },
  
  // 丽江市
  { name: '永胜县', lat: 26.6833, lng: 100.7500, level: 'county', parent: '丽江', province: '云南省' },
  { name: '华坪县', lat: 26.6333, lng: 101.2667, level: 'county', parent: '丽江', province: '云南省' },
  
  // 普洱市
  { name: '凤庆县', lat: 24.5833, lng: 99.9167, level: 'county', parent: '普洱', province: '云南省' },
  { name: '云县', lat: 24.4333, lng: 100.1333, level: 'county', parent: '普洱', province: '云南省' },
  { name: '永德县', lat: 24.0167, lng: 99.2500, level: 'county', parent: '普洱', province: '云南省' },
  { name: '镇康县', lat: 23.7667, lng: 98.8333, level: 'county', parent: '普洱', province: '云南省' },
  
  // 临沧市
  { name: '梁河县', lat: 24.8000, lng: 98.3000, level: 'county', parent: '临沧', province: '云南省' },
  { name: '盈江县', lat: 24.7000, lng: 97.9333, level: 'county', parent: '临沧', province: '云南省' },
  { name: '陇川县', lat: 24.1833, lng: 97.7833, level: 'county', parent: '临沧', province: '云南省' },
  
  // 德宏傣族景颇族自治州
  { name: '福贡县', lat: 26.9000, lng: 98.8667, level: 'county', parent: '德宏', province: '云南省' },
  { name: '德钦县', lat: 28.4833, lng: 98.9167, level: 'county', parent: '德宏', province: '云南省' },
  
  // 怒江傈僳族自治州
  { name: '祥云县', lat: 25.4667, lng: 100.5500, level: 'county', parent: '怒江', province: '云南省' },
  { name: '云龙县', lat: 25.8833, lng: 99.3667, level: 'county', parent: '怒江', province: '云南省' },
  { name: '弥渡县', lat: 25.3333, lng: 100.4833, level: 'county', parent: '怒江', province: '云南省' },
  { name: '宾川县', lat: 25.8167, lng: 100.5667, level: 'county', parent: '怒江', province: '云南省' },
  { name: '永平县', lat: 25.4667, lng: 99.5333, level: 'county', parent: '怒江', province: '云南省' },
  { name: '鹤庆县', lat: 26.5500, lng: 100.1667, level: 'county', parent: '怒江', province: '云南省' },
  { name: '洱源县', lat: 26.1000, lng: 99.9500, level: 'county', parent: '怒江', province: '云南省' },
  { name: '剑川县', lat: 26.5333, lng: 99.9000, level: 'county', parent: '怒江', province: '云南省' },
  
  // 大理白族自治州
  { name: '双柏县', lat: 24.6833, lng: 101.6333, level: 'county', parent: '大理', province: '云南省' },
  { name: '大姚县', lat: 25.7167, lng: 101.3167, level: 'county', parent: '大理', province: '云南省' },
  { name: '南华县', lat: 25.2000, lng: 101.2667, level: 'county', parent: '大理', province: '云南省' },
  { name: '永仁县', lat: 26.0500, lng: 101.6667, level: 'county', parent: '大理', province: '云南省' },
  { name: '武定县', lat: 25.5333, lng: 102.4000, level: 'county', parent: '大理', province: '云南省' },
  { name: '禄丰县', lat: 25.1500, lng: 102.0833, level: 'county', parent: '大理', province: '云南省' },
  { name: '姚安县', lat: 25.5000, lng: 101.2333, level: 'county', parent: '大理', province: '云南省' },
  { name: '元谋县', lat: 25.7000, lng: 101.8667, level: 'county', parent: '大理', province: '云南省' },
  { name: '牟定县', lat: 25.3167, lng: 101.5333, level: 'county', parent: '大理', province: '云南省' },
  
  // 楚雄彝族自治州
  { name: '建水县', lat: 23.6167, lng: 102.8167, level: 'county', parent: '楚雄', province: '云南省' },
  { name: '石屏县', lat: 23.7167, lng: 102.4833, level: 'county', parent: '楚雄', province: '云南省' },
  { name: '泸西县', lat: 24.5167, lng: 103.7667, level: 'county', parent: '楚雄', province: '云南省' },
  { name: '元阳县', lat: 23.2167, lng: 102.8333, level: 'county', parent: '楚雄', province: '云南省' },
  { name: '红河县', lat: 23.3667, lng: 102.4167, level: 'county', parent: '楚雄', province: '云南省' },
  { name: '绿春县', lat: 22.9833, lng: 102.4000, level: 'county', parent: '楚雄', province: '云南省' },
  
  // 红河哈尼族彝族自治州
  { name: '砚山县', lat: 23.6167, lng: 104.3333, level: 'county', parent: '红河', province: '云南省' },
  { name: '广南县', lat: 24.0500, lng: 105.0667, level: 'county', parent: '红河', province: '云南省' },
  { name: '麻栗坡县', lat: 23.1333, lng: 104.7000, level: 'county', parent: '红河', province: '云南省' },
  { name: '马关县', lat: 23.0167, lng: 104.4000, level: 'county', parent: '红河', province: '云南省' },
  { name: '富宁县', lat: 23.6167, lng: 105.6000, level: 'county', parent: '红河', province: '云南省' },
  { name: '西畴县', lat: 23.4333, lng: 104.6833, level: 'county', parent: '红河', province: '云南省' },
  { name: '丘北县', lat: 24.0500, lng: 104.1833, level: 'county', parent: '红河', province: '云南省' },
  
  // 文山壮族苗族自治州
  { name: '勐海县', lat: 21.9667, lng: 100.4500, level: 'county', parent: '文山', province: '云南省' },
  { name: '勐腊县', lat: 21.4667, lng: 101.5667, level: 'county', parent: '文山', province: '云南省' },
  
  // 西藏自治区所有县（66个）
  // 拉萨市
  { name: '林周县', lat: 30.2000, lng: 91.2667, level: 'county', parent: '拉萨', province: '西藏自治区' },
  { name: '墨竹工卡县', lat: 29.8333, lng: 91.7167, level: 'county', parent: '拉萨', province: '西藏自治区' },
  { name: '尼木县', lat: 29.4333, lng: 90.1667, level: 'county', parent: '拉萨', province: '西藏自治区' },
  { name: '当雄县', lat: 30.4833, lng: 91.1000, level: 'county', parent: '拉萨', province: '西藏自治区' },
  { name: '曲水县', lat: 29.3500, lng: 90.7333, level: 'county', parent: '拉萨', province: '西藏自治区' },
  
  // 昌都市
  { name: '察雅县', lat: 30.6500, lng: 97.5667, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '左贡县', lat: 29.6667, lng: 97.8333, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '芒康县', lat: 29.6833, lng: 98.5833, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '洛隆县', lat: 30.7500, lng: 95.8333, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '边坝县', lat: 30.9333, lng: 94.7000, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '江达县', lat: 31.5000, lng: 98.2167, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '贡觉县', lat: 30.8667, lng: 98.2667, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '丁青县', lat: 31.4167, lng: 95.6000, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '八宿县', lat: 30.0500, lng: 96.9167, level: 'county', parent: '昌都', province: '西藏自治区' },
  { name: '类乌齐县', lat: 31.2167, lng: 96.6000, level: 'county', parent: '昌都', province: '西藏自治区' },
  
  // 山南市
  { name: '南木林县', lat: 29.6833, lng: 89.1000, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '江孜县', lat: 28.9167, lng: 89.6000, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '定日县', lat: 28.6667, lng: 87.1167, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '萨迦县', lat: 28.9000, lng: 88.0167, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '拉孜县', lat: 29.0833, lng: 87.6333, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '昂仁县', lat: 29.3000, lng: 87.1833, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '谢通门县', lat: 29.4333, lng: 88.2667, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '仲巴县', lat: 29.7667, lng: 84.0167, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '吉隆县', lat: 28.8500, lng: 85.3000, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '聂拉木县', lat: 28.1500, lng: 85.9667, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '亚东县', lat: 27.4167, lng: 88.9000, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '仁布县', lat: 29.2333, lng: 89.8333, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '康马县', lat: 28.5500, lng: 89.6833, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '萨嘎县', lat: 29.3333, lng: 85.2333, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '岗巴县', lat: 28.2667, lng: 88.5167, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '定结县', lat: 28.3667, lng: 87.7667, level: 'county', parent: '山南', province: '西藏自治区' },
  { name: '白朗县', lat: 29.1000, lng: 89.2500, level: 'county', parent: '山南', province: '西藏自治区' },
  
  // 日喀则市
  { name: '米林县', lat: 29.2167, lng: 94.2167, level: 'county', parent: '日喀则', province: '西藏自治区' },
  { name: '墨脱县', lat: 29.3333, lng: 95.3333, level: 'county', parent: '日喀则', province: '西藏自治区' },
  { name: '察隅县', lat: 28.6667, lng: 97.4667, level: 'county', parent: '日喀则', province: '西藏自治区' },
  { name: '波密县', lat: 29.8667, lng: 95.7667, level: 'county', parent: '日喀则', province: '西藏自治区' },
  { name: '朗县', lat: 29.0500, lng: 93.0667, level: 'county', parent: '日喀则', province: '西藏自治区' },
  { name: '工布江达县', lat: 29.8833, lng: 93.2500, level: 'county', parent: '日喀则', province: '西藏自治区' },
  
  // 林芝市
  { name: '扎囊县', lat: 29.2500, lng: 91.3333, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '曲松县', lat: 29.0667, lng: 92.2000, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '洛扎县', lat: 28.3833, lng: 90.8667, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '桑日县', lat: 29.2667, lng: 92.0167, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '加查县', lat: 29.1333, lng: 92.5833, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '浪卡子县', lat: 28.9667, lng: 90.4000, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '错那县', lat: 27.9833, lng: 91.9500, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '隆子县', lat: 28.4167, lng: 92.4667, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '措美县', lat: 28.4333, lng: 91.4333, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '琼结县', lat: 29.0167, lng: 91.6833, level: 'county', parent: '林芝', province: '西藏自治区' },
  { name: '贡嘎县', lat: 29.2833, lng: 90.9833, level: 'county', parent: '林芝', province: '西藏自治区' },
  
  // 那曲市
  { name: '双湖县', lat: 33.1833, lng: 88.8333, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '班戈县', lat: 31.3667, lng: 90.0167, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '安多县', lat: 32.2667, lng: 91.6833, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '巴青县', lat: 31.9167, lng: 94.0500, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '申扎县', lat: 30.9333, lng: 88.6333, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '比如县', lat: 31.4833, lng: 93.6667, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '索县', lat: 31.8833, lng: 93.7833, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '嘉黎县', lat: 30.6333, lng: 93.4667, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '聂荣县', lat: 32.1000, lng: 92.3000, level: 'county', parent: '那曲', province: '西藏自治区' },
  { name: '尼玛县', lat: 31.7833, lng: 87.2333, level: 'county', parent: '那曲', province: '西藏自治区' },
  
  // 阿里地区
  { name: '噶尔县', lat: 32.5000, lng: 80.1000, level: 'county', parent: '阿里', province: '西藏自治区' },
  { name: '普兰县', lat: 30.2833, lng: 81.1667, level: 'county', parent: '阿里', province: '西藏自治区' },
  { name: '札达县', lat: 31.4833, lng: 79.8000, level: 'county', parent: '阿里', province: '西藏自治区' },
  { name: '日土县', lat: 33.3833, lng: 79.7167, level: 'county', parent: '阿里', province: '西藏自治区' },
  { name: '革吉县', lat: 32.3833, lng: 81.1333, level: 'county', parent: '阿里', province: '西藏自治区' },
  { name: '改则县', lat: 32.3000, lng: 84.0667, level: 'county', parent: '阿里', province: '西藏自治区' },
  { name: '措勤县', lat: 31.0167, lng: 85.1500, level: 'county', parent: '阿里', province: '西藏自治区' },
  
  // 陕西省所有县（71个）
  // 西安市
  { name: '蓝田县', lat: 34.1500, lng: 109.3167, level: 'county', parent: '西安', province: '陕西省' },
  { name: '周至县', lat: 34.1667, lng: 108.2167, level: 'county', parent: '西安', province: '陕西省' },
  
  // 铜川市
  { name: '宜君县', lat: 35.4000, lng: 109.1167, level: 'county', parent: '铜川', province: '陕西省' },
  
  // 宝鸡市
  { name: '凤县', lat: 33.9167, lng: 106.5167, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '陇县', lat: 34.8833, lng: 106.8500, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '眉县', lat: 34.2667, lng: 107.7500, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '凤翔县', lat: 34.5167, lng: 107.4000, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '岐山县', lat: 34.4333, lng: 107.6167, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '扶风县', lat: 34.3667, lng: 107.8667, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '太白县', lat: 34.0500, lng: 107.3167, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '千阳县', lat: 34.6333, lng: 107.1333, level: 'county', parent: '宝鸡', province: '陕西省' },
  { name: '麟游县', lat: 34.6667, lng: 107.8000, level: 'county', parent: '宝鸡', province: '陕西省' },
  
  // 咸阳市
  { name: '三原县', lat: 34.6167, lng: 108.9333, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '泾阳县', lat: 34.5333, lng: 108.8333, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '乾县', lat: 34.5333, lng: 108.2333, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '武功县', lat: 34.2667, lng: 108.2000, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '永寿县', lat: 34.7000, lng: 108.1333, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '礼泉县', lat: 34.4833, lng: 108.4167, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '长武县', lat: 35.2000, lng: 107.7833, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '旬邑县', lat: 35.1167, lng: 108.3333, level: 'county', parent: '咸阳', province: '陕西省' },
  { name: '淳化县', lat: 34.7833, lng: 108.5667, level: 'county', parent: '咸阳', province: '陕西省' },
  
  // 渭南市
  { name: '潼关县', lat: 34.5333, lng: 110.2333, level: 'county', parent: '渭南', province: '陕西省' },
  { name: '大荔县', lat: 34.8000, lng: 109.9333, level: 'county', parent: '渭南', province: '陕西省' },
  { name: '合阳县', lat: 35.2333, lng: 110.1500, level: 'county', parent: '渭南', province: '陕西省' },
  { name: '澄城县', lat: 35.1833, lng: 109.9333, level: 'county', parent: '渭南', province: '陕西省' },
  { name: '蒲城县', lat: 34.9500, lng: 109.5833, level: 'county', parent: '渭南', province: '陕西省' },
  { name: '白水县', lat: 35.1833, lng: 109.5833, level: 'county', parent: '渭南', province: '陕西省' },
  { name: '富平县', lat: 34.7500, lng: 109.1833, level: 'county', parent: '渭南', province: '陕西省' },
  
  // 延安市
  { name: '延长县', lat: 36.5833, lng: 110.0167, level: 'county', parent: '延安', province: '陕西省' },
  { name: '延川县', lat: 36.8667, lng: 110.1833, level: 'county', parent: '延安', province: '陕西省' },
  { name: '黄陵县', lat: 35.5833, lng: 109.2500, level: 'county', parent: '延安', province: '陕西省' },
  { name: '志丹县', lat: 36.8167, lng: 108.7667, level: 'county', parent: '延安', province: '陕西省' },
  { name: '吴起县', lat: 36.9167, lng: 108.1833, level: 'county', parent: '延安', province: '陕西省' },
  { name: '甘泉县', lat: 36.2667, lng: 109.3500, level: 'county', parent: '延安', province: '陕西省' },
  { name: '富县', lat: 35.9833, lng: 109.3667, level: 'county', parent: '延安', province: '陕西省' },
  { name: '洛川县', lat: 35.7667, lng: 109.4333, level: 'county', parent: '延安', province: '陕西省' },
  { name: '宜川县', lat: 36.0500, lng: 110.1667, level: 'county', parent: '延安', province: '陕西省' },
  { name: '黄龙县', lat: 35.5833, lng: 109.8333, level: 'county', parent: '延安', province: '陕西省' },
  
  // 汉中市
  { name: '城固县', lat: 33.1500, lng: 107.3333, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '洋县', lat: 33.2167, lng: 107.5500, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '勉县', lat: 33.1500, lng: 106.6667, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '西乡县', lat: 32.9833, lng: 107.7667, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '宁强县', lat: 32.8333, lng: 106.2500, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '略阳县', lat: 33.3333, lng: 106.1500, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '镇巴县', lat: 32.5333, lng: 107.8833, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '留坝县', lat: 33.6167, lng: 106.9167, level: 'county', parent: '汉中', province: '陕西省' },
  { name: '佛坪县', lat: 33.5167, lng: 107.9833, level: 'county', parent: '汉中', province: '陕西省' },
  
  // 榆林市
  { name: '府谷县', lat: 39.0167, lng: 111.0667, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '靖边县', lat: 37.5833, lng: 108.8000, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '定边县', lat: 37.5833, lng: 107.5833, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '绥德县', lat: 37.5000, lng: 110.2500, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '米脂县', lat: 37.7500, lng: 110.1833, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '佳县', lat: 38.0167, lng: 110.4833, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '吴堡县', lat: 37.4500, lng: 110.7333, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '清涧县', lat: 37.0833, lng: 110.1167, level: 'county', parent: '榆林', province: '陕西省' },
  { name: '子洲县', lat: 37.6167, lng: 110.0167, level: 'county', parent: '榆林', province: '陕西省' },
  
  // 安康市
  { name: '汉阴县', lat: 32.8833, lng: 108.5167, level: 'county', parent: '安康', province: '陕西省' },
  { name: '石泉县', lat: 33.0333, lng: 108.2500, level: 'county', parent: '安康', province: '陕西省' },
  { name: '宁陕县', lat: 33.3167, lng: 108.3167, level: 'county', parent: '安康', province: '陕西省' },
  { name: '紫阳县', lat: 32.5167, lng: 108.5333, level: 'county', parent: '安康', province: '陕西省' },
  { name: '岚皋县', lat: 32.3000, lng: 108.9000, level: 'county', parent: '安康', province: '陕西省' },
  { name: '镇坪县', lat: 31.8833, lng: 109.5167, level: 'county', parent: '安康', province: '陕西省' },
  { name: '平利县', lat: 32.3833, lng: 109.3500, level: 'county', parent: '安康', province: '陕西省' },
  { name: '旬阳县', lat: 32.8333, lng: 109.3667, level: 'county', parent: '安康', province: '陕西省' },
  { name: '白河县', lat: 32.8167, lng: 110.1000, level: 'county', parent: '安康', province: '陕西省' },
  
  // 商洛市
  { name: '洛南县', lat: 34.0833, lng: 110.1500, level: 'county', parent: '商洛', province: '陕西省' },
  { name: '丹凤县', lat: 33.6833, lng: 110.3333, level: 'county', parent: '商洛', province: '陕西省' },
  { name: '柞水县', lat: 33.6833, lng: 108.1167, level: 'county', parent: '商洛', province: '陕西省' },
  { name: '商南县', lat: 33.5167, lng: 110.8833, level: 'county', parent: '商洛', province: '陕西省' },
  { name: '山阳县', lat: 33.5333, lng: 109.8833, level: 'county', parent: '商洛', province: '陕西省' },
  { name: '镇安县', lat: 33.4167, lng: 109.1500, level: 'county', parent: '商洛', province: '陕西省' },
  
  // 甘肃省所有县（57个）
  // 兰州市
  { name: '榆中县', lat: 35.8333, lng: 104.1167, level: 'county', parent: '兰州', province: '甘肃省' },
  { name: '皋兰县', lat: 36.3333, lng: 103.9500, level: 'county', parent: '兰州', province: '甘肃省' },
  { name: '永登县', lat: 36.7333, lng: 103.2667, level: 'county', parent: '兰州', province: '甘肃省' },
  
  // 金昌市
  { name: '永昌县', lat: 38.2333, lng: 101.9667, level: 'county', parent: '金昌', province: '甘肃省' },
  
  // 白银市
  { name: '会宁县', lat: 35.6833, lng: 105.0500, level: 'county', parent: '白银', province: '甘肃省' },
  { name: '靖远县', lat: 36.5667, lng: 104.6833, level: 'county', parent: '白银', province: '甘肃省' },
  { name: '景泰县', lat: 37.1833, lng: 104.0667, level: 'county', parent: '白银', province: '甘肃省' },
  
  // 天水市
  { name: '清水县', lat: 34.7500, lng: 106.1333, level: 'county', parent: '天水', province: '甘肃省' },
  { name: '秦安县', lat: 34.8667, lng: 105.6667, level: 'county', parent: '天水', province: '甘肃省' },
  { name: '甘谷县', lat: 34.7333, lng: 105.3333, level: 'county', parent: '天水', province: '甘肃省' },
  { name: '武山县', lat: 34.7167, lng: 104.8833, level: 'county', parent: '天水', province: '甘肃省' },
  
  // 酒泉市
  { name: '瓜州县', lat: 40.5167, lng: 95.7667, level: 'county', parent: '酒泉', province: '甘肃省' },
  { name: '金塔县', lat: 39.9833, lng: 98.9000, level: 'county', parent: '酒泉', province: '甘肃省' },
  
  // 张掖市
  { name: '山丹县', lat: 38.7833, lng: 101.0833, level: 'county', parent: '张掖', province: '甘肃省' },
  { name: '民乐县', lat: 38.4333, lng: 100.8167, level: 'county', parent: '张掖', province: '甘肃省' },
  { name: '临泽县', lat: 39.1500, lng: 100.1667, level: 'county', parent: '张掖', province: '甘肃省' },
  { name: '高台县', lat: 39.3667, lng: 99.8167, level: 'county', parent: '张掖', province: '甘肃省' },
  
  // 武威市
  { name: '古浪县', lat: 37.4667, lng: 102.8833, level: 'county', parent: '武威', province: '甘肃省' },
  { name: '民勤县', lat: 38.6167, lng: 103.0833, level: 'county', parent: '武威', province: '甘肃省' },
  
  // 定西市
  { name: '通渭县', lat: 35.2167, lng: 105.2500, level: 'county', parent: '定西', province: '甘肃省' },
  { name: '陇西县', lat: 35.0000, lng: 104.6333, level: 'county', parent: '定西', province: '甘肃省' },
  { name: '漳县', lat: 34.8500, lng: 104.4667, level: 'county', parent: '定西', province: '甘肃省' },
  { name: '渭源县', lat: 35.1333, lng: 104.2167, level: 'county', parent: '定西', province: '甘肃省' },
  { name: '岷县', lat: 34.4333, lng: 104.0333, level: 'county', parent: '定西', province: '甘肃省' },
  { name: '临洮县', lat: 35.3667, lng: 103.8667, level: 'county', parent: '定西', province: '甘肃省' },
  
  // 陇南市
  { name: '宕昌县', lat: 34.0500, lng: 104.3833, level: 'county', parent: '陇南', province: '甘肃省' },
  { name: '两当县', lat: 33.9167, lng: 106.3000, level: 'county', parent: '陇南', province: '甘肃省' },
  { name: '成县', lat: 33.7333, lng: 105.7167, level: 'county', parent: '陇南', province: '甘肃省' },
  { name: '西和县', lat: 34.0167, lng: 105.3000, level: 'county', parent: '陇南', province: '甘肃省' },
  { name: '礼县', lat: 34.1833, lng: 105.1833, level: 'county', parent: '陇南', province: '甘肃省' },
  { name: '康县', lat: 33.3333, lng: 105.6000, level: 'county', parent: '陇南', province: '甘肃省' },
  { name: '文县', lat: 32.9500, lng: 104.6833, level: 'county', parent: '陇南', province: '甘肃省' },
  { name: '徽县', lat: 33.7667, lng: 106.0833, level: 'county', parent: '陇南', province: '甘肃省' },
  
  // 平凉市
  { name: '泾川县', lat: 35.3333, lng: 107.3667, level: 'county', parent: '平凉', province: '甘肃省' },
  { name: '灵台县', lat: 35.0667, lng: 107.6167, level: 'county', parent: '平凉', province: '甘肃省' },
  { name: '崇信县', lat: 35.3000, lng: 107.0333, level: 'county', parent: '平凉', province: '甘肃省' },
  { name: '静宁县', lat: 35.5167, lng: 105.7167, level: 'county', parent: '平凉', province: '甘肃省' },
  { name: '庄浪县', lat: 35.2000, lng: 106.0333, level: 'county', parent: '平凉', province: '甘肃省' },
  
  // 庆阳市
  { name: '正宁县', lat: 35.4833, lng: 108.3667, level: 'county', parent: '庆阳', province: '甘肃省' },
  { name: '华池县', lat: 36.4500, lng: 107.9833, level: 'county', parent: '庆阳', province: '甘肃省' },
  { name: '合水县', lat: 35.8167, lng: 108.0167, level: 'county', parent: '庆阳', province: '甘肃省' },
  { name: '宁县', lat: 35.5000, lng: 107.9167, level: 'county', parent: '庆阳', province: '甘肃省' },
  { name: '庆城县', lat: 36.0167, lng: 107.8833, level: 'county', parent: '庆阳', province: '甘肃省' },
  { name: '镇原县', lat: 35.6667, lng: 107.2000, level: 'county', parent: '庆阳', province: '甘肃省' },
  { name: '环县', lat: 36.5667, lng: 107.3000, level: 'county', parent: '庆阳', province: '甘肃省' },
  
  // 临夏回族自治州
  { name: '临夏县', lat: 35.4833, lng: 103.1833, level: 'county', parent: '临夏', province: '甘肃省' },
  { name: '康乐县', lat: 35.3667, lng: 103.7000, level: 'county', parent: '临夏', province: '甘肃省' },
  { name: '广河县', lat: 35.4833, lng: 103.5667, level: 'county', parent: '临夏', province: '甘肃省' },
  { name: '永靖县', lat: 35.9333, lng: 103.3167, level: 'county', parent: '临夏', province: '甘肃省' },
  { name: '和政县', lat: 35.4167, lng: 103.3500, level: 'county', parent: '临夏', province: '甘肃省' },
  
  // 甘南藏族自治州
  { name: '夏河县', lat: 35.2000, lng: 102.5167, level: 'county', parent: '甘南', province: '甘肃省' },
  { name: '玛曲县', lat: 34.0000, lng: 102.0667, level: 'county', parent: '甘南', province: '甘肃省' },
  { name: '舟曲县', lat: 33.7833, lng: 104.3667, level: 'county', parent: '甘南', province: '甘肃省' },
  { name: '碌曲县', lat: 34.5833, lng: 102.4833, level: 'county', parent: '甘南', province: '甘肃省' },
  { name: '迭部县', lat: 34.0500, lng: 103.2167, level: 'county', parent: '甘南', province: '甘肃省' },
  { name: '临潭县', lat: 34.6833, lng: 103.3500, level: 'county', parent: '甘南', province: '甘肃省' },
  { name: '卓尼县', lat: 34.5833, lng: 103.5000, level: 'county', parent: '甘南', province: '甘肃省' },
  
  // 青海省所有县（25个）
  // 西宁市
  { name: '湟源县', lat: 36.6833, lng: 101.2667, level: 'county', parent: '西宁', province: '青海省' },
  
  // 海东市
  { name: '海晏县', lat: 36.9000, lng: 100.9833, level: 'county', parent: '海东', province: '青海省' },
  { name: '祁连县', lat: 38.1833, lng: 100.2500, level: 'county', parent: '海东', province: '青海省' },
  { name: '刚察县', lat: 37.3167, lng: 100.1333, level: 'county', parent: '海东', province: '青海省' },
  
  // 海北藏族自治州
  { name: '尖扎县', lat: 35.9333, lng: 102.0333, level: 'county', parent: '海北', province: '青海省' },
  { name: '泽库县', lat: 35.0333, lng: 101.4667, level: 'county', parent: '海北', province: '青海省' },
  
  // 黄南藏族自治州
  { name: '共和县', lat: 36.2833, lng: 100.6167, level: 'county', parent: '黄南', province: '青海省' },
  { name: '同德县', lat: 35.2500, lng: 100.5833, level: 'county', parent: '黄南', province: '青海省' },
  { name: '贵德县', lat: 36.0500, lng: 101.4333, level: 'county', parent: '黄南', province: '青海省' },
  { name: '兴海县', lat: 35.5833, lng: 99.9833, level: 'county', parent: '黄南', province: '青海省' },
  { name: '贵南县', lat: 35.5833, lng: 100.7500, level: 'county', parent: '黄南', province: '青海省' },
  
  // 海南藏族自治州
  { name: '玛沁县', lat: 34.4667, lng: 100.2500, level: 'county', parent: '海南', province: '青海省' },
  { name: '班玛县', lat: 32.9333, lng: 100.7333, level: 'county', parent: '海南', province: '青海省' },
  { name: '甘德县', lat: 33.9667, lng: 99.9000, level: 'county', parent: '海南', province: '青海省' },
  { name: '达日县', lat: 33.7500, lng: 99.6500, level: 'county', parent: '海南', province: '青海省' },
  { name: '久治县', lat: 33.4333, lng: 101.4833, level: 'county', parent: '海南', province: '青海省' },
  { name: '玛多县', lat: 34.9167, lng: 98.2167, level: 'county', parent: '海南', province: '青海省' },
  
  // 果洛藏族自治州
  { name: '杂多县', lat: 32.9000, lng: 95.3000, level: 'county', parent: '果洛', province: '青海省' },
  { name: '称多县', lat: 33.3667, lng: 97.1000, level: 'county', parent: '果洛', province: '青海省' },
  { name: '治多县', lat: 33.8500, lng: 95.6167, level: 'county', parent: '果洛', province: '青海省' },
  { name: '囊谦县', lat: 32.2000, lng: 96.4833, level: 'county', parent: '果洛', province: '青海省' },
  { name: '曲麻莱县', lat: 34.1333, lng: 95.8000, level: 'county', parent: '果洛', province: '青海省' },
  
  // 玉树藏族自治州
  { name: '天峻县', lat: 37.3000, lng: 99.0167, level: 'county', parent: '玉树', province: '青海省' },
  { name: '都兰县', lat: 36.3000, lng: 98.1000, level: 'county', parent: '玉树', province: '青海省' },
  { name: '乌兰县', lat: 36.9333, lng: 98.4833, level: 'county', parent: '玉树', province: '青海省' },
  
  // 宁夏回族自治区所有县（11个）
  // 银川市
  { name: '永宁县', lat: 38.2833, lng: 106.2500, level: 'county', parent: '银川', province: '宁夏回族自治区' },
  { name: '贺兰县', lat: 38.5500, lng: 106.3500, level: 'county', parent: '银川', province: '宁夏回族自治区' },
  
  // 石嘴山市
  { name: '平罗县', lat: 38.9000, lng: 106.5333, level: 'county', parent: '石嘴山', province: '宁夏回族自治区' },
  
  // 吴忠市
  { name: '同心县', lat: 36.9833, lng: 105.9167, level: 'county', parent: '吴忠', province: '宁夏回族自治区' },
  { name: '盐池县', lat: 37.7833, lng: 107.4000, level: 'county', parent: '吴忠', province: '宁夏回族自治区' },
  
  // 固原市
  { name: '西吉县', lat: 35.9667, lng: 105.7167, level: 'county', parent: '固原', province: '宁夏回族自治区' },
  { name: '隆德县', lat: 35.6167, lng: 106.1167, level: 'county', parent: '固原', province: '宁夏回族自治区' },
  { name: '泾源县', lat: 35.5000, lng: 106.3333, level: 'county', parent: '固原', province: '宁夏回族自治区' },
  { name: '彭阳县', lat: 35.8500, lng: 106.6333, level: 'county', parent: '固原', province: '宁夏回族自治区' },
  
  // 中卫市
  { name: '中宁县', lat: 37.4833, lng: 105.6667, level: 'county', parent: '中卫', province: '宁夏回族自治区' },
  { name: '海原县', lat: 36.5667, lng: 105.6500, level: 'county', parent: '中卫', province: '宁夏回族自治区' },
  
  // 新疆维吾尔自治区所有县（61个）
  // 乌鲁木齐市
  { name: '乌鲁木齐县', lat: 43.4667, lng: 87.6167, level: 'county', parent: '乌鲁木齐', province: '新疆维吾尔自治区' },
  
  // 吐鲁番市
  { name: '鄯善县', lat: 42.8667, lng: 90.2167, level: 'county', parent: '吐鲁番', province: '新疆维吾尔自治区' },
  { name: '托克逊县', lat: 42.7833, lng: 88.6500, level: 'county', parent: '吐鲁番', province: '新疆维吾尔自治区' },
  
  // 哈密市
  { name: '伊吾县', lat: 43.2500, lng: 94.7000, level: 'county', parent: '哈密', province: '新疆维吾尔自治区' },
  
  // 伊犁哈萨克自治州
  { name: '尼勒克县', lat: 43.7833, lng: 82.5000, level: 'county', parent: '伊犁', province: '新疆维吾尔自治区' },
  { name: '伊宁县', lat: 43.9167, lng: 81.5167, level: 'county', parent: '伊犁', province: '新疆维吾尔自治区' },
  { name: '霍城县', lat: 44.0500, lng: 80.8667, level: 'county', parent: '伊犁', province: '新疆维吾尔自治区' },
  { name: '巩留县', lat: 43.4833, lng: 82.2333, level: 'county', parent: '伊犁', province: '新疆维吾尔自治区' },
  { name: '新源县', lat: 43.4333, lng: 83.2500, level: 'county', parent: '伊犁', province: '新疆维吾尔自治区' },
  { name: '昭苏县', lat: 43.1500, lng: 81.1333, level: 'county', parent: '伊犁', province: '新疆维吾尔自治区' },
  { name: '特克斯县', lat: 43.2167, lng: 81.8333, level: 'county', parent: '伊犁', province: '新疆维吾尔自治区' },
  
  // 塔城地区
  { name: '额敏县', lat: 46.5167, lng: 83.6333, level: 'county', parent: '塔城', province: '新疆维吾尔自治区' },
  { name: '沙湾县', lat: 44.3167, lng: 85.6167, level: 'county', parent: '塔城', province: '新疆维吾尔自治区' },
  { name: '托里县', lat: 45.9333, lng: 83.6000, level: 'county', parent: '塔城', province: '新疆维吾尔自治区' },
  { name: '裕民县', lat: 46.2000, lng: 82.9833, level: 'county', parent: '塔城', province: '新疆维吾尔自治区' },
  
  // 阿勒泰地区
  { name: '布尔津县', lat: 47.7000, lng: 86.8500, level: 'county', parent: '阿勒泰', province: '新疆维吾尔自治区' },
  { name: '富蕴县', lat: 46.9833, lng: 89.5167, level: 'county', parent: '阿勒泰', province: '新疆维吾尔自治区' },
  { name: '福海县', lat: 47.1167, lng: 87.4833, level: 'county', parent: '阿勒泰', province: '新疆维吾尔自治区' },
  { name: '哈巴河县', lat: 48.0500, lng: 86.4167, level: 'county', parent: '阿勒泰', province: '新疆维吾尔自治区' },
  { name: '青河县', lat: 46.6667, lng: 90.3833, level: 'county', parent: '阿勒泰', province: '新疆维吾尔自治区' },
  { name: '吉木乃县', lat: 47.4333, lng: 85.8667, level: 'county', parent: '阿勒泰', province: '新疆维吾尔自治区' },
  
  // 博尔塔拉蒙古自治州
  { name: '呼图壁县', lat: 44.1833, lng: 86.8833, level: 'county', parent: '博尔塔拉', province: '新疆维吾尔自治区' },
  { name: '玛纳斯县', lat: 44.3000, lng: 86.2167, level: 'county', parent: '博尔塔拉', province: '新疆维吾尔自治区' },
  { name: '奇台县', lat: 44.0167, lng: 89.5833, level: 'county', parent: '博尔塔拉', province: '新疆维吾尔自治区' },
  { name: '吉木萨尔县', lat: 43.9833, lng: 89.1833, level: 'county', parent: '博尔塔拉', province: '新疆维吾尔自治区' },
  { name: '精河县', lat: 44.6000, lng: 82.8833, level: 'county', parent: '博尔塔拉', province: '新疆维吾尔自治区' },
  { name: '温泉县', lat: 44.9667, lng: 81.0167, level: 'county', parent: '博尔塔拉', province: '新疆维吾尔自治区' },
  
  // 巴音郭楞蒙古自治州
  { name: '轮台县', lat: 41.7833, lng: 84.2500, level: 'county', parent: '巴音郭楞', province: '新疆维吾尔自治区' },
  { name: '尉犁县', lat: 41.3333, lng: 86.2500, level: 'county', parent: '巴音郭楞', province: '新疆维吾尔自治区' },
  { name: '若羌县', lat: 39.0167, lng: 88.1667, level: 'county', parent: '巴音郭楞', province: '新疆维吾尔自治区' },
  { name: '且末县', lat: 38.1333, lng: 85.5333, level: 'county', parent: '巴音郭楞', province: '新疆维吾尔自治区' },
  { name: '和静县', lat: 42.3167, lng: 86.3833, level: 'county', parent: '巴音郭楞', province: '新疆维吾尔自治区' },
  { name: '和硕县', lat: 42.2667, lng: 86.8667, level: 'county', parent: '巴音郭楞', province: '新疆维吾尔自治区' },
  { name: '博湖县', lat: 41.9833, lng: 86.6333, level: 'county', parent: '巴音郭楞', province: '新疆维吾尔自治区' },
  
  // 阿克苏地区
  { name: '温宿县', lat: 41.2667, lng: 80.2333, level: 'county', parent: '阿克苏', province: '新疆维吾尔自治区' },
  { name: '沙雅县', lat: 41.2167, lng: 82.7833, level: 'county', parent: '阿克苏', province: '新疆维吾尔自治区' },
  { name: '新和县', lat: 41.5333, lng: 82.6000, level: 'county', parent: '阿克苏', province: '新疆维吾尔自治区' },
  { name: '拜城县', lat: 41.7833, lng: 81.8667, level: 'county', parent: '阿克苏', province: '新疆维吾尔自治区' },
  { name: '乌什县', lat: 41.2167, lng: 79.2167, level: 'county', parent: '阿克苏', province: '新疆维吾尔自治区' },
  { name: '阿瓦提县', lat: 40.6333, lng: 80.3667, level: 'county', parent: '阿克苏', province: '新疆维吾尔自治区' },
  { name: '柯坪县', lat: 40.5000, lng: 79.0500, level: 'county', parent: '阿克苏', province: '新疆维吾尔自治区' },
  
  // 克孜勒苏柯尔克孜自治州
  { name: '阿克陶县', lat: 39.1500, lng: 75.9333, level: 'county', parent: '克孜勒苏', province: '新疆维吾尔自治区' },
  { name: '阿合奇县', lat: 40.9333, lng: 78.4500, level: 'county', parent: '克孜勒苏', province: '新疆维吾尔自治区' },
  { name: '乌恰县', lat: 39.7167, lng: 75.2500, level: 'county', parent: '克孜勒苏', province: '新疆维吾尔自治区' },
  
  // 喀什地区
  { name: '疏附县', lat: 39.3667, lng: 75.8667, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '疏勒县', lat: 39.4000, lng: 76.0500, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '英吉沙县', lat: 38.9167, lng: 76.1667, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '泽普县', lat: 37.8833, lng: 77.2667, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '莎车县', lat: 37.8833, lng: 77.2333, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '叶城县', lat: 37.8833, lng: 77.4167, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '麦盖提县', lat: 38.9000, lng: 77.6500, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '岳普湖县', lat: 39.2333, lng: 76.7667, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '伽师县', lat: 39.4833, lng: 76.7167, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '巴楚县', lat: 39.7833, lng: 78.5500, level: 'county', parent: '喀什', province: '新疆维吾尔自治区' },
  
  // 和田地区
  { name: '和田县', lat: 37.1167, lng: 79.9167, level: 'county', parent: '和田', province: '新疆维吾尔自治区' },
  { name: '墨玉县', lat: 37.2667, lng: 79.7333, level: 'county', parent: '和田', province: '新疆维吾尔自治区' },
  { name: '皮山县', lat: 37.6167, lng: 78.2833, level: 'county', parent: '和田', province: '新疆维吾尔自治区' },
  { name: '洛浦县', lat: 37.0667, lng: 80.1833, level: 'county', parent: '和田', province: '新疆维吾尔自治区' },
  { name: '策勒县', lat: 37.0000, lng: 80.8000, level: 'county', parent: '和田', province: '新疆维吾尔自治区' },
  { name: '于田县', lat: 36.8500, lng: 81.6500, level: 'county', parent: '和田', province: '新疆维吾尔自治区' },
  { name: '民丰县', lat: 37.0667, lng: 82.6833, level: 'county', parent: '和田', province: '新疆维吾尔自治区' },
  
  // 台湾省所有县（11个）（仅供参考）
  { name: '苗栗县', lat: 24.5500, lng: 120.8167, level: 'county', parent: '苗栗', province: '台湾省' },
  { name: '彰化县', lat: 24.0833, lng: 120.5333, level: 'county', parent: '彰化', province: '台湾省' },
  { name: '南投县', lat: 23.9167, lng: 120.6833, level: 'county', parent: '南投', province: '台湾省' },
  { name: '云林县', lat: 23.7167, lng: 120.4333, level: 'county', parent: '云林', province: '台湾省' },
  { name: '新竹县', lat: 24.8333, lng: 121.0167, level: 'county', parent: '新竹', province: '台湾省' },
  { name: '嘉义县', lat: 23.4500, lng: 120.2333, level: 'county', parent: '嘉义', province: '台湾省' },
  { name: '屏东县', lat: 22.6667, lng: 120.4833, level: 'county', parent: '屏东', province: '台湾省' },
  { name: '宜兰县', lat: 24.7500, lng: 121.7500, level: 'county', parent: '宜兰', province: '台湾省' },
  { name: '花莲县', lat: 23.9833, lng: 121.6000, level: 'county', parent: '花莲', province: '台湾省' },
  { name: '台东县', lat: 22.7500, lng: 121.1500, level: 'county', parent: '台东', province: '台湾省' },
  { name: '澎湖县', lat: 23.5667, lng: 119.5667, level: 'county', parent: '澎湖', province: '台湾省' },
  
  // 中国所有自治县（117个）
  // 河北省（6个）
  { name: '青龙满族自治县', lat: 40.4000, lng: 118.9500, level: 'autonomous_county', parent: '秦皇岛', province: '河北省' },
  { name: '大厂回族自治县', lat: 39.8833, lng: 116.9833, level: 'autonomous_county', parent: '廊坊', province: '河北省' },
  { name: '孟村回族自治县', lat: 38.0667, lng: 117.1000, level: 'autonomous_county', parent: '沧州', province: '河北省' },
  { name: '宽城满族自治县', lat: 40.6000, lng: 118.4833, level: 'autonomous_county', parent: '承德', province: '河北省' },
  { name: '丰宁满族自治县', lat: 41.2167, lng: 116.6500, level: 'autonomous_county', parent: '承德', province: '河北省' },
  { name: '围场满族蒙古族自治县', lat: 41.9333, lng: 117.7500, level: 'autonomous_county', parent: '承德', province: '河北省' },
  
  // 辽宁省（8个）
  { name: '本溪满族自治县', lat: 41.3000, lng: 124.1167, level: 'autonomous_county', parent: '本溪', province: '辽宁省' },
  { name: '桓仁满族自治县', lat: 41.2667, lng: 125.3500, level: 'autonomous_county', parent: '本溪', province: '辽宁省' },
  { name: '清原满族自治县', lat: 42.1000, lng: 124.9167, level: 'autonomous_county', parent: '抚顺', province: '辽宁省' },
  { name: '新宾满族自治县', lat: 41.7167, lng: 125.0333, level: 'autonomous_county', parent: '抚顺', province: '辽宁省' },
  { name: '岫岩满族自治县', lat: 40.2833, lng: 123.2833, level: 'autonomous_county', parent: '鞍山', province: '辽宁省' },
  { name: '宽甸满族自治县', lat: 40.7333, lng: 124.7833, level: 'autonomous_county', parent: '丹东', province: '辽宁省' },
  { name: '阜新蒙古族自治县', lat: 42.0167, lng: 121.6667, level: 'autonomous_county', parent: '阜新', province: '辽宁省' },
  { name: '喀喇沁左翼蒙古族自治县', lat: 41.1167, lng: 119.7333, level: 'autonomous_county', parent: '朝阳', province: '辽宁省' },
  
  // 吉林省（3个）
  { name: '前郭尔罗斯蒙古族自治县', lat: 45.1167, lng: 124.8167, level: 'autonomous_county', parent: '松原', province: '吉林省' },
  { name: '长白朝鲜族自治县', lat: 41.4167, lng: 128.2000, level: 'autonomous_county', parent: '白山', province: '吉林省' },
  { name: '伊通满族自治县', lat: 43.3333, lng: 125.3000, level: 'autonomous_county', parent: '四平', province: '吉林省' },
  
  // 黑龙江省（1个）
  { name: '杜尔伯特蒙古族自治县', lat: 46.8667, lng: 124.4333, level: 'autonomous_county', parent: '大庆', province: '黑龙江省' },
  
  // 浙江省（1个）
  { name: '景宁畲族自治县', lat: 27.9667, lng: 119.6333, level: 'autonomous_county', parent: '丽水', province: '浙江省' },
  
  // 湖北省（2个）
  { name: '长阳土家族自治县', lat: 30.4667, lng: 111.1833, level: 'autonomous_county', parent: '宜昌', province: '湖北省' },
  { name: '五峰土家族自治县', lat: 30.2000, lng: 110.6667, level: 'autonomous_county', parent: '宜昌', province: '湖北省' },
  
  // 湖南省（7个）
  { name: '靖州苗族侗族自治县', lat: 26.5667, lng: 109.6833, level: 'autonomous_county', parent: '怀化', province: '湖南省' },
  { name: '新晃侗族自治县', lat: 27.3500, lng: 109.1667, level: 'autonomous_county', parent: '怀化', province: '湖南省' },
  { name: '芷江侗族自治县', lat: 27.4333, lng: 109.6833, level: 'autonomous_county', parent: '怀化', province: '湖南省' },
  { name: '通道侗族自治县', lat: 26.1500, lng: 109.7833, level: 'autonomous_county', parent: '怀化', province: '湖南省' },
  { name: '麻阳苗族自治县', lat: 27.8667, lng: 109.8000, level: 'autonomous_county', parent: '怀化', province: '湖南省' },
  { name: '城步苗族自治县', lat: 26.3667, lng: 110.3167, level: 'autonomous_county', parent: '邵阳', province: '湖南省' },
  { name: '江华瑶族自治县', lat: 25.1833, lng: 111.5667, level: 'autonomous_county', parent: '永州', province: '湖南省' },
  
  // 广东省（3个）
  { name: '连山壮族瑶族自治县', lat: 24.5667, lng: 112.0833, level: 'autonomous_county', parent: '清远', province: '广东省' },
  { name: '连南瑶族自治县', lat: 24.7167, lng: 112.2833, level: 'autonomous_county', parent: '清远', province: '广东省' },
  { name: '乳源瑶族自治县', lat: 24.7833, lng: 113.2667, level: 'autonomous_county', parent: '韶关', province: '广东省' },
  
  // 广西壮族自治区（12个）
  { name: '环江毛南族自治县', lat: 24.8333, lng: 108.2500, level: 'autonomous_county', parent: '河池', province: '广西壮族自治区' },
  { name: '罗城仫佬族自治县', lat: 24.7833, lng: 108.9000, level: 'autonomous_county', parent: '河池', province: '广西壮族自治区' },
  { name: '巴马瑶族自治县', lat: 24.1333, lng: 107.2500, level: 'autonomous_county', parent: '河池', province: '广西壮族自治区' },
  { name: '都安瑶族自治县', lat: 23.9333, lng: 108.0833, level: 'autonomous_county', parent: '河池', province: '广西壮族自治区' },
  { name: '大化瑶族自治县', lat: 23.7333, lng: 107.9833, level: 'autonomous_county', parent: '河池', province: '广西壮族自治区' },
  { name: '融水苗族自治县', lat: 25.0667, lng: 109.2500, level: 'autonomous_county', parent: '柳州', province: '广西壮族自治区' },
  { name: '三江侗族自治县', lat: 25.7833, lng: 109.6000, level: 'autonomous_county', parent: '柳州', province: '广西壮族自治区' },
  { name: '恭城瑶族自治县', lat: 24.8333, lng: 110.8333, level: 'autonomous_county', parent: '桂林', province: '广西壮族自治区' },
  { name: '龙胜各族自治县', lat: 25.7833, lng: 110.0000, level: 'autonomous_county', parent: '桂林', province: '广西壮族自治区' },
  { name: '隆林各族自治县', lat: 24.7667, lng: 105.3333, level: 'autonomous_county', parent: '百色', province: '广西壮族自治区' },
  { name: '富川瑶族自治县', lat: 24.8167, lng: 111.2667, level: 'autonomous_county', parent: '贺州', province: '广西壮族自治区' },
  { name: '金秀瑶族自治县', lat: 24.1333, lng: 110.1833, level: 'autonomous_county', parent: '来宾', province: '广西壮族自治区' },
  
  // 海南省（6个）
  { name: '昌江黎族自治县', lat: 19.2500, lng: 109.0500, level: 'autonomous_county', parent: '昌江', province: '海南省' },
  { name: '白沙黎族自治县', lat: 19.2167, lng: 109.4333, level: 'autonomous_county', parent: '白沙', province: '海南省' },
  { name: '乐东黎族自治县', lat: 18.7500, lng: 109.1667, level: 'autonomous_county', parent: '乐东', province: '海南省' },
  { name: '陵水黎族自治县', lat: 18.5000, lng: 110.0333, level: 'autonomous_county', parent: '陵水', province: '海南省' },
  { name: '保亭黎族苗族自治县', lat: 18.6333, lng: 109.7000, level: 'autonomous_county', parent: '保亭', province: '海南省' },
  { name: '琼中黎族苗族自治县', lat: 19.0333, lng: 109.8333, level: 'autonomous_county', parent: '琼中', province: '海南省' },
  
  // 重庆市（4个）
  { name: '石柱土家族自治县', lat: 29.9833, lng: 108.1167, level: 'autonomous_county', parent: '重庆', province: '重庆市' },
  { name: '彭水苗族土家族自治县', lat: 29.2833, lng: 108.1667, level: 'autonomous_county', parent: '重庆', province: '重庆市' },
  { name: '酉阳土家族苗族自治县', lat: 28.8333, lng: 108.7667, level: 'autonomous_county', parent: '重庆', province: '重庆市' },
  { name: '秀山土家族苗族自治县', lat: 28.4500, lng: 108.9833, level: 'autonomous_county', parent: '重庆', province: '重庆市' },
  
  // 四川省（4个）
  { name: '马边彝族自治县', lat: 28.8333, lng: 103.5333, level: 'autonomous_county', parent: '乐山', province: '四川省' },
  { name: '峨边彝族自治县', lat: 29.2167, lng: 103.2667, level: 'autonomous_county', parent: '乐山', province: '四川省' },
  { name: '北川羌族自治县', lat: 31.8167, lng: 104.4333, level: 'autonomous_county', parent: '绵阳', province: '四川省' },
  { name: '木里藏族自治县', lat: 27.9167, lng: 101.2667, level: 'autonomous_county', parent: '凉山', province: '四川省' },
  
  // 贵州省（11个）
  { name: '威宁彝族回族苗族自治县', lat: 26.8667, lng: 104.2833, level: 'autonomous_county', parent: '毕节', province: '贵州省' },
  { name: '道真仡佬族苗族自治县', lat: 28.8833, lng: 107.6000, level: 'autonomous_county', parent: '遵义', province: '贵州省' },
  { name: '务川仡佬族苗族自治县', lat: 28.5333, lng: 107.8833, level: 'autonomous_county', parent: '遵义', province: '贵州省' },
  { name: '关岭布依族苗族自治县', lat: 25.9333, lng: 105.6167, level: 'autonomous_county', parent: '安顺', province: '贵州省' },
  { name: '镇宁布依族苗族自治县', lat: 26.0667, lng: 105.7667, level: 'autonomous_county', parent: '安顺', province: '贵州省' },
  { name: '紫云苗族布依族自治县', lat: 25.7500, lng: 106.0833, level: 'autonomous_county', parent: '安顺', province: '贵州省' },
  { name: '印江土家族苗族自治县', lat: 27.9833, lng: 108.4000, level: 'autonomous_county', parent: '铜仁', province: '贵州省' },
  { name: '沿河土家族自治县', lat: 28.5667, lng: 108.5000, level: 'autonomous_county', parent: '铜仁', province: '贵州省' },
  { name: '松桃苗族自治县', lat: 28.1667, lng: 109.2000, level: 'autonomous_county', parent: '铜仁', province: '贵州省' },
  { name: '玉屏侗族自治县', lat: 27.2333, lng: 108.9167, level: 'autonomous_county', parent: '铜仁', province: '贵州省' },
  { name: '三都水族自治县', lat: 25.9833, lng: 107.8667, level: 'autonomous_county', parent: '黔南', province: '贵州省' },
  
  // 云南省（29个）
  { name: '宁蒗彝族自治县', lat: 27.2833, lng: 100.8500, level: 'autonomous_county', parent: '丽江', province: '云南省' },
  { name: '玉龙纳西族自治县', lat: 26.8333, lng: 100.2333, level: 'autonomous_county', parent: '丽江', province: '云南省' },
  { name: '石林彝族自治县', lat: 24.7667, lng: 103.2667, level: 'autonomous_county', parent: '昆明', province: '云南省' },
  { name: '禄劝彝族苗族自治县', lat: 25.5500, lng: 102.4667, level: 'autonomous_county', parent: '昆明', province: '云南省' },
  { name: '寻甸回族彝族自治县', lat: 25.5667, lng: 103.2500, level: 'autonomous_county', parent: '昆明', province: '云南省' },
  { name: '峨山彝族自治县', lat: 24.1667, lng: 102.4000, level: 'autonomous_county', parent: '玉溪', province: '云南省' },
  { name: '新平彝族傣族自治县', lat: 24.0667, lng: 101.9833, level: 'autonomous_county', parent: '玉溪', province: '云南省' },
  { name: '元江哈尼族彝族傣族自治县', lat: 23.6000, lng: 101.9833, level: 'autonomous_county', parent: '玉溪', province: '云南省' },
  { name: '沧源佤族自治县', lat: 23.1500, lng: 99.2500, level: 'autonomous_county', parent: '临沧', province: '云南省' },
  { name: '耿马傣族佤族自治县', lat: 23.5333, lng: 99.4000, level: 'autonomous_county', parent: '临沧', province: '云南省' },
  { name: '双江拉祜族佤族布朗族傣族自治县', lat: 23.4667, lng: 99.8167, level: 'autonomous_county', parent: '临沧', province: '云南省' },
  { name: '景东彝族自治县', lat: 24.4333, lng: 100.8333, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '西盟佤族自治县', lat: 22.7333, lng: 99.4833, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '澜沧拉祜族自治县', lat: 22.5500, lng: 99.9333, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '墨江哈尼族自治县', lat: 23.4333, lng: 101.6833, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '景谷傣族彝族自治县', lat: 23.5000, lng: 100.7000, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '江城哈尼族彝族自治县', lat: 22.5833, lng: 101.8500, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '宁洱哈尼族彝族自治县', lat: 23.0667, lng: 101.0500, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '孟连傣族拉祜族佤族自治县', lat: 22.3167, lng: 99.5833, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '镇沅彝族哈尼族拉祜族自治县', lat: 24.0000, lng: 101.1000, level: 'autonomous_county', parent: '普洱', province: '云南省' },
  { name: '维西傈僳族自治县', lat: 27.1667, lng: 99.2833, level: 'autonomous_county', parent: '迪庆', province: '云南省' },
  { name: '兰坪白族普米族自治县', lat: 26.4500, lng: 99.4167, level: 'autonomous_county', parent: '怒江', province: '云南省' },
  { name: '贡山独龙族怒族自治县', lat: 27.7333, lng: 98.6667, level: 'autonomous_county', parent: '怒江', province: '云南省' },
  { name: '漾濞彝族自治县', lat: 25.6667, lng: 99.9500, level: 'autonomous_county', parent: '大理', province: '云南省' },
  { name: '南涧彝族自治县', lat: 25.0333, lng: 100.5167, level: 'autonomous_county', parent: '大理', province: '云南省' },
  { name: '巍山彝族回族自治县', lat: 25.2167, lng: 100.3000, level: 'autonomous_county', parent: '大理', province: '云南省' },
  { name: '河口瑶族自治县', lat: 22.5167, lng: 103.9500, level: 'autonomous_county', parent: '红河', province: '云南省' },
  { name: '屏边苗族自治县', lat: 22.9833, lng: 103.6833, level: 'autonomous_county', parent: '红河', province: '云南省' },
  { name: '金平苗族瑶族傣族自治县', lat: 22.7667, lng: 103.2167, level: 'autonomous_county', parent: '红河', province: '云南省' },
  
  // 甘肃省（7个）
  { name: '张家川回族自治县', lat: 34.9833, lng: 106.2167, level: 'autonomous_county', parent: '天水', province: '甘肃省' },
  { name: '肃南裕固族自治县', lat: 38.8333, lng: 99.6167, level: 'autonomous_county', parent: '张掖', province: '甘肃省' },
  { name: '天祝藏族自治县', lat: 37.1333, lng: 103.1333, level: 'autonomous_county', parent: '武威', province: '甘肃省' },
  { name: '阿克塞哈萨克族自治县', lat: 39.6333, lng: 94.3333, level: 'autonomous_county', parent: '酒泉', province: '甘肃省' },
  { name: '肃北蒙古族自治县', lat: 39.5167, lng: 94.8667, level: 'autonomous_county', parent: '酒泉', province: '甘肃省' },
  { name: '东乡族自治县', lat: 35.6667, lng: 103.3833, level: 'autonomous_county', parent: '临夏', province: '甘肃省' },
  { name: '积石山保安族东乡族撒拉族自治县', lat: 35.7167, lng: 102.8667, level: 'autonomous_county', parent: '临夏', province: '甘肃省' },
  
  // 青海省（7个）
  { name: '大通回族土族自治县', lat: 36.9333, lng: 101.6833, level: 'autonomous_county', parent: '西宁', province: '青海省' },
  { name: '民和回族土族自治县', lat: 36.3167, lng: 102.8000, level: 'autonomous_county', parent: '海东', province: '青海省' },
  { name: '循化撒拉族自治县', lat: 35.8500, lng: 102.4833, level: 'autonomous_county', parent: '海东', province: '青海省' },
  { name: '互助土族自治县', lat: 36.8333, lng: 101.9500, level: 'autonomous_county', parent: '海东', province: '青海省' },
  { name: '化隆回族自治县', lat: 36.1000, lng: 102.2667, level: 'autonomous_county', parent: '海东', province: '青海省' },
  { name: '门源回族自治县', lat: 37.3667, lng: 101.6167, level: 'autonomous_county', parent: '海北', province: '青海省' },
  { name: '河南蒙古族自治县', lat: 34.7333, lng: 101.6000, level: 'autonomous_county', parent: '黄南', province: '青海省' },
  
  // 新疆维吾尔自治区（6个）
  { name: '塔什库尔干塔吉克自治县', lat: 37.7833, lng: 75.2167, level: 'autonomous_county', parent: '喀什', province: '新疆维吾尔自治区' },
  { name: '和布克赛尔蒙古自治县', lat: 46.7833, lng: 85.7167, level: 'autonomous_county', parent: '塔城', province: '新疆维吾尔自治区' },
  { name: '巴里坤哈萨克自治县', lat: 43.6000, lng: 93.0000, level: 'autonomous_county', parent: '哈密', province: '新疆维吾尔自治区' },
  { name: '察布查尔锡伯自治县', lat: 43.8333, lng: 81.1500, level: 'autonomous_county', parent: '伊犁', province: '新疆维吾尔自治区' },
  { name: '木垒哈萨克自治县', lat: 43.8333, lng: 90.2833, level: 'autonomous_county', parent: '昌吉', province: '新疆维吾尔自治区' },
  { name: '焉耆回族自治县', lat: 42.0667, lng: 86.5667, level: 'autonomous_county', parent: '巴音郭楞', province: '新疆维吾尔自治区' }
  
  // 这里可以继续添加其他省份的县数据
]
