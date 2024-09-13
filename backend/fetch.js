import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
const category='health'
export async function fetchData(){
    //https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=
    const cat='nation'
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=any&max=10&page=1&apikey=c3fdd549e7b245cb98fc47381ae5424f`;
    const response = await fetch(url)
    console.log(response)
    if(response.ok){
        const data = await response.json()
        return {data:data,category:category}
    }
    else{
        return response.error
    }
}