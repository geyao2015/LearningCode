/**
 * Created by 岳 on 2015/3/10.
 */
function getPosTop(i, j) {
    return 20 + 120 * j;
}
function getPosLeft(i, j) {
    return 20 + 120 * i;
}

function getNumberBackgroundColor(number) {
    //根据数字返回背景色
    switch (number) {
        case 2:
            return "#FC6";
            break;


    }
    return "#FC6";
}

function getNumberColor(number) {
    //根据数字返回前景色
    if (number < 4) {
        return "#776e65";
    }
    return "red";
}
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(borad) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}