var parsePx = function (elem, css) {
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

var nav = document.getElementsByTagName('nav')[0];
var links = nav.getElementsByTagName('a');


var nav = document.getElementsByTagName('nav')[0];
var container = document.getElementById('container');
var flag = false;

var url = location.href;
var page = url.slice(url.lastIndexOf('/') + 1);
if (page) {
    for (var i = links.length - 1; i >= 0; i--) {
        links[i].className = '';
        if (links[i].href.indexOf(page) > 0) links[i].className = 'extra'
    }
}

window.onscroll = function (event) {

    var scrollTop = document.body.scrollTop > 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    var width = container.clientWidth;
    var style = nav.currentStyle ? nav.currentStyle : window.getComputedStyle(nav, null);

    if (scrollTop > nav.scrollTop + nav.clientHeight) {
        if (flag) return true;
        nav.style.position = 'fixed';
        nav.style.width = (width - parseInt(parsePx(nav, 'paddingLeft')) - parseInt(parsePx(nav, 'paddingRight'))) + 'px'
        nav.style.top = "0px"
        flag = true;
    } else {
        if (!flag) return true;
        nav.style.position = 'static'
        nav.style.width = 'auto'
        flag = false;
    }
}

window.onresize = function(){
    var width = container.clientWidth;
    var style = nav.currentStyle ? nav.currentStyle : window.getComputedStyle(nav, null);
    //console.log(width)
    if(flag)
    {
        nav.style.width = (width - parseInt(parsePx(nav, 'paddingLeft')) - parseInt(parsePx(nav, 'paddingRight'))) + 'px'
        console.log(nav.style.width)
        nav.style.top = "0px"        
    }
}