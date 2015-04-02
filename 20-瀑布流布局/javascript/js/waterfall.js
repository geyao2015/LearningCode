window.onload = function () {
    waterfall("container", "box");
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

    function waterfall(parent, box) {
        var oParent = document.getElementById(parent);
        var oBoxs = getByClass(oParent, box);
        //计算页面内的列数
        var oBoxWidth = oBoxs[0].offsetWidth;//offsetWidth=content+padding+border
        var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);
        //设置container的宽度,并设置其居中
        oParent.style.cssText = "width:" + oBoxWidth * cols + "px";

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
        console.log(heightArr);
    }

    function getMinHeightIndex(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                return i;
            }
        }
    }
}