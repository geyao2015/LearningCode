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
    switch (number){
        case 2:
            return "eee4da";break;


    }
    return "#93c";
}

function getNumberColor(number) {
    //根据数字返回前景色
    if(number<4){
        return "#776e65";
    }
    return "white";
}