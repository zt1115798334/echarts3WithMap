//地图容器
var chart = echarts.init(document.getElementById('main'));

//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
var mapdata = [];
//绘制全国地图
$.getJSON('static/map/province/guizhou.json', function (data) {
    d = [];
    for (var i = 0; i < data.features.length; i++) {
        d.push({
            name: data.features[i].properties.name,
            value: 111
        })
    }
    mapdata = d;
    //注册地图
    echarts.registerMap('guizhou', data);
    //绘制地图
    renderMap('guizhou', d);
});

//地图点击事件
chart.on('click', function (params) {
    console.log(params);

    //如果是【直辖市/特别行政区】只有二级下钻
    if (special.indexOf(params.seriesName) >= 0) {
        renderMap('guizhou', mapdata);
    } else {
        if (cityMap[params.name] != undefined) {
            //显示县级地图
            $.getJSON('static/map/city/' + cityMap[params.name] + '.json', function (data) {
                echarts.registerMap(params.name, data);
                var d = [];
                for (var i = 0; i < data.features.length; i++) {
                    d.push({
                        name: data.features[i].properties.name,
                        value: 111
                    })
                }
                renderMap(params.name, d);
            });
        } else {
            renderMap('guizhou', mapdata);
        }
    }
});

//初始化绘制全国地图配置
var option = {
    backgroundColor: '#000',
    title: {
        text: 'Echarts3 中国地图下钻至县级',
        subtext: '三级下钻',
        link: 'http://www.ldsun.com',
        left: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
        },
        subtextStyle: {
            color: '#ccc',
            fontSize: 13,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}'
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        },
        iconStyle: {
            normal: {
                color: '#fff'
            }
        }
    },
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDurationUpdate: 1000

};

function renderMap(map, data) {
    option.title.subtext = map;
    option.series = [
        {
            name: map,
            type: 'map',
            mapType: map,
            roam: false,
            nameMap: {
                'guizhou': '贵州'
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#999',
                        fontSize: 13
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 13
                    }
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: 'dodgerblue'
                },
                emphasis: {
                    areaColor: 'darkorange'
                }
            },
            data: data
        }
    ];
    //渲染地图
    chart.setOption(option);
}