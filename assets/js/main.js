define(function(require){
    var base = require('base');
    var cssKit = require('style/cssKit')

    var nav = document.getElementsByTagName('nav')[0];
    var container = document.getElementById('container');
    var flag = false;

    base.addEvent(window,'scroll',function(event){
        var scrollTop = document.body.scrollTop > 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        var width = container.clientWidth;
        var style = nav.currentStyle ? nav.currentStyle : window.getComputedStyle(nav, null);

        if (scrollTop > nav.scrollTop + nav.clientHeight) {
            if (flag) return true;
            nav.style.position = 'fixed';
            nav.style.width = (width - parseInt(cssKit.parsePx(nav, 'paddingLeft')) - parseInt(cssKit.parsePx(nav, 'paddingRight'))) + 'px'
            nav.style.top = "0px"
            flag = true;
        } else {
            if (!flag) return true;
            nav.style.position = 'static'
            nav.style.width = 'auto'
            flag = false;
        } 
    });

    base.addEvent(window,'resize',function(){
        var width = container.clientWidth;
        var style = nav.currentStyle ? nav.currentStyle : window.getComputedStyle(nav, null);
        //console.log(width)
        if(flag)
        {
            nav.style.width = (width - parseInt(cssKit.parsePx(nav, 'paddingLeft')) - parseInt(cssKit.parsePx(nav, 'paddingRight'))) + 'px'
            console.log(nav.style.width)
            nav.style.top = "0px"        
        }        
    })

});
