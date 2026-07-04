const path = require('path')
const postModel = require('../model/post.model')
const { generateCaption } = require('../services/ai.service')
const { uploadFile } = require('../services/storage.service')
const { v4: uuidv4 } = require('uuid')

async function createPostController(req, res) {
    try {
        const file = req.file

        if (!file) {
            return res.status(400).json({ message: 'Image file is required.' })
        }

        const base64Image = file.buffer.toString('base64')
        const mimeType = file.mimetype || 'image/jpeg'
        const extension = path.extname(file.originalname || '') || '.jpg'
        const fileName = `${uuidv4()}${extension}`

        const caption = await generateCaption(base64Image, mimeType)

        const result = await uploadFile(file.buffer, fileName)

        const post = await postModel.create({
            caption: caption,
            image: result.url,
            user: req.user._id
        })

        return res.status(201).json({
            message: 'Post created successfully',
            post,
        })
    } catch (error) {
        console.error('Create post failed:', error)
        return res.status(500).json({
            message: 'Image upload failed',
            error: error?.message || 'Unknown error'
        })
    }
}

module.exports = { createPostController }