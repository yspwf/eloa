// const Koa = require('koa');

// const server = new Koa();

// const KoaRouter = require('koa-router');
// const Router = new KoaRouter();

// const Home = require('./controller/Home');
// const User = require('./controller/User');


// const UserServer = new User();

// const {getUrl, err} = require('./middlerware/Url');

// //server.use(resType());
// server.use(getUrl());
// server.use(err());


// Router.get("/home", Home.index);
// Router.get("/", UserServer.index)

// server.use(Router.routes()).use(Router.allowedMethods());

// server.listen(8090, ()=>{
//     console.log('server is start.....');
// });

const App = require('./src');
// console.log(server)
//server.Init();

module.exports = App;

