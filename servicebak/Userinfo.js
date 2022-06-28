//const { BaseServer } = require('../src/Init');
//const App = require('../appone');

// const Sequelize = require('sequelize');
// const conf = {
//     host: '42.192.20.211',
//     dialect: 'mysql',    // 声明操作哪个数据库
//     freezeTableName: true
// }

// const sequelize = new Sequelize('blog', 'root', 'root', conf);
// sequelize.authenticate().then(() => {
//       console.log('连接成功');
//       console.log("hello");
//     })
//     .catch(err => {
//       console.log(err);
//     });

//     const article = sequelize.define("article", {
//         id:{
//             type: Sequelize.STRING,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         title: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             },
//         },
//         content: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             },
//         },
//         userId: {
//           type: Sequelize.INTEGER,
//           allowNull: false
//         },
//         createTime: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           defaultValue: Math.floor(Date.now()/1000)
//         },
//         updateTime: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           defaultValue: Math.floor(Date.now()/1000)
//         }
//       },{
//         // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
//      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
//      freezeTableName: true,
//      timestamps: false
//    });
const server = require('../src');
class Userinfo extends server.Server{

    async add(params){
        let res = await this.model.Userinfo.create(params).catch(error => { 
            if (error) {
                throw new Error(error);
            }
        });
        // console.log(tes);
        // return tes;
        if(res){
            return true;
        }
        return false;
    }

}


module.exports = Userinfo;