const Post = require('../models/Post')

exports.getPosts = (req, res, next)=>{
	const posts = []
	Post.find()
	.then(data=>{
		data.map(p=>{
			const post = {}
			post.id = p._id
			post.title = p.title
			post.content = p.content
			posts.push(post)
		})
		res.status(200).json({message:"Posts fetched successfully",posts})
	})
	.catch(err=>{
		console.log(err)
		res.status(500).json({message:"Server Error"})
	})

}

exports.getPost = (req, res, next)=>{
	const { id } = req.params
	Post.findById(id)
	.then(data=>{
		const { _id, title, content } = data
		const post = {
			id:_id,
			title, content
		}
		res.status(200).json({message:"Post Found", post})
	})
	.catch(err=>{
		res.json(500).json({message:"Server Error"})
	})
}

exports.postPosts = (req, res, next)=>{
	const { title, content } = req.body
	const post = new Post({
		title, content
	})
	post.save()
	.then(data=>{
		const postObj = {
			id:data._id,
			title:data.title,
			content:data.content,
		}
		res.status(201).json({message:"Posts saved successfully", data:postObj})
	})
	.catch(err=>{
		console.log(err)
		res.status(500).json({message:"Server Error"})
	})
}

exports.updatePost = (req, res, next)=>{
	const { id, title, content } = req.body
	Post.findOneAndUpdate({_id:id},{title,content})
	.then(data=>{
		res.status(200).json({message:"Post updated successfully"})
	})
	.catch(err=>{
		console.log(err)
		res.status(500).json({message:"Server Error"})
	})
}

exports.deletePost = (req, res, next) =>{
	const { id } = req.params
	Post.findOneAndDelete({_id:id})
	.then(data=>{
		res.json({message:"Post deleted successfully"})
	})
	.catch(err=>{
		res.status(500).json({message:"Server Error"})
		console.log(err)
	})
}