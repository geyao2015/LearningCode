/**
 * Created by wuyue on 2015/1/21.
 */

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

//实现的是有延迟的切换效果，对于没有延迟的效果，取消定时器setTimeout即可；
//window.onload= function(){
//
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
//        //alert(1);
//        titles[i].id=i;//用id做titles中的li做索引
//        titles[i].onmouseover=function(){
//            for(var j=0;j<titles.length;j++){
//                titles[j].className="";//清除所有tab的高亮
//                divs[j].style.display="none";
//            }
//            this.className="select";//滑过时tab变成变成高亮
//
//            //显示选中tab对应id的内容
//            divs[this.id].style.display="block";
//        }
//    }
//}

//实现自动切换tab选项卡效果；
window.onload = function () {
    var index = 0;//记录当前高亮选项卡的索引
    var timer = null;//定时器
    var titles = $('notice-tit').getElementsByTagName('li');
    var divs = $('notice-con').getElementsByTagName('div');

    setTimer();
    //遍历所有页签，并绑定鼠标事件
    for (var i = 0; i < titles.length; i++) {
        titles[i].id = i;
        titles[i].onmouseover = function () {
            index = this.id;//保证当鼠标离开时，选项卡可以继续往下自动切换
            clearInterval(timer);//清除定时器
            changeOption(this.id);
        }

        //鼠标离开后继续定时器
        titles[i].onmouseout = function () {
            setTimer();
        }

    }
    //设置定时器
    function setTimer() {
        //如果有定时器，则先清除，防止生成多个定时器
        if (timer) {
            timer = null;
        }
        //添加定时器，改变当前高亮索引,实现自动切换
        timer = setInterval(function () {
            autoPlay();
        }, 1500);

    }

    //每2秒执行一次脚本；
    function autoPlay() {
        index++;
        if (index >= titles.length) {
            index = 0;
        }
        changeOption(index);
    }

    //高亮对应的标签；
    function changeOption(index) {
        for (var i = 0; i < titles.length; i++) {
            titles[i].className = "";//清除所有tab的高亮
            divs[i].style.display = "none";
        }
        //高亮显示当前页签；
        titles[index].className = 'select';
        divs[index].style.display = 'block';
    }
}

