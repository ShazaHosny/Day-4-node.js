const { Todo } = require("../Models/todo")

const validateTodo = (req, res, next) => {
    const todo = req.body
    console.log(req.user)
    if (!todo.title) {
        res.status(422).send("please enter the title of todo").end()
    }
    else {
        next()
    }
}

const validateUserTodo = async (req, res, next) => {
    const UserID=req.user.id
    const {id}=req.params
    let userTodos = await Todo.find({user:UserID})
    const todo = userTodos.filter(t=>t.id==id)
    console.log(todo)
    if(todo.length==0){
        res.status(404).send("Not found")    
    }
    next(todo)
    
}

module.exports = { validateTodo ,validateUserTodo}   