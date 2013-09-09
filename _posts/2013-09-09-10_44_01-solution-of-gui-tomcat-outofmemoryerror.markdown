---
layout: post
title: "window安装版tomcat:OutOfMemoryError解决方法"
date: 2013-09-09 10:44:01
description: ""
categories: java 
tags: []
---

我们在做一个基于工作流的管理系统，由于这是我接手的第一个java web项目，所以遇到了很多问题，其中一个是 **OutOfMemoryError**，这算是遇到的比较棘手的一个问题，虽然网上的解决方案众多，但并没有适用我所处的环境。

首先是谷歌到的对于这个问题的解释，千篇一律
>PermGen space的全称是Permanent Generation space,是指内存的永久保存区域，这块内存主要是被JVM存放Class和Meta信息的,Class在被Loader时就会被放到PermGen space中，它和存放类实例(Instance)的Heap区域不同,GC(Garbage Collection)不会在主程序运行期对PermGen space进行清理，所以如果你的应用中有很CLASS的话,就很可能出现PermGen space错误，这种错误常见在web服务器对JSP进行pre compile的时候。如果你的WEB APP下都用了大量的第三方jar, 其大小超过了jvm默认的大小(4M)那么就会产生此错误信息了。


####网上解决方法####
修改TOMCAT_HOME/bin/catalina.bat（Linux下为catalina.sh）  
在“echo "Using CATALINA_BASE:$CATALINA_BASE"”上面加入以下行：  
>set JAVA_OPTS=%JAVA_OPTS% -server -XX:PermSize=128m -XX:MaxPermSize=512m  

catalina.sh下为：

>JAVA_OPTS="$JAVA_OPTS -server -XX:PermSize=128m -XX:MaxPermSize=512m"


我遇到的问题

我安装的是非绿色版的tomcat，在TOMCAT_HOME/bin/目录下面是没有 catalina.* 这个文件的，也就是更改tomcat启动的时候java设置项，这个是可以在gui界面进行设置的，如图
![tomcat-gui]({{ post.title }}/assets/imgs/datas/38442109.png)

增大内存区的参数设置被添加到了java options项里面，然后成功解决这个问题，记得里面的单位 m 一定要小写,上述图中有错误，大写的话，启动会报错。