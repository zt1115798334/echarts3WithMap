function randomData() {
    return Math.round(Math.random() * 1000);
}

//地图容器
var chart = echarts.init(document.getElementById('main'));

//直辖市和特别行政区-只有二级地图，没有三级地图
var mapdata = [];
//绘制全国地图
var name = "贵阳市";
$.getJSON('static/map/city/' + cityMap[name] + '.json', function (data) {
    d = [];
    for (var i = 0; i < data.features.length; i++) {
        d.push({
            name: data.features[i].properties.name,
            value: [randomData(), 222]

        })
    }
    mapdata = d;
    //注册地图
    echarts.registerMap('guiyang', data);
    //绘制地图
    renderMap('guiyang', d);
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
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
            value2 = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
            return params.name + '<br/>' + params.name + ': ' + value + ":" + value2;
        }
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