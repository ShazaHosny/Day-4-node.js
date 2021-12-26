const express = require('express')
const mongoose = require('mongoose')
const{todoRouter,userRourt}=require('./Routes/todos.js');
const { userRouter } = require('./Routes/users.js');
const authMiddleware=require('./Middlewares/auth')

const app = express()
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test")

app.use("/users",userRouter)
app.use(authMiddleware)
app.use('/todos',todoRouter)

app.use((err, req, res, next) => {
    res.json(err)
})

app.use('*',(req,res,next)=>{
 res.status(404).end()

})


const {port=4000} = process.env
app.listen(port,()=>{
    console.log(`the port is ${port}`);
})