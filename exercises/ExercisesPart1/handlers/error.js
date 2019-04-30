const fs = require('fs');

function errorHandler(req, res){
    fs.readFile('./html/error.html', 'utf8', (err, data) => {
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.write(data);  //work with string and buffer
        res.end();
        
    })
}

module.exports = errorHandler;