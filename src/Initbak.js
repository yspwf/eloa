const Koa = require('koa');

const KoaRouter = require('koa-router');
const Router = new KoaRouter();
const KoaCompose = require('koa-compose');


class App extends Koa{

    constructor(){
        super();
    }

    
    createContext(req, res) {
        const context = super.createContext(req, res);
        // 注入全局方法
        this.injectUtil(context);
    
        // 注入Services
        //this.injectService(context);
        return context
    }
    
    injectUtil(context) {
        utils.forEach(util => util(context));
    }
    

    start(port){
        this.listen(port, ()=>{
            console.log('server start ' + port);
        });
    }

    
}

//const { Context } = require('koa');

class BaseController{
    
    constructor(services){
        //console.log(services.$controller)
        this.service = services;
        //this.Mod = '2332435';
    }

    // test(){
    //     console.log('234234');
    // }


}

exports.Controller = BaseController;


const rootPath = process.cwd();
console.log(rootPath);
const fs = require('fs');

function loaderControllerDir(server){
    const files = fs.readdirSync(rootPath + '/controller/');
    //console.log(files);
    const controllers = {}
    for (const file of files) {
        if (file.toLowerCase().endsWith('js')) {
            const controller = require(rootPath + `/controller/${file}`);
            //console.log(controller);
            controllers[`${file.replace(/\.js/, '')}`] = new controller(server);
        }
    }
    return controllers;
}


function loaderServiceDir(models){
    const files = fs.readdirSync(rootPath + '/service/');
    //console.log(files);
    const services = {}
    for (const file of files) {
        if (file.toLowerCase().endsWith('js')) {
            const service = require(rootPath + `/service/${file}`);
            //console.log(service);
            services[`${file.replace(/\.js/, '')}`] = new service(models);
        }
    }
    return services;
}


function loaderModelDir(sqe){
    const files = fs.readdirSync(rootPath + '/model/');
    const models = {}
    for (const file of files) {
        if (file.toLowerCase().endsWith('js')) {
            const model = require(rootPath + `/model/${file}`)
            //console.log(model({sqe}))
            models[`${file.replace(/\.js/, '')}`] = model({sqe});
        } 
    }
    return models;
}

function loaderMiddlewareDir(){
    const files = fs.readdirSync(rootPath + '/middleware/');
    //console.log(files);
    const middles = {}
    for (const file of files) {
        if (file.toLowerCase().endsWith('js')) {
            const middle = require(rootPath + `/middleware/${file}`)
            //console.log(model({sqe}))
            middles[`${file.replace(/\.js/, '')}`] =  middle;
        } 
    }
    return middles;
}






const Sequelize = require('sequelize');
const conf = {
    host: '42.192.20.211',
    dialect: 'mysql',    // 声明操作哪个数据库
    freezeTableName: true
}

const seq = new Sequelize('blog', 'root', 'root', conf)


class BaseServer{
    constructor(models){
        this.model = models;
    }
}


const Koabody = require('koa-body');

let Middles = loaderMiddlewareDir();
exports.Middles = Middles;

const schedule = require('node-schedule');

const Init = (port = 8090)=>{
    const app = new App();
    app.use(Koabody());
    app.use(async (ctx, next) => {
        try{
            await next();
            ctx.body = {
                status: 'success',
                message: '',
                data: ctx.body
            }
        }catch(error){
            console.log(error);
            ctx.body= error.msg;
        }
        
    })

   

   
    
    let Models = loaderModelDir(seq);
    // console.log("===models===")
    //     console.log(Models);
    // console.log("===models===")

    let Services = loaderServiceDir(Models);
    app.use(async (ctx, next) => {
        ctx.Service = Services;
        await next();
    })
    // console.log("===Services===")
    //     console.log(Services);
    // console.log("===Services===")

    //let Controllers = loaderControllerDir(Services);
    
    //console.log(async Controllers.User.index())
    // app.use(async (ctx, next) => {
    //     ctx.Controller = Controllers;
    //     await next();
    // });

    app.$controller = '234234';

    
    let Controllers = loaderControllerDir(app);
    app.use(async (ctx, next)=>{
        await next();
    });

    const scheduleFiles = fs.readdirSync(rootPath+'/schedule/');
    for(const schedulefile of scheduleFiles){
        const scheduleFunc = require(rootPath+'/schedule/'+schedulefile);
        scheduleFunc(schedule);
    }

    //require('../router/User')({Router, Controllers, Middles});
    //require('../router/Home')({Router, Controllers, Middles});

    const routerFiles = fs.readdirSync(rootPath+'/router/');
    //console.log(routerFiles);
    for(const router of routerFiles){
        const routerFunc = require(rootPath+'/router/'+router);
        routerFunc({Router, Controllers, Middles});
    }
   
    app.use(KoaCompose([Router.routes(), Router.allowedMethods()]));
    app.start(port);
    return app;
}

exports.Init = Init;
exports.BaseServer = BaseServer;
//module.exports = { Init, BaseServer};