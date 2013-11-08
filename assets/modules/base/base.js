define(function(require,exports,module) {
	exports.id = function(id){
		return document.getElementById(id) || null;
	};
    exports.addEvent = function(el,event,fnHandler){
        if(el.addEventListener)
            el.addEventListener(event,fnHandler,false);
        else
            el.attachEvent("on"+event,fnHandler);
    };
    exports.removeEvent = function(el,event,fnHandler){
        if(el.removeEventListener)
            el.removeEventListener(event,fnHandler,false);
        else
            el.detachEvent("on"+event,fnHandler);        
    };
})