const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = model('UserModel', UserSchema)