---
layout: post
title: "《javascript 高级程序设计》动态原型继承的一个错误"
date: 2013-08-31 18:40:38
description: ""
categories: javascript
tags: []
---

这是我在复习《javascript 高级程序设计》时候发现的一个问题，书里面讲得不是很易懂，于是我自己查阅了一下资料，了解了一下。以下代码是书中提到的利用动态原型实现继承的一个例子，并说这个例子是有缺陷的，问题代码在以下代码中注释特别标出来的那行的。

{% highlight javascript  linenos  %}
function Polygon(iSides) {
    this.sides  = iSides;
    if(typeof Polygon.__init__  === "undefined")
    {
        Polygon.prototype.getArea = function () {
            return 0;
        }
        Polygon.__init__ = true;
    }
}
 
function Triangle(iBase, iHeight) {
    Polygon.call(this, 3);
    this.base = iBase;
    this.height = iHeight;
    if(typeof Triangle.__init__ === "undefined")
    {
        Triangle.prototype = new Polygon();   //这一句是错误的，请注意！！！！！！！！
        Triangle.prototype.getArea = function(){
            return this.base * this.height / 2;
        }
        Triangle.__init__ = true;
    }
}
 
var t1 = new Triangle(2,2);
var t2 = new Triangle(2,2);
t1.getArea();   //Uncaught TypeError: Object #<Triangle> has no method 'getArea'
t2.getArea();   //2

{% endhighlight %}

通过对象t1和对象t2的__proto__ 属性可以查看这两个对象所指的原型链，发现这两个原型链指的并不是同一个对象。也就是说t2所指的原型链确实是我们代码中要实现的，而t1并不是我们想实现的，通过查看可以发现t1对象的原型链指向的是一个空对象。发生这种的原因有两个

1. 在于js对于对象是采用引用的方式。
2. new Foo 这种方式生成对象时候，js引擎内部的一个处理顺序。


首先是第一个原因，对于以下代码
{% highlight javascript %}
var a = new Object;
var b = a;
a = null;
console.log(b)   // Object { }
{% endhighlight %}
赋予变量a一个空对象，第二行新建变量b，并让b也引用a所引用的那个对象。此时那个空对象有了两个变量引用。第三行让a为null，并不会销毁这个对象，因为b还在引用该对象。

其次是第二个原因，
{% highlight javascript %}
function Car() {}
car1 = new Car()
{% endhighlight %}

对于以上的代码，发生了什么呢，这是[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)上的解释
>When the code *new foo(...)* is executed, the following things happen:
>
1. A new object is created, inheriting from foo.prototype. 
1. The constructor function foo is called with the specified arguments and this bound to the newly created object. new foois equivalent to new foo(), i.e. if no argument list is specified, foo is called without arguments. 
1. The object returned by the constructor function becomes the result of the whole new expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead. (Normally constructors don't return a value, but they can choose to do so if they want to override the normal object creation process.)

简单翻译一下即为：

1. 一个新的对象被创建，并从foo.prototype 继承（将该对象的__proto__指向foo.prototype）
1. 该构造函数，即foo函数被调用，在调用的时候，把函数内部的this变量绑定到了第一步新建的那个对象
1. 假如这个构造函数没有返回一个对象，则将返回第一步创建的对象

总结一下：  
那么我们现在可以解释为什么第一段代码会有问题了，当第一个对象t1被创建时，获得对其构造函数原型的引用，然后再执行构造函数，在构造函数中，该函数的原型重新引用了一个新对象，即**Triangle.prototype = new Polygon()**;但最初Triangle的原型对象还被t1.\_\_proto\_\_所引用着，因此不会被销毁，最终造成t1和t2对象的原型链指向的是**不同的对象**。