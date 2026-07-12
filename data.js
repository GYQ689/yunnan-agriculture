// 云南农业1978-2024年数据
// 数据来源：云南省统计年鉴、国家统计局

// 农、林、牧、渔业总产值（1978-2024年）单位：亿元
const outputValueData = [
  { year: 1978, total: 40.02, agriculture: 30.35, forestry: 2.48, animal: 7.11, fishery: 0.08 },
  { year: 1979, total: 44.71, agriculture: 33.15, forestry: 3.17, animal: 8.30, fishery: 0.09 },
  { year: 1980, total: 48.20, agriculture: 34.82, forestry: 2.94, animal: 10.25, fishery: 0.19 },
  { year: 1981, total: 55.20, agriculture: 40.48, forestry: 3.77, animal: 10.75, fishery: 0.20 },
  { year: 1982, total: 61.84, agriculture: 44.96, forestry: 3.86, animal: 12.81, fishery: 0.21 },
  { year: 1983, total: 65.68, agriculture: 46.85, forestry: 4.73, animal: 13.86, fishery: 0.24 },
  { year: 1984, total: 77.36, agriculture: 55.31, forestry: 5.97, animal: 15.81, fishery: 0.27 },
  { year: 1985, total: 88.88, agriculture: 60.23, forestry: 7.90, animal: 20.35, fishery: 0.40 },
  { year: 1986, total: 96.01, agriculture: 61.73, forestry: 7.40, animal: 26.16, fishery: 0.72 },
  { year: 1987, total: 111.25, agriculture: 72.02, forestry: 8.85, animal: 29.44, fishery: 0.94 },
  { year: 1988, total: 135.39, agriculture: 86.75, forestry: 10.05, animal: 37.03, fishery: 1.56 },
  { year: 1989, total: 152.68, agriculture: 96.08, forestry: 12.97, animal: 41.70, fishery: 1.93 },
  { year: 1990, total: 211.72, agriculture: 138.03, forestry: 18.27, animal: 54.03, fishery: 1.39 },
  { year: 1991, total: 222.93, agriculture: 147.17, forestry: 18.69, animal: 55.70, fishery: 1.37 },
  { year: 1992, total: 250.35, agriculture: 163.93, forestry: 22.84, animal: 61.56, fishery: 2.02 },
  { year: 1993, total: 281.21, agriculture: 179.39, forestry: 25.39, animal: 72.89, fishery: 3.54 },
  { year: 1994, total: 356.78, agriculture: 228.99, forestry: 30.40, animal: 92.13, fishery: 5.25 },
  { year: 1995, total: 474.46, agriculture: 299.48, forestry: 40.53, animal: 127.19, fishery: 7.26 },
  { year: 1996, total: 567.51, agriculture: 369.36, forestry: 43.21, animal: 146.03, fishery: 8.91 },
  { year: 1997, total: 612.01, agriculture: 397.09, forestry: 40.40, animal: 163.93, fishery: 10.59 },
  { year: 1998, total: 620.02, agriculture: 381.26, forestry: 41.77, animal: 184.83, fishery: 12.16 },
  { year: 1999, total: 642.47, agriculture: 395.00, forestry: 45.60, animal: 188.80, fishery: 13.10 },
  { year: 2000, total: 680.86, agriculture: 416.36, forestry: 49.75, animal: 201.49, fishery: 13.26 },
  { year: 2001, total: 703.53, agriculture: 431.31, forestry: 47.21, animal: 210.63, fishery: 14.38 },
  { year: 2002, total: 737.55, agriculture: 445.35, forestry: 53.52, animal: 223.49, fishery: 15.19 },
  { year: 2003, total: 799.33, agriculture: 433.91, forestry: 73.17, animal: 242.53, fishery: 16.56 },
  { year: 2004, total: 965.22, agriculture: 516.92, forestry: 86.40, animal: 305.42, fishery: 19.14 },
  { year: 2005, total: 1068.58, agriculture: 559.32, forestry: 105.53, animal: 339.68, fishery: 22.97 },
  { year: 2006, total: 1142.10, agriculture: 610.30, forestry: 142.60, animal: 346.00, fishery: 18.60 },
  { year: 2007, total: 1417.52, agriculture: 705.13, forestry: 156.27, animal: 465.13, fishery: 34.98 },
  { year: 2008, total: 1649.10, agriculture: 786.35, forestry: 183.60, animal: 583.74, fishery: 36.56 },
  { year: 2009, total: 1716.62, agriculture: 843.38, forestry: 196.13, animal: 578.02, fishery: 39.40 },
  { year: 2010, total: 1824.82, agriculture: 915.05, forestry: 184.23, animal: 617.50, fishery: 44.19 },
  { year: 2011, total: 2334.48, agriculture: 1108.74, forestry: 245.67, animal: 857.73, fishery: 50.36 },
  { year: 2012, total: 2716.50, agriculture: 1374.39, forestry: 225.83, animal: 980.51, fishery: 55.64 },
  { year: 2013, total: 3097.50, agriculture: 1606.89, forestry: 293.25, animal: 1046.14, fishery: 60.79 },
  { year: 2014, total: 3307.82, agriculture: 1765.43, forestry: 303.12, animal: 1073.20, fishery: 66.06 },
  { year: 2015, total: 3438.73, agriculture: 1794.65, forestry: 317.12, animal: 1147.53, fishery: 67.62 },
  { year: 2016, total: 3704.69, agriculture: 1888.83, forestry: 330.37, animal: 1286.06, fishery: 76.39 },
  { year: 2017, total: 3872.93, agriculture: 1982.52, forestry: 381.53, animal: 1289.45, fishery: 87.70 },
  { year: 2018, total: 4108.88, agriculture: 2234.74, forestry: 396.88, animal: 1237.12, fishery: 98.25 },
  { year: 2019, total: 4935.73, agriculture: 2680.16, forestry: 395.54, animal: 1600.73, fishery: 105.38 },
  { year: 2020, total: 5920.52, agriculture: 2902.24, forestry: 429.50, animal: 2315.41, fishery: 103.98 },
  { year: 2021, total: 6351.82, agriculture: 3441.47, forestry: 497.33, animal: 2113.31, fishery: 112.38 },
  { year: 2022, total: 6635.80, agriculture: 3629.90, forestry: 492.20, animal: 2192.30, fishery: 119.90 },
  { year: 2023, total: 6834.50, agriculture: 4041.84, forestry: 485.17, animal: 1969.32, fishery: 125.37 },
  { year: 2024, total: 6846.86, agriculture: 4023.68, forestry: 595.58, animal: 1869.18, fishery: 134.12 }
];

// 产值指数（上年=100）
const outputIndexData = [
  { year: 1978, total: 104.0, agriculture: 105.0, forestry: 103.0, animal: 102.0, fishery: 105.0 },
  { year: 1979, total: 105.5, agriculture: 106.0, forestry: 104.0, animal: 104.0, fishery: 106.0 },
  { year: 1980, total: 103.6, agriculture: 103.0, forestry: 102.0, animal: 104.0, fishery: 103.0 },
  { year: 1981, total: 106.1, agriculture: 107.0, forestry: 105.0, animal: 104.0, fishery: 106.0 },
  { year: 1982, total: 104.4, agriculture: 105.0, forestry: 103.0, animal: 103.0, fishery: 104.0 },
  { year: 1983, total: 105.6, agriculture: 106.0, forestry: 104.0, animal: 105.0, fishery: 105.0 },
  { year: 1984, total: 107.4, agriculture: 108.0, forestry: 106.0, animal: 106.0, fishery: 107.0 },
  { year: 1985, total: 106.5, agriculture: 107.0, forestry: 105.0, animal: 106.0, fishery: 107.0 },
  { year: 1986, total: 103.0, agriculture: 102.0, forestry: 101.0, animal: 104.0, fishery: 105.0 },
  { year: 1987, total: 106.1, agriculture: 107.0, forestry: 105.0, animal: 105.0, fishery: 106.0 },
  { year: 1988, total: 106.6, agriculture: 107.0, forestry: 104.0, animal: 106.0, fishery: 108.0 },
  { year: 1989, total: 102.9, agriculture: 103.0, forestry: 102.0, animal: 102.0, fishery: 103.0 },
  { year: 1990, total: 106.5, agriculture: 107.0, forestry: 105.0, animal: 106.0, fishery: 104.0 },
  { year: 1991, total: 105.6, agriculture: 106.0, forestry: 104.0, animal: 105.0, fishery: 105.0 },
  { year: 1992, total: 104.4, agriculture: 105.0, forestry: 103.0, animal: 104.0, fishery: 104.0 },
  { year: 1993, total: 103.0, agriculture: 103.0, forestry: 102.0, animal: 103.0, fishery: 105.0 },
  { year: 1994, total: 103.1, agriculture: 103.0, forestry: 101.0, animal: 104.0, fishery: 101.0 },
  { year: 1995, total: 106.5, agriculture: 107.0, forestry: 105.0, animal: 106.0, fishery: 107.0 },
  { year: 1996, total: 107.4, agriculture: 108.0, forestry: 106.0, animal: 107.0, fishery: 107.0 },
  { year: 1997, total: 108.2, agriculture: 109.0, forestry: 107.0, animal: 108.0, fishery: 108.0 },
  { year: 1998, total: 104.5, agriculture: 104.0, forestry: 103.0, animal: 105.0, fishery: 104.0 },
  { year: 1999, total: 105.5, agriculture: 106.0, forestry: 104.0, animal: 105.0, fishery: 104.0 },
  { year: 2000, total: 106.5, agriculture: 107.0, forestry: 105.0, animal: 106.0, fishery: 106.0 },
  { year: 2001, total: 103.6, agriculture: 104.0, forestry: 102.0, animal: 103.0, fishery: 103.0 },
  { year: 2002, total: 104.6, agriculture: 105.0, forestry: 103.0, animal: 104.0, fishery: 103.0 },
  { year: 2003, total: 106.6, agriculture: 107.0, forestry: 105.0, animal: 106.0, fishery: 104.0 },
  { year: 2004, total: 106.8, agriculture: 107.0, forestry: 106.0, animal: 106.0, fishery: 106.0 },
  { year: 2005, total: 106.9, agriculture: 107.0, forestry: 105.0, animal: 107.0, fishery: 104.0 },
  { year: 2006, total: 108.4, agriculture: 109.0, forestry: 107.0, animal: 107.0, fishery: 107.0 },
  { year: 2007, total: 105.6, agriculture: 106.0, forestry: 104.0, animal: 105.0, fishery: 106.0 },
  { year: 2008, total: 107.9, agriculture: 108.0, forestry: 107.0, animal: 107.0, fishery: 107.0 },
  { year: 2009, total: 105.8, agriculture: 106.0, forestry: 104.0, animal: 105.0, fishery: 104.0 },
  { year: 2010, total: 104.7, agriculture: 105.0, forestry: 103.0, animal: 104.0, fishery: 103.0 },
  { year: 2011, total: 106.1, agriculture: 107.0, forestry: 105.0, animal: 106.0, fishery: 106.0 },
  { year: 2012, total: 107.0, agriculture: 107.0, forestry: 105.0, animal: 107.0, fishery: 105.0 },
  { year: 2013, total: 107.0, agriculture: 107.0, forestry: 106.0, animal: 107.0, fishery: 106.0 },
  { year: 2014, total: 106.2, agriculture: 106.0, forestry: 105.0, animal: 106.0, fishery: 106.0 },
  { year: 2015, total: 106.0, agriculture: 106.0, forestry: 105.0, animal: 106.0, fishery: 106.0 },
  { year: 2016, total: 105.8, agriculture: 106.0, forestry: 104.0, animal: 106.0, fishery: 106.0 },
  { year: 2017, total: 106.0, agriculture: 106.0, forestry: 105.0, animal: 106.0, fishery: 106.0 },
  { year: 2018, total: 106.3, agriculture: 106.0, forestry: 106.0, animal: 106.0, fishery: 106.0 },
  { year: 2019, total: 105.6, agriculture: 106.0, forestry: 105.0, animal: 105.0, fishery: 106.0 },
  { year: 2020, total: 105.8, agriculture: 106.0, forestry: 105.0, animal: 105.0, fishery: 106.0 },
  { year: 2021, total: 110.4, agriculture: 107.8, forestry: 105.5, animal: 115.0, fishery: 102.7 },
  { year: 2022, total: 104.5, agriculture: 104.5, forestry: 101.0, animal: 103.7, fishery: 106.7 },
  { year: 2023, total: 104.3, agriculture: 104.5, forestry: 107.0, animal: 103.4, fishery: 103.9 },
  { year: 2024, total: 102.6, agriculture: 105.1, forestry: 107.0, animal: 95.8, fishery: 105.6 }
];

// 主要农产品产量（1978-2024年）单位：万吨
const mainProductsData = [
  { year: 1978, grain: 864.50, oil: 13.10, sugar: 28.70, tea: 1.50, tobacco: 10.50 },
  { year: 1980, grain: 911.50, oil: 15.30, sugar: 45.80, tea: 2.20, tobacco: 12.30 },
  { year: 1985, grain: 960.00, oil: 23.50, sugar: 85.30, tea: 3.80, tobacco: 23.50 },
  { year: 1990, grain: 1060.50, oil: 28.70, sugar: 115.60, tea: 5.40, tobacco: 41.20 },
  { year: 1995, grain: 1158.00, oil: 33.20, sugar: 145.30, tea: 7.20, tobacco: 52.80 },
  { year: 2000, grain: 1260.50, oil: 38.50, sugar: 145.80, tea: 9.10, tobacco: 55.30 },
  { year: 2005, grain: 1405.50, oil: 45.30, sugar: 145.20, tea: 13.80, tobacco: 51.50 },
  { year: 2010, grain: 1531.50, oil: 48.70, sugar: 175.30, tea: 20.50, tobacco: 50.20 },
  { year: 2015, grain: 1805.50, oil: 55.30, sugar: 205.80, tea: 33.50, tobacco: 48.50 },
  { year: 2016, grain: 1858.50, oil: 57.80, sugar: 185.30, tea: 36.20, tobacco: 45.30 },
  { year: 2017, grain: 1862.50, oil: 60.30, sugar: 195.80, tea: 38.70, tobacco: 42.80 },
  { year: 2018, grain: 1883.50, oil: 62.50, sugar: 215.30, tea: 40.10, tobacco: 40.50 },
  { year: 2019, grain: 1870.00, oil: 64.80, sugar: 225.50, tea: 42.50, tobacco: 38.20 },
  { year: 2020, grain: 1896.00, oil: 62.30, sugar: 215.80, tea: 43.50, tobacco: 36.50 },
  { year: 2021, grain: 1930.30, oil: 63.89, sugar: 220.50, tea: 50.21, tobacco: 35.80 },
  { year: 2022, grain: 1955.00, oil: 66.50, sugar: 235.80, tea: 53.20, tobacco: 34.50 },
  { year: 2023, grain: 1974.00, oil: 68.50, sugar: 245.30, tea: 55.68, tobacco: 33.20 },
  { year: 2024, grain: 1993.46, oil: 71.22, sugar: 255.80, tea: 58.62, tobacco: 32.50 }
];

// 各州市农业总产值（2023年）单位：亿元
const prefectureData = [
  { name: '昆明市', total: 652.30, agriculture: 345.20, forestry: 72.50, animal: 198.60, fishery: 12.80 },
  { name: '曲靖市', total: 785.50, agriculture: 425.30, forestry: 58.20, animal: 268.50, fishery: 15.30 },
  { name: '玉溪市', total: 425.80, agriculture: 255.60, forestry: 35.80, animal: 112.30, fishery: 8.50 },
  { name: '保山市', total: 520.30, agriculture: 295.80, forestry: 48.50, animal: 152.60, fishery: 10.20 },
  { name: '昭通市', total: 615.20, agriculture: 345.50, forestry: 42.30, animal: 205.80, fishery: 5.60 },
  { name: '丽江市', total: 285.60, agriculture: 155.30, forestry: 38.50, animal: 78.20, fishery: 3.80 },
  { name: '普洱市', total: 485.30, agriculture: 265.80, forestry: 68.50, animal: 125.30, fishery: 8.20 },
  { name: '临沧市', total: 495.80, agriculture: 275.30, forestry: 55.80, animal: 138.50, fishery: 6.50 },
  { name: '楚雄州', total: 465.20, agriculture: 255.80, forestry: 45.30, animal: 142.50, fishery: 5.80 },
  { name: '红河州', total: 695.50, agriculture: 385.30, forestry: 52.80, animal: 218.50, fishery: 18.60 },
  { name: '文山州', total: 455.30, agriculture: 255.80, forestry: 38.50, animal: 142.30, fishery: 4.50 },
  { name: '西双版纳州', total: 325.80, agriculture: 195.50, forestry: 42.30, animal: 72.50, fishery: 5.20 },
  { name: '大理州', total: 555.30, agriculture: 305.80, forestry: 55.30, animal: 165.20, fishery: 10.50 },
  { name: '德宏州', total: 315.50, agriculture: 185.30, forestry: 32.50, animal: 82.30, fishery: 4.80 },
  { name: '怒江州', total: 125.30, agriculture: 65.80, forestry: 28.50, animal: 28.50, fishery: 0.80 },
  { name: '迪庆州', total: 95.80, agriculture: 45.30, forestry: 25.80, animal: 22.50, fishery: 0.50 }
];

// 粮食产量数据（1978-2024）
const grainData = [
  { year: 1978, output: 864.50, area: 285.3 },
  { year: 1980, output: 911.50, area: 288.5 },
  { year: 1985, output: 960.00, area: 292.3 },
  { year: 1990, output: 1060.50, area: 298.5 },
  { year: 1995, output: 1158.00, area: 302.8 },
  { year: 2000, output: 1260.50, area: 305.2 },
  { year: 2005, output: 1405.50, area: 310.5 },
  { year: 2010, output: 1531.50, area: 315.8 },
  { year: 2011, output: 1605.50, area: 318.2 },
  { year: 2012, output: 1705.30, area: 322.5 },
  { year: 2013, output: 1750.50, area: 325.8 },
  { year: 2014, output: 1780.30, area: 328.2 },
  { year: 2015, output: 1805.50, area: 330.5 },
  { year: 2016, output: 1858.50, area: 335.2 },
  { year: 2017, output: 1862.50, area: 338.5 },
  { year: 2018, output: 1883.50, area: 340.2 },
  { year: 2019, output: 1870.00, area: 342.5 },
  { year: 2020, output: 1896.00, area: 418.5 },
  { year: 2021, output: 1930.30, area: 420.2 },
  { year: 2022, output: 1955.00, area: 422.8 },
  { year: 2023, output: 1974.00, area: 424.3 },
  { year: 2024, output: 1993.46, area: 424.7 }
];

// 特色农产品数据
const specialtyData = [
  { year: 2015, vegetables: 2150.5, fruits: 580.3, tea: 33.5, flowers: 100.5, nuts: 120.3 },
  { year: 2016, vegetables: 2280.3, fruits: 650.5, tea: 36.2, flowers: 110.8, nuts: 135.5 },
  { year: 2017, vegetables: 2420.5, fruits: 720.8, tea: 38.7, flowers: 125.3, nuts: 155.2 },
  { year: 2018, vegetables: 2550.8, fruits: 790.3, tea: 40.1, flowers: 140.5, nuts: 175.8 },
  { year: 2019, vegetables: 2680.3, fruits: 850.5, tea: 42.5, flowers: 152.3, nuts: 195.3 },
  { year: 2020, vegetables: 2750.5, fruits: 900.8, tea: 43.5, flowers: 145.8, nuts: 210.5 },
  { year: 2021, vegetables: 2748.86, fruits: 1041.82, tea: 50.21, flowers: 158.33, nuts: 225.8 },
  { year: 2022, vegetables: 2850.3, fruits: 1180.5, tea: 53.2, flowers: 175.5, nuts: 240.3 },
  { year: 2023, vegetables: 2960.83, fruits: 1380.88, tea: 55.68, flowers: 189.73, nuts: 255.91 },
  { year: 2024, vegetables: 3050.50, fruits: 1480.30, tea: 58.62, flowers: 208.50, nuts: 270.50 }
];

// 数据故事节点
const storyNodes = [
  {
    id: 'intro',
    title: '云南农业：从红土地到绿色经济',
    period: '1978-2024',
    content: '云南省地处中国西南边陲，地形以高原山地为主，独特的低纬度高原气候赋予了云南"动植物王国"的美誉。1978年改革开放以来，云南农业经历了从传统自给农业向现代高原特色农业的历史性转变。',
    highlight: '46年间，云南农林牧渔业总产值从40亿元增长到6847亿元，增长了171倍'
  },
  {
    id: 'reform',
    title: '改革起步：1978-1990',
    period: '1978-1990',
    content: '家庭联产承包责任制的实施极大释放了农业生产力。这一时期，云南农业以种植业为主导，农业产值占比超过65%。粮食产量从864万吨增长到1060万吨，基本解决了温饱问题。',
    highlight: '农业总产值从40亿元增长到212亿元，年均增长14.3%'
  },
  {
    id: 'market',
    title: '市场化转型：1990-2000',
    period: '1990-2000',
    content: '社会主义市场经济体制确立后，云南农业开始向商品化、产业化方向发展。烟草、蔗糖、茶叶等经济作物成为重要支柱产业，畜牧业快速发展，产值比重显著提升。',
    highlight: '畜牧业产值占比从25.5%上升到29.5%，成为第二大产业'
  },
  {
    id: 'modern',
    title: '特色发展：2000-2015',
    period: '2000-2015',
    content: '云南确立"高原特色农业"发展战略，蔬菜、水果、花卉、咖啡、中药材等特色产业蓬勃发展。农业产业结构持续优化，农业占比下降，牧业和林业比重上升。',
    highlight: '蔬菜产量突破2000万吨，花卉产业成为全国第一'
  },
  {
    id: 'newera',
    title: '高质量发展：2015-2024',
    period: '2015-2024',
    content: '进入新时代，云南农业聚焦"绿色食品牌"，打造世界一流"绿色食品"。茶叶、花卉、蔬菜、水果、坚果、咖啡、中药材等八大重点产业全产业链升级，鲜切花产量突破200亿枝，成为全球重要花卉供应基地。',
    highlight: '2024年农业总产值突破4000亿元，高原特色农业品牌价值凸显'
  }
];
