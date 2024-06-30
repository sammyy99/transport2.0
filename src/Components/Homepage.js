import React from 'react'
import Header from './Header'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Master from './Master'
import Vouchers from './Vouchers'
import ACreports from './ACreports'
import Maintenance from './Maintenance'
import Help from './Help'
import States from './Master/States'
import Stations from './Master/Stations'
import Groups from './Master/Groups'
import Accounts from './Master/Accounts'
import AccountsPrint from './Print/AccountsPrint'

const Homepage = () => {

  return (
    <div className='h-[100vh]'>
      <Header/>
      <div className='flex h-full overflow-y-hidden'>

        <div className='w-[13%] bg-gray-800 px-8 pt-20 text-lg'>
        <Routes>
            <Route path='masters/*' element={<Master/>}/>
            <Route path='vouchers/*' element={<Vouchers/>}/>
            <Route path='ac-reports/*' element={<ACreports/>}/>
            <Route path='maintenance/*' element={<Maintenance/>}/>
            <Route path='help/*' element={<Help/>}/>
        </Routes>   
        </div>

        <div className='w-[87%] pt-14'>
            <Routes>
                <Route path='masters/states' element={<States/>}/>
                <Route path='masters/stations' element={<Stations/>}/>
                <Route path='masters/groups' element={<Groups/>}/>
                <Route path='masters/accounts' element={<Accounts/>}/>
            </Routes>
        </div>
      </div>
    </div>
  )
}

export default Homepage
