const restrictedPages = require('../config/auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const articleController = require('../controllers/article');

module.exports = (app) => {
    app.get('/', homeController.index);

    //user routes
    app.get('/user/register', restrictedPages.isAnonymous , userController.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous , userController.registerPost);

    app.get('/user/login', restrictedPages.isAnonymous , userController.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous , userController.loginPost);

    app.get('/user/logout', restrictedPages.isAuthed , userController.logout);

    //article routes
    app.get('/article/create', restrictedPages.isAuthed, articleController.createGet);
    app.post('/article/create', restrictedPages.isAuthed, articleController.createPost);

    app.get('/article/details/:articleId', restrictedPages.isAuthed, articleController.details);

    app.get('/article/delete/:articleId', articleController.deleteGet);
    app.post('/article/delete/:articleId', articleController.deletePost);
    
    //TODO middleware to check if author
    app.get('/article/edit/:articleId', articleController.editGet);
    app.post('/article/edit/:articleId', articleController.editPost);
};

