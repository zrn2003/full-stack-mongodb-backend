const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User')

const server = express()
server.use(cors())
server.use(bodyparser.json())

//MongoDB connection
mongoose.connect('mongodb+srv://zishanrn2003:root@cluster0.rdtuqwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Database Connected!!'))
    .catch((err) => console.log(err))

server.post('/register', async(req,res)=>{
    try {
        const {fullName,userName,age,password} = req.body
        const userObj = new User({fullName, userName, age, password})
        const userExist = await User.findOne({userName})
        if(userExist){
            return res.json({
                status:false,
                message:'User alreasy exicsted!!'
            })
        }
        await userObj.save()
        res.json({
            status:true,
            message:'User registered successfully!!'
        })
    } catch (err) {
        res.json({
            status:false,
            message:err
        })
        
    }
})


server.post('/login', async(req,res)=>{
    try {
        const { userName, password } = req.body
        const userExist = await User.findOne({ userName })
        if (!userExist) {
            return res.json({
                status: false,
                message: "User not found"
            })
        }
        if (password !== userExist.password) {
            return res.json({
                status: false,
                message: "Incorrect password"
            })
        }
        res.json({
            status: true,
            message: "Login successful"
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
})
server.listen(8055, () => {
    console.log('Server start listening at 8055')
})