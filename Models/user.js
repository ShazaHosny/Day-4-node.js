const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minlength: 8,
        unique: true,
        require: true
    },
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 20,
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    },
})
userSchema.set("timestamps", true)

userSchema.options.toJSON = {
    transform: function (doc, ret, option) {
        delete ret.password
        return ret
    }
}
userSchema.pre('save', function () {
    // console.log(this)
    const hash = bcrypt.hashSync(this.password, 10)
    this.password = hash

})

userSchema.methods.comparePassword = function (password) {
    const isValid = bcrypt.compareSync(password, this.password)
    return isValid

}

const User = new mongoose.model("User", userSchema)

module.exports = { User }