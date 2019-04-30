const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));


    app.use(session({
        secret: '123456',
        resave: false,  //ресетва таймера при всяка заявка
        saveUninitialized: false //да създава или да не създава сесия
    }));
    app.use(passport.initialize());
    app.use(passport.session());



    //--------------------------------------------------------------------------------------------------
    
    //custom middleware
    //това е след логване    има го в hadlebars в html-a
    app.use((req, res, next) => { //това е за Hello user or admin в началната страница(може и firstname,lastname i t.n.)
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    });
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.isAdmin = req.user.roles.indexOf('Admin') !== -1; //проверка дали е Admin или не
        }
        next();
    });
    //--------------------------------------------------------------------------------------------------


    app.set('view engine', '.hbs');

    app.use(express.static('./static'));
};