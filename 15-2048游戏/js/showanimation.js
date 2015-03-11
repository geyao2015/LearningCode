/**
 * Created by 岳 on 2015/3/10.
 */

function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
    numberCell.css("color", getNumberColor(board[i][j]));
    numberCell.html(board[i][j]);

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosTop(j, j)
    }, 100)
}

function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosTop(tox, toy)
    }, 200)
}