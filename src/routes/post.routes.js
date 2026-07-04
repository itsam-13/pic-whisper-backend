const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { createPostController } = require('../controller/post.controller')
const multer = require('multer')

const upload = multer({storage: multer.memoryStorage()})



router.post('/', 
    authMiddleware, /* req.user = userData */ 
    upload.single('image'),
    createPostController
)







module.exports = router
