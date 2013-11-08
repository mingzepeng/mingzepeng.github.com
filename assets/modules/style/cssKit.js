define(function(require,exports,module) {
	exports.parsePx = function (elem, css) {
        if (window.getComputedStyle)
            return window.getComputedStyle(elem, null)[css];
        else {
            var ret = elem.currentStyle[css];
            var left = elem.style.left;
            elem.style.left = css === "fontSize" ? "1em" : ret; //我们修改了该元素的left值
            ret = elem.style.pixelLeft + "px"; //pixelLeft会返回单位转换成px活的数值
            elem.style.left = left; //恢复left
            return ret;
        }

    };
})