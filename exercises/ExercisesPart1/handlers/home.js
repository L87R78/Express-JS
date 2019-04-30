const fs = require('fs');

function homeHandler(req, res){
    if(req.path == '/' || req.path == '/index.html'){
        
        fs.readFile('./html/index.html', 'utf8', (err, data) => {
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

module.exports = homeHandler;