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
    console.log("hi")
    res.json(todo)
})

todoRouter.delete("/:id", async (req, res, next) => {
    try {
        const UserID = req.user.id
        const { id } = req.params
        let userTodos = await Todo.find({ user: UserID })
        const todo = userTodos.filter(t => t.id == id)
        if (todo.length == 0) {
            res.status(404).send("not found")
        } else {
            await Todo.deleteOne({ "id": todo.id })
            res.status(200).send("deleted succesfully").end()
        }

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

