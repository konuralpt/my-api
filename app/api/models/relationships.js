const mongoose = require('mongoose');
mongoose.set('debug', true);

//Define a schema
const Schema = mongoose.Schema;
const RelationshipsSchema = new Schema({
 user_id: {
  type: Schema.Types.ObjectId
 },
 relationship:[
     {
         user_id: {
             type: Schema.Types.ObjectId
         },
         status: Number
     }
 ]
 
});

// 0 Requested
// 1 Requested_By
// 2 Friend
// 3 Blocked
// 4 Blocked_By

module.exports = mongoose.model('Relationships',RelationshipsSchema); 