const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    days: { type: mongoose.Schema.Types.Number, required: true},
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true}, //рефериране към ID-то запис в mongoose 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, //рефериране към User запис в mongoose
});


const Rent = mongoose.model('Rent', rentSchema); //Rent е името на всички rents коли в Collections
module.exports = Rent;

