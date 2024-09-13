import mongoose from 'mongoose'

export const connectToDb = async ()=>{
    try{
        const db = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('db connected')
    }catch(error){
        console.log(error.message)
    }
}