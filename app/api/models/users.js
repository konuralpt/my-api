const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 username: {
  type: String,
  trim: true,  
  required: true,
 },
 email: {
  type: String,
  trim: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 image_uri: {
    type: String,
    trim: true,
    default: 'https://stosselintheclassroom.org/img/my_account_avatar.png'
    },
socket_id: {
  type: String,
  default: ''
 },
 push_token: {
   type: String,
   default: ''
 }
});

UserSchema.pre('save',function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User',UserSchema);