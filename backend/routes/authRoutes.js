const{ postLogin, postSignup } = require('../controllers/authController')
const router = require("express").Router()

router.post('/login', postLogin)
router.post('/register', postSignup)

module.exports = router