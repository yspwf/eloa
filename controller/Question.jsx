//const App = require('../appone');
const server = require('../src');
class Question extends server.Controller {
    async search (ctx) {
        ctx.body = "create";
        //this.success('create success');
    }
    
    async create (ctx) {
        //console.log("create");
        ctx.body = "create";
        //this.success('create success');
    }
   
}

module.exports = Question;
//module.exports = new Question();