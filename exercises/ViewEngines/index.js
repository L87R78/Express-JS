const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
    res.render('layouts/home', {
        title: 'Ivannnnnnnnnnnnnnn',
        contacts: [
            {
                name: 'Lubo', email: 'Lubo@gmial.com'
            },
            {
                name: 'Ivan', email: 'Ivan@gmial.com'
            },
            {
                name: 'Misho', email: 'Misho@gmial.com'
            },
        ]
    })
})
app.use(express.static('./static'));

app.listen(3030);
