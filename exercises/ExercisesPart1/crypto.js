const crypto = require('crypto');

function generateSalt(){
    return crypto.randomBytes(128).toString('Base64');
}

function generateHash (salt, password){
    let hmac = crypto.createHmac('sha1', salt)
    return hmac.update(password).digest('hex');
    
}

console.log(generateSalt());