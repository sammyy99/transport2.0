import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, userInfo } from '../Redux/userSlice'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {

    const [userbox, setUserbox] = useState(false) // for design purpose
    const [passwordbox, setPasswordbox] = useState(false) // for design purpose
    const [loginStatus, setloginStatus] = useState(false) // setting based on status code of response
    const [message, setMessage] = useState(false) // setting based on clicking on login button to show or hide login message 

    const dispatch = useDispatch()
    const user = useRef(null)
    const pwd = useRef(null)
    const navigate = useNavigate()

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

   const clearEntry = ()=>{
       user.current.value = ""
       pwd.current.value = ""
   }

   const handleLogin = async () => {
     try {
       dispatch(
         userInfo({ username: user.current.value, password: pwd.current.value })
       );
       const response = await axios.post("http://localhost:5000/login", {
         username: user.current.value,
         password: pwd.current.value,
       });
       setMessage(true);
       clearEntry();
       if (response.status===200) {
           setloginStatus(true)
           dispatch(login(true)) // setting login status true to redux for global login check.
           setTimeout(()=>{navigate('/home')},300)
       } else {
           setloginStatus(false)  // this wont directly set the login status message instead if auth is false program will give error 401
           dispatch(login(false)) // setting login status true to redux for global login check.
       }
     } catch (error) {
      if (error.response.status===401) { // As we are sending 401 from backend for false autharization axios is treating it as error so we are setting our message in catch error.
          setloginStatus(false) // setting login status false here
          dispatch(login(false)) // setting login status true to redux for global login check.
          clearEntry(); // clearing entry on false login too 
      } else {
        console.log("Error in login: " + error);
      }
     }
   };

  return (
    <div className='px-28'>
      <div className='text-4xl mb-2'>Welcome back :)</div>
      <div className='text-gray-500 mb-10'>To stay updated on Transporters, login with your usename and password.</div>

      <div 
      onFocus={()=>{handleUserbox()}}
      onBlur={()=>{handleUserboxoff()}}
      className={`${userbox?' bg-slate-200 border-black':''} flex border mb-1 py-4 px-2 `}>
        <img className='w-8' alt='' src='user.svg'></img>
        <input ref={user} className={`${userbox?' bg-slate-200':''} w-full px-2 outline-none`} type='text' maxLength={15} placeholder='Username'></input>
      </div>

      <div
      onFocus={()=>{handlePasswordbox()}}
      onBlur={()=>{handlePasswordboxoff()}}
      className={`${passwordbox?' bg-slate-200 border-black':''} flex border py-4 px-2 `}>
        <img className='w-8' alt='' src='lock.svg' ></img>
        <input ref={pwd} className={`${passwordbox?' bg-slate-200':''} w-full px-2 outline-none`} type='password' maxLength={15} placeholder='Password'></input>
      </div>
      
      <div className={`${message?"block":"hidden"} mt-1 mb-2`}>
         {loginStatus?<p className='text-green-600'>Login successfull.</p>:<p className='text-red-600'>Invalid Username or Password.</p>}
      </div>

      <button onClick={()=>{handleLogin()}} className='border border-sky-600 bg-sky-600 rounded-3xl px-8 py-2 mt-4 hover:bg-white transition-all duration-300 text-white hover:text-sky-600'>Login</button>
    </div>
  )
}

export default LoginForm
