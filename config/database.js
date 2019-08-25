//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.DB_STRING;

mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;