# pngquant 作用

主要是无损压缩png 

官网：https://pngquant.org/

windows 下载地址：https://link.segmentfault.com/?enc=0gSk92eM1x2fGXNXQB4w7Q%3D%3D.t%2B3XbK82PIlU8xWOGrG2gPsXivFR%2B3f9ZcIdgJzKUlZ3T1s5T%2BMGkvp5w%2FVF5tpl

下载以后解压文件以后把对应的地址放到配置文件里面和java的配置一模一样，放到path下面就可以直接在任何的地方使用了。

demo

	pngquant --f --quality=60-80 .\*.png --ext .png

其中

- --quality 品质
- .\*.png 当前文件夹下的所有的.png文件压缩
- --ext 输出的格式，更多的请参考官网的命令

下面是结合dos命令对图片的操作

	cd D:\test\tiyu\assets\resources

	for /R %%s in (.) do (
	  cd %%s
	  pngquant --f --quality=60-80 .\*.png --ext .png
	)

