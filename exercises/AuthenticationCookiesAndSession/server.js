const express = require('express');
//const authRouter = require('./config/auth');

//const env = process.env.NODE_ENV || 'development';
//const config = require('./config/config')[env];
const port = 4000;

const app = express();
require('./config/express')(app);


// app.use('/auth', authRouter);
// app.use((req, res, next) => {
//     console.log('проверка за user и ако няма директно ни изпраща към login страницата')
//     if (req.session.user === undefined) {
//         res.redirect('/auth/login');
//         return;
//     }
//     next();
// })
require('./config/routes')(app);






//----------------------------------------------------------------------------------------------------------------
//Cookie

// app.get('/', (req, res) => {
//     res.send('<a href="/readCookie"> Read Cookie</a><br><a href="/setCookie"> Set Cookie</a><br><a href="/count"> Count</a>');
//     res.end();
// })
// app.get('/setCookie', (req, res) => {
//     res.cookie('messageeee', 'Helloooooo');
//     res.end();
// })

// app.get('/readCookie', (req, res) => {
//     res.json(req.cookies) //JSON
// })
// app.get('/count', (req, res) => {
//     const count = req.cookies.count || 0;
//     res.cookie('count', Number(count) + 1);
//     res.write('<a href="/"> Back to home</a>')
//     res.end();
// })
//----------------------------------------------------------------------------------------------------------------

//Session

// app.get('/', (req, res) => {
//     res.send('<a href="/readSession"> readSession</a><br><a href="/setSession"> setSession</a><br><a href="/count"> Count</a>');
//     res.end();
// })
// app.get('/setSession', (req, res) => {
//     req.session.messageее = 'Hello session';
//     req.session.something = 'Hello something';
//     res.write('Session Set!')
//     res.end();
// })

// app.get('/readSession', (req, res) => {
//     res.json(req.session)
//     res.end();
// })
// app.get('/count', (req, res) => {
//     const count = req.session.count || 0; //закачаме нещо на сесията
//     req.session.count = Number(count) + 1;
//     res.write('<a href="/"> Back to home</a>')
//     res.end();
// })

//----------------------------------------------------------------------------------------------------------------
app.listen(port, console.log(`Server ready at ${port} port!`))

