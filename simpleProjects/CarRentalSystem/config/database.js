const mongoose = require('mongoose');
const User = require('../models/User');
const encryption = require('../util/encryption');

mongoose.Promise = global.Promise;
module.exports = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        } 

        //добавяне на Amina-a към нашата апликация
        User.find()
            .then((users) => {
                    if(users.length > 0){
                        return
                    }
                    const salt = encryption.generateSalt();
                    const hashedPass = encryption.generateHashedPassword(salt, '1');
                    User.create({
                        username: 'Admin',
                        hashedPass: hashedPass,
                        firstname: 'Lubomir',
                        lastname: 'Atanasov',
                        salt: salt,
                        roles: ['Admin']
                    })
                    console.log('Database is ready :)');

            }).catch(err => {
                console.log('Something went wrong with Database');
                console.log(err);
            });
    });

    db.on('error', reason => {
        console.log(reason);
    });
};