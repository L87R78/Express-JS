const evn = 'development';

const express = require('express');
const settings = require('./config/settings')[evn];
const database = require('./config/database');
const server = require('./config/express');
const routes = require('./config/routes');
const port = settings.port;

database(settings);
const app = express();
server(app);
routes(app)


app.listen(port, () => {
    console.log(`Server started... at port ${port}!`)
})


