# xcode bunld id 修改 导致不能安装的问题

1. xcode 修改bunld id 直接在xocde修改的时候会出现编辑器的卡顿的那就是在编译，等编译完成以后在移动tab标签就不会出现卡顿
2. 打包出来以后用使用ipa，后缀改成zip方式，并且解压出来。
3. 使用命令*codesign -vv -d* 后面接你刚才解压的文件，就会出现对应的列表查看和你的xcode是否一致