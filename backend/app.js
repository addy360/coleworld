const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const postRouter = require('./routes/postRoutes')
const app = express()
app.use(cors())
app.use(express.json())

const connection = ()=>{
	return mongoose.connect("mongodb://addy360:addy111111@cluster0-shard-00-00-vzheg.mongodb.net:27017,cluster0-shard-00-01-vzheg.mongodb.net:27017,cluster0-shard-00-02-vzheg.mongodb.net:27017/forum?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{
		useNewUrlParser:true,
		useUnifiedTopology: true,
		useFindAndModify:false
	})
}

const PORT = process.env.PORT || 5000

app.use('/api/posts', postRouter)



module.exports = {app , connection}