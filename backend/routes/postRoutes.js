const router = require('express').Router()
const { getPosts, postPosts, deletePost, updatePost, getPost } = require('../controllers/postController')

router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',postPosts)
router.put('/', updatePost)
router.delete('/:id',deletePost)



module.exports = router