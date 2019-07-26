var spData;
var gaData;
var age;
var tp;
var audio20 = new Audio("./sounds/20s.mp4");
var audio30 = new Audio("./sounds/30s.mp4");
var audio40 = new Audio("./sounds/40s.mp4");
var audio50 = new Audio("./sounds/50s.mp4");
var audio60 = new Audio("./sounds/60s.mp4");
var audio70 = new Audio("./sounds/70s.mp4");
var audio80 = new Audio("./sounds/80s.mp4");

function getCSV(filename) {
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
    tp = 1.0;
    document.getElementById("tpletters").innerText = age;

    spData = data[0];
    gaData = data[1];

}).then(function () {

    //グラフ作成
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    option = null;

    var dynamicData = [spData[age][0], spData[age][1], spData[age][2], spData[age][3], spData[age][4], spData[age][5], spData[age][6]];

    //スライダーの作成
    $(function () {
        $("#ageSlider").slider({
            min: 20,
            max: 80,
            step: 10,
            value: 20,
            animate: "fast",
            change: function () {
                var num = $("#ageSlider").slider('value');
                age = num.toString() + "s";

                for (var i = 20; i <= 80; i += 10) {
                    var name = "audio" + i.toString();
                    eval(name).pause();
                    eval(name).currentTime = 0;
                }

                switch (age) {
                    case "20s":
                        audio20.play();
                        break;
                    case "30s":
                        audio30.play();
                        break;
                    case "40s":
                        audio40.play();
                        break;
                    case "50s":
                        audio50.play();
                        break;
                    case "60s":
                        audio60.play();
                        break;
                    case "70s":
                        audio70.play();
                        break;
                    case "80s":
                        audio80.play();
                        break;
                }

                dynamicData = [spData[age][0], spData[age][1], spData[age][2], spData[age][3], spData[age][4], spData[age][5], spData[age][6]];
                myChart.setOption({
                    series: [{
                        data: dynamicData
                    }]
                })

                document.getElementById("tpletters").innerText = age;

                tp = 1.0;
            }
        });
    });

    //グラフの設定
    option = {
        grid: {
            borderWidth: 0
        },
        xAxis: {
            name: "Year",
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
            name: "Rate",
            min: -20,
            max: 40,
            type: 'value',
            boundaryGap: false,
            axisLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} %'
            }
        },
        series: [{
            type: 'line',
            tooltip: {
                trigger: 'axis',
                position: [0, 50],
            },
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 5
                    }
                }
            },
            data: dynamicData
        }]
    };

    //透明度の変更
    setInterval(function () {
            tp -= 0.05;
            if (tp < 0.1) tp = 0.1;
            $('#tpletters').css('opacity', tp);
        },
        30);



    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }


});