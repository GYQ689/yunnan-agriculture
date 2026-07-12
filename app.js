// ============================================
// 全局图表注册表 + 懒加载
// ============================================
const chartInstances = [];
function registerChart(chart) {
    chartInstances.push(chart);
    return chart;
}
function resizeAllCharts() {
    chartInstances.forEach(c => { try { c.resize(); } catch(e) {} });
}

// 懒加载：记录每个 section 是否已初始化
const initializedSections = new Set();

function initSection(sectionId) {
    if (initializedSections.has(sectionId)) return;
    initializedSections.add(sectionId);
    switch(sectionId) {
        case 'overview': initOverviewChart(); break;
        case 'trend': initTrendCharts(); break;
        case 'structure': initStructureCharts(); break;
        case 'products': initProductCharts(); break;
        case 'region': initRegionCharts(); break;
        case 'map': initMapCharts(); break;
        case 'story': initStoryCharts(); break;
    }
    setTimeout(resizeAllCharts, 100);
    setTimeout(resizeAllCharts, 300);
}

// ============================================
// 导航切换
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            initSection(targetId);
        });
    });

    // 只初始化当前可见的概览页面
    initSection('overview');
});

window.addEventListener('resize', () => {
    setTimeout(resizeAllCharts, 100);
});

// ============================================
// 1. 概览 - 总产值趋势
// ============================================
function initOverviewChart() {
    const chart = registerChart(echarts.init(document.getElementById('overview-line')));
    const years = outputValueData.map(d => d.year);
    chart.setOption({
        title: { text: '农林牧渔业总产值变化（1978-2024）', left: 'center', textStyle: { fontSize: 16 } },
        tooltip: { trigger: 'axis', formatter: function(params) {
            let s = params[0].axisValue + '年<br/>';
            params.forEach(p => { s += p.marker + p.seriesName + ': ' + p.value + ' 亿元<br/>'; });
            return s;
        }},
        legend: { bottom: 0, data: ['农业','林业','牧业','渔业'] },
        grid: { left: 70, right: 30, top: 60, bottom: 50 },
        xAxis: { type: 'category', data: years, axisLabel: { formatter: '{value}年' } },
        yAxis: { type: 'value', name: '亿元', axisLabel: { formatter: '{value}' } },
        series: [
            { name: '农业', type: 'line', data: outputValueData.map(d => d.agriculture), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#5470c6' } },
            { name: '林业', type: 'line', data: outputValueData.map(d => d.forestry), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#91cc75' } },
            { name: '牧业', type: 'line', data: outputValueData.map(d => d.animal), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#fac858' } },
            { name: '渔业', type: 'line', data: outputValueData.map(d => d.fishery), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#ee6666' } }
        ]
    });
}

// ============================================
// 2. 产值趋势
// ============================================
function initTrendCharts() {
    const trendChart = registerChart(echarts.init(document.getElementById('trend-line')));
    const years = outputValueData.map(d => d.year);
    trendChart.setOption({
        title: { text: '各产业产值变化趋势（1978-2024）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0, data: ['农业','林业','牧业','渔业'] },
        grid: { left: 70, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: years, axisLabel: { formatter: '{value}年', rotate: 45 } },
        yAxis: { type: 'value', name: '亿元' },
        series: [
            { name: '农业', type: 'line', data: outputValueData.map(d => d.agriculture), smooth: true, symbolSize: 4, itemStyle: { color: '#5470c6' } },
            { name: '林业', type: 'line', data: outputValueData.map(d => d.forestry), smooth: true, symbolSize: 4, itemStyle: { color: '#91cc75' } },
            { name: '牧业', type: 'line', data: outputValueData.map(d => d.animal), smooth: true, symbolSize: 4, itemStyle: { color: '#fac858' } },
            { name: '渔业', type: 'line', data: outputValueData.map(d => d.fishery), smooth: true, symbolSize: 4, itemStyle: { color: '#ee6666' } }
        ]
    });

    const indexChart = registerChart(echarts.init(document.getElementById('index-line')));
    const indexYears = outputIndexData.map(d => d.year);
    indexChart.setOption({
        title: { text: '产值指数趋势（上年=100）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis', formatter: function(params) {
            let s = params[0].axisValue + '年<br/>';
            params.forEach(p => { s += p.marker + p.seriesName + ': ' + p.value + '<br/>'; });
            return s;
        }},
        legend: { bottom: 0 },
        grid: { left: 60, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: indexYears, axisLabel: { formatter: '{value}年', rotate: 45 } },
        yAxis: { type: 'value', name: '指数', min: 90, max: 115 },
        series: [
            { name: '总产值指数', type: 'line', data: outputIndexData.map(d => d.total), smooth: true, markLine: { data: [{ yAxis: 100, label: { formatter: '基准线100' } }] }, itemStyle: { color: '#5470c6' } },
            { name: '农业指数', type: 'line', data: outputIndexData.map(d => d.agriculture), smooth: true, itemStyle: { color: '#91cc75' } },
            { name: '林业指数', type: 'line', data: outputIndexData.map(d => d.forestry), smooth: true, itemStyle: { color: '#fac858' } },
            { name: '牧业指数', type: 'line', data: outputIndexData.map(d => d.animal), smooth: true, itemStyle: { color: '#ee6666' } },
            { name: '渔业指数', type: 'line', data: outputIndexData.map(d => d.fishery), smooth: true, itemStyle: { color: '#73c0de' } }
        ]
    });

    const grainChart = registerChart(echarts.init(document.getElementById('grain-line')));
    grainChart.setOption({
        title: { text: '粮食产量变化趋势（1978-2024）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0, data: ['粮食产量','播种面积'] },
        grid: { left: 70, right: 70, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: grainData.map(d => d.year), axisLabel: { formatter: '{value}年', rotate: 45 } },
        yAxis: [
            { type: 'value', name: '万吨', position: 'left' },
            { type: 'value', name: '千公顷', position: 'right' }
        ],
        series: [
            { name: '粮食产量', type: 'bar', data: grainData.map(d => d.output), itemStyle: { color: '#fac858' }, barMaxWidth: 20 },
            { name: '播种面积', type: 'line', yAxisIndex: 1, data: grainData.map(d => d.area), smooth: true, itemStyle: { color: '#91cc75' } }
        ]
    });
}

// ============================================
// 3. 产业结构
// ============================================
let pieChartInstance = null;
function initStructureCharts() {
    pieChartInstance = registerChart(echarts.init(document.getElementById('structure-pie')));
    updatePie(2024);

    const slider = document.getElementById('year-slider');
    const display = document.getElementById('year-display');
    slider.addEventListener('input', function() {
        const year = parseInt(this.value);
        display.textContent = year + '年';
        updatePie(year);
    });

    const areaChart = registerChart(echarts.init(document.getElementById('structure-area')));
    const years = outputValueData.map(d => d.year);
    areaChart.setOption({
        title: { text: '产业结构变化（堆叠面积图）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        legend: { bottom: 0, data: ['农业','林业','牧业','渔业'] },
        grid: { left: 70, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: years, axisLabel: { formatter: '{value}年', rotate: 45, interval: 4 } },
        yAxis: { type: 'value', name: '亿元' },
        series: [
            { name: '农业', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: outputValueData.map(d => d.agriculture), itemStyle: { color: '#5470c6' } },
            { name: '林业', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: outputValueData.map(d => d.forestry), itemStyle: { color: '#91cc75' } },
            { name: '牧业', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: outputValueData.map(d => d.animal), itemStyle: { color: '#fac858' } },
            { name: '渔业', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: outputValueData.map(d => d.fishery), itemStyle: { color: '#ee6666' } }
        ]
    });

    const pctChart = registerChart(echarts.init(document.getElementById('structure-percent')));
    const pctYears = outputValueData.map(d => d.year);
    const agriPct = outputValueData.map(d => +((d.agriculture / d.total) * 100).toFixed(1));
    const forestPct = outputValueData.map(d => +((d.forestry / d.total) * 100).toFixed(1));
    const animalPct = outputValueData.map(d => +((d.animal / d.total) * 100).toFixed(1));
    const fishPct = outputValueData.map(d => +((d.fishery / d.total) * 100).toFixed(1));
    pctChart.setOption({
        title: { text: '各产业产值占比变化趋势', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis', formatter: function(params) {
            let s = params[0].axisValue + '年<br/>';
            params.forEach(p => { s += p.marker + p.seriesName + ': ' + p.value + '%<br/>'; });
            return s;
        }},
        legend: { bottom: 0 },
        grid: { left: 60, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: pctYears, axisLabel: { formatter: '{value}年', rotate: 45 } },
        yAxis: { type: 'value', name: '%', max: 100, axisLabel: { formatter: '{value}%' } },
        series: [
            { name: '农业占比', type: 'line', data: agriPct, smooth: true, areaStyle: { opacity: 0.5 }, itemStyle: { color: '#5470c6' } },
            { name: '林业占比', type: 'line', data: forestPct, smooth: true, areaStyle: { opacity: 0.5 }, itemStyle: { color: '#91cc75' } },
            { name: '牧业占比', type: 'line', data: animalPct, smooth: true, areaStyle: { opacity: 0.5 }, itemStyle: { color: '#fac858' } },
            { name: '渔业占比', type: 'line', data: fishPct, smooth: true, areaStyle: { opacity: 0.5 }, itemStyle: { color: '#ee6666' } }
        ]
    });
}

function updatePie(year) {
    if (!pieChartInstance) return;
    const item = outputValueData.find(d => d.year === year);
    if (!item) return;
    pieChartInstance.setOption({
        title: { text: year + '年产业产值结构', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'item', formatter: '{b}: {c}亿元 ({d}%)' },
        legend: { bottom: 0, data: ['农业','林业','牧业','渔业'] },
        series: [{
            type: 'pie', radius: ['30%', '60%'], center: ['50%', '50%'],
            label: { formatter: '{b}\n{d}%', fontSize: 13 },
            data: [
                { value: item.agriculture, name: '农业', itemStyle: { color: '#5470c6' } },
                { value: item.forestry, name: '林业', itemStyle: { color: '#91cc75' } },
                { value: item.animal, name: '牧业', itemStyle: { color: '#fac858' } },
                { value: item.fishery, name: '渔业', itemStyle: { color: '#ee6666' } }
            ]
        }]
    }, true);
}

// ============================================
// 4. 农产品产量
// ============================================
function initProductCharts() {
    const barChart = registerChart(echarts.init(document.getElementById('products-bar')));
    const years = mainProductsData.map(d => d.year);
    barChart.setOption({
        title: { text: '主要农产品产量变化', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0 },
        grid: { left: 70, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: years, axisLabel: { formatter: '{value}年', rotate: 45 } },
        yAxis: { type: 'value', name: '万吨' },
        series: [
            { name: '粮食', type: 'bar', data: mainProductsData.map(d => d.grain), itemStyle: { color: '#fac858' } },
            { name: '油料', type: 'bar', data: mainProductsData.map(d => d.oil), itemStyle: { color: '#91cc75' } },
            { name: '糖料', type: 'bar', data: mainProductsData.map(d => d.sugar), itemStyle: { color: '#ee6666' } },
            { name: '茶叶', type: 'bar', data: mainProductsData.map(d => d.tea), itemStyle: { color: '#5470c6' } },
            { name: '烤烟', type: 'bar', data: mainProductsData.map(d => d.tobacco), itemStyle: { color: '#73c0de' } }
        ]
    });

    const lineChart = registerChart(echarts.init(document.getElementById('specialty-line')));
    lineChart.setOption({
        title: { text: '高原特色农产品产量趋势（2015-2024）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0 },
        grid: { left: 70, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: specialtyData.map(d => d.year), axisLabel: { formatter: '{value}年' } },
        yAxis: { type: 'value', name: '万吨/亿枝' },
        series: [
            { name: '蔬菜', type: 'line', data: specialtyData.map(d => d.vegetables), smooth: true, itemStyle: { color: '#91cc75' } },
            { name: '水果', type: 'line', data: specialtyData.map(d => d.fruits), smooth: true, itemStyle: { color: '#fac858' } },
            { name: '茶叶', type: 'line', data: specialtyData.map(d => d.tea), smooth: true, itemStyle: { color: '#5470c6' } },
            { name: '鲜切花', type: 'line', data: specialtyData.map(d => d.flowers), smooth: true, itemStyle: { color: '#ee6666' } },
            { name: '坚果', type: 'line', data: specialtyData.map(d => d.nuts), smooth: true, itemStyle: { color: '#73c0de' } }
        ]
    });
}

// ============================================
// 5. 州市对比
// ============================================
function initRegionCharts() {
    const barChart = registerChart(echarts.init(document.getElementById('region-bar')));
    const sorted = [...prefectureData].sort((a, b) => a.total - b.total);
    barChart.setOption({
        title: { text: '各州市农林牧渔总产值排名（2023年）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: function(params) {
            let s = params[0].name + '<br/>';
            params.forEach(p => { s += p.marker + p.seriesName + ': ' + p.value + ' 亿元<br/>'; });
            return s;
        }},
        legend: { bottom: 0, data: ['农业','林业','牧业','渔业'] },
        grid: { left: 100, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'value', name: '亿元' },
        yAxis: { type: 'category', data: sorted.map(d => d.name) },
        series: [
            { name: '农业', type: 'bar', stack: 'total', data: sorted.map(d => d.agriculture), itemStyle: { color: '#5470c6' } },
            { name: '林业', type: 'bar', stack: 'total', data: sorted.map(d => d.forestry), itemStyle: { color: '#91cc75' } },
            { name: '牧业', type: 'bar', stack: 'total', data: sorted.map(d => d.animal), itemStyle: { color: '#fac858' } },
            { name: '渔业', type: 'bar', stack: 'total', data: sorted.map(d => d.fishery), itemStyle: { color: '#ee6666' } }
        ]
    });

    const bubbleChart = registerChart(echarts.init(document.getElementById('region-bubble')));
    const bubbleData = prefectureData.map(d => {
        const agriPct = +((d.agriculture / d.total) * 100).toFixed(1);
        const animalPct = +((d.animal / d.total) * 100).toFixed(1);
        const forestryPct = +((d.forestry / d.total) * 100).toFixed(1);
        return [agriPct, animalPct, d.total, d.name, forestryPct];
    });
    bubbleChart.setOption({
        title: { text: '各州市产业构成气泡图', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'item', formatter: function(p) {
            return p.data[3] + '<br/>农业占比: ' + p.data[0] + '%<br/>牧业占比: ' + p.data[1] + '%<br/>林业占比: ' + p.data[4] + '%<br/>总产值: ' + p.data[2] + '亿元';
        }},
        grid: { left: 80, right: 40, top: 60, bottom: 60 },
        xAxis: { name: '农业占比(%)', nameLocation: 'center', nameGap: 30, min: 30, max: 75, splitLine: { show: true, lineStyle: { type: 'dashed' } } },
        yAxis: { name: '牧业占比(%)', nameLocation: 'center', nameGap: 45, min: 15, max: 45, splitLine: { show: true, lineStyle: { type: 'dashed' } } },
        series: [{
            type: 'scatter',
            symbolSize: function(d) { return Math.sqrt(d[2]) * 1.5; },
            data: bubbleData,
            label: { show: true, formatter: function(p) { return p.data[3].replace('市','').replace('州',''); }, fontSize: 10, position: 'inside' },
            itemStyle: { color: function(params) {
                var colors = ['#5470c6','#91cc75','#fac858','#ee6666','#73c0de','#3ba272','#fc8452','#9a60b4','#ea7ccc','#5470c6','#91cc75','#fac858','#ee6666','#73c0de','#3ba272','#fc8452'];
                return colors[params.dataIndex % colors.length];
            }, opacity: 0.75 }
        }]
    });

    // 新增：各州市产值构成（堆叠柱状图）
    const compChart = registerChart(echarts.init(document.getElementById('region-composition')));
    const names = prefectureData.map(d => d.name);
    compChart.setOption({
        title: { text: '各州市产值构成（2023年）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { bottom: 0, data: ['农业','林业','牧业','渔业'] },
        grid: { left: 100, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: names, axisLabel: { rotate: 45, fontSize: 11 } },
        yAxis: { type: 'value', name: '亿元' },
        series: [
            { name: '农业', type: 'bar', stack: 'total', data: prefectureData.map(d => d.agriculture), itemStyle: { color: '#5470c6' } },
            { name: '林业', type: 'bar', stack: 'total', data: prefectureData.map(d => d.forestry), itemStyle: { color: '#91cc75' } },
            { name: '牧业', type: 'bar', stack: 'total', data: prefectureData.map(d => d.animal), itemStyle: { color: '#fac858' } },
            { name: '渔业', type: 'bar', stack: 'total', data: prefectureData.map(d => d.fishery), itemStyle: { color: '#ee6666' } }
        ]
    });

    const radarChart = registerChart(echarts.init(document.getElementById('region-radar')));
    const topCities = ['昆明市','曲靖市','红河州','大理州','昭通市'];
    const radarColors = ['#5470c6','#91cc75','#fac858','#ee6666','#73c0de'];
    radarChart.setOption({
        title: { text: '各州市产业结构对比（雷达图）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: {},
        legend: { bottom: 0, data: topCities },
        radar: {
            indicator: [
                { name: '农业占比', max: 80 },
                { name: '林业占比', max: 30 },
                { name: '牧业占比', max: 50 },
                { name: '渔业占比', max: 10 }
            ],
            center: ['50%', '50%'],
            radius: '60%'
        },
        series: [{
            type: 'radar',
            data: topCities.map((city, i) => {
                const d = prefectureData.find(p => p.name === city);
                return {
                    name: city,
                    value: [
                        +((d.agriculture / d.total) * 100).toFixed(1),
                        +((d.forestry / d.total) * 100).toFixed(1),
                        +((d.animal / d.total) * 100).toFixed(1),
                        +((d.fishery / d.total) * 100).toFixed(1)
                    ],
                    lineStyle: { color: radarColors[i] },
                    itemStyle: { color: radarColors[i] },
                    areaStyle: { color: radarColors[i], opacity: 0.2 }
                };
            })
        }]
    });
}

// ============================================
// 6. 云南省地图（新增）
// ============================================
function initMapCharts() {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/530000_full.json')
        .then(r => r.json())
        .then(geoJson => {
            echarts.registerMap('yunnan', geoJson);
            initFilledMap();
            initScatterMap();
        })
        .catch(err => {
            console.error('地图数据加载失败', err);
            initFallbackMap();
        });
}

function initFilledMap() {
    const chart = registerChart(echarts.init(document.getElementById('yunnan-map')));
    const mapData = prefectureData.map(d => ({ name: d.name, value: d.total }));
    chart.setOption({
        title: { text: '云南省各州市农林牧渔总产值（2023年）', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'item', formatter: function(p) {
            if (p.data && p.data.value !== undefined) return p.name + '<br/>总产值: ' + p.data.value + ' 亿元';
            return p.name;
        }},
        visualMap: {
            min: 90, max: 800, left: 'left', top: 'bottom',
            text: ['高', '低'],
            inRange: { color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'] },
            calculable: true
        },
        series: [{
            type: 'map', map: 'yunnan', roam: true,
            label: { show: true, fontSize: 11, color: '#333' },
            emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' }, itemStyle: { areaColor: '#fdda76' } },
            data: mapData
        }]
    });
}

function initScatterMap() {
    const chart = registerChart(echarts.init(document.getElementById('yunnan-scatter')));
    const coords = {
        '昆明市': [102.83, 25.02], '曲靖市': [103.80, 25.50],
        '玉溪市': [102.54, 24.35], '保山市': [99.17, 25.12],
        '昭通市': [103.72, 27.34], '丽江市': [100.23, 26.86],
        '普洱市': [100.97, 22.78], '临沧市': [100.09, 23.88],
        '楚雄州': [101.55, 25.03], '红河州': [103.38, 23.37],
        '文山州': [104.24, 23.37], '西双版纳州': [100.80, 22.01],
        '大理州': [100.24, 25.59], '德宏州': [98.58, 24.44],
        '怒江州': [98.86, 25.85], '迪庆州': [99.71, 27.83]
    };
    const scatterData = prefectureData.map(d => ({
        name: d.name,
        value: [...(coords[d.name] || [100, 25]), d.total]
    }));
    chart.setOption({
        title: { text: '各州市农业产值地理分布', left: 'center', textStyle: { fontSize: 15 } },
        tooltip: { trigger: 'item', formatter: function(p) { return p.name + '<br/>总产值: ' + p.value[2] + ' 亿元'; }},
        geo: {
            map: 'yunnan', roam: true,
            itemStyle: { areaColor: '#f0f0f0', borderColor: '#999' },
            emphasis: { itemStyle: { areaColor: '#ddd' } },
            label: { show: false }
        },
        series: [{
            type: 'effectScatter', coordinateSystem: 'geo',
            data: scatterData,
            symbolSize: function(val) { return Math.sqrt(val[2]) / 3; },
            showEffectOn: 'render',
            rippleEffect: { brushType: 'stroke', scale: 3 },
            label: { show: true, formatter: '{b}', position: 'right', fontSize: 10 },
            itemStyle: { color: '#e44646', shadowBlur: 10, shadowColor: 'rgba(228,70,70,0.5)' }
        }]
    });
}

function initFallbackMap() {
    const mapDiv = document.getElementById('yunnan-map');
    if (mapDiv) {
        mapDiv.style.display = 'flex';
        mapDiv.style.alignItems = 'center';
        mapDiv.style.justifyContent = 'center';
        mapDiv.innerHTML = '<div style="text-align:center;padding:40px;"><h3>地图数据加载中...</h3><p>如长时间无法加载，请检查网络连接</p></div>';
    }
    const scatterDiv = document.getElementById('yunnan-scatter');
    if (scatterDiv) {
        const chart = registerChart(echarts.init(scatterDiv));
        chart.setOption({
            title: { text: '各州市农业产值', left: 'center' },
            tooltip: { trigger: 'axis' },
            grid: { left: 100, right: 30, top: 50, bottom: 30 },
            xAxis: { type: 'value', name: '亿元' },
            yAxis: { type: 'category', data: prefectureData.map(d => d.name) },
            series: [{ type: 'bar', data: prefectureData.map(d => d.total), itemStyle: { color: '#5470c6' } }]
        });
    }
}

// ============================================
// 7. 数据故事
// ============================================
let storyChartInstance = null;
function initStoryCharts() {
    const nodesContainer = document.getElementById('story-nodes');
    const contentContainer = document.getElementById('story-content');
    storyChartInstance = registerChart(echarts.init(document.getElementById('story-chart')));

    storyNodes.forEach((node, i) => {
        const div = document.createElement('div');
        div.className = 'story-node' + (i === 0 ? ' active' : '');
        div.innerHTML = '<div class="story-node-dot"></div><div class="story-node-label">' + node.period + '</div>';
        div.addEventListener('click', () => showStory(i));
        nodesContainer.appendChild(div);
    });
    showStory(0);
}

function showStory(index) {
    const node = storyNodes[index];
    const content = document.getElementById('story-content');
    content.innerHTML = '<h3>' + node.title + '</h3><p class="period">' + node.period + '</p><p>' + node.content + '</p><div class="highlight">' + node.highlight + '</div>';

    document.querySelectorAll('.story-node').forEach((n, i) => {
        n.classList.toggle('active', i === index);
    });

    const startYear = parseInt(node.period.split('-')[0]);
    const endYear = parseInt(node.period.split('-')[1]);
    const filtered = outputValueData.filter(d => d.year >= startYear && d.year <= endYear);
    const years = filtered.map(d => d.year);

    if (!storyChartInstance) return;
    storyChartInstance.setOption({
        title: { text: node.period + ' 产值变化', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0, data: ['农业','林业','牧业','渔业'] },
        grid: { left: 70, right: 30, top: 50, bottom: 50 },
        xAxis: { type: 'category', data: years, axisLabel: { formatter: '{value}年', rotate: 45 } },
        yAxis: { type: 'value', name: '亿元' },
        series: [
            { name: '农业', type: 'line', data: filtered.map(d => d.agriculture), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#5470c6' } },
            { name: '林业', type: 'line', data: filtered.map(d => d.forestry), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#91cc75' } },
            { name: '牧业', type: 'line', data: filtered.map(d => d.animal), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#fac858' } },
            { name: '渔业', type: 'line', data: filtered.map(d => d.fishery), smooth: true, areaStyle: { opacity: 0.3 }, itemStyle: { color: '#ee6666' } }
        ]
    }, true);
}
