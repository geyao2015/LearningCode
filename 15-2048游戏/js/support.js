/**
 * Created by 岳 on 2015/3/10.
 */
function getPosTop(i, j) {
    return 20 + 120 * i;
}
function getPosLeft(i, j) {
    return 20 + 120 * j;
}

function getNumberBackgroundColor(number) {
    //根据数字返回背景色
    switch (number) {
        case 2:
            return "#EEE4DA";
            break;
        case 4:
            return "#EDE0C8";
            break;
        case 8:
            return "#F2B179";
            break;
        case 16 :
            return "#F59563";
            break;
        case 32:
            return "#F67C5F";
            break;
        case 64:
            return "#F65E3B";
            break;
        case 128:
            return "#EDCF72";
            break;
        case 256:
            return "#6BADF6";
            break;
        case 512:
            return "#F08100";
            break;
        case 1024:
            return "#0019C4";
            break;
        case 2048:
            return "#FF0000";
            break;


    }
    return "#FC6";
}

function getNumberColor(number) {
    //根据数字返回前景色
    if (number <= 4) {
        return "#776E65";
    }
    return "#F9F6F2";
}
function nospace(board) {
    //判断棋盘格里是否还有空间
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
function noMove(board) {
    //判断棋盘格里是否还能移动
    if (canMoveLeft(board) ||
        canMoveUp(board) ||
        canMoveRight(board) ||
        canMoveDown(board)) {
        return false;
    }
    return true;
}
function canMoveLeft(borad) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(borad) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(borad) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(borad) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row, col1, col2, board) {
    //第row行，从col1到col2列没有障碍
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(row1, row2, col, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}