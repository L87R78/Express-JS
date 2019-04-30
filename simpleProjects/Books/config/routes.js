const HomeController = require('../controllers/home-controller');
const BookController = require('../controllers/book-controller');

module.exports = app => {
   
    app.get('/', HomeController.getIndex);
    app.get('/add', BookController.getAddBook);
    app.post('/add', BookController.postAddBook);
    app.get('/all', BookController.getAll);
    app.get('/details/:id', BookController.getDetails);
    app.get('/delete/:id', BookController.getDelete);
    app.get('/change/:id', BookController.ChangeBook);
    app.get('/back/:id', BookController.back);

};