const express = require('express')
const { registerController, loginController } = require('../controller/auth.controller')


const router = express.Router()


router.post('/register', registerController)

router.post('/login', loginController)

// router.get('/user', userController)

// router.get('/logout', logoutController)








module.exports = router