import React, { useState } from 'react'

const LoginForm = () => {

    const [userbox, setUserbox] = useState(false)
    const [passwordbox, setPasswordbox] = useState(false)

    const handleUserbox = ()=>{
          setUserbox(true)
    }
    const handleUserboxoff = ()=>{
        setUserbox(false)
  }

    const handlePasswordbox = ()=>{
         setPasswordbox(true)
    }
    const handlePasswordboxoff = ()=>{
        setPasswordbox(false)
   }

  return (
    <div className='px-28'>
      <div className='text-4xl mb-2'>Welcome back :)</div>
      <div className='text-gray-500 mb-10'>To stay updated on Transporters, login with your usename and password.</div>

      <div 
      onFocus={()=>{handleUserbox()}}
      onBlur={()=>{handleUserboxoff()}}
      className={`${userbox?' bg-slate-200 border-black':''} flex border mb-1 py-4 px-2 `}>
        <img className='w-8' alt='' src='user.svg'></img>
        <input className={`${userbox?' bg-slate-200':''} w-full px-2 outline-none`} type='text' maxLength={15} placeholder='Username'></input>
      </div>

      <div
      onFocus={()=>{handlePasswordbox()}}
      onBlur={()=>{handlePasswordboxoff()}}
      className={`${passwordbox?' bg-slate-200 border-black':''} flex border py-4 px-2 `}>
        <img className='w-8' alt='' src='lock.svg' ></img>
        <input className={`${passwordbox?' bg-slate-200':''} w-full px-2 outline-none`} type='password' maxLength={15} placeholder='Password'></input>
      </div>

      <button className='border border-sky-600 bg-sky-600 rounded-3xl px-8 py-2 mt-4 hover:bg-white transition-all duration-300 hover:text-sky-600'>Login</button>
    </div>
  )
}

export default LoginForm
