 const handlebars = require('express-handlebars');
 const session = require('express-session');
 const bodyParser = require('body-parser');
 const cookieParser = require('cookie-parser');

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');

    app.use(session({
        secret: 'something',
    }))

    app.use(cookieParser());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
};