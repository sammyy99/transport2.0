import React from "react";

const Accounts = () => {
  return (
    <div className="h-full col-span-12 px-16 pt-4 pb-16 overflow-scroll">
      <div className="flex w-full justify-center text-2xl">
        Account Details
      </div>


      <div>
        <div className="flex space-x-10 mt-10 ">
          <div>
            <label className="mr-1">A/C Type : </label>
            <select className="w-40 py-1 px-2 rounded-md shadow-md border">
              <option>Transport</option>
              <option>Publisher</option>
            </select>
          </div>

          <div>
            <label className="mr-1">State : </label>
            <select className="w-40 py-1 px-2 rounded-md shadow-md border">
              <option>UttarPradesh</option>
              <option>Punjab</option>
            </select>
          </div>

          <div>
            <label className="mr-1">Station : </label>
            <select className="w-40 py-1 px-2 rounded-md shadow-md border">
              <option>Meerut</option>
              <option>Agra</option>
            </select>
          </div>

          <div>
            <label className="mr-1">Location : </label>
            <input className="w-40 py-1 px-2 rounded-md shadow-md border" type="text" placeholder="Location"></input>
          </div>
        </div>
      </div>


      <div className="mt-8 w-4/12">
        <div className="mb-1 w-full flex justify-between">
          <label className="mr-1">A/C Name : </label>
          <input  className="w-64 py-1 px-2 rounded-md shadow-md border" type="text" placeholder=""></input>
        </div>

        <div className="mb-1 w-full flex justify-between">
          <label className="mr-1">Mailing Name : </label>
          <input className="w-64 py-1 px-2 rounded-md shadow-md border" type="text" placeholder=""></input>
        </div>

        <div className="mb-1 w-full flex justify-between">
          <label className="mr-1">Address : </label>
          <div className="w-64">
            <input type="text" className="w-full py-1 px-2 rounded-md shadow-md border"></input>
            <input type="text" className="w-full py-1 px-2 rounded-md shadow-md border"></input>
            <input type="text" className="w-full py-1 px-2 rounded-md shadow-md border"></input>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <label className="mr-1 ">GSTIN : </label>
          <input className="w-64 py-1 px-2 rounded-md shadow-md border" type="text" placeholder=""></input>
        </div>
      </div>


      <div className="mt-8 w-6/12">
        <div className="flex justify-between w-2/3">
          <div className="">
            <label className="mr-10">B/H/I/C : </label>
            <select className="py-1 px-2 rounded-md shadow-md border">
              <option>B</option>
              <option>H</option>
              <option>I</option>
              <option>C</option>
            </select>
          </div>
          <div>
            <label className="mr-1">Web Service Status : </label>
            <input type="checkbox"></input>
          </div>  
        </div>

        <div className="mt-1">
          <label className="mr-6">Date from : </label>
          <input className="py-1 px-2 rounded-md shadow-md border" type="date"></input>
        </div>

        <div className="flex mt-1 w-full justify-between">
          <div>
            <label className="mr-6">Web from : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="date"></input>
          </div>
          <div>
            <label className="mr-1">To date : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="date"></input>
          </div>
        </div>

        <div className="flex mt-1 w-full justify-between">
          <div className="">
            <label className="mr-1">Licence from : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="date"></input>
          </div>
          <div>
            <label className="mr-1">Licence to : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="date"></input>
          </div>
        </div>
      </div>


      <div className="mt-8 w-8/12 flex  justify-between">
          <div className="">
          <div className="flex justify-between w-full">
            <label className="mr-1">Web Backup : </label>
            <input type="checkbox"></input>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-1">Multiuser : </label>
            <input type="checkbox"></input>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-1">Eway Bill : </label>
            <input type="checkbox"></input>
          </div>
          </div>
          
          <div className="">
          <div className="flex justify-between w-full">
            <label className="mr-1">Print Developer : </label>
            <input type="checkbox"></input>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-2">Auto GR no : </label>
            <input type="checkbox"></input>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-1">Manual Ch no. : </label>
            <input type="checkbox"></input>
          </div>
          </div>

          <div>
          <div className="flex justify-between w-full">
            <label className="mr-1">Multi Item : </label>
            <input type="checkbox"></input>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-1">Full Truck Load : </label>
            <input type="checkbox"></input>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-1">From Station in Bilty : </label>
            <input type="checkbox"></input>
          </div>
          </div>
          
          <div>
          <div className="flex justify-between w-full">
            <label className="mr-1">Eway Bill API : </label>
            <input type="checkbox"></input>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-1">B/D/A : </label>
            <select className="px-1 rounded-md shadow-md border">
              <option>B</option>
              <option>D</option>
              <option>A</option>
            </select>
          </div>
          <div className="flex justify-between w-full">
            <label className="mr-1">B .off : </label>
            <select className="px-1 rounded-md shadow-md border">
              <option>Yes</option>
              <option>No</option>
              <option>Both</option>
            </select>
          </div>
          </div>
        
      </div>


      <div className="mt-8 flex space-x-14">
        <div className="">
          <div className="w-full flex justify-between pb-1">
            <label className="mr-1">Contact Person : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="text"></input>
          </div>
          <div className="w-full flex justify-between pb-1">
            <label className="mr-1">Resi. : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="text"></input>
           </div>
        </div>

        <div className="">
        <div className="w-full flex justify-between pb-1">
            <label className="mr-1">Office no. : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="text"></input>
          </div>
           <div className="w-full flex justify-between pb-1">
            <label className="mr-1">Fax No. : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="text"></input>
           </div>
        </div>

        <div className="">
        <div className="w-full flex justify-between pb-1">
            <label className="mr-1">Phone no. : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="text"></input>
          </div>
          <div className="w-full flex justify-between ">
            <label className="mr-1">Domain : </label>
            <input className="py-1 px-2 rounded-md shadow-md border" type="text"></input>
           </div>
        </div>

      </div>

    </div>
  );
};

export default Accounts;
