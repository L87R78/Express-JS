const mongose = require('mongoose');

const Schema = new mongose.Schema({
    name: { type: mongose.Schema.Types.String, required: true},
    description: { type: mongose.Schema.Types.String, required: true},
    imageUrl: { type: mongose.Schema.Types.String},
    difficulty: { type: mongose.Schema.Types.Number, required: true},
})
 
const CreateSchema = mongose.model('create', Schema);
module.exports = CreateSchema;