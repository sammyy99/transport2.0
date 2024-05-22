import React, { useEffect, useState } from "react";
import axios from 'axios'
import { accountLabels, accountsInputBox } from "../../Constants/css";
import { BHIAC, accountType, webServiceOptions } from "../../Constants/accounts";

const Accounts = () => {

  const [account, setAccount] = useState(null)

  const getAccounts = async () => {
    const response = await axios.get('http://localhost:5000/accounts');
    setAccount(response.data);
  }

  useEffect(() => {
    //getAccounts();
  }, [])

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1100px] font-bold font-sans">

        <div className="w-full flex justify-between my-4">
          <div className="flex space-x-1">
            <button className="py-1 px-3 w-20 bg-green-600 text-white rounded-md transition-all duration-200 hover:bg-green-500">Add</button>
            <button className="py-1 px-3 w-20 bg-blue-600 text-white rounded-md transition-all duration-200 hover:bg-blue-500">Edit</button>
            <button className="py-1 px-3 w-20 bg-red-600 text-white rounded-md transition-all duration-200 hover:bg-red-500">Delete</button>
          </div>
          <div className='text-center font-bold text-2xl '>Accounts Details</div>
          <div className="flex space-x-1">
            <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600">Name</button>
            <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600">Station</button>
            <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600">Print</button>
          </div>
        </div>


        <div>
          <div className="flex w-full mt-6">
            <div className="flex w-1/2">
              <div><p className={`${accountLabels}`}>A/C Type:</p></div>
              <select className={`${accountsInputBox} w-56`}>
                {accountType && accountType.map((item) => {
                  return <option key={item.value} value={item.value}>{item.option}</option>
                })}
              </select>
            </div>
            <div className="flex w-1/2">
              <div><p className={`${accountLabels}`}>State:</p></div>
              <select className={`${accountsInputBox} w-56`}>
                <option>New</option>
              </select>
            </div>
          </div>

          <div className="flex w-full mt-1">
            <div className="flex w-1/2">
              <div><p className={`${accountLabels}`}>Station:</p></div>
              <select className={`${accountsInputBox} w-56`}>
                <option>New</option>
              </select>
            </div>

            <div className="flex w-1/2">
              <div><p className={`${accountLabels}`}>Location:</p></div>
              <input className={`${accountsInputBox} w-56`} placeholder="Location"></input>
            </div>
          </div>
        </div>


        <div className="flex mt-6">
          <div className="w-1/2">
            <div className="flex mt-1">
              <div className={`${accountLabels}`}>A/c Name:</div>
              <input className={`${accountsInputBox} w-80`} placeholder=""></input>
            </div>
            <div className="flex mt-1">
              <div className={`${accountLabels}`}>Mailing Name:</div>
              <input className={`${accountsInputBox} w-80`} placeholder=""></input>
            </div>
            <div className="flex mt-1">
              <div className={`${accountLabels}`}>GSTIN:</div>
              <input className={`${accountsInputBox} w-80`} placeholder=""></input>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex mt-1">
              <div className={`${accountLabels}`}>Address:</div>
              <input className={`${accountsInputBox} w-80`} placeholder="Line 1"></input>
            </div>
            <div className="flex mt-1">
              <div className={`${accountLabels}`}></div>
              <input className={`${accountsInputBox} w-80`} placeholder="Line 2"></input>
            </div>
            <div className="flex mt-1">
              <div className={`${accountLabels}`}></div>
              <input className={`${accountsInputBox} w-80`} placeholder="Line 3"></input>
            </div>
          </div>
        </div>


        <div className="mt-6">
          <div className="flex w-full">
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}>B/H/I/A/C:</div>
              <select className={`${accountsInputBox} w-56`}>
                {BHIAC && BHIAC.map((item) => {
                  return <option key={item.value} value={item.value}>{item.option}</option>
                })}
              </select>
            </div>
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}>W/S Status:</div>
              <select className={`${accountsInputBox} w-56`}>
                {webServiceOptions && webServiceOptions.map((item) => {
                  return <option key={item.value} value={item.value}>{item.option}</option>
                })}
              </select>
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}>Date From:</div>
              <input type="date" className={`${accountsInputBox} w-56`} ></input>
            </div>
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}></div>
              {/*Empty space here*/}
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}>Web From:</div>
              <input type="date" className={`${accountsInputBox} w-56`} ></input>
            </div>
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}>To Date:</div>
              <input type="date" className={`${accountsInputBox} w-56`}></input>
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}>Lic. From:</div>
              <input type="date" className={`${accountsInputBox} w-56`} ></input>
            </div>
            <div className="flex w-1/2 mt-1">
              <div className={`${accountLabels}`}>Lic. To:</div>
              <input type="date" className={`${accountsInputBox} w-56`} placeholder=""></input>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Accounts;
