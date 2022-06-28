//const App = require('../appone');

const {BaseController} = require('../Controller');
console.log(BaseController)
class Home extends BaseController{

    async index(ctx){
        //console.log(ctx.request.params);
        // let res = await this.Service.Article.one({"id":6});
        // console.log(res);
        //const data = await article.findAll();
        const { page } = ctx.request.params;
        //console.log(page);
        const data = await ctx.Service.Article.list(page);
        
        // // const data = await article.findOne({where:{id: 6}}).catch(error => { console.log(error)});
        //console.log(data);
        // // let data =  await ArticleModel.findOne({where:{id: 6}}).catch(error => { console.log(error)});
        //  console.log(data);
        //ctx.body = data;
        this.success(data);
    }

    async search(ctx){
        //console.log(ctx);
        //let res = await article.findOne({where:{id: 6}}).catch(error => { console.log(error)});
        //console.log(res);
        //ctx.body = res;
        const res = await ctx.Service.Article.one({id:6});
        this.success(res);
    }
}

module.exports = Home;

