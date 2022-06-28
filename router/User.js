module.exports = (Router) => {
    //console.log(app);
    //const {Router, Controllers, Middles} = app;
    // Router.get("/list/:page/:size", Controllers.User.index);
    // //Router.get("/test", rabbit.hide);
    // //Router.get.apply("/test", rabbit.hide());
    // Router.get("/test/:id", Controllers.User.one);
    // Router.post("/add", Controllers.User.add);
    Router.post("/add", 'User.add');

    Router.post("/adduser", 'User.addUser');
}