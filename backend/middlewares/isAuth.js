const jwt = require('jsonwebtoken')
const Post = require('../models/Post')

exports.isAuth = (req, res, next)=>{
	if(req.headers['x-auth-token'] === '') return res.status(401).json({message:"No token. Not authorized"})
	const token = req.headers['x-auth-token']
	jwt.verify(token, 'superSecretWord', (err, decoded)=> {
	  if (err)  return res.status(401).json({message:"No token. Not authorized"})
	  const { user:{ id } } = decoded
	  req.userId = id
	});
	next()
}

exports.can =(req, res, next)=>{
	const {userId} = req
	const postId = req.params.id || req.body.id
	Post.findById(postId)
	.then(post=>{
		if (post.user.toString() !== userId) return res.status(401).json({message:"Not authorized for this operation!"})
		next()
	})
	.catch(err=>{
		return res.status(500).json({message:"Server Error"})
		console.log(err)
	})
}