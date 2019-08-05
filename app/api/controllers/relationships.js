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
    {
      $match: { user_id: mongoose.Types.ObjectId(req.params.user_id) }
  },
  {
      $unwind: "$relationship"
  },
  {
      $lookup: {
          from: "users",
          localField: "relationship.user_id",
          foreignField: "_id",
          as: "user"
      }
  },
  {
      $unwind: "$user"
  },
  {
      $project: {
          _id:  "$relationship.user_id",
          username: "$user.username",
          email: "$user.email",
          status: "$relationship.status",
          image_uri: "$user.image_uri"
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
  var obj = {
    first_user_id: req.body.first_user_id,
    second_user_id: req.body.second_user_id, 
    status: req.body.status
  };
  update_by_id(obj)
  .then((dataa) => {
    if(dataa){
      res.json({status: "success", message: "", data:{user_friends:dataa}});
     }else{
      res.json({status: "success", message: "", data: {user_friends:null}});
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


sendRequest: function(req,res,next){
  var obj = {
    first_user_id: req.body.first_user_id,
    second_user_id: req.body.second_user_id, 
    status: req.body.status
  }
  //status 0
  update_by_id(obj,true)
  .then(() => {
   [obj.first_user_id, obj.second_user_id] = [obj.second_user_id, obj.first_user_id];
   obj.status = 1;
   update_by_id(obj,true)
   .then((dataa) => {
     if(dataa){
       res.json({status: "success", message: "", data: dataa});
      }else{
       res.json({status: "success", message: "", data: null});
      }
   })
  });   
  
},

acceptRequest: function(req, res, next){
   var obj = {
     first_user_id: req.body.first_user_id,
     second_user_id: req.body.second_user_id, 
     status: req.body.status
   }
   update_by_id(obj,true)
   .then(() => {
    [obj.first_user_id, obj.second_user_id] = [obj.second_user_id, obj.first_user_id];
    update_by_id(obj,true)
    .then((dataa) => {
      if(dataa){
        res.json({status: "success", message: "Movie added successfully!!!", data: dataa});
       }else{
        res.json({status: "success", message: "Movie added successfully!!!", data: null});
       }
    })
   });   
   
},

denyRequest: function(req,res,next){
  var obj = {
    first_user_id: req.body.first_user_id,
    second_user_id: req.body.second_user_id, 
  }
  update_by_id(obj,false)
  .then(() => {
   [obj.first_user_id, obj.second_user_id] = [obj.second_user_id, obj.first_user_id];
   update_by_id(obj,false)
   .then((dataa) => {
     if(dataa){
       res.json({status: "success", message: "", data: dataa});
      }else{
       res.json({status: "success", message: "", data: null});
      }
   })
  }); 
},

unRequest: function(req,res,next){
  var obj = {
    first_user_id: req.body.first_user_id,
    second_user_id: req.body.second_user_id, 
  }
  update_by_id(obj,false)
  .then(() => {
   [obj.first_user_id, obj.second_user_id] = [obj.second_user_id, obj.first_user_id];
   update_by_id(obj,false)
   .then((dataa) => {
     if(dataa){
       res.json({status: "success", message: "", data: dataa});
      }else{
       res.json({status: "success", message: "", data: null});
      }
   })
  }); 
},

blockUser: function(req,res,next){
  var obj = {
    first_user_id: req.body.first_user_id,
    second_user_id: req.body.second_user_id, 
    status: req.body.status
  }
  //status 3
  update_by_id(obj,true)
  .then(() => {
   [obj.first_user_id, obj.second_user_id] = [obj.second_user_id, obj.first_user_id];
   obj.status = 4;
   update_by_id(obj,true)
   .then((dataa) => {
     if(dataa){
       res.json({status: "success", message: "", data: dataa});
      }else{
       res.json({status: "success", message: "", data: null});
      }
   })
  });  
},

unblockUser: function(req,res,next){
  var obj = {
    first_user_id: req.body.first_user_id,
    second_user_id: req.body.second_user_id, 
  }
  update_by_id(obj,false)
  .then(() => {
   [obj.first_user_id, obj.second_user_id] = [obj.second_user_id, obj.first_user_id];
   update_by_id(obj,false)
   .then((dataa) => {
     if(dataa){
       res.json({status: "success", message: "", data: dataa});
      }else{
       res.json({status: "success", message: "", data: null});
      }
   })
  });
}

};

function update_by_id(obj,add_after_pull){
  return relationshipsModel.updateOne(
    {user_id: obj.first_user_id},
    {$pull:{
      relationship: {
        user_id: obj.second_user_id
      }
    }},
    function(err, user_friendsData){
      if(err){
        next(err);
      }else{
        if(add_after_pull){
          relationshipsModel.updateOne(
            {user_id: obj.first_user_id},
            {$addToSet: {
              relationship: {
                user_id: obj.second_user_id,
                status: Number(obj.status)
              }
            }},function(err,data){
              if(err){
                next(err);
              }else{
                return data;
              }
            });
        }else{
          return user_friendsData;
        }
      }
    }
    );
};

/*
db.getCollection('relationships').aggregate([
    {
        $match: { user_id: ObjectId("5d3dbe07ea97db13d5b73195") }
    },
    {
       $lookup:
         {
           from: 'users',
           localField: 'relationship.user_id',
           foreignField: '_id',
           as: 'userss'
         }
    },
    {
        $project: { relationship: 1 }
    },
    {
        $unwind: { path: "$relationship" }
    },
    {
       $lookup:
         {
           from: 'users',
           localField: 'relationship.user_id',
           foreignField: '_id',
           as: 'userss'
         }
    },
    {
        $unwind: { path: "$userss" }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [ "$relationship", "$userss" ] } }
    },
    {
        $project: { _id: 0 }
    }
])
*/

/*
db.relationships.aggregate([
    {
        $match: { user_id: ObjectId("5d3dbe07ea97db13d5b73195") }
    },
    {
        $unwind: "$relationship"
    },
    {
        $lookup: {
            from: "users",
            localField: "relationship.user_id",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $unwind: "$user"
    },
    {
        $project: {
            _id:  "$relationship.user_id",
            username: "$user.username",
            email: "$user.email",
            status: "$relationship.status",
            image_uri: "$user.image_uri"
        }
    }
])
*/

/*
    {$match: {
        user_id: mongoose.Types.ObjectId(req.params.user_id)}
    },
    { $unwind: "$relationship" },
    { $lookup: {
      from: "users",
      let: { relationship_id: '$relationship.user_id',relationship_status: '$relationship.status', },
      pipeline: [
        { $match: {
            $expr: { $and: [
                { $eq: [ "$_id", "$$relationship_id" ] },
                //{ $eq: [ "$$relationship_status", 2 ] }
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
*/