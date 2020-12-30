const { Schema, model } = require('mongoose')

const OrderSchema = Schema({
    firstname: {
        type: String,
        maxLength: 255,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 7,
        maxLength: 11
    },
    email: {
        type: String,
        required: true,
    },
    orgname: {
        type: String,
        required: true,
        maxLength: 255
    },
    orgadres: {
       type: String,
       required: true,
       maxLength: 255,
       
     },
     count: {
        type: Number,
        required: true,
        min: 1
     },
     isDone: {
        type: Boolean,
        default: false
     },
     createdAt: {
         type: Date,
         default: new Date()
     }
})

module.exports = model('OrderModel', OrderSchema)