# plist文件的读取和修改

## 为什么要使用nodejs去读取plist

### plist是干嘛的

参考 https://baike.baidu.com/item/Plist/4370218，我的理解就是对一些东西的描述。他的本质就是一个xml。

### 需求

这个是ios的打包的延展，有几十个游戏需要下载的时候就需要几十个plist进行下载的配置下载，于是把所有的放在一起进行管理，这样也不容易出错。

### 为什么使用nodejs去做

1. 有专门针对plist的文件读取的包，解析和编译都很容易
2. 可以使用node的命令，就是可以制作成一个流程，使用bat文件对其进行操作。


## 基础使用

1. 安装nodejs
2. 使用npm install plist 进行安装
3. 使用核心的两个方法对其进行操作，demo代码如下

### 代码

    const fs = require("fs")//读取io
	const plist = require("plist");//load一个plist
	
	const list = ["f36577", "db36589"] //用户文件操作
	const listTitle = ["f365", "db365"];
	const listBunldId = ["com.f365.hoc", "com.db365.hoc"]
	const url = "https://bibo-test-hk.oss-accelerate.aliyuncs.com/"
	
	for (let i = 0; i < list.length; i++) {
	    let fileContext = fs.readFileSync("./" + list[i] + ".plist", 'utf-8');
	    let content = plist.parse(fileContext);//解析数据
	    content.items[0].assets[0]['url'] = url + listTitle[i] + ".ipa";
	    content.items[0].metadata['bundle-identifier'] = listBunldId[i];
	    content.items[0].metadata['title'] = listTitle[i];
	    fs.writeFile("./" + list[i] + ".plist", plist.build(content), function (err) {
	        if (err) throw err;
	        // 如果没有错误
	        console.log("Data is written to file successfully.")
	    })
	}


关键的代码就是**plist.parse**和**plist.build**


## 参考文献

基础使用：https://blog.csdn.net/KimBing/article/details/122591722

写入文件：https://www.cainiaojc.com/nodejs/nodejs-write-to-file.html