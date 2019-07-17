const poke_listModel = require('../models/poke_list');
const mongoose = require('mongoose');

module.exports = {

  getAll: function(req, res, next) {
    poke_listModel.find({}, function(err, userFriends){
     if (err) {
      next(err);
     } else {
      res.json({status:"success", message: "", data:{friends: userFriends}});
     }
    });
   },

 getPokeListById: function(req, res, next) {
    poke_listModel.find({user_id: req.params.user_id}).sort({'poke_date' : 1}).limit(20)
    .exec((err, poke_list) => {
        if (err) {
          next(err);
         } else {
          res.json({status:"success", message: "", data:{poke_list: poke_list}});
         }
        });

 },

create: function(req, res, next) {
    poke_listModel.create({ }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Movie added successfully!!!", data: null});
      
    });
 },
 
}