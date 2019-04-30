const Book = require('../models/book');

module.exports = {
  
    getIndex: (req, res) => {
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
 