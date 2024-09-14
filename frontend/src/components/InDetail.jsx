import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {ExitToApp} from '@mui/icons-material'
const InDetail = () => {
    const location = useLocation()
    const news = location.state.news
    const navigate = useNavigate()
    console.log(news.source)
    const goBack = ()=>{
        navigate('/')
    }
  return (
    <div className=''>
        <ExitToApp onClick={goBack} />
    <div className='rounded-lg flex flex-col items-start justify-around shadow-black shadow-sm p-3 md:p-8 w-[80%] mx-auto'>
        <p className='text-lg sm:text-xl md:text-2xl font-bold text-blue-800'>{news.description}</p>
        <div className='flex flex-row items-start justify-between w-full my-6 font-bold'>
            <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
            <a href={news.source.url} className='text-red-600'>{news.source.name}</a>
        </div>
        <img src={news.image} className='w-[100%] h-[200px] sm:h-[380px] md:h-[580px] ' alt='image cannot be disclosed' />
        <p className='text-2xl my-5'>{news.content}<a className='text-red-600' href={news.url}>readmore....</a>  </p>
    </div>
    </div>
  )
}

export default InDetail