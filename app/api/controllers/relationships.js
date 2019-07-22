const relationshipsModel = require('../models/relationships');
const mongoose = require('mongoose');

module.exports = {

  getAll: function(req, res, next) {
    relationshipsModel.find({}, function(err, userFriends){
     if (err) {
      next(err);
     } else {
      res.json({status:"success", message: "", data:{friends: userFriends}});
     }
    });
   },

 getFriendsById: function(req, res, next) {
  relationshipsModel.aggregate([
    {$match: {
      user_id: mongoose.Types.ObjectId(req.params.user_id)
    }},
    { $lookup:
     {
       from: 'users',
       localField: 'relationship.user_id',
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
  relationshipsModel.findOneAndUpdate(
      req.body.user_id,
      {"$push": {user_friends: req.body.friend_id}},
      function(err, user_friendsData){
        if(err){
          next(err);
        }else{
          res.json({status: "success", message: "", data:{user_friends:user_friendsData}})
        }
      });
 },
 
deleteById: function(req, res, next) {

},

create: function(req, res, next) {
  relationshipsModel.create({ }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Movie added successfully!!!", data: null});
      
    });
 },
 
}