//const { BaseServer } = require('../src/Init');
//const App = require('../appone');


const app = require('../src');

class Article extends app.Server{

    async list(page, size = 10){
        //return 'list';
       
        // let data = await this.model.Article.findAll();
        let count = await this.model.Article.count();

       
        let data = await this.model.Article.findAndCountAll({
            order:[
                ['id', 'desc']
            ],
            limit: size,
            //offset: Number(offset)
            offset: (page - 1) * size
        }).catch(error => { console.log(error)});
        // //console.log(tes);
        // console.log(data);
        return {'count':count, 'data':data };
    }

    async one(params) {
        const { id } = params;
        // let tes = await this.model.Article.findOne({where:{id: id}}).catch(error => { console.log(error)});
        // console.log(tes);
        let tes = await this.model.Article.findOne({where:{id: id}}).catch(error => { console.log(error)});
        return tes;
    }

    async add(params){
        let res = await this.model.Article.create(params).catch(error => { 
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


module.exports = Article;