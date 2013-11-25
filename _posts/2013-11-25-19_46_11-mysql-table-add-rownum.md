---
layout: post
title: "mysql数据表中增加序号（rownum）字段"
date: 2013-11-25 19:46:11
description: ""
categories: mysql
tags: []
---

mysql的数据表定义中，就可以为主键设置自增字段（Auto-increment），但如果表中已经存在数据，那么该如何解决。下面是谷歌出来的结果，只是对于显示而言，可以增加一个序号字段，并不会对原有的数据库表有所影响。
{% highlight sql %}
SELECT t.*, 
       @rownum := @rownum + 1 AS rank
  FROM YOUR_TABLE t, 
       (SELECT @rownum := 0) r
{% endhighlight %}

但博主这边的需求是要为原有的数据库表增加一个序号字段，原有的数据条数从1，2···开始编号，这个字段就是用来记录这个编号,命名为no。即增加一个字段，然后对这个字段进行update，网上也有很多的方法，博主试验的这个方法，应该来说是比较方便的：只是用到一条update语句。

{% highlight sql %}
update my_table t,(SELECT @rownum := 0) r  
set t.no = (@rownum := @rownum + 1)
{% endhighlight %}

参考文献

[http://stackoverflow.com/questions/1895110/row-number-in-mysql](http://stackoverflow.com/questions/1895110/row-number-in-mysql)