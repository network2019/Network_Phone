var spData;
var gaData;
var age;

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

    age = "20s";

    spData = data[0];
    gaData = data[1];

    console.log(spData);
    console.log(gaData);
    console.log(age);

}).then(function () {
    var i = 0;

    function returnData() {
        if (i < 6) {
            i = i + 1;
        } else {
            i = 0;
        }

        return i;
    }



    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;

    var dynamicData = [spData[age][0], spData[age][1], spData[age][2], spData[age][3], spData[age][4], spData[age][5], spData[age][6]];
    option = {
        grid: {
            borderWidth: 0
        },
        xAxis: {
            type: 'category',
            data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            axisLabel: {
                textStyle: {
                    align: 'right',
                    fontSize: 15
                }
            },
            axisLine: {
                lineStyle: {
                    width: 3
                }
            }
        },
        yAxis: {
            min: -20,
            max: 40,
            type: 'value',
            boundaryGap: false,
            axisLine: {
                show: false
            }
        },
        series: [{
            tooltip: {
                trigger: 'axis',
                position: [0, 50]
            },
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 5
                    }
                }
            },
            markPoint: {
                symbol: 'diamond'
            },
            data: dynamicData,
            type: 'line'
        }]
    };;

    setInterval(function () {
        var j = returnData();
        var num = 20 + 10 * j;
        age = num.toString() + 's';

        console.log(age);
        dynamicData = [spData[age][0], spData[age][1], spData[age][2], spData[age][3], spData[age][4], spData[age][5], spData[age][6]];

        myChart.setOption({
            series: [{
                data: dynamicData
            }]
        })
    }, 3000);

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
});