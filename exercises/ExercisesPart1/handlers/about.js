const fs = require('fs');

function aboutHandler(req, res){
    if(req.path == '/about.html'){
        fs.readFile('./html/about.html', 'utf8', (err, data) => {
            res.writeHead(200, {
                'content-type': 'text/html'
            })
            res.write(data);  //work with string and buffer
            res.end();
        })
    }else{
        return true;
    }
}

module.exports = aboutHandler;