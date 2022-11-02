# ios命令行打包

## 工作需求

- 很多的换皮项目需要打包 这里最少25个
- 流程化的打包顺序所以需要使用bat或者shell进行批量的构建打包方便进行多个进行打包的操作

## 工作流程的整理与整理

1. cocos creator 打包安卓(命令构建)
2. 复制安卓构建下面的aesset和res文件
3. 然后把是所有的git下面项目的构建文件aesset和res文件创建一个文件夹复制到总的文加下
4. 然后把总的文件夹复制给mac上对应的打包git原始工程上
5. 最后利用xcode的命令对其进行编译，打包，导出操作。

## 工作开始

首先我的测试环境是两个系统一个是windows10和macbookpor

构建cocos的环境我都在windows10下面进行的所以没有用shell语言而是用的bat进行，但是原理是一样

我的版本

- cocos creator 2.4.4版本
- 安卓的sdk 30.0.3
- ndk 22
- xcode 是14.01版本
- mac 操作系统是vertuara 13.0
- 一个安装ipa的软件 爱思助手

吐槽一下网上很多的人每次都是截图，写顺序和命令从来不写版本，造成就算我们用的是同样的顺序和步骤但是也不能得到我们想要的结果，在protobufjs的打包上深有体会，希望这次整理对一些朋友可以节省时间。

### cocos creator 安卓构建

- 首先要有ndk，和sdk的配置，这个网站上一搜一大把
- 自动化的命令 我参考的是 2.4的版本 地址在 https://docs.cocos.com/creator/2.4/manual/zh/publish/publish-in-command-line.html
	- 参数说明 CocosCreator/CocosCreator.exe 这个地方就是一个你在windows上ccc的安装的地址
	- 这里要注意的是：1.--build "platform=android;debug=true" 这里的debug=false我测试的时候会编译卡顿，或者说非常慢，造成我以为时候挂了。
	- 注意2：就是ccc没有压缩图片的工具，建议就是在构建的时候对图片进行一个压缩处理。可以参考我的第一篇文章：https://github.com/Nick19861111/work/tree/main/pngquant 图片压缩。
	- 下面是构建的比较完整的命令，参数官网都有说明
	
	你的cocos安装exe的路径 --path 你的工程路径 --build "platform=android;debug=true;template=link;"

- 构建完成：如果没出意外的话，你应该能看到构建成功的提示。然后到build/jsb-link/文件夹因为我是选择link方式构建，如果你不是请自行参照自己的构建的文件夹，然后在里面就可以看到两个重要的文件夹assets和src 英文上也很好理解一个是资源一个是代码的打包后面会利用这两个文件夹做文章。

