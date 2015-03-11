/**
 * Created by 岳 on 2015/3/10.
 */

var board = new Array(),
    score = 0;

$(function () {
    newGame();
});


function newGame() {
    //初始化棋盘格
    init();

    //在随机的两个格子里生成2或者4
}
function init() {
    //初始化函数

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-cell-" + i + "-" + j).css("top", getPosTop(i, j));
            $("#grid-cell-" + i + "-" + j).css("left", getPosLeft(i, j));
        }

    }
    //初始化board数据
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    generateOneNumber();
    generateOneNumber();

    updateBoardView();
}

function updateBoardView() {
    //更新页面视图

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);//表示当前正在操作的cell

            if (board[i][j] == 0) {
                //此时不显示数字
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", getPosTop(i, j) + 50);
                theNumberCell.css("left", getPosLeft(i, j) + 50);

            }
            else {

                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPosTop(i, j));
                theNumberCell.css("left", getPosLeft(i, j));
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.html(board[i][j]);

            }

        }
    }
}

function generateOneNumber() {
    //随机的在一个位置生成2或者4
    if (!nospace(board)) {

        //随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));//向下取整
        var randy = parseInt(Math.floor(Math.random() * 4));
        while (true) {
            if (board[randx][randy] == 0) {
                break;
            }
            randx = parseInt(Math.floor(Math.random() * 4));
            randy = parseInt(Math.floor(Math.random() * 4));
        }

        //随机2或4
        var randNumber = Math.random() < 0.5 ? 2 : 4;

        //在随机位置显示随机数字
        board[randx][randy] = randNumber;

        showNumberWithAnimation(randx, randy, randNumber);
    }
    return true;

}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38://up
            if (moveUp()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39://right
            if (moveRight()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40://down
            if (moveDown()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        default :
    }
});
function isGameOver() {
    if (nospace(board) && noMove(board)) {
        gameOver();
    }
}
function gameOver() {
    alert("游戏结束");
}
function moveLeft() {
    if (!canMoveLeft(board)) {
        generateOneNumber();
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200)

    return true;
}

