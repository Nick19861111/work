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
