import {React,Suspense} from 'react'
import {Notifications,GroupAdd,Login,Category,Logout, LogoDevRounded, LogoutTwoTone, LoginTwoTone} from '@mui/icons-material'
import { FaSearch} from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate()
  const user=true
  const logout = async ()=>{
    const url = 'https://news-app-btd9.onrender.com/auth/logout'
    const response = await fetch(url,{
       //mode: 'cors',
      method:'POST',
      headers:{
        'Content-Type':'application/json'
    },
    credentials:'include',
    })
    if(localStorage){
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload();
    }
  }
  function goTo(){
    navigate('/search')
  }
  return (
    <div className='h-[50px] bg-red-500 text-white shadow-black shadow-md z-50 flex flex-row items-center justify-center relative w-full'>
        <p className='basis-1/2 text-xl  md:text-3xl font-bold flex flex-row justify-start md:justify-center'>AcoNews</p>
        <div className='basis-1/2 flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16'>
          <FaSearch className='' onClick={goTo} />
          <Notifications className='' />
          <Category onClick={()=>navigate('/categories')} />
          {user ? <LogoutTwoTone onClick={logout} /> :<LoginTwoTone />}
        </div>
    </div>
  )
}

export default Header