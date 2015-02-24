/**
 * Created by 岳 on 2015/1/19.
 * 使用jQuery实现的
 */
$(document).ready(function(){
    //滚动条发生滚动
    $(window).scroll(function(){
   var top=$(document).scrollTop();//获取滚动条相对顶部的距离
        var menu=$("#menu");
        var items=$("#content").find(".item");
        items.each(function(){
           var m=$(this);
            var itemTop= m.offset().top;//获取每个楼层的top值
            var currentId=""; //当前所在楼层(item)的ID
            if(top>=itemTop-150){
                //即此时已经经过了此楼层
                currentId="#"+ m.attr("id");
            }else{
                return false;//对于没有到达的楼层，跳出循环，以节省效率
            }
            //给相应楼层的链接设置current的class
            var currentlink=menu.find(".current");
            if(currentId&&currentlink.attr("href")!=currentId){
                currentlink.removeClass("current"); //取消其他楼层的class
                menu.find("[href="+currentId+"]").addClass("current");
            }
        });
});
    });