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
    let userTodos = await Todo.findOne({user:UserID})
    console.log(userTodos.user, UserID)
    if(!userTodos.user==UserID){
        res.status(404).send("Not found")
      
    }
    next()
    
}

module.exports = { validateTodo ,validateUserTodo}   