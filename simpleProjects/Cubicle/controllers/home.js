const CreateSchema = require('../models/create');
const qs = require('querystring');

module.exports = {
    homeGet: (req, res) => {
        CreateSchema.find({})
            .select(' _id name description imageUrl difficulty')
            .sort('difficulty')
            .then((cubs) => {
                res.render('index', { cubs })
            })
            .catch(err => {
                console.log('Somethig went wrong HomeGet');
                console.log(err);
            })
    },
    createGet: (req, res) => {
        console.log('create');
        res.render('create');
    },
    createPost: (req, res) => {
        //console.log(req.body)
        const createBody = req.body
        CreateSchema.create(createBody)
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.log('Somethig went wrong CreatePost');
                console.log(err);
            })
    },
    search: (req, res) => {
        const queryName = req.query.searchName;
        const from = Number(req.query.from);
        const to = Number(req.query.to);
        
        if(from >= 1 && from <= 7){
            CreateSchema.find({name:{$regex: new RegExp(queryName, "ig")}})
            .then((cube) => {
                res.render('search', { cube });
            })
            .catch(err => {
                console.log('Somethig went wrong search');
                console.log(err);
            });
        }else{
            res.send('Somethig went wrong from adn to');
        }
       
    },
    about: (req, res) => {
        console.log('about');
        res.render('about');
    },
    details: (req, res) => {
        const idCube = req.params.id;
        CreateSchema.findById(idCube)
            .then((cube) => {
                res.render('details', {cube});
            })
            .catch(err => {
                console.log(err);
            });

    },
    error: (req, res) => {
        res.send('<h3> Яж лайна </h3>');
    }
};