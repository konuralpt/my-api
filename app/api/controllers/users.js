const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	findById: function(req,res,next){
		userModel.find({_id: req.params.user_id}, function(err,user){
			if(err){
				next(err);
			}else{
				res.json({status: "success", message:"User found", data: user});
			}

		})
	},
	create: function(req,res,next){
		userModel.create({
			name: req.body.name, 
			email: req.body.email,
			password: req.body.password
		}, function(err, result){
			if(err)
				next(err)
			else
				res.json({status: "success",message: "User added", data: null});
		});
	},

	authenticate: function(req,res,next){
		userModel.findOne({email: req.body.email},function(err,userInfo){
			if(err){
				next(err);
			}else{
				if(bcrypt.compareSync(req.body.password,userInfo.password)){
					const token = jwt.sign({id: userInfo._id},req.app.get('secretKey'),{expiresIn: '1h'});
					res.json({status: "success", message: "user found", data: {user: userInfo, token: token}});
				}else{
					res.json({status:"error", message: "Invalid email/password!!!", data:null});
				}
			}
		})
	},

	updateUser: function(req,res,next){
		console.log(req.body);
		userModel.findOneAndUpdate({_id: req.body.user_id},{socket_id: req.body.socket_id, push_token: req.body.push_token},function(err,userInfo){

		})
	}

}