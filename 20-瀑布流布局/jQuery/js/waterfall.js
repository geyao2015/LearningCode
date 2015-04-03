$(window).on("load", function () {
    waterfall();
    var dataInt = {"data": [{"src": "20.jpg"}, {"src": "21.jpg"}, {"src": "22.jpg"}, {"src": "23.jpg"}, {"src": "24.jpg"}]};

    $(window).on("scroll", function () {
        if (checkScrollSlide()) {
            $.each(dataInt.data, function (key, value) {
                var oBox = $("<div>")
                    .addClass("box")
                    .appendTo($("#container"));
                var oPic = $("<div>")
                    .addClass("pic")
                    .appendTo($(oBox));
                $("<img>").attr("src", 'images/' + $(value).attr('src'))
                    .appendTo($(oPic));
            });
        }
        waterfall();
    });
});
function checkScrollSlide() {
    var $lastbox = $("#container>div").last();
    var lastBoxDis = $lastbox.offset().top + Math.floor($lastbox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentHeight = $(window).height();
    return lastBoxDis < scrollTop + documentHeight;
}
function waterfall() {
    var $boxs = $("#container>div");
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / w);
    $("#container").width(w * cols + 2).css("margin", "0 auto");
    var heightArr = [];

    $boxs.each(function (index, value) {
        if (index < cols) {
            heightArr.push($boxs.eq(index).outerHeight());
        } else {
            var minHeight = Math.min.apply(null, heightArr);
            var minIndex = $.inArray(minHeight, heightArr);
            $(value).css({
                "position": "absolute",
                "top": minHeight + "px",
                "left": minIndex * w + "px"
            });
            heightArr[minIndex] += $boxs.eq(index).outerHeight();
        }
    });

}