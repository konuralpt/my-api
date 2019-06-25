const express = require('express');
const app = express();

const movies = require('./routes/movies') ;
const users = require('./routes/users');


app.get('/', function(req, res){
	res.json({"tutorial" : "Build REST API with node.js"});
});

app.use('/users', users);
app.use('/movies', movies);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

module.exports = app;