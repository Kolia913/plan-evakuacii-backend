const User = require('../models/user')
const { userValidation } = require('../validation/userValidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()


const loginController = async(req, res) => {
    const { error } = userValidation(req.body)
    if ( error ) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await User.findOne({username: req.body.username})
    if (!user) {
        return res.status(403).send('Вы ввели неправильное имя пользователя!')
    }
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) {
        return res.status(401).send('Вы ввели неправильный пароль!')
    }
    const token = await jwt.sign({ username: user.username, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
        expiresIn: '3h' // expires in 3 hours
    });
    res.status(200).json({
        auth: true,
        token: token
    })
}

const logout = async (req, res) => {
    token = req.header('authorization').split(' ')[0]
    if(!token) {
        return res.status(200).json({auth: false})
    }
    return res.status(200).json({auth: false})
}

const getUser = async (req, res) => {
    token = req.header('authorization').split(' ')[1]
    // console.log(token);
    const user = jwt.verify(token, process.env.SECRET_KEY)
    if(!user) {
        return res.status(400).send('Invalid token!')
    }
    const dbUser = await User.findOne({username: user.username})
    res.status(200).json({
        user: dbUser
    })
}

module.exports = {
    loginController,
    logout,
    getUser
}