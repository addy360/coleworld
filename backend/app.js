const express = require('express')
const cors = require('cors')
const postRouter = require('./routes/postRoutes')
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/posts', postRouter)



module.exports = app