// const Sequelize = require('sequelize');
// const conf = {
//     host: '42.192.20.211',
//     dialect: 'mysql',    // 声明操作哪个数据库
//     freezeTableName: true
// }
// const seq = new Sequelize('blog', 'root', 'root', conf)


module.exports = {
    username: 'root',
    password: 'root',
    dbname: 'blog',
    mysql:{
        host: '42.192.20.211',
        dialect: 'mysql',    // 声明操作哪个数据库
        logging:false,
        freezeTableName: true
    },

    secret_key: 'WJiol_8776#',

    debug: true
}