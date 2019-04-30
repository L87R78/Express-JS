const HomeController = require('../controllers/home');


module.exports = app => {
    app.get('/', HomeController.homeGet);
    app.get('/create', HomeController.createGet);
    app.post('/create', HomeController.createPost);

    app.get('/search', HomeController.search);

    app.get('/about', HomeController.about);
    app.get('/:id', HomeController.details);
    app.get('/*', HomeController.error);
};