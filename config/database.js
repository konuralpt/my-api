//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/poke_it';

mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;