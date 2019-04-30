const HomeController = require('../controllers/home');

module.exports = app => {
    app.get('/', HomeController.home);
    app.get('/add/:id', HomeController.add);
    app.get('/myCarts', HomeController.myCarts);
    app.get('/delete/:id', HomeController.delete);
    app.get('/readSession', HomeController.readSession);
    app.get('/login', HomeController.login);
    
    app.get('/*', HomeController.error);
}