var spData;
var gaData;

function getCSV(filename) {
    //ここでPromiseでくくっちゃう
    return new Promise(function (resolve) {
        var req = new XMLHttpRequest();
        req.open('get', filename, true);
        req.send(null);
        req.onload = function () {
            var retData = convertCSVtoArray(req.responseText);
            resolve(retData);
        }
    });
}

function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    var retData = {};
    var dataArr = [];
    var age;
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; i++) {
        dataArr[i] = tmp[i].split(',');
        for (var j = 0; j < dataArr[i].length; j++) {
            if (isNaN(Number(dataArr[i][j])) == false) {
                dataArr[i][j] = Number(dataArr[i][j]);
            }
        }

        age = dataArr[i][0];
        dataArr[i].shift();

        retData[age] = dataArr[i];
    }

    //結果を戻す
    return retData;
}


//処理を連結
Promise.all([

    getCSV("./csvData/Smartphone.csv"),
    getCSV("./csvData/Galapagos.csv")

]).then(function (data) {

    spData = data[0];
    gaData = data[1];
    console.log(spData);
    console.log(gaData);

}).then(function () {
    var i = 0;

    function returnData() {
        if (i < 7) {
            i = i + 1;
        } else {
            i = 0;
        }

        return i;
    }

    var dynamicData = [gaData['20s'][0], gaData['30s'][0], gaData['40s'][0], gaData['50s'][0], gaData['60s'][0], gaData['70s'][0], gaData['80s'][0]];

    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    var spirit = './smartphone.png';

    var maxData = 100;

    option = {
        tooltip: {},
        xAxis: {
            max: maxData,
            splitLine: {
                show: false
            },
            offset: 10,
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                margin: 10
            }
        },
        yAxis: {
            data: Object.keys(spData),
            inverse: true,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: '#999',
                    fontSize: 16
                }
            }
        },
        grid: {
            top: 'center',
            height: 400,
            left: 70,
            right: 100
        },
        series: [{
            // current data
            type: 'pictorialBar',
            symbol: spirit,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolClip: true,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: dynamicData,
            markLine: {
                symbol: 'none',
                label: {
                    normal: {
                        formatter: 'max: {c}',
                        position: 'start'
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'green',
                        type: 'dotted',
                        opacity: 0.2,
                        width: 2
                    }
                },
                data: [{
                    type: 'max'
                }]
            },
            z: 10
        }, {
            // full data
            type: 'pictorialBar',
            itemStyle: {
                normal: {
                    opacity: 0.2
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        return (params.value / maxData * 100).toFixed(1) + ' %';
                    },
                    position: 'right',
                    offset: [10, 0],
                    textStyle: {
                        color: 'green',
                        fontSize: 18
                    }
                }
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbol: spirit,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: dynamicData,
            z: 5
        }]
    };

    setInterval(function () {
        var j = returnData();

        dynamicData = [
            gaData['20s'][j], gaData['30s'][j], gaData['40s'][j], gaData['50s'][j], gaData['60s'][j], gaData['70s'][j], gaData['80s'][j]
        ];

        myChart.setOption({
            series: [{
                data: dynamicData.slice()
            }, {
                data: dynamicData.slice()
            }]
        })
    }, 1000);

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
});