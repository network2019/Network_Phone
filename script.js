var spData;
var gaData;

var Age = 20;
var Year = 0;


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
    console.log("Smartphone = " + spData[Age.toString() + 's'][Year]);
    console.log("Galapagos = " + gaData[Age.toString() + 's'][Year]);

    $('#ageSlider').slider({
        max: 80,
        min: 20,
        orientation: "vertical",
        step: 10,
        value: 20,
        range: "min",

        slide: function (select, handleIndex) {
            Age = handleIndex.value;
            document.getElementById("age").innerText = Age;

            console.log(Age);

            console.log("Smartphone = " + spData[Age.toString() + 's'][Year]);
            console.log("Galapagos = " + gaData[Age.toString() + 's'][Year]);

        }
    });

    $('#yearSlider').slider({
        max: 2018,
        min: 2011,
        orientation: "horizontal",
        step: 1,
        value: 2011,
        range: "min",

        slide: function (select, handleIndex) {
            Year = handleIndex.value - 2011;
            document.getElementById("year").innerText = handleIndex.value;

            console.log("Smartphone = " + spData[Age.toString() + 's'][Year]);
            console.log("Galapagos = " + gaData[Age.toString() + 's'][Year]);
        }
    });
});