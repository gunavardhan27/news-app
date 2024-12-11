import { News } from "../models/newsModel.js"

export const breakingNews = async (req,res) =>{

    const page = parseInt(req.query.id)
    const limit = 10
    const skip = (page-1)*limit 
    const data = await News.find().skip(skip).limit(limit)
    return res.status(200).json({data:data})
}

export const allNews = (req, res) => {
    News.find({})
      .then((data) => {
        if (data && data.length > 0) {
          return res.status(200).json({ data });
        } else {
          return res.status(404).json({ message: 'No data found' });
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        return res.status(500).json({ message: 'Error fetching data' });
      });
  };
  

export const categories = async (req,res)=>{
    const query = await req.query.id
    News.find({category:query}).then((data)=>{
        if(data && data.length > 0){
         return res.status(200).json({data:data})   
        }
    }).catch((err)=>{
        return res.json({message:err})
    })
}