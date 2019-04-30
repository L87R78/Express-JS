const Book = require('../models/book');

module.exports = {
    getAddBook: (req, res) => {
        res.render('books/add');
    },
    postAddBook: (req, res) => {
        let book = req.body;
        if(!book.title || !book.imageUrl){

            book.error = 'Title, ReleaseDate and Image URl are requared!'
            res.render('books/add', book)
        }
        book.releaseDate = new Date(book.releaseDate)
        Book.create(book)
            .then((c) => {
                res.redirect('/')
            }).catch((err) => {
                //console.log(err)
                errorHandler(err, res, cubeBody);
            })
    },
    getAll: (req, res) => {

        Book.find({})
            .select('_id title author releaseDate imageUrl price')
            .sort('-releaseDate')
            .then(books => {
                res.render('books/all', { books })
            })
    },
    getDetails: (req, res) => {
        console.log('here')
        const id = req.params.id;
        Book
            .findById(id)
            .then(book => {
                res.render('books/details',  book )
            })
    },
    getDelete: (req, res) => {
        Book
        .findByIdAndRemove({_id: req.params.id})
        .then(book => {
            res.redirect('/')
        })

        
    },
    ChangeBook: (req, res) => {
        Book
        .updateOne({_id: req.params.id})
        .then(book => {
            res.render('books/update', book)
        })
    },
    back: (req, res) => {
        res.redirect('/all')
    }
}
