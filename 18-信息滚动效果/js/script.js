/**
 * Created by 岳 on 2015/3/31.
 */
var area = document.getElementById('content');
var con1 = document.getElementById('list');
var speed = 50;
area.scrollTop = 0;
con1.innerHTML += con1.innerHTML;

function scrollUp() {
    area.scrollTop = area.scrollTop % ((con1.scrollHeight) / 2) + 1;
}

var myScroll = setInterval("scrollUp()", speed);

area.onmouseover = function () {
    clearInterval(myScroll);
}

area.onmouseout = function () {
    myScroll = setInterval("scrollUp()", speed);
}
