/**
 * Created by wuyue on 2015/1/31.
 */
$(function () {
    //提示框显示和消失在鼠标连续快速滑过不同按钮时，还有些小bug没有解决
    $('.link .button').hover(function () {
        var title = $(this).attr('data');
        $('.tip em').text(title);

        //令tip出现在对应位置，改变其left即可
        var pos = $(this).position().left;
        //var dis = ($('.tip').outerWidth() - $(this).outerWidth()) / 2;
        //var l = pos - dis;
        $('.tip').css({'left': pos + 'px'})
            .animate({'top': 140, 'opacity': 1}, 400);
    }, function () {
        if(!$('.tip').is(':animated')){
            $('.tip').animate({'top': 100, 'opacity': 0}, 400);
        }

    })
})
