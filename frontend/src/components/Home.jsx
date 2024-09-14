import React, { useEffect,useState } from 'react'
import AppLayout from '../layout/AppLayout'
import Card from './Card'

const Home = () => {
    const [breakingNews,setNews] = useState([])
    const [page,setpage] = useState(1)
    const [userName,set] = useState('')
    
    const user = JSON.parse(localStorage.getItem('user'))
    
    useEffect(()=>{
        set(user.username.value)
    },[user])
    useEffect(()=>{
        async function getData(){
        const url = `http://localhost:3000/api/breakingNews?id=${page}`
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
            const newData  = Array.from(
                new Map(data.data.map(item => [item.title, item])).values()
              );
            setNews(newData)
        }
        else{
            console.log(await response.json())
        }
        }

        getData()
    },[page])
  return (
    <div>
        <h1 className='mt-4 text-md sm:text-xl md:text-2xl font-bold text-blue-800'>Welcome Back {userName}</h1>
    <div className='flex flex-col items-center justify-center w-full mx-auto gap-8'>
            <p className='text-3xl mt-4 font-bold'>Breaking News</p>
        <div className='w-[70%] md:w-[50%] flex flex-col  gap-6'>
            {breakingNews.map((news)=>(
                <p key={news.title}><Card news={news} /></p>
            ))}
        </div>
        <div className='flex flex-row items-center justify-center w-[50%] gap-3'>
            {page>1 ? <button className='p-2 bg-gray-400 rounded-md' onClick={()=>{setpage(page-1)}}>prev</button>: <button></button>}
            <div className='flex flex-row items-center justify-center gap-2'>
            {page<9 ? [page,page+1].map((i)=><p className='text-lg px-4 py-2 rounded-full bg-blue-600' onClick={()=>setpage(i)}>{i}</p>) 
            : <p className='text-sm p-2 rounded-full bg-blue-600'>{page}</p>}
            </div>
            {page<9 && <button  className='p-2 bg-gray-400 rounded-md' onClick={()=>{setpage(page+1)}}>next</button>}
        </div>
    </div>
    </div>
  )
}

export default AppLayout()(Home)