const Article = require('../models/Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create')

    },
    createPost: (req, res) => {
        const { title, content } = req.body;
        const author = req.user._id;
        const user = req.user;
        //console.log(title)
        //console.log(content)
        //console.log(author)
        //console.log(user)

        const article = new Article({ title, content, author });

        article.save()
            .then((result) => {
                user.articles.push(result._id);
                return user.save();//презаписване на user в базата
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err)
            })
    },
    details: (req, res) => {
        console.log('Details')
        const articleId = req.params.articleId;
        Article.findById(articleId) 
                    .populate('author')
                    .then((article) => {
                        console.log(article);
                        const isAuthor = req.user.isAuthor(article);
                        res.render('article/details', { article, isAuthor });

                    })
                    .catch(err => {
                        console.log(err)
                    })

    },
    editGet: (req, res) => {

    },
    editPost: (req, res) => {

    },
    deleteGet: (req, res) => {

    },
    deletePost: (req, res) => {

    },
}
