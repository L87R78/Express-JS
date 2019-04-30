const HomeController = require('../controllers/home-controller');
const BookController = require('../controllers/book-controller');

const Book = require('../models/book'); //temp for now!!!




module.exports = app => {
   
    app.get('/', HomeController.getIndex);
    app.get('/add', BookController.getAddBook);
    app.post('/add', BookController.postAddBook);
    app.get('/all', BookController.getAll);
    app.get('/details/:id', BookController.getDetails);
    app.get('/delete/:id', BookController.getDelete);
    app.get('/change/:id', BookController.ChangeBook);
    app.get('/back/:id', BookController.back);


    app.get('/buy/:id', (req, res) => {
        if(req.session.card === undefined){
            req.session.card = {};
        }
        const id = req.params.id;

        let product = Book.findOne({_id: id})
                // .select('_id title author releaseDate imageUrl price')
                // .then(books => {
                //     res.render('books/all', { books })
                // })
        console.log(id)
        req.session.cart.push(id);
        res.redirect('/');
        
    });




    

    app.get('/addProduct', (req, res) => {
        // res.write('<a href="/readCookie"> Read Cookie</a><br><a href="/setCookie"> Set Cookie</a><br><a href="/count"> Counter</a>');
        // res.end();
        res.render('./Shop/shop')
    });
    app.get('/setCookie', (req, res) => {
        // res.cookie('message', 'lqllqlqlqlqllq'); //for cookie
        // res.end();
        req.session.message = 'hello session!'
        res.write('Session set!')
        res.end();
    });
    app.get('/count', (req, res) => {
        // const count = req.cookies.count || 0; //for cookie
        // res.cookie('count', Number(count) + 1);
        // res.redirect('/cookie')
        const count = req.session.count || 0;
        req.session.count = Number(count) + 1;
        res.redirect('/cookie');
    })
    app.get('/readCookie', (req, res) => {
        //res.json(req.cookies)   //for cookie
        res.json(req.session);
    })
};