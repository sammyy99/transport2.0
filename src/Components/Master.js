// Masters.js
import React from 'react';
import { Link } from 'react-router-dom';

const Master = () => {
  return (
    <div className=" text-white">
      <div className="text-2xl font-bold mb-10">Masters</div>
      <ul className="flex flex-col space-y-4 text-md">
        <Link to="" className="hover:text-blue-500 transition duration-300">
          States
        </Link>
        <Link to="stations" className="hover:text-blue-500 transition duration-300">
          Stations
        </Link>
        <Link to="groups" className="hover:text-blue-500 transition duration-300">
          Groups
        </Link>
        <Link to="accounts" className="hover:text-blue-500 transition duration-300">
          Accounts
        </Link>
      </ul>
    </div>
  );
};

export default Master;
