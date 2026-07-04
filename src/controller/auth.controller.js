const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



async function registerController(req, res) {
    const { username, password } = req.body

    const existingUser = await userModel.findOne({
        username
    })

    if (existingUser) {
        return res.status(409).json({
            message: "Username already exist!",
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)


    res.cookie('token', token)


    res.status(201).json({
        message: "User Registered Successfully!",
        user
    })
}

async function loginController(req, res) {
    const { username, password } = req.body

    const User = await userModel.findOne({
        username
    })

    if (!User) {
        return res.status(400).json({
            message: " Invalid Username!",
        })
    }

    const isPassword = await bcrypt.compare(password, User.password)

    if (!isPassword) {
        return res.status(400).json({ message: "Invalid Password!",  })
    }

    const token = jwt.sign({
        id: User._id
    }, process.env.JWT_SECRET)


    res.cookie('token', token)

    res.status(203).json({
        message: "User LoggedIn Successfully!",
        user: {
            username: User.username,
            id: User._id
        }
    })
}





module.exports = {

    registerController,
    loginController,
}