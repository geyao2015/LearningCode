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
function checklist(input) {
    //alert(1);
    //点击变换效果
    //var li;
    //li = document.getElementById("checkList").getElementsByTagName("li");
    //
    //for (var i = 0; li.length; i++) {
    //    li[i].onclick = function () {
    //    }
        if (input.className == "selected") {
            input.className = null;
        } else {
            input.className = "selected";
        }
    //}
}
//window.onload = checklist();





