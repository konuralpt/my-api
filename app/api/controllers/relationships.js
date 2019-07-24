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

/*
db.getCollection('relationships').aggregate([
  {$match: {
      user_id: ObjectId("5d2f574b1c27807fd7eb133d")}
  },
  { $unwind: "$relationship" },
  { $lookup: {
    from: "users",
    let: { relationship_id: '$relationship.user_id',relationship_status: '$relationship.status', },
    pipeline: [
      { $match: {
          $expr: { $and: [
              { $eq: [ "$_id", "$$relationship_id" ] },
              { $eq: [ "$$relationship_status", 2 ] }
          ] }
      } }
    ],
    as: "users",
  } },
  { $group : {
        _id : "$_id",
      "user_id": {"$first": "$user_id"},
      "users": {
        "$push": {
          "$cond": [
            {"$ne": [ {$size: "$users" }, 0 ]},
            "$users",
            null
          ]
        }
     }
  }},
  {$project:{
      
      userss: {
          "$cond": [
            {"$ne": [ { "$arrayElemAt": [ "$users", 0 ] }, null ]},
            "$users",
            null
          ]
       }
      
      }}
])
*/