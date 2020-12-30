const router = require('express').Router()
const { loginController, logout, getUser } = require('../controllers/auth')
const verify = require('../middleware/verify')

router.post('/login', loginController)
router.post('/logout', logout)
router.get('/me', verify, getUser)

module.exports = router