# Bunyan 作用

主要是打日志和生成日志的。因为开发nodejs服务器需要有这么一个功能，以前写习惯了客户端没有保存日志的习惯。现在有了这个客户端和服务器都可以统一使用。

官网：https://www.npmjs.com/package/bunyan

## 安装

npm install bunyan 就等待安装，安装完以后就可以进行log的输入和打印了

## demo运行

	var bunyan = require('bunyan')
	let logs = bunyan.createLogger({
	    name: "TalkRoom",
	    streams: [{
	        path: "./bunyan.log"//输出log的地址
	    }]
	})

## 总结

作为一个客户端程序，我的习惯还是所看即所得，所以以前的在dos上可以打印log我也保留了下来，而这个作为一个服务器以后运行维护的时候增加检查的一个备选方案。



