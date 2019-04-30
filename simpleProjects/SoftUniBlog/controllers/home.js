const Articles = require('../models/Article');

module.exports = {
  index: (req, res) => {
    // TODO load all (if any) articles and pass them as context
    console.log('home')

    Articles.find()
          .populate('author') //взимаме цялата информация на автора
          .then((articles) => {
            console.log(articles)
            console.log(articles.length)
            res.render('home/index',  { articles } );
          })
          .catch(err => {
            console.log(err);
          })
    
  }
}
