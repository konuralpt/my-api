const user_friendsModel = require('../models/user_friends');
const mongoose = require('mongoose');

module.exports = {

  getAll: function(req, res, next) {
    user_friendsModel.find({}, function(err, userFriends){
     if (err) {
      next(err);
     } else {
      res.json({status:"success", message: "", data:{friends: userFriends}});
     }
    });
   },

 getFriendsById: function(req, res, next) {
  user_friendsModel.aggregate([
    {$match: {user_id: mongoose.Types.ObjectId(req.params.user_id) }},
    { $lookup:
     {
       from: 'users',
       localField: 'user_friends',
       foreignField: '_id',
       as: 'friends'
     }
    }
]).exec((err, userFriends) => {
  if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "", data:{friends: userFriends}});
   }
  });

 },

updateById: function(req, res, next) {
    user_friendsModel.findByIdAndUpdate(req.params.id,{name:req.body.friend_id}, function(err, movieInfo){

  });
 },
 
deleteById: function(req, res, next) {

 },

create: function(req, res, next) {
    user_friendsModel.create({ }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Movie added successfully!!!", data: null});
      
    });
 },
 
}