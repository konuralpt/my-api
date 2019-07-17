const mongoose = require('mongoose');
mongoose.set('debug', true);

//Define a schema
const Schema = mongoose.Schema;
const PokeListSchema = new Schema({
 user_id: {
  type: Schema.Types.ObjectId
 },
 poked_by: {
    type: Schema.Types.ObjectId
},
poke_date: {
    type: Date,
    default: Date.now
},
});

module.exports = mongoose.model('Poke_List',PokeListSchema);