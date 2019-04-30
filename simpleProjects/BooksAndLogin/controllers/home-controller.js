const Book = require('../models/book');
const cookieParser = require('cookie-parser');
const session = require('express-session');


module.exports = {
  
    getIndex: (req, res) => {
        if(req.session.user === undefined){
            res.redirect('/');
            return;
        }
        Book
            .count( )
            .then(books => {
                res.render('index',  { books })
            }).catch(err => {
                console.log("Error :)")
                console.log(err)
            })    
    }
}
 