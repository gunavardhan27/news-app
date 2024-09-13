import { ExitToApp } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const list = ['general','world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health']
    const navigate = useNavigate()
  return (
    <div>
        <ExitToApp onClick={()=>navigate('/')} />
    <div className='flex flex-col items-center justify-center w-full m-3'>
        <p className='text-3xl text-red-700 font-bold my-8'>Select Category</p>
        <div className='mx-auto grid grid-cols-2 md:grid-cols-3 gap-4'>{list?.map((item)=>{
            return <p key={item} className='flex flex-row items-center justify-center font-bold p-4 shadow-black shadow-sm'
            onClick={()=>navigate(`/category/${item}`,{state:{data:item}})}>{item}</p>
        })}</div>
    </div>
    </div>
  )
}

export default Category