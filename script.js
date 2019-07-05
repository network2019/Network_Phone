
$(function () {
    $('#ageSlider').slider({
        max: 80,
        min: 20,
        orientation: "vertical",
        step: 10,
        value: 20,
        range: "min",

        slide: function (select, handleIndex) {
            console.log(handleIndex.value);
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
            console.log(handleIndex.value);
            document.getElementById("year").innerText = handleIndex.value;
        }
    });
});