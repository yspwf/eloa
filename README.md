# eloa
基于koa实现mvc

以上基本实现了以koa为基础的mvc结构，对项目进行了controller, server, model 三个模块的划分，当前还未实现名称的规范，后期还会命名，校验等的规范化及rpc的支持。

入门使用：

1.下载npm包

```
npm init 
npm i eloa -S
```
2.创建controller, server, model 三个模块

3.启动
```
const server = require('eloa');
server.Init(port);
```





