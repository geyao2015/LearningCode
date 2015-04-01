/**
 * Created by 岳 on 2015/4/1.
 */
window.onload = function () {
    var next = document.getElementById("next");
    var btns = document.getElementById("btns").getElementsByTagName("span");
    var pre = document.getElementById("pre");
    var list = document.getElementById("list");
    var index = 0;

    //改变index
    function changeIndex() {
        //todo:对应不上，还有bug
        for (var i = 0; i < 5; i++) {
            if (btns[i].className == "active") {
                btns[i].className = "";
                break;
            }
        }
        btns[index].className = "active";
    }

    //轮播动画
    function animate(distance) {


        var currentLeft = parseInt(list.style.left);
        list.style.left = currentLeft + distance + 'px';
        if (currentLeft <= -6000) {
            list.style.left = "-1000px";
        }
        if (currentLeft >= 0) {
            list.style.left = "-5000px";
        }
    }

    next.onclick = function () {
        if (index == 5) {
            index = 0;
        }
        else {
            index++;
        }
        changeIndex();
        animate(-1000);

    }
    pre.onclick = function () {
        if (index == -1) {
            index = 4;
        }
        else {
            index--;
        }
        changeIndex();
        animate(1000);
    }
    //绑定按钮
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            if (!this.className) {
                var toIndex = this.getAttribute("index");
                var moveDistance = (toIndex - index) * -1000;
                animate(moveDistance);
                index = toIndex;
                changeIndex();
            }
        }
    }

}
