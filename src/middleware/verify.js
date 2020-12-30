  
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
   const token = req.header('authorization')
   if(!token){
       return res.status(401).send('Access Denied')
   }
   next()  
}