var isIE = navigator.userAgent.indexOf("MSIE") > -1;//判别IE浏览器


function showToolTip(obj, id, html, width, height) {
    if (document.getElementById(id) == null) {
        //创建
        var tooltipbox;
        tooltipbox = document.createElement("div");
        tooltipbox.className = "tooltip-box";
        tooltipbox.id = id;
        tooltipbox.innerHTML = html;
        obj.appendChild(tooltipbox);

        //设置宽高
        tooltipbox.style.width = width ? width + "px" : "auto";
        tooltipbox.style.height = height ? height + "px" : "auto";

        if (!width && isIE) {
            //IE浏览器不支持width的auto属性
            tooltipbox.style.width = tooltipbox.offsetWidth;
        }

        //设置定位
        tooltipbox.style.position = "absolute";
        tooltipbox.style.display = "block";

        var left = obj.offsetLeft;
        var top = obj.offsetTop + 20;

        //left不让tooltip提示框超出浏览器
        if (left + tooltipbox.offsetWidth > document.body.clientWidth) {
            var demoleft = document.getElementById("demo").offsetLeft;
            left = document.body.clientWidth - tooltipbox.offsetWidth - demoleft;
            if (left < 0) {
                left = 0;
            }
        }

        tooltipbox.style.left = left + "px";
        tooltipbox.style.top = top + "px";

        //设置动画效果
        obj.onmouseleave = function () {
            setTimeout(function () {
                document.getElementById(id).style.display = "none";
            }, 300);
        }
    } else {
        //显示
        document.getElementById(id).style.display = "block";
    }

}

var t1 = document.getElementById("tooltip1");
t1.onmouseenter = function () {
    showToolTip(this, "t1", "提示框内容", 200);

}