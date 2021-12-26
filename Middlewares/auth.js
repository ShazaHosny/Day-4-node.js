const { compare } = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../Models/user')


const secret = "efhwsjk"

const auth = (req, res, next) => {
    const { authorization } = req.headers
    const payload = jwt.verify(authorization, secret)
    User.findOne({ "userName": payload.userName })
        .then(user => {
            req.user = user
            next()
        })
        .catch((err)=>{next(err)})


    // console.log(authorization, payload)
}

module.exports = auth