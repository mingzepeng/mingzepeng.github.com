---
layout: post
title: "javascript中函数定义两种方式的加载方式"
date: 2013-10-26 20:45:09
description: ""
categories: javascript
tags: []
---

{% highlight javascript %}
var foo = function(){};
{% endhighlight %}

{% highlight javascript %}
function foo(){}
{% endhighlight %}

以上是javascript中定义函数的两种方式，另外还有一种是通过Function 函数来实现的，但这种用得不多，就不作为讨论了。

此前看过一篇文章，依稀记得文章里讲，说两者其实没有区别，第二种方式只是为了迎合C语言系列程序员的编程习惯而构造出来的语法糖。但这个问题还是在之前的面试中被问到了，我的回答显然让对方并不满意，回来后翻资料的时候恰好看到了一个例子，于是做了一些测试，发现两者其实还是有区别的。

javascript 虽然是一种脚本语言，但引擎在解释代码的时候，还是会有一个“预编译”的过程。这个过程会执行下来的一些操作：

1. 创建一个当前环境下的活动对象。
2. 将那些用var申明的变量设置为活动对象的属性，为这些变量赋值为undefined，并将那些以`function定义`的函数也添加为活动对象的属性，而且它们的值也都是函数的定义。

从上面的信息中可以看出，js是有一个“预编译”的过程，会预先加载function定义的函数，那么如下代码经过测试，是能够正确执行的

{% highlight javascript %}
foo()  // output:foo has been loaded
function foo()
{
	console.log("foo has been loaded");
}
{% endhighlight %}

上述的函数定义显然是符合“预编译”过程中`会预先加载function定义的函数`这句话的。 


那么我们考虑另外一种函数定义方式，见如下代码。
{% highlight javascript %}
foo()  // output:foo has been loaded or error
var foo = function()
{
	console.log("foo has been loaded");
}
{% endhighlight %}

上述的函数定义方式，会产生怎样的结果呢？在chrome30中，错误信息如下：`Uncaught TypeError: Property 'foo' of object [object Object] is not a function`，显然这种函数的定义方式是符合“预编译”过程中对于用var定义普通变量的规律。

是不是可以这样子理解，第一种函数定义为预加载，而第二种则为运行时加载。

测试环境：chrome30,firefox24,IE7~8

####参考####
http://hi.baidu.com/chenminliang/item/f87bdfd42dea14332b35c730