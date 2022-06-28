const Koa = require('koa');
const App = new Koa();

App.use(async (ctx, next)=>{
    // console.log("===========");
    // console.log("===========");
    // console.log("===========");
    await next();
});

const cors = require('koa2-cors');
// 配置插件
App.use(cors({
  // 任何地址都可以访问
  origin:"*",
  // 指定地址才可以访问
  // origin: 'http://localhost:8080',
  maxAge: 2592000,
  // 必要配置
  credentials: true
}));



const Koabody = require('koa-body');
App.use(Koabody());




// const Controller = require('./Controller');

// exports.Controller = Controller.Controller;

// const Server = require('./Server');
// exports.Server = Server.Server;


const Help = require('./Help');
exports.Help = Help.Help;



// const rootPath = process.cwd();
// const fs = require('fs');

// function loaderControllerDir(){
//     const files = fs.readdirSync(rootPath + '/controller/');
//     //console.log(files);
//     const controllers = {}
//     for (const file of files) {
//         if (file.toLowerCase().endsWith('js')) {
//             const controller = require(rootPath + `/controller/${file}`);
//             controllers[`${file.replace(/\.js/, '')}`] = new controller();
//         }
//     }
//     return controllers;
// }




// function loaderServiceDir(Models){
//     const files = fs.readdirSync(rootPath + '/service/');
//     //console.log(files);
//     const services = {}
//     for (const file of files) {
//         if (file.toLowerCase().endsWith('js')) {
//             //console.log(rootPath + `/service/${file}`);
//             const service = require(rootPath + `/service/${file}`);
//             //console.log(service);
//             services[`${file.replace(/\.js/, '')}`] = new service(Models);
//         }
//     }
//     return services;
// }


// function loaderModelDir(sqe){
//     const files = fs.readdirSync(rootPath + '/model/');
//     const models = {}
//     for (const file of files) {
//         if (file.toLowerCase().endsWith('js')) {
//             const model = require(rootPath + `/model/${file}`)
//             //console.log(model({sqe}))
//             models[`${file.replace(/\.js/, '')}`] = model({sqe});
//         } 
//     }
//     return models;
// }

// const Sequelize = require('sequelize');
// const config = require(rootPath+'/config/config');
// //console.log(config);
// const seq = new Sequelize(config.dbname, config.username, config.password, config.mysql)
// let Models = loaderModelDir(seq);

const rootPath = process.cwd();
const fs = require('fs');
const Sequelize = require('sequelize');
const config = require(rootPath+'/config/config');
const seq = new Sequelize(config.dbname, config.username, config.password, config.mysql)

const {loaderControllerDir, loaderServiceDir, loaderModelDir} = require('./loader');
let Models = loaderModelDir(seq);

let Services = loaderServiceDir(Models);

App.use(async (ctx, next) => {
    ctx.Service = Services;
    await next();
});

let ControllerList = loaderControllerDir(Services);

const log = require('./log')
App.use(async (ctx, next) => {
    const start = new Date();
    //响应间隔时间
    var ms;
    try{
        await next();
        ms = new Date() - start;
        //记录响应日志
        log.info(ctx, ms);
      
    }catch(error){
        console.log(error)
    }
})







const KoaRouter = require('koa-router');
const Router = new KoaRouter();

class RouterController {

    constructor(controllers){
        //console.log(controllers);
        this.Ctroller = controllers;
    }

    get(path, middlewares, func){
        let type = Object.prototype.toString.call(middlewares);
        
        if(
            type=='[object String]'){
            func = middlewares;
        }
        const controllerName = func.split('.')[0];
        const funcName = func.split('.')[1];
        if(typeof(middlewares) == 'function' || (type =='[object Array]' && middlewares.length >= 1)) {
            const middlewareList = [];
            if(typeof(middlewares) == 'function'){
                middlewareList.push(middlewares);
            }else{
                middlewareList.push(...middlewares);
            }
         
            Router.get(path, ...middlewareList, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }else{
            Router.get(path, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }
    }

    post(path, middlewares, func){
        let type = Object.prototype.toString.call(middlewares);
        
        if(
            type=='[object String]'){
            func = middlewares;
        }
        const controllerName = func.split('.')[0];
        const funcName = func.split('.')[1];
       
        if(typeof(middlewares) == 'function' || (type =='[object Array]' && middlewares.length >= 1)) {
            const middlewareList = [];
            if(typeof(middlewares) == 'function'){
                middlewareList.push(middlewares);
            }else{
                middlewareList.push(...middlewares);
            }
            
            Router.post(path, ...middlewareList, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }else{
            Router.post(path, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }
    }


    put(path, middlewares, func){
        let type = Object.prototype.toString.call(middlewares);
        
        if(
            type=='[object String]'){
            func = middlewares;
        }
        const controllerName = func.split('.')[0];
        const funcName = func.split('.')[1];
       
        if(typeof(middlewares) == 'function' || (type =='[object Array]' && middlewares.length >= 1)) {
            const middlewareList = [];
            if(typeof(middlewares) == 'function'){
                middlewareList.push(middlewares);
            }else{
                middlewareList.push(...middlewares);
            }
            
            Router.put(path, ...middlewareList, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }else{
            Router.put(path, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }
    }



    delete(path, middlewares, func){
        let type = Object.prototype.toString.call(middlewares);
        
        if(
            type=='[object String]'){
            func = middlewares;
        }
        const controllerName = func.split('.')[0];
        const funcName = func.split('.')[1];
       
        if(typeof(middlewares) == 'function' || (type =='[object Array]' && middlewares.length >= 1)) {
            const middlewareList = [];
            if(typeof(middlewares) == 'function'){
                middlewareList.push(middlewares);
            }else{
                middlewareList.push(...middlewares);
            }
            
            Router.delete(path, ...middlewareList, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }else{
            Router.delete(path, async (ctx, next) => 
                this.Ctroller[controllerName][funcName].bind(Object.assign(ControllerList[controllerName], { ctx }))(ctx, next) 
            ) 
        }
    }

    
}

const RouterServer = new RouterController(ControllerList)

// const RouterServer = require('./Router');
// //console.log(new RouterServer.router());
// let RouterObj = new RouterServer.router(ControllerList)

const routerFiles = fs.readdirSync(rootPath+'/router/');
for(const router of routerFiles){
    const routerFunc = require(rootPath+'/router/'+router);
    routerFunc(RouterServer);
}


const KoaCompose = require('koa-compose');


Router.get("/(.*)", async ctx => {
    console.log('404')
    // await ctx.render("404", {
    //     title: "404"
    // });
});

App.use(KoaCompose([Router.routes(), Router.allowedMethods()]))




const Init = (port = 9093)=>{
    //const app = new App();
    // App.use(Koabody());
    // App.use(async (ctx, next) => {
    //     try{
    //         await next();
    //         ctx.body = {
    //             status: 'success',
    //             message: '',
    //             data: ctx.body
    //         }
    //     }catch(error){
    //         console.log(error);
    //         ctx.body= error.msg;
    //     }
        
    // })

    App.listen(port, ()=>{
        console.log("server is start.... "+port);
    })
}

exports.Init = Init;
