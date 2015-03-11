/**
 * Created by 岳 on 2015/3/10.
 */

function showNumberWithAnimation(i, j, randNumber) {
    //todo:显示不出来数字
    var numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber.toString());
//alert(numberCell.text());
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosTop(j, j)
    }, 500)
}