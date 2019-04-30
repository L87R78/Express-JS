const mongose = require('mongoose');

const SchemaArticle = new mongose.Schema({
    title: {type: mongose.Schema.Types.String, require: true},
    content: {type: mongose.Schema.Types.String, require: true},
    author: {type: mongose.Schema.Types.ObjectId, required: true ,ref: 'User', unique: true},
    date: {type: mongose.Schema.Types.Date, default: Date.now},
})

const article = mongose.model('Article', SchemaArticle);
module.exports = article;