const User = require('../models/user')
const bcrypt = require('bcrypt');

require('dotenv').config()

const createSuperUser = async () => {
    if(!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
        return console.log('Enter super user data in .env file');
    };
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)
    const user = new User({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        isAdmin: true
    })
    userExists = await User.findOne({username: process.env.ADMIN_USERNAME})
    if  (userExists) {
        return console.log('User already exists: ', userExists)
    } else {
        await User.deleteMany({isAdmin: true})
        await user.save()
        console.log('Superuser successfully created: ',user)
    }    
}

module.exports = {
    createSuperUser
}