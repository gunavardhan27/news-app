import React, { useState } from 'react'
import { useInputValidation,useStrongPassword } from '6pp'
import { useNavigate } from 'react-router-dom'
const Auth = () => {
  const [Login,setLogin] = useState(false)
  const handle = ()=>{
    setLogin(!Login)
  }
  const navigate = useNavigate()
  const email = useInputValidation("")
  const username = useInputValidation("")
  const bio = useInputValidation("")
  const password = useStrongPassword()
  //const url = 'https://news-app-btd9.onrender.com/'
  const handleLogin = async (event)=>{
    event.preventDefault()
    const url = 'https://news-app-btd9.onrender.com/auth/login'
    const response = await fetch(url,{
       //mode: 'cors',
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,
            //confirmPassword:data.confirmPassword
        }),
        credentials: 'include'
    })
    if(response.ok){
        const data = await response.json()
        if(localStorage){
            localStorage.setItem('user',JSON.stringify({username:username}))
            console.log('logged-in')
            navigate('/')
            window.location.reload();
        }
    }
    else{
        console.log(await response.json())
    }
  }



  const handleSignUp = async (event)=>{
    event.preventDefault()
    const url = 'https://news-app-btd9.onrender.com/auth/registerUser'
    const response = await fetch(url,{
       //mode: 'cors',
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:username.value,
            email:email.value,
            password:password.value,
            //confirmPassword:data.confirmPassword
        }),
        credentials: 'include'
    })
    if(response.ok){
        const data = await response.json()
        console.log(data)
    }
    else{
        console.log(await response.json())
    }
  }

  return (
    <div className='flex flex-row align-middle h-screen'>
        <div className='  mx-auto shadow-black shadow-md w-[90%] md:w-[30%] my-auto p-3 rounded-lg'>
          {!Login ? <div className='flex flex-col items-center justify-center gap-6'>
            <p className='text-3xl font-bold'>Login</p>
            <form className='flex flex-col items-center justify-center gap-6 w-full'>
            <input type='text' className=' w-[80%] flex flex-row items-center justify-center h-[40px]' 
            placeholder='Enter username'
            value={username.value}
            onChange={username.changeHandler} />
            {
              username.error && 
              <p className='text-red-600' variant='caption'>{username.error}</p>
            }
            <input type='password' className='w-[80%] flex flex-row items-center justify-center h-[40px]' placeholder='passcode' 
            value={password.value}
            onChange={password.changeHandler} />
            {
              password.error && 
              <p className='text-red-600' variant='caption'>{password.error}</p>
            }
            <button className='p-2 text-xl rounded-md bg-orange-500' onClick={handleLogin}>Sign In</button>
            </form>
            <div className='flex flex-row gap-1'>
            <p>Not signed in yet?</p>
            <p className='font-bold' onClick={handle}>Sign Up</p>
            </div>
            </div>
            
            :
            <div className='flex flex-col items-center justify-center gap-6'>
            <p className='text-3xl font-bold'>Register</p>
            <form className='flex flex-col items-center justify-center gap-6 w-full' onSubmit={handleSignUp}>
            <input type='email' className=' w-[80%] flex flex-row items-center justify-center h-[40px]' placeholder='Enter Email'
            value={email.value}
            onChange={email.changeHandler} />
            <input type='text' className=' w-[80%] flex flex-row items-center justify-center h-[40px]' placeholder='Enter Username'
            value={username.value}
            onChange={username.changeHandler} />
            <input tpye='text' className=' w-[80%] flex flex-row items-center justify-center h-[40px]' placeholder='Enter Bio' 
            value={bio.value}
            onChange={bio.changeHandler} />
            <input type='password' className='w-[80%] flex flex-row items-center justify-center h-[40px]' placeholder='passcode'
            value={password.value}
            onChange={password.changeHandler} />
            {
              password.error && 
              <p className='text-red-600' variant='caption'>{password.error}</p>
            }
            <button className='p-2 text-xl rounded-md bg-orange-500' type='submit'>Sign In</button>
            </form>
            <div className='flex flex-row gap-1'>
            <p>have an account?</p>
            <p className='font-bold' onClick={handle}>Login</p>
            </div>
            </div>
            }
    </div>
    </div>
  )
}

export default Auth