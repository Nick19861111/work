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