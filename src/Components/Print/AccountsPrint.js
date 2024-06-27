import React from 'react'
import { useSelector } from 'react-redux'

const AccountsPrint = () => {

  const data = useSelector((store)=>{return store.print?.data});
  if (!data) return;
  console.log(data)

  return (
    <div className=''>
      
    </div>
  )
}

export default AccountsPrint
