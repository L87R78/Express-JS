const restrictedPages = require('./auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const carController = require('../controllers/car');


// road
module.exports = app => {
    app.get('/', restrictedPages.isAuthed, homeController.index);

    app.get('/user/register', restrictedPages.isAnonymous, userController.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous, userController.registerPost);

    app.get('/user/login', restrictedPages.isAnonymous, userController.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous, userController.loginPost);
    app.post('/user/logout', userController.logout);

    app.get('/user/rents', restrictedPages.isAuthed, userController.myRents);

    app.get('/car/add', carController.addGetCar); //само за администратори
    app.post('/car/add', carController.postCar);
    app.get('/car/all', carController.allCars);

    app.get('/car/rent/:id', restrictedPages.isAuthed, carController.rentGet);
    app.post('/car/rent/:id', restrictedPages.isAuthed, carController.rentPost);

    app.get('/car/edit/:id', carController.carEdit);
    app.post('/car/edit/:id', carController.carPost);

    app.get('/car/delete/:id', carController.delete);

    app.get('/search', carController.search);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found :)');
        res.end();
    });
};