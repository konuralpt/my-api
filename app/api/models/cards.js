const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const CardSchema = new Schema({
 card_name: {
  type: String,
  trim: true,
 },
 index: Number,
 card_items: [{
     name: String,
     index: Number,
     ribbon: {
        type: Boolean,
        default: false
     }
 }]
});

module.exports = mongoose.model('Card', CardSchema)