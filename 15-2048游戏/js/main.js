/**
 * Created by 岳 on 2015/3/10.
 */

var board = new Array(),
    score = 0,
    hasConflicted = new Array();//用于防止二次碰撞

$(function () {
    newGame();
});

function newGame() {
    //初始化棋盘格
    init();
}
function init() {
    //初始化函数
    score = 0;
    updateScore();
    //$(".overMask").css("display", "none");
    $(".overMask").hide();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-cell-" + i + "-" + j).css("top", getPosTop(i, j));
            $("#grid-cell-" + i + "-" + j).css("left", getPosLeft(i, j));
        }

    }
    //初始化board数据
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
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
                if (board[i][j] >= 128) {
                    theNumberCell.css("font-size", "35px");
                }

            }
            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    //随机的在一个位置生成2或者4
    if (!nospace(board)) {
        //随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));//向下取整
        var randy = parseInt(Math.floor(Math.random() * 4));
        var count = 0;
        while (count < 40) {
            //只循环40次，避免计算机一直找不到而循环
            if (board[randx][randy] == 0) {
                break;
            }
            randx = parseInt(Math.floor(Math.random() * 4));
            randy = parseInt(Math.floor(Math.random() * 4));
        }
        if (count == 39) {
            //查找一个空位置
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] == 0) {
                        randx = i;
                        randy = j;
                    }
                }
            }
        }
        //随机2或4
        var randNumber = Math.random() < 0.6 ? 2 : 4;

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
                setTimeout(generateOneNumber(), 210);
                setTimeout(isGameOver(), 220);
            }
            break;
        case 38://up
            if (moveUp()) {
                setTimeout(generateOneNumber(), 210);
                setTimeout(isGameOver(), 220);
            }
            break;
        case 39://right
            if (moveRight()) {
                setTimeout(generateOneNumber(), 210);
                setTimeout(isGameOver(), 220);
            }
            break;
        case 40://down
            if (moveDown()) {
                setTimeout(generateOneNumber(), 210);
                setTimeout(isGameOver(), 220);
            }
            break;
        default :
    }
});
function isGameOver() {
    if (nospace(board) && noMove(board)) {
        gameOver("Just Try Again!")
    }
}
function gameOver(text) {
    generateOneNumber();
    $(".overMask a").html(text);
    //$(".overMask").css("display", "block");
    $(".overMask").show();
}
function isWinGame(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 2048) {
                return true;
            }
        }
    }
    return false;
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
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore();
                        if (isWinGame(board)) {
                            gameOver("You Get 2048!");
                        }

                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 220);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        generateOneNumber();
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore();
                        if (isWinGame(board)) {
                            gameOver("You Get 2048!");
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 220);
    return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        generateOneNumber();
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore();
                        if (isWinGame(board)) {
                            gameOver("You Get 2048!");
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 220);
    return true;
}
function moveDown() {
    if (!canMoveDown(board)) {
        generateOneNumber();
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore();
                        if (isWinGame(board)) {
                            gameOver("You Get 2048!");
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 220);
    return true;
}
function updateScore() {
    //更新分数
    $("#score").html(score);
}