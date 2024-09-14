import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from './Card'
import { ExitToApp } from '@mui/icons-material'
const SelectedCategory = () => {
    const [category,set] = useState([])
    const location = useLocation()
    const query = location.state.data
    const navigate = useNavigate()
    const fetchData = async ()=>{
        const url = `http://localhost:3000/api/category?id=${query}`
        console.log('gunaV')
        const response = await fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const data = await response.json()
        set(data.data)
        
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
        <ExitToApp onClick={()=>navigate('/categories')} />
    <div className='mx-auto w-[70%] md:w-[50%] flex flex-col  gap-6'>
        {category?.map(i=>(
            <p key={i.title}><Card news={i} /></p>
        ))}
    </div>
    </div>
  )
}

export default SelectedCategory