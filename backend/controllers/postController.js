exports.getPosts = (req, res, next)=>{
	const posts = [
		{id : "hvhsdefghb", title:"Post title one", content:"Post Content one"},
	]

	res.status(200).json({message:"Posts fetched successfully",posts})
}

exports.postPosts = (req, res, next)=>{
	const post = req.body
	console.log(post)
	res.status(201).json({message:"Posts saved successfully"})
}