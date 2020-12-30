
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('authorization').split(" ")[1]
    if(!token) {
        return res.status(401).send('Access Denied!')
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY)
        if(verified.isAdmin){
            next()
        }else{
           return res.status(401).send('Access Denied!')
        }
}