const http = require('http');
const port = 4555;
const fs = require('fs');
const query = require('querystring');
const url = require('url');
const zlib = require('zlib');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();


const staticHandler = require('./handlers/static');
const homeHandler = require('./handlers/home');
const errorHandler = require('./handlers/error');
const bigFile = require('./handlers/bigFileHandler');
const aboutHandler = require('./handlers/about');

http.ClientRequest;
http.ClientResponse;

const server = http.createServer(frontConstroller)
/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */

function frontConstroller(req, res){
    req.path =  url.parse(req.url).pathname;

    const handlers = [
         staticHandler,
         homeHandler,
         aboutHandler,
         bigFile,
         errorHandler
    ]

    if(req.method == 'GET'){
        for(let handler of handlers){
            if(handler(req, res) !== true){
                break;
            }
        }
    }
    else if(req.method == 'POST'){
        if(req.path === '/login'){
            const rs = fs.createReadStream('./html/loggedin.html')
            const reedBigFile = fs.createReadStream('./file.txt')
        
            let body = '';
            reedBigFile.on('data', data => {
                body += data    
                //const userNameAndPassword = query.parse(body)
               
            })
            reedBigFile.on('end', () => {
               res.write(body);
               res.end();
            })
            
            rs.pipe(res)
            reedBigFile.pipe(res)
            return;
        }
        res.end();
    }
}

//server.listen(port);
server.on('listening',function(){
    console.log('ok, server is running');
});

server.listen(port);
//console.log(`Listening on port ${port}...`)
