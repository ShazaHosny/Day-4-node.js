const { User } = require("../Models/user")
const jwt = require("jsonwebtoken")
const decodeJWT = require('jwt-decode')


const validateCreateUser = (req, res, next) => {
    const userDetails = req.body
    if (!userDetails.userName) {
        res.status(422).send("please enter userName").end()
    }
    if (!userDetails.firstName) {
        res.status(422).send("please enter firstName").end()
    }
    if (!userDetails.lastName) {

        res.status(422).send("please enter LastName").end()
    }
    else {
        next()
    }
}
const validateAuth = async (req, res, next) => {
    const secret = "efhwsjk"
    const { authorization } = req.headers
    jwt.verify(authorization, secret, err => {
        if (err) {
            res.send(err.message)
        } next()
    })
}

const validatePatchUser = async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    let userFound = await User.findById(id)
    console.log(userFound)
    const token = decodeJWT(req.headers.authorization)
    console.log(userFound.userName,token.userName)
    if (userFound.userName !== token.userName) {
        console.log("her")
        res.status(404).send("you cannot edit this user").end()
    }
    else {
        console.log("here")
        next()
    }
}
module.exports = {
    validateCreateUser,
    validateAuth,
    validatePatchUser
}   