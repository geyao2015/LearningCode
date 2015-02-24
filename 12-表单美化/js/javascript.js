/**
 * Created by 岳 on 2015/2/2.
 */
//单选按钮美化
function show(index) {
    var dd = document.getElementById("type").getElementsByTagName("dd");
    for (var i = 0; i < dd.length; i++) {
        if (i == index) {
            dd[i].className = "selected";
        } else {
            dd[i].className = null;
        }
    }

}

//复选按钮美化
function checklist(index) {
    var li = document.getElementById("checkList").getElementsByTagName("li");

    if (li[index].className == "selected") {
        li[index].className = null;
    } else {
        li[index].className = "selected";
    }
}

//下拉菜单美化
function addLoadEvent(func) {
    //实现多个加载函数
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        //如果未设置，则将func直接设为启动函数
        window.onload = func;
    } else {
        //否则先执行原来的启动函数，再执行func
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
function $(id) {
    return document.getElementById(id);
}
function showProvince() {
    $("selectProvince").onclick = showAllProvince;
    selectProvince();
}
function showAllProvince() {
    $("allProvince").style.display = "block";//显示下拉框
    $("selectProvince").style.color = "#CCCCCC";//改变字体颜色
    $("selectProvince").style.backgroundPosition = "189px -17px";//改变下拉框的小箭头图标方向
}
function hideAllProvince() {
    $("allProvince").style.display = "none";
    $("selectProvince").style.color = "#000000";
    $("selectProvince").style.backgroundPosition = "189px -2px";
}
function selectProvince() {
    var pro = $("allProvince").getElementsByTagName("li");
    var links;
    for (var i = 0; i < pro.length; i++) {
        links = pro[i].getElementsByTagName("a");
        for (var j = 0; j < links.length; j++) {
            links[j].onclick = function () {
                $("selectProvince").innerHTML = this.innerHTML;
                hideAllProvince();
            }
        }
    }
}
addLoadEvent(showProvince);






