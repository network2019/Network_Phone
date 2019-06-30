var data = []; //0-6 Smartphone , 7-13 Galapagos

function getCSV(filename) {
    var req = new XMLHttpRequest();
    req.open('get', filename, true);
    req.send(null);
    req.onload = function () {
        setCSV(req.responseText);
    };
}

function setCSV(str) {
    var dataArr;
    var tmp = str.split('\n');
    tmp.forEach(x => {
        dataArr = x.split(',');
        // if (dataArr[0]) {
        //     data.push(dataArr.map(x => x.trim()));
        // }
        for (var i = 0; i < dataArr.length; i++) {
            if (isNaN(Number(dataArr[i])) == false) {
                dataArr[i] = Number(dataArr[i]);
            }
        }

        data.push(dataArr);

    });
}
getCSV("Smartphone.csv");
getCSV("Galapagos.csv");


$(function () {
    console.table(data);
    console.log(data[0][1]);

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