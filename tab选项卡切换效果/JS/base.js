/**
 * Created by wuyue on 2015/1/21.
 */

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}
//无延迟效果:
//window.onload= function(){
//    //获取鼠标滑过或点击的标签和要切换内容的元素
//    var titles=$('notice-tit').getElementsByTagName('li');
//    var divs=$('notice-con').getElementsByTagName('div');
//
//    if(titles.length!=divs.length){
//        alert(divs.length);
//        return;
//    }
//    //遍历titles中的所有li
//    for(var i=0;i<titles.length;i++){
//        titles[i].id=i;//用id做titles中的li做索引
//        titles[i].onmouseover=function(){
//            for(var j=0;j<titles.length;j++){
//                titles[j].className="";//清除所有tab的高亮
//                divs[j].style.display="none";
//            }
//            this.className="select";//滑过时tab变成变成高亮
//            //显示选中tab对应id的内容
//            divs[this.id].style.display="block";
//        }
//    }
//}

//有延迟效果：
window.onload = function () {
    //获取鼠标滑过或点击的标签和要切换内容的元素
    var titles = $('notice-tit').getElementsByTagName('li');
    var divs = $('notice-con').getElementsByTagName('div');
    var timer = null;//定时器

    if (titles.length != divs.length) {
        alert(divs.length);
        return;
    }
    //遍历titles中的所有li
    for (var i = 0; i < titles.length; i++) {
        titles[i].id = i;//用id做titles中的li做索引
        titles[i].onmouseover = function () {
            //用m变量来引用当前滑过的li；因为在setTimeout中直接用this的话其指向的是window对象
            var m = this;

            //如果存在准备执行的定时器，立刻清除，只有当停留时间大于500ms时才开始执行
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            //延迟500ms执行
            timer = setTimeout(function () {
                for (var j = 0; j < titles.length; j++) {
                    titles[j].className = "";//清除所有tab的高亮
                    divs[j].style.display = "none";
                }
                m.className = "select";//滑过时tab变成变成高亮
                //显示选中tab对应id的内容
                divs[m.id].style.display = "block";
            }, 500);
        }
    }
}