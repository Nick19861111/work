# 功能需求

- 在windows上为在mac上打包最好一切的准备。

# 实际操作

- mac上把需要打包的工程放在一个文件下并且共享出来
- 在windows上为构建，复制构建文件，进入共享文件对文件进行操作

# bat文件编写

新建buileIOS.bat文件

	set url=%cd% 设置当前文件夹
	set neturl=\\172.16.102.54\test1 设置共享文件夹地址
	//删除ccc编译的文件夹防止没有覆盖到
	rd /s /q %url%\build\jsb-link\assets
	rd /s /q %url%\build\jsb-link\src
	::call 构建
	call %url%\Construct.bat
	::进入构想文件夹
	pushd %neturl%
	::进入对应的子目录
	cd 子目录
	::打开对应的shell文件
	.\remove.sh
	::拷贝文件
	xcopy %url%\build\jsb-link\assets .\assets /s /e /y
	xcopy %url%\build\jsb-link\src .\src /s /e /y 

remove.sh文件
	
	rm /f /r .\assets
	rm /f /r .\src

做好了以上的工作，我们只需要打开mac 对应的目录下的ios项目进行打包就可以。