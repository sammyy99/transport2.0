import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const loginStatus = useSelector((store)=>{return store?.user?.status})

  console.log(loginStatus)

  const handleLogout = ()=>{return navigate("/") }

  return (
    <header className="bg-gray-800 text-white shadow-md shadow-black w-screen">
      <nav className="flex  justify-between mx-auto p-4 px-8">
        <div className="font-extrabold">Solution Point</div>
        <ul className="flex space-x-7 text-lg">
          <Link to="" className="hover:text-blue-500 transition duration-300">Masters</Link>
          <Link to="vouchers" className="hover:text-blue-500 transition duration-300">Vouchers</Link>
          <Link to="ac-reports" className="hover:text-blue-500 transition duration-300">A/C Reports</Link>
          <Link to="maintenance" className="hover:text-blue-500 transition duration-300">Maintenance</Link>
          <Link to="help" className="hover:text-blue-500 transition duration-300">Help</Link>
        </ul>
        <div className="hover:text-red-500 transition duration-300 text-lg font-bold">
          <button onClick={handleLogout}>Exit</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
