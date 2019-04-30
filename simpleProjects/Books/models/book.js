const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String},
    releaseDate: {type: Date, required: true},
    imageUrl: {type: String, required: true},
    price: {type: Number},

});
const modelBook = mongoose.model('Book', bookSchema);
module.exports = modelBook;



                
