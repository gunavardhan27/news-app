import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
const cookieJwtAuth = asyncHandler(async (req,res,next)=>{
    console.log(req.cookies)
    try{
        const token = req.cookies.token
        try{
            const user = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            req.user = user 
            next()

        }catch{
            res.clearCookie('token')
            return res.status(401).json({message:'token expired'})
        }
    }catch(error){
        return res.status(401).json({message:'not authorized'})
    }
    
})

export default cookieJwtAuth