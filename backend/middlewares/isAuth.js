const jwt = require('jsonwebtoken')
exports.isAuth = (req, res, next)=>{
	if(req.headers['x-auth-token'] === '') return res.status(401).json({message:"No token. Not authorized"})
	const token = req.headers['x-auth-token']
	jwt.verify(token, 'superSecretWord', (err, decoded)=> {
	  if (err)  return res.status(401).json({message:"No token. Not authorized"})
	});
	next()
}