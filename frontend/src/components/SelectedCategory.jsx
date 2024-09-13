import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SelectedCategory = () => {
    const location = useLocation()
    const query = location.state.data
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
        
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>SelectedCategory</div>
  )
}

export default SelectedCategory