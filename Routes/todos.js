const express = require('express')
const { validateTodo, validateUserTodo } = require("../Middlewares/validateTodo")
const { Todo } = require('../Models/todo')

const todoRouter = express.Router()

todoRouter.post('/', validateTodo, async (req, res, next) => {
    const userID = req.user.id
    console.log(userID)
    try {
        const doc = await Todo.create({ ...req.body, "user": userID })
        console.log(doc)
        res.json(doc)
    }
    catch (err) { next(err) }
})

// todoRouter.get('/', async (req, res, next) => {
//     const userID = req.user.id
//     const userTodos = await Todo.find({ "user": userID }).populate('user')
//     res.json(userTodos)
// })

todoRouter.get('/:id', validateUserTodo, async (req, res, next) => {
    try {
        console.log("hi")
        console.log(userTodos.user,"hi")
        res.json(userTodos)

    } catch (err) { next(err) }
})

todoRouter.delete("/:id", validateUserTodo, async (req, res, next) => {
    try {
        const UserID=req.user.id
        let userTodos = await Todo.findOne({user:UserID})
        await Todo.deleteOne({ "id": id })
        res.status(200).send("deleted succesfully").end()
    }
    catch (err) { next(err) }
})

todoRouter.patch('/:id', validateUserTodo, async (req, res, next) => {
    try {
        const todo = req.body
        await Todo.updateOne(todo)
        res.send(`todo edited successfully`).end()
    } catch (err) { next(err) }
})


module.exports = { todoRouter }

