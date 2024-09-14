import { News } from "../models/newsModel.js"

export const breakingNews = async (req,res) =>{

    const page = parseInt(req.query.id)
    const limit = 10
    const skip = (page-1)*limit 
    const data = await News.find().skip(skip).limit(limit)
    return res.status(200).json({data:data})
}

export const allNews = async (req,res)=>{
    try{
        const data = await News.find({})
        return res.status(200).json({data:data})
    }catch(error){
        return res.json(error)
    }
    
}

export const categories = async (req,res)=>{
    try{
        const query = await req.query.id
        const data = await News.find({category:query}) 
        console.log('guna',data)
        return res.status(200).json({data:data})
    }catch(error){
        console.log(error)
        return res.json(error)
    }
}