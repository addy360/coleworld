const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.postLogin = (req, res, next)=>{
	const { email, password } = req.body
	User.findOne({email})
	.then(user=>{
		if (!user) return res.status(401).json({message:"Invalid credentials"})
		bcrypt.compare(password, user.password)
		.then((results) => {
		    if(!results) return res.status(401).json({message:"Invalid credentials"})
		    jwt.sign({
				  user: {
				  	email:user.email, id:user._id
				  }
				}, 
			'superSecretWord', 
			{ expiresIn: '1h' },
			(err, token)=>{
				if (err) return res.status(500).json({message:"Server Error"})
				res.status(200).json({token})
			})
		})
		.catch(err=>{
			console.log(err)
			res.status(500).json({message:"Server Error"})
		})
	})
	.catch(err=>{
		res.status(500).json({message:"Server Error"})
		console.log(err)
	})
}

exports.postSignup = (req, res, next)=>{
	const { email, password } = req.body
	User.findOne({email})
	.then(user=>{
		if(user) return res.status(401).json({message:"Email already in use"})
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(password, salt, function(err, hash) {
		        const user = new User({email, password:hash})
		        user.save()
		        .then(results=>{
		        	res.status(201).json({message:"User created succeefully"})
		        })
		        .catch(err=>{
		        	console.log(err)
		        	res.status(500).json({message:"Server Error"})
		        })
		    });
		});

	})
	.catch(err=>{
		res.status(500).json({message:"Server Error"})
		console.log(err)
	})
}