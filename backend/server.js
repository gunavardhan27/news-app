import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDb } from './db/connectDb.js'
import { fetchData } from './fetch.js'
const port = 3000
import newsRouter from './routes/news.route.js'
import authRouter from './routes/user.route.js'
import { News } from './models/newsModel.js'
import cookieJwtAuth from './middleware/cookiejwt.js'
app.listen(port,()=>{
    console.log(`server is live on ${port}`)
    connectToDb()
})
app.use(cors({origin:'https://news-app-frontend-gamma.vercel.app',credentials:true,origin:true}));

app.use(cookieParser())
app.use(express.json())

async function handleData(){
try{
    const {data,category} = await fetchData()
    //console.log(data)
    const uniqueArticles = [];
    for (const article of data.articles) {
        const existingArticle = await News.findOne({ url: article.url });
        if (!existingArticle) {
            const newArticle = {...article,category:category}
            uniqueArticles.push(newArticle);
        }
    }
    await News.insertMany(uniqueArticles)
    console.log('news saved to mongo')
}catch(error){

    console.log(error)
}
}

app.use('/api',cookieJwtAuth,newsRouter)
app.use('/auth',authRouter)


//handleData()