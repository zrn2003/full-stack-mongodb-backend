const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User')
const productRoutes = require('./routes/productRoutes')

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use('/product',productRoutes)

// Connect Atlast Cloud DB 
mongoose.connect('mongodb+srv://zishanrn2003:root@cluster0.rdtuqwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').
then(()=>console.log('Database connected ')).
catch((err)=>console.log(err))

server.post('/register',async(req,res)=>{
    try{
        const {fullName,userName,age,password} = req.body
        const userExist = await User.findOne({userName})
        if(userExist){
            return res.json({
                status:false,
                message:'User already exists !!'
            })
        }
        const userObj = new User({fullName,userName,age,password})
        await userObj.save()
        res.json({
            status:true,message:'User registered successfully !!'
        })
    }
    catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })
    }
})

server.post('/login',async(req,res)=>{
    try{
        const {userName,password} = req.body
        const userExist = await User.findOne({userName})
        if(!userExist){
            return res.json({status:false,message:'User not found !!'})
        }
        if(password !== userExist.password){
            return res.json({status:false,message:'Wrong password !!'})
        }
        res.json({status:true,message:'Login successfull !!'})
    }
    catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

server.listen(8055,()=>{
    console.log('Server started listening on port 8055')
})

