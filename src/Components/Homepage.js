import React from 'react'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import Master from './Master'
import Vouchers from './Vouchers'
import ACreports from './ACreports'
import Maintenance from './Maintenance'
import Help from './Help'

const Homepage = () => {
  return (
    <div>
      <Header/>
      <div className='flex w-screen'>

        <div className='w-[13%] bg-gray-800'>
        <Routes>
            <Route path='' element={<Master/>}/>
            <Route path='vouchers' element={<Vouchers/>}/>
            <Route path='ac-reports' element={<ACreports/>}/>
            <Route path='maintenance' element={<Maintenance/>}/>
            <Route path='help' element={<Help/>}/>
        </Routes>   
        </div>

        <div className='w-[87%] bg-gray-300'>
            Second
        </div>
      </div>
    </div>
  )
}

export default Homepage
