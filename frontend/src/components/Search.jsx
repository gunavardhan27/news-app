import React, { useEffect, useState } from 'react'
import AppLayout from '../layout/AppLayout'
import { useNavigate } from 'react-router-dom'
import {ExitToAppRounded} from '@mui/icons-material'
const Search = () => {
    const [news,setNews] = useState([])
    const [search,set] = useState('')
    const [filteredData,setData] = useState([])
    const navigate = useNavigate()
    const toNews = (data)=>{
        console.log(data.description)
        navigate(`/${data.title}`,{state:{news:data}})
    }
    const fetchData = async ()=>{
        const url = 'https://news-app-btd9.onrender.com/api/news'
        const response = await fetch(url,{
             //mode: 'cors',
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if(response.ok){
            const data = await response.json()
            setNews(data.data)
        }
        else{
            console.log(response.error);
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    useEffect(()=>{
        if(search){
            const newData = news?.filter((i)=>i.title.includes(search))
            setData(newData)
        }
    
    },[search])
  return (
    <div className='w-[80%] mx-auto shadow-black shadow-md p-3 flex flex-col justify-center'>
        <ExitToAppRounded onClick={()=>navigate('/')} />
        <input className='w-[50%] mx-auto h-[30px] mb-4 p-2' onChange={(event)=>set(event.target.value)} placeholder='Search here' />
        {search && filteredData ? filteredData.slice(0,12).map((data)=>(
            <div onClick={()=>toNews(data)} className='w-[50%] mx-auto h-[65px] text-xs md:text-md mb-2 shadow-black shadow-sm'>{data.title}</div>
        )):<div>No Results Found</div>}
    </div>
  )
}

export default Search