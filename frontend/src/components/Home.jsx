import React, { useEffect,useState } from 'react'
import AppLayout from '../layout/AppLayout'
import Card from './Card'

const Home = () => {
    const [breakingNews,setNews] = useState([])
    const [page,setpage] = useState(1)
    useEffect(()=>{
        async function getData(){
        const url = `http://localhost:3000/api/breakingNews?id=${page}`
        const response = await fetch(url,{
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
            console.log('fk u')
        }
        }

        getData()
    },[page])
  return (
    <div className='flex flex-col items-center justify-center w-full mx-auto gap-8'>
            <p className='text-3xl mt-4 font-bold'>Breaking News</p>
        <div className='w-[50%] flex flex-col  gap-6'>
            {breakingNews.map((news)=>(
                <p key={news.title}><Card news={news} /></p>
            ))}
        </div>
        <div className='flex flex-row items-start justify-between w-[50%]'>
            {page>1 ? <button onClick={()=>{setpage(page-1)}}>prev</button>: <button></button>}
            <div className='flex flex-row items-center justify-center gap-2 w-full'>
            {page<9 ? [page,page+1].map((i)=><p className=''>{i}</p>) 
            : <p className=''>{page}</p>}
            </div>
            {page<9 && <button onClick={()=>{setpage(page+1)}}>next</button>}
        </div>
    </div>
  )
}

export default AppLayout()(Home)