import React, { forwardRef } from 'react';

const AccountsPrint = forwardRef(({ data }, ref) => {
  const printAreaStyle = {
    width: '210mm',
    height: '297mm',
    padding: '10mm',
    boxSizing: 'border-box',
    backgroundColor: 'white',
  };

  console.log(data)

  return (
    <div ref={ref} style={printAreaStyle}>
      <div className="text-center text-xl mb-5">
        <h1 className='text-3xl'>Company Name</h1>
        <p className='text-xl'>Company Details</p>
      </div>
      <div className="text-base leading-6">
        <table className="min-w-full">
          <thead className='mb-2'>
            <tr>
              <th className='text-left pr-1'>ID</th>
              <th className='text-left pr-1'>Account Name</th>
              <th className='text-left pr-1'>State</th>
              <th className='text-left'>Station</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className=''>
            {data && data.map((item, index) => (
              <tr key={index}>
                <td className='pr-1'>{item.WEBID}</td>
                <td className='pr-1'>{item.ACCNAME}</td>
                <td className='pr-1'>{item.STATE}</td>
                <td className=''>{item.DISTRICT}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default AccountsPrint;
