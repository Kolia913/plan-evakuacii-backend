const Order = require('../models/order')
const { orderValidation } = require('../validation/orderValidation')
const nodemailer = require('nodemailer') 
require('dotenv').config()


const createOrderController = async (req, res) => {
    const { error } = orderValidation(req.body)
    if ( error ) {
        return res.status(400).send(error.details[0].message)
    }
    const order = new Order({
         firstname: req.body.firstname,
         phone: req.body.phone,
         email: req.body.email,
         orgname: req.body.orgname,
         orgadres: req.body.orgadres,
         count: req.body.count, 
    })

    const message = { 
        to: process.env.EMAIL,
        subject: 'New order received!',
        html:`<div>
    <h1>Новый заказ на сайте ПЛАН-ЭВАКУАЦИИ.РФ</h1>
        <h4>Имя: &nbsp;</h4><p>${order.firstname}</p>
        <h4>Телефон: &nbsp;</h4><p>${order.phone}</p>
        <h4>E-mail: &nbsp;</h4><p>${order.email}</p>
        <h4>Название компании: &nbsp;</h4><p>${order.orgname}</p>
        <h4>Адрес компании: &nbsp;</h4><p>${order.orgadres}</p>
        <h4>Количество схем: &nbsp;</h4><p>${order.count}</p>
    </div>`}
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    },
    {
        from: `plan-evakuacii.rf <${process.env.SMTP_EMAIL}>`
    }
    )
    try {
        const savedOrder = await order.save()
        res.status(201).json(savedOrder)
        if(savedOrder) {
            transporter.sendMail(message, (err, info) => {
                if(err) return console.log(err)
                console.log('Email sent: ', info);
            })
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const getAllOrders = async(req, res) => {
    const orders = await Order.find({})
    const sortedOrders = orders.sort((a, b) => b.createdAt - a.createdAt)
    res.status(200).json(sortedOrders)
}

const updateOrder = async(req, res) => {
    const { error } = orderValidation(req.body)
    if ( error ) {
        return res.status(400).send(error.details[0].message)
    }
    const order = {
         firstname: req.body.firstname,
         phone: req.body.phone,
         email: req.body.email,
         orgname: req.body.orgname,
         orgadres: req.body.orgadres,
         count: req.body.count,
         isDone: req.body.isDone 
    }
    const updatedOrder = await Order.findOneAndUpdate({_id: req.params.id}, order, { new: true })
    if(!updatedOrder) {
        return res.status(400).send('Cant update order!')
    }
    res.status(200).json(updatedOrder)
}

const deleteOrder = async (req, res) => {
    id = req.params.id
    const deletedOrder = await Order.findByIdAndDelete(id)
    if(!deletedOrder) {
        return res.status(500).send('Something went wrong')
    }
    res.status(200).json(deletedOrder)
}

const getOrderById = async (req, res) => {
    id = req.params.id
    const order = await Order.findById(id)
    if(!order) {
        return res.status(400).send("Заказ не найден!")
    }
    res.status(200).json(order)
}
module.exports = {
    createOrderController,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getOrderById
}