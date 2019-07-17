const mongoose = require('mongoose');
mongoose.set('debug', true);

//Define a schema
const Schema = mongoose.Schema;
const UserFriendsSchema = new Schema({
 user_id: {
  type: Schema.Types.ObjectId
 },
 user_friends: [[Schema.Types.ObjectId]]
});

module.exports = mongoose.model('User_Friends',UserFriendsSchema);