import {React,Suspense} from 'react'
import {Notifications,GroupAdd,Login,Category} from '@mui/icons-material'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate()
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
          <Login />
        </div>
    </div>
  )
}

export default Header