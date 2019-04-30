const fs =  require('fs');

function handlerBigFile(req, res){

    if(req.path == '/bigfile'){
        const readStream = fs.createReadStream('./file.txt');

        res.writeHead(200, {
            'content-type': 'text/plain'
        })

        //readStream.pipe(res)

        readStream.on('data', data => {
            res.write(data)
        })

        readStream.on('end', () => {
            res.end();
        })


        // fs.readFile('./file.txt', 'utf8', (err, data) => {
        //     res.writeHead(200, {
        //         'content-type': 'text/plain'
        //     })
        //     res.write(data);
        //     res.end();
        // })
    }else{
        return true;
    }
}
module.exports = handlerBigFile;