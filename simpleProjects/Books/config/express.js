const handlebars = require('express-handlebars'); //view engine
const express = require('express');
const bodyParser = require('body-parser'); //for form

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        layoutsDir: 'views/layouts',    // handlebars
        defaultLayout: 'main'
    }));
    app.set('view engine', 'hbs');
    //-------------------------------------------

    app.use(express.static('./static'))
    //app.use(express.static(path.static(__dirname, './static')))

    app.use(bodyParser.urlencoded({
        extended: true
    }));
}
    