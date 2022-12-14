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
client.set("namess", "localhost",()=> {
    console.log("set database is successfully");
});

client.get("namess",(error, fooValue)=>{
    console.log("get database is successfully",fooValue);
});

connection.query('select * from userinfo',  (error, results, fields)=>{
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        console.log(results[i].nickName);
        client.HMSET(results[i].id,"nickName",results[i].nickName,"password",results[i].password,"face",results[i].face,"sex",results[i].sex,"ukey",results[i].ukey)
    }
});