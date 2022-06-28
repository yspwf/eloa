const KoaRouter = require('koa-router');
const Router = new KoaRouter();

exports.router =  class RouterController {

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
}