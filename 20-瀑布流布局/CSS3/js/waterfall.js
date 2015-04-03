window.onload = function () {
    var container = document.getElementById("container");

    waterfall();
    //模拟后台数据
    var dataInt = {"data": [{"src": "20.jpg"}, {"src": "21.jpg"}, {"src": "22.jpg"}, {"src": "23.jpg"}, {"src": "24.jpg"}]};

    //监听滚动条，动态加载图片
    window.onscroll = function () {
        if (checkScrollSlide()) {
            //将数据块渲染到页面底部，一次传过来多少数据就加载多少个
            for (var i = 0; i < dataInt.data.length; i++) {
                var obox = document.createElement("div");
                obox.className = "box";
                container.appendChild(obox);
                var oPic = document.createElement("div");
                oPic.className = "pic";
                obox.appendChild(oPic);
                var oImg = document.createElement("img");
                oImg.src = "images/" + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall();
        }
    }

    //获取parents下的class为box的元素
    function getByClass(parent, classname) {
        //ie不支持getelementsbyclassname
        var resArray = [];
        parent = parent || document;
        var childs = parent.getElementsByTagName('*');
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].className == classname) {
                resArray.push(childs[i]);
            }
        }
        return resArray;
    }

    //检测是否具备加载数据的条件
    function checkScrollSlide() {
        var oBoxs = getByClass(container, "box");
        //距离1
        var lastBoxHeight = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
        //距离2
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//兼容严格模式和混杂模式
        var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        return lastBoxHeight < (scrollTop + clientHeight);
    }

    //加载瀑布流数据
    function waterfall() {
        var oBoxs = getByClass(container, "box");
        //计算页面内的列数
        var oBoxWidth = oBoxs[0].offsetWidth;//offsetWidth=content+padding+border
        var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);

        //设置container的宽度,并设置其居中
        container.style.cssText = "width:" + (oBoxWidth * cols + 2) + "px";
        console.log("container width:" + container.style.width);
        console.log("oboxwidth: " + oBoxWidth);
        console.log("列数：  " + cols);

        //存放每一列高度的数组
        var heightArr = [];
        for (var i = 0; i < oBoxs.length; i++) {
            if (i < cols) {
                //存放第一行的高度
                heightArr.push(oBoxs[i].offsetHeight);
            }
            else {
                //定位第一行之后的图片
                var minHeight = Math.min.apply(null, heightArr);
                var index = getMinHeightIndex(heightArr, minHeight);
                oBoxs[i].style.position = "absolute";
                oBoxs[i].style.top = minHeight + 'px';
                oBoxs[i].style.left = index * oBoxWidth + 'px';
                //更新数组
                heightArr[index] += oBoxs[i].offsetHeight;
            }
        }
        console.log("obox的数量： " + oBoxs.length);
        console.log("高度矩阵： " + heightArr);
    }

    function getMinHeightIndex(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                return i;
            }
        }
    }
}