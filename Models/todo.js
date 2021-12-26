const mongoose = require('mongoose')

const statusOptions = ['inprogress', 'to-do', 'done']

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    tage:[String,maxlength=10],
    status: {
        type: String,
        enum: Object.values(statusOptions),
        default: "new"
    },
    user: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: "User",
        required: true
    }
});

todoSchema.set("timestamps", true)
const Todo = new mongoose.model("Todo", todoSchema)

module.exports = { Todo }