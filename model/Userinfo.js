//const Sequelize = require('sequelize');
const Sequelize = require('sequelize');
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

const UserInfo = (app)=>{
   //console.log(sqe);
    const { sqe } = app;
    const article = sqe.define("userinfo", {
        id:{
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: {
            //     notEmpty: true,
            // },
            defaultValue: ''
        },
        email: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: ''
        },
        password: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        create_at: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: Math.floor(Date.now()/1000)
        },
        update_at: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: Math.floor(Date.now()/1000)
        }
      },{
     // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
     // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
     freezeTableName: true,
     timestamps: false
   });
   
    return article;
}

module.exports = UserInfo;