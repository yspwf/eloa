module.exports = (Router) => {
    //console.log(app);
    //const {Router, Controllers} = app;
    //Router.get("/home", 'Home.search');
    Router.get("/my", 'Home.search');
    Router.get("/list/:page", 'Home.index');
}