const router = require('express').Router()
const { getPosts, postPosts, deletePost, updatePost, getPost } = require('../controllers/postController')
const multer = require('multer')
const { isAuth, can } = require('../middlewares/isAuth')

const MIME_TYPES_MAP = {
	'image/png':'png',
	'image/jpeg':'jpg',
	'image/jpg':'jpg',
}
const storage = multer.diskStorage({
	destination:(req, file, cb)=>{
		let err = null
		if (!MIME_TYPES_MAP[file.mimetype]) err = {message:"File not allowed"}
		cb(err, "backend/uploads")
	},
	filename:(req, file, cb)=>{
		const name = file.originalname.toLowerCase().split(' ').join('-')
		const ext = MIME_TYPES_MAP[file.mimetype]
		cb(null, `${name}-${Date.now()}.${ext}`)
	}
})


router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/', isAuth ,multer({storage:storage}).single('image'),postPosts)
router.put('/', isAuth, can,multer({storage:storage}).single('image'), updatePost)
router.delete('/:id', isAuth , can ,deletePost)



module.exports = router