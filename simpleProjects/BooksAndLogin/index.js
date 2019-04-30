const evn = 'development';

const express = require('express');
const settings = require('./config/settings')[evn];
const database = require('./config/database');
const server = require('./config/express');
const routes = require('./config/routes');
const port = settings.port;

const cookieParser = require('./config/express');
const session = require('./config/express');

const authRouter = require('./auth')


database(settings);
const app = express();
cookieParser(app);
session(app);
server(app);
routes(app)
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Server started... at port ${port}!`)
})


