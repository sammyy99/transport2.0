import React, { useEffect, useState } from 'react'
import axios from 'axios'

const States = () => {
  const [states, setStates] = useState([]);

  const getStates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/states')
      setStates(response.data)
    } catch (error) {
      console.log("Error in fetching data " + error)
    }
  }

  useEffect(() => {
    getStates()
  }, [])

  if (!states) return null;

  return (
    <div className="w-[70%] h-full mx-auto">
      <div className="text-2xl text-center py-4">
        States
      </div>

      <div className="h-[40%] text-center overflow-y-auto border border-black shadow-md shadow-gray-600">
        
        <div className="flex sticky top-0 z-10 w-full border-b border-black bg-slate-600 text-white py-1">
          <div className="w-[40%]">State Name</div>
          <div className="w-[40%]">State Code</div>
          <div className="w-[20%]">Edit</div>
        </div>

        <div className='py-2'>
        {states.map((row) => {
          return (
            <div key={row.SID} className="flex w-full border-b py-1">
              <div className="w-[40%]">{row.STATE}</div>
              <div className="w-[40%]">{row.SNAME}</div>
              <div className="w-[20%]">Edit</div>
            </div>
          );
        })}
        </div>

      </div>
    </div>
  );
}

export default States

/*<table className='w-full'>
          <thead className=''>
            <tr className=''>
              <th className='w-[60%] border-b border-black py-1 text-xl'>State Name</th>
              <th className='w-[40%] border-b border-black py-1 text-xl'>State Code</th>
            </tr>
          </thead>
          <tbody className=''>
            {states.map((row, index) => (
              <tr key={index}>
                <td>{row.STATE}</td>
                <td>{row.SNAME}</td>
              </tr>
            ))}
          </tbody>
        </table>*/ 