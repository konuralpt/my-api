const cardModel = require('../models/cards');
module.exports = {
 getById: function(req, res, next) {
  console.log(req.body);
  cardModel.findById(req.params.movieId, function(err, movieInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "Movie found!!!", data:{movies: movieInfo}});
   }
  });
 },
getAll: function(req, res, next) {
  let moviesList = [];
    cardModel.find({}, function(err, cards){
   if (err){
    next(err);
   } else{
     /*
    for (let movie of movies) {
     moviesList.push({id: movie._id, name: movie.name, released_on: movie.released_on});
    }*/
    res.json({status:"success", message: "Movies list found!!!", data: cards});
       
   }
});
 },
updateById: function(req, res, next) {
  cardModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){
if(err)
    next(err);
   else {
    res.json({status:"success", message: "Movie updated successfully!!!", data:null});
   }
  });
 },
deleteById: function(req, res, next) {
  cardModel.findByIdAndRemove(req.params.cardId, function(err, data){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Deleted successfully!!!", data:data});
   }
  });
 },
create: function(req, res, next) {
  cardModel.create({card_name: "New Card"}, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Movie added successfully!!!", data: result});
      
    });
 },
 addItem: function(req, res, next) {
   console.log(req.params);
  cardModel.findOneAndUpdate({_id: req.params.cardId},{ $addToSet: { card_items: {name: "New Item"} } },{ "new": true}, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Added successfully!!!", data: result});
      
    });
 },
 renameCard: function(req, res, next) {
  console.log(req.body._id);  
  cardModel.findOneAndUpdate({_id: req.body._id},{ card_name: req.body.name},{ "new": true}, function (err, result) {
     if (err) 
      next(err);
     else
      res.json({status: "success", message: "Updated successfully!!!", data: result});
     
   });
 },
 renameCardItem: function(req, res, next) {
  cardModel.findOneAndUpdate(
    {"card_items._id": req.body.item_id},
    { "$set": { "card_items.$.name": req.body.name } },{ "new": true}, function (err, result) {
     if (err) 
      next(err);
     else
      res.json({status: "success", message: "Updated successfully!!!", data: result});
     
   });
 },
 updateIndex: function(req, res, next) {
   var set ={};
   if(req.body.type == "card"){
     set = { "$set": {index: req.body.index }}
   }else{
    set = { "$set": { "card_items": JSON.parse(req.body.index) } }
   };
  cardModel.findOneAndUpdate(
      {"_id": req.body._id},set,{"new": true}, function (err, result) {
     if (err) 
      next(err);
     else
      res.json({status: "success", message: "Updated successfully!!!", data: result});
     
   });
 },
 deleteCardItem: function(req, res, next) {
  cardModel.findOneAndUpdate(
    {"card_items._id": req.body.item_id},
    {$pull : {"card_items" : {"_id":req.body.item_id}}},{ "new": true}, function (err, result) {
     if (err) 
      next(err);
     else
      res.json({status: "success", message: "Removed successfully!!!", data: result});
     
   });
 },
}