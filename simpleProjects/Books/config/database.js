const mongoose = require('mongoose');

module.exports = function(settings){
    mongoose.connect(
        settings.db,
        err => {
            if(err){
                console.log(err);
                return;
            }else{
                console.log('MongoDb up and running....')
            }
        }
    )
}



