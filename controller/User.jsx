//const App = require('../appone');
const server = require('../src');
class User extends server.Controller{
   
    async add(ctx){
        // console.log('231324');
        console.log(ctx.request.body);
        //await Middles.Validator.registerValidate(ctx.request.body);
        //ctx.body = await ctx.Service.Article.add(ctx.request.body);

        //ctx.throw("hhhh");
        //throw new Error('error')
        const result = await ctx.Service.Article.add(ctx.request.body);
        if(result){
            this.success("添加成功");
        }else{
            this.error("添加失败");
        }
    }


    async addUser(ctx){
        const {password} = ctx.request.body;
        const md5pwd = App.Help.Encrypt.md5(password);
        const params = Object.assign(ctx.request.body, {password: md5pwd});
    
        const result = await ctx.Service.Userinfo.add(params);
        if(result){
            this.success("添加成功");
        }else{
            this.error("添加失败");
        }
    }

}

module.exports = User;