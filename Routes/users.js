const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const decodeJWT = require('jwt-decode')
const { User } = require("../Models/user")

const { validateCreateUser,
        validateAuth,
        validatePatchUser } = require('../Middlewares/validateUser')

const userRouter = express()


userRouter.post("/", validateCreateUser, async (req, res, next) => {
    const user = req.body
    const doc = await User.create(user)
    const token = await
        jwt.sign({
            userName: user.userName, password: user.password,
            maxAge: "1d"
        }, "token")
    res.json({
        user: doc,
        token: token
    })
})

userRouter.post('/login', async (req, res, next) => {

    const { userName, password } = req.body
    const user = await User.findOne({ "userName": userName })
    if(!user){
        res.status(404).send("user not found").end()
    }else{
        const isValid = user.comparePassword(password)

        if (!isValid) {
            res.send("authentication failed").status(401)
        }
        const secret = "efhwsjk"
        const token =
            jwt.sign({
                userName, password: user.password,
                maxAge: "1d"
            }, secret)
        res.json({
            token,
            user
        })
    }
    next()
})


userRouter.get('/', validateAuth, async (req, res, next) => {
    try {
        const token = decodeJWT(req.headers.authorization)
        const user = await User.findOne({ "userName": token.userName })
        console.log(user)
        res.json(user)
    } catch (err) { next(err) }
})
// userRouter.get('/:id', validateAuth, async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const userFound = await User.find({ "__id": id })
//         if (!userFound) {
//             res.status(404).send("please enter new username").end()
//         } else {
//             res.json(userFound)
//         }
//     } catch (err) { next(err) }

// })

userRouter.delete("/:id", validateAuth, async (req, res, next) => {
    try {
        const { id } = req.params
        let userFound = await User.findOne({ "__id": id })
        if (userFound) {
            await User.deleteOne({ "__id": id })
            res.status(200).send("deleted succesfully").end()
        } else {
            res.status(404).send("please enter new username").end()
        }

    } catch (err) { next(err) }
})

userRouter.patch('/:id', validateAuth, validatePatchUser, async (req, res, next) => {
    try {
        const user = req.body
        await User.updateOne(user)
        res.send(`user edited successfully`)
    } catch (err) { next(err) }
})


module.exports = { userRouter }