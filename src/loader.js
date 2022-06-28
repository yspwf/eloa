const rootPath = process.cwd();
const fs = require('fs');

function loaderControllerDir(service){
    const files = fs.readdirSync(rootPath + '/controller/');
    //console.log(files);
    const controllers = {}
    if(files.length > 0) {
        for (const file of files) {
            if (file.toLowerCase().endsWith('js')) {
                const controller = require(rootPath + `/controller/${file}`);
                controllers[`${file.replace(/\.js/, '')}`] = new controller(service);
            }
        }
    }
    
    return controllers;
}




function loaderServiceDir(Models){
    const files = fs.readdirSync(rootPath + '/service/');
    //console.log(files);
    const services = {}
    for (const file of files) {
        if (file.toLowerCase().endsWith('js')) {
            //console.log(rootPath + `/service/${file}`);
            const service = require(rootPath + `/service/${file}`);
            //console.log(service);
            services[`${file.replace(/\.js/, '')}`] = new service(Models);
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

// const Sequelize = require('sequelize');
// const config = require(rootPath+'/config/config');
// //console.log(config);
// const seq = new Sequelize(config.dbname, config.username, config.password, config.mysql)
// let Models = loaderModelDir(seq);


module.exports = {
    loaderControllerDir,
    loaderServiceDir,
    loaderModelDir
}
