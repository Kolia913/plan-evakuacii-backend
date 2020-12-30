const router = require('express').Router()
const { createOrderController, getAllOrders, updateOrder, deleteOrder, getOrderById } = require('../controllers/orders')
const IsAdmin = require('../middleware/isAdmin')

router.post('/create-order', createOrderController)
router.put('/update/:id', IsAdmin, updateOrder)
router.get('/', IsAdmin, getAllOrders)
router.delete('/:id', IsAdmin, deleteOrder)
router.get('/single/:id', IsAdmin, getOrderById)

module.exports = router