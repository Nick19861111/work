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

### 使用bat文件对文件进行复制

思路：
- 所使用的的命令
- 实例

所用的命令:

- 复制 xcopy copy 
- 创建文件夹 mkdir 

1. 创建一个文件夹用来存放刚才那两个文件夹 mkdir 文件夹名 这里你最好和mac上的原始文件夹同名
2. 使用copy和xcopy进行刚才的文件夹拷贝到刚刚创建的文件下

	xcopy 你的ccc项目地址\build\jsb-link\assets 刚创建文件夹地址\assets\ /s /e /y 
	xcopy 你的ccc项目地址\build\jsb-link\src 刚创建文件夹地址\src\ /s /e /y 

这样我们就完成了拷贝的过程。

这样一个构建就基本完成，然而可能你的git下面有很多的换皮项目，我的做法是把每一个项目都独立出来，然后用循环执行每一个项目的刚才写的bat文件打到每一个项目都编译的效果，当然我这么做主要是想每一个项目修改的东西不一样可能需要单独的提交，例子bat如下

	set list=1 2 3 4 5 6 7 8 ::这里的1-8时候代表你对应的git项目名
	mkdir zong ::这里我创建了一个放所有的子目录文件夹，这样方便管理
	
	(for %%i in (%list%) do (
		call .\%%i\build.bat ::这里就是执行对应git下面的build.bat文件，这里就是我们上面已经写好的bat文件夹
	))

	rar a zong.zip 你要存放的路径 ::这里是使用的winrar这个软件，然后把你的winrar的exe路径放入到Path下面就可以使用，打包操作

### 使用ios进行打包

思路：
- 得到zong.zip文件,并且解压得到对应刚才所有的项目构建的 assets和src文件夹并且也进行了分类
- 然后就是拷到mac上面进行操作
- 使用shell对其操作

1. 得到刚才所有换皮游戏的git项目下面的assets和src文件以后就可以利用shell对他们进行复制（注意：就是ccc下面的ios项目有时候覆盖不能打出最新的包，所以我在这边处理的时候都是先把ios构建的assets和src两个文件夹进行删除操作，然后在进行复制，这里我就不在去说命令了，可以自行百度

代码如下

	cd 到你所对应的ios构建的目录下
	rm -rf 你要删除的文件夹
	cp -rf 你复制的原地址 要复制的地址

2.这一步操作完成以后就可以在ios的构建下面对其进行构建了

	cd ../proj.ios_mac/" #进入目标项目中,我这里简略了项目地址
	xcodebuild clean # 清理 对项目进行清理
	xcodebuild -list # 查看 这一步很重要 你能看到你的对应项目的一些具体信息比如target 什么的
	xcodebuild -archivePath "你编译以后的文件存放地址.xcarchive" -sdk iphoneos -target 你的项目名 -scheme 项目名字 -configuration "Release" archive 如果出现Archive succeeded 就说明你成功
	xcodebuild -exportArchive -archivePath 你编译以后的文件存放地址.xcarchive -exportPath .存放.ipa的位置 -exportOptionsPlist "./buile/ExportOptions.plist"

这里最后一个./buile/ExportOptions.plist 这个是需要配置一些信息的plist可以自行百度。

以上就是我从ccc构建到ios打包的思路，希望能够帮到你，如果有帮助到你，请给一个星，谢谢。