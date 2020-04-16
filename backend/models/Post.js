const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
	title:{type:String, required:true},
	content:{type:String, required:true},
	imagePath:{type:String, required:true},
	user:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"}
}) 

module.exports = mongoose.model('Post', PostSchema)