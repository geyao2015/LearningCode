/**
 * Created by 岳 on 2015/3/10.
 */

function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $("#number-cell-" + i + "-" + j);

    numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
    numberCell.css("color", getNumberColor(board[i][j]));
    numberCell.css("border-radius", gridContainerWidth * 0.02 + "px");
    numberCell.css("line-height", cellWidth + "px");
    numberCell.css("font-size", cellWidth * 0.65 + "px");
    numberCell.html(board[i][j]);
    numberCell.animate({
        width: cellWidth,
        height: cellWidth,
        top: getPosTop(i, j),
        left: getPosLeft(j, j)
    }, 150)
}

function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 100)
}