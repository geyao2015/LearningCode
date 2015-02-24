function showToolTip(obj, id, html, width, height) {
    if (document.getElementById(id) == null) {
        //创建
        var tooltipbox;
        tooltipbox=document.createElement("div");
        tooltipbox.className="tooltip-box";
        tooltipbox.id=id;
        tooltipbox.innerHTML=html;
        obj.appendChild(tooltipbox);

        obj.onmouseleave=function(){
            document.getElementById(id).style.display="none";
        }
    } else {
        //显示
        document.getElementById(id).style.display = "block";
    }

}

var t1=document.getElementById("tooltip1");
t1.onmouseenter =function(){
    showToolTip(this,"t1","提示框内容");

}