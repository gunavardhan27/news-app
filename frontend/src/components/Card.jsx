import React from 'react'
import {useNavigate} from 'react-router-dom'
const Card = ({news}) => {
    const navigate  = useNavigate()
    const redirect = ()=>{
        navigate(`/${news.title}`,{state:{news:news}})
    }
  return (
    <div className='rounded-lg flex flex-col items-start justify-start shadow-black shadow-sm p-3 md:p-8' onClick={redirect}>
        <img src={news.image} className='w-[100%] h-[100px] sm:h-[180px] md:h-[380px] ' alt='image cannot be displayed' />
        <h1 className='text-xs my-2 sm:text-md md:text-xl font-bold'>{news.title}</h1>
        <p>{new Date(news.publishedAt).toLocaleString()}</p>
    </div>
  )
}

export default Card