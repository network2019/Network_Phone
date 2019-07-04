var dataSmartphone = {};
var dataGalapagos = {};

function getCSV(filename, dataname) {
    var req = new XMLHttpRequest();
    req.open('get', filename, true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(req.responseText, dataname);
    }
};

function convertCSVtoArray(str, name) { // 読み込んだCSVデータが文字列として渡される
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
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

        name[age] = dataArr[i];
    }
}

var promiseSmartphone = new Promise(function (resolve, reject) {
    resolve(getCSV("Smartphone.csv", dataSmartphone));
});

var promiseGalapagos = new Promise(function (resolve, reject) {
    resolve(getCSV("Galapagos.csv", dataGalapagos));
});

promiseSmartphone.then(function () {
    console.log(dataSmartphone);
    // console.log(dataSmartphone['20s'][0]);
});

promiseGalapagos.then(function () {
    console.log(dataGalapagos);
});

$(function () {

    $('#ageSlider').slider({
        max: 80,
        min: 20,
        orientation: "vertical",
        step: 10,
        value: 20,
        range: "min",

        slide: function (select, handleIndex) {
            document.getElementById("age").innerText = handleIndex.value;
        }
    });
    $('#yearSlider').slider({
        max: 2019,
        min: 2011,
        orientation: "horizontal",
        step: 1,
        value: 2011,
        range: "min",

        slide: function (select, handleIndex) {
            document.getElementById("year").innerText = handleIndex.value;
        }
    });
});