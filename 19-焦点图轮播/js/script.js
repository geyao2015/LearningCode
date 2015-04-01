/**
 * Created by 岳 on 2015/4/1.
 */
window.onload = function () {
    var container=document.getElementById("container");
    var next = document.getElementById("next");
    var buttoms = document.getElementById("buttoms").getElementsByTagName("span");
    var pre = document.getElementById("pre");
    var list = document.getElementById("list");
    var index = 0;
    var timer;//定时器自动轮播

    //改变index
    function changeIndex() {
        //todo:对应不上，还有bug
        for (var i = 0; i < 5; i++) {
            if (buttoms[i].className == "active") {
                buttoms[i].className = "";
                break;
            }
        }
        buttoms[index].className = "active";
    }

    //轮播动画
    function animate(distance) {
        var time = 2000;
        var interval = 10;
        var speed = distance / (time / interval);

        var newLeft = parseInt(list.style.left) + distance;

        function go() {
            if ((speed < 0 && (parseInt(list.style.left) > newLeft)) || (speed > 0 && (parseInt(list.style.left) < newLeft))) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            }
            else {
                list.style.left = newLeft + 'px';
                changeIndex();
                if (newLeft <= -6000) {
                    list.style.left = "-1000px";
                }
                if (newLeft >= 0) {
                    list.style.left = "-5000px";
                }
            }
        }

        go();

    }

    //自动轮播
    function autoPlay() {
        timer = setInterval(function () {
            next.onclick();
        }, 2000)
    }

    autoPlay();
    function stopPlay() {
        //alert(1)
        //clearInterval(timer);
    }

    next.onclick = function () {
        if (index == 5) {
            index = 0;
        }
        else {
            index++;
        }
        //changeIndex();
        animate(-1000);

    }
    pre.onclick = function () {
        if (index == -1) {
            index = 4;
        }
        else {
            index--;
        }
        //changeIndex();
        animate(1000);
    }
    //绑定按钮
    for (var i = 0; i < buttoms.length; i++) {
        buttoms[i].onclick = function () {
            if (!this.className) {
                var toIndex = this.getAttribute("index");
                var moveDistance = (toIndex - index) * -1000;
                animate(moveDistance);
                index = toIndex;
                changeIndex();
            }
        }
    }
    container.onmouseover = stopPlay();
    container.onmouseout = autoPlay();

}
