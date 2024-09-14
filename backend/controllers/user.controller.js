import {User} from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password,confirmPassword} = req.body
    if(!username || !email || !password){
        res.status(400).json({message:'all fields are mandatory'})
        //throw new Error('all fields are mandatory')
    }
    const emailUsed = await User.findOne({email})
    if(emailUsed){
        res.status(400).json({message:'email already in use'})
        //throw new Error('email already in use')
    }
    const nameUsed = await User.findOne({username})
    if(nameUsed){
        res.status(400).json('username already taken')
        //throw new Error('username exists')

    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = User.create({
        username:username,
        email:email,
        password:hashedPassword,
    })
    if(user){
        res.status(201).json({
            '_id':user.id,
            'username':user.username
        })
    }
    else{
        res.status(400)
        throw new Error('invalid')
    }
})

export const allUsers = (async (req,res)=>{
    try{
         const users = await User.find({})
         res.status(201).json({
            'users':users
         })
    }
    catch(err){
        throw new Error('error while fetching users data')
    }
})

export const loginUser = async (req,res)=>{
    const {username,password} = req.body
    const user = await User.findOne({username})
    if(user && (await bcrypt.compare(password,user.password))){
        const token = jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1hr'})
        //console.log(await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET))
        res.cookie('token',token,{
            httponly:true, // to prevent xss attacks
            secure:true, // Use HTTPS in production
            sameSite: 'None',
            maxAge: 15*24*60*60*1000
        })
        
        res.status(200).json({message:token})
    }else{
        return res.status(400).json({message:'user doesnot exist bruh'})
    }

}

export const logoutUSer = async (req,res)=>{
    try{
        res.cookie('token','',{maxAge:0})
        res.status(200).json({message:'logged out successfully'})
    }catch{
        res.status(500).json({error:'Internal server error'})
    }
}