## redis作为mysql缓存

------

### 需求：

登录每次都要请求到mysql的请求，相对于这样的操作，我的优化就是把mysql的对应的数据在服务器请求的提前放入到redis里面等到redis的数据找不到的时候在去请求MySQL操作。

------

### 版本

mysql：5.7.22

redis：6

nodejs：14

------

### 使用技术

- nodejs操作mysql
- nodejs操作redis

nodejs操作MySQL 

```js
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '192.168.101.137',
    user: 'root',
    password: '123456',
    database: 'test'
});
connection.connect();
connection.query('select * from userinfo',  (error, results, fields)=>{
    if (error) throw error;
});
```

**注意** ：如果是mysql8.0以上的话会有报错

参考：https://juejin.cn/post/7133482160262938660

redis的操作

```js
var redis = require('redis');
const client = redis.createClient({ host: "127.0.0.1", port: 6379 });
// 使用事件发射器，检测错误
client.on("error", function (error) {
    console.log(error);
});
//测试数据
client.set("namess", "localhost",()=> {
    console.log("set database is successfully");
});
client.get("namess",(error, fooValue)=>{
    console.log("get database is successfully",fooValue);
});
```

合在一起

```js
var mysql = require('mysql');
var redis = require('redis');
var connection = mysql.createConnection({
    host: '192.168.101.137',
    user: 'root',
    password: '123456',
    database: 'test'
});

const client = redis.createClient({ host: "127.0.0.1", port: 6379 });
// 使用事件发射器，检测错误
client.on("error", function (error) {
    console.log(error);
});
connection.connect();
connection.query('select * from userinfo',  (error, results, fields)=>{
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        console.log(results[i].nickName);
        client.HMSET(results[i].id,"nickName",results[i].nickName,"password",results[i].password,"face",results[i].face,"sex",results[i].sex,"ukey",results[i].ukey)
    }
});
```

