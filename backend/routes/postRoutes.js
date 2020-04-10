const router = require('express').Router()
const { getPosts, postPosts } = require('../controllers/postController')

router.get('/',getPosts)
router.post('/',postPosts)



module.exports = router