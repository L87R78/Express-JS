const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app, config) => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));


    // View engine setup.
    app.set('views', path.join(config.rootFolder, '/views'));
    app.set('view engine', 'hbs');

    // This set up which is the parser for the request's data.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // We will use cookies.
    app.use(cookieParser());

    // Session is storage for cookies, which will be de/encrypted with that 'secret' key.
    app.use(session({
        secret: 's3cr3t5tr1ng',
        resave: false,
        saveUninitialized: false
    }));

    // For user validation we will use passport module.
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {             //handlebars работи с locals
            res.locals.isAuth = req.user.isInRole('User'); //isAuth го ползваме в handlebars
            res.locals.isAdmin = req.user.isInRole('Admin')
            // if (res.locals.user.isInRole('Admin')) {//проверка за роля Admin
            //     res.locals.isAdmin = res.locals.user.isInRole('Admin'); //isAdmin го ползваме в handlebars
            // }
        }
        next();
    });

    // This makes the content in the "public" folder accessible for every user.
    app.use(express.static(path.join(config.rootFolder, 'public')));
};