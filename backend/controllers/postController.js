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
			post.imagePath = p.imagePath
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
		const { _id, title, content, imagePath } = data
		const post = {
			id:_id,
			title, content, imagePath
		}
		res.status(200).json({message:"Post Found", post})
	})
	.catch(err=>{
		res.json(500).json({message:"Server Error"})
	})
}

exports.postPosts = (req, res, next)=>{
	const { title, content } = req.body
	const {filename} = req.file
	const url = `${req.protocol}://${req.get('host')}`
	const post = new Post({
		title, content, imagePath:`${url}/uploads/${filename}`, user:req.userId
	})
	post.save()
	.then(data=>{
		console.log(data)
		const postObj = {
			id:data._id,
			title:data.title,
			content:data.content,
			imagePath:data.imagePath,
		}
		res.status(201).json({message:"Posts saved successfully", data:postObj})
	})
	.catch(err=>{
		console.log(err)
		res.status(500).json({message:"Server Error"})
	})
}

exports.updatePost = (req, res, next)=>{
	let filename = null
	if(req.file){
		filename = req.file.filename
	}
	const url = `${req.protocol}://${req.get('host')}`
	const { id, title, content, imagePath } = req.body
	Post.findOneAndUpdate({_id:id},{title,content, imagePath:filename ? `${url}/uploads/${filename}` : imagePath})
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