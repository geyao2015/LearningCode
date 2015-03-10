/**
 * Created by 岳 on 2015/3/10.
 */

var board = new Array(),
    score = 0;

$(document).ready(function () {
    newGame();
});


function newGame() {
    //初始化棋盘格
    init();

    //在随机的两个格子里生成2或者4
}
function init() {
    //初始化函数

    //初始化board数据
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }

    }
    updateBoardView();
}

function updateBoardView() {
    //更新页面视图

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("grid-container").append('<div class="number-cell"+"-"+i+"-"+j></div>');
            var theNumberCell = $("number-cell" + "-" + i + "-" + j);//表示当前正在操作的cell

            if (board[i][j] == 0) {
                //此时不显示数字
                $("theNumberCell").css("width", "0px");
                $("theNumberCell").css("height", "0px");
                $("theNumberCell").css("top", getPosTop(i, j) + 50);
                $("theNumberCell").css("left", getPosLeft(i, j) + 50);

            }
            else {

                ("theNumberCell").css("width", "100px");
                $("theNumberCell").css("height", "100px");
                $("theNumberCell").css("top", getPosTop(i, j));
                $("theNumberCell").css("left", getPosLeft(i, j));
                $("theNumberCell").css("background-color", getNumberBackgroundColor(board[i][j]));
                $("theNumberCell").css("color", getNumberColor(board[i][j]));
                $("theNumberCell").css("text", board[i][j]);

            }

        }
    }
}

