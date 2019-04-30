const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstname: { type: mongoose.Schema.Types.String },
    lastname: { type: mongoose.Schema.Types.String },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }],
    rents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rent'}]
});

userSchema.method({
    authenticate: function (password) //password ot Schema
    { 
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});
// console.log('userSchema');
// console.log('++++++++++++++++++++++++++++++++++++++++++');
// console.log(userSchema);

const User = mongoose.model('User', userSchema);//add roles  
module.exports = User;
