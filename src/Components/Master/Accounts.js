import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { accountLabels, accountsInputBox } from "../../Constants/css";
import { BHIAC, accountType, webServiceOptions } from "../../Constants/accounts";

const Accounts = () => {
  const [formData, setFormData] = useState({
    acType: "",
    state: "New",
    station: "New",
    location: "",
    acName: "",
    mailingName: "",
    gstin: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    bhiac: "",
    wsStatus: "",
    dateFrom: "",
    webFrom: "",
    toDate: "",
    licFrom: "",
    licTo: "",
    webBackup: "",
    ewaybill: "",
    autoGrNo: "",
    multiItem: "",
    multiUser: "",
    printDeveloper: "",
    manualChNo: "",
    fullTruckLoad: "",
    bda: "",
    boff: "",
    fromStationInBilty: "",
    ewaybillApi: "",
    contactNo: "",
    officePh: "",
    resi: "",
    mobileNo: "",
    faxNo: "",
    domain: "",
  });

  const [selectAccountRecord, setSelectedAccountRecord] = useState(); console.log(selectAccountRecord) // selected account record from table will be updated here

  const [whichSearch, setWhichSearch] = useState('')  // Search table of NAME OR STATION
  const [isSearching, setIsSearching] = useState('');  // search switch
  const [selectedRowIndex, setSelectedRowIndex] = useState(0) // will be used for table record navigation
  const [searchedValue, setSearchedValue] = useState('')  // Will be used to store the value entered in search box
  const [searchedRecords, setsearchedRecords] = useState([])// searched records will be stored in this

  const searchRef = useRef()


  const getAllAccounts = async (order) => {
    const response = await axios.get(`http://localhost:5000/accounts/allaccounts/${order}`);
    setsearchedRecords(response.data);
  };
  const getAccountOnSearch = async(value , type)=>{
    const response = await axios.post(`http://localhost:5000/accounts/searchaccounts`,{searchedValue:value, searchBy:type});
    setsearchedRecords(response.data);
  }


  const handleRecordSelection = (row,index)=>{  // handling slection fo record with enter as well as click
    setSelectedRowIndex(index) // this is when i click once this handleRecordSelection gets executed so that even on click i get blue highlighted row
    setSelectedAccountRecord(row) 
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSearch = (e) => {
    setSearchedValue(e.target.value.toUpperCase());
    searchedValue === '' ? getAllAccounts(whichSearch):getAccountOnSearch(searchedValue,whichSearch);
    setSelectedRowIndex(0)
  }


  const searchSwitchOn = ()=>{
    setIsSearching(true)  
    setSearchedValue('')
    setSelectedRowIndex(0)
  }
  const searchSwitchOff = ()=>{
    setIsSearching(false)
  }

  useEffect(() => {
    if (isSearching) {
      searchRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      setSelectedRowIndex((prevIndex) => {
        return prevIndex > 0 ? prevIndex - 1 : 0;
      });
    } else if (event.key === 'ArrowDown') {
      setSelectedRowIndex((prevIndex) => {
        return prevIndex < searchedRecords.length - 1 ? prevIndex + 1 : searchedRecords.length - 1;
      });
    } else if(event.key === 'Enter'){
      if (searchedRecords.length > 0 && selectedRowIndex >= 0) {
        const selectedRow = searchedRecords[selectedRowIndex];
        if (selectedRow) {
            handleRecordSelection(selectedRow);
            searchSwitchOff()
        }
    }
    } else if (event.key === 'Escape') {
       searchSwitchOff()
       //addSwitchOff()
       //editSwitchOff()
       //cleanMessages()
       //popupSwitchOff()
    }
};
   document.addEventListener('keydown',handleKeyDown)
   return ()=> {
    document.removeEventListener('keydown',handleKeyDown)
   }
  }, [isSearching,selectedRowIndex,searchedRecords]);


  return (
    <div className="w-full overflow-y-auto h-full flex justify-center">
      <div className="w-[1100px] my-auto">

        <div className="font-bold font-sans py-2 px-4 my-2 border border-black rounded-md shadow-black shadow-md bg-slate-200">

          <div className="w-full flex justify-between">
            <div className="flex space-x-1">
              <button className="py-1 px-3 w-20 bg-green-600 text-white rounded-md transition-all duration-200 hover:bg-green-500">Add</button>
              <button className="py-1 px-3 w-20 bg-blue-600 text-white rounded-md transition-all duration-200 hover:bg-blue-500">Edit</button>
              <button className="py-1 px-3 w-20 bg-red-600 text-white rounded-md transition-all duration-200 hover:bg-red-500">Delete</button>
            </div>
         <div className='text-center text-2xl'>Accounts Details</div>
         <div className="flex space-x-1">
              <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600"
              onClick={()=>{getAllAccounts('NAME');searchSwitchOn();setWhichSearch('NAME');}}
              >Name</button>
              <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600"
              onClick={()=>{getAllAccounts('DISTRICT');searchSwitchOn();setWhichSearch('DISTRICT')}}
              >Station</button>
              <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600">Print</button>
            </div>
          </div>

          {/*-------------------------------------------- Table Search ----------------------------------------*/}
          <div className={`${isSearching ? 'block' : 'hidden'} w-[55rem] mx-auto rounded-md mt-8 h-[24rem] shadow-lg shadow-black border-black `}>

            <div className="h-full flex flex-col justify-between">
              <div className="w-full">
                <div className="flex border-b py-1 border-black bg-slate-700 text-white rounded-t-md">
                  {whichSearch === 'NAME' ? <>
                    <div className="w-6/12 pl-2 ">Account Name</div>
                    <div className="w-3/12 pl-2 ">Station</div>
                    <div className="w-3/12 ">Location</div>
                  </>:<>
                    <div className="w-3/12 pl-2 ">Station</div>
                    <div className="w-6/12 pl-2 ">Account Name</div>
                    <div className="w-3/12 ">Location</div>
                  </>}  
                </div>
                <div className="overflow-y-scroll h-[18.9rem] bg-white">
                  <table className="w-full">
                    <tbody>
                      {searchedRecords && searchedRecords.map((row, index) => (
                        <tr key={row.WEBID}
                          className={`${selectedRowIndex === index ? 'bg-blue-600 text-white' : ''} border-b hover:cursor-pointer hover:shadow-md`}
                          onClick={()=>{handleRecordSelection(row,index)}}
                          onDoubleClick={() => {searchSwitchOff()}}
                        >
                          {whichSearch === 'NAME'?<>
                            <td className="w-6/12 border-r border-black pl-2">{row.NAME}</td>
                          <td className="w-3/12 border-r border-black pl-2">{row.DISTRICT}</td>
                          <td className="w-3/12 pl-2">{row.LOCATION}</td>
                          </>:<>
                          <td className="w-3/12 border-r border-black pl-2">{row.DISTRICT}</td>
                          <td className="w-6/12 border-r border-black pl-2">{row.NAME}</td>
                          <td className="w-3/12 pl-2">{row.LOCATION}</td>
                          </>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="py-2 h-12 border-t border-black bg-slate-700 rounded-b-md text-white">
                <div className="w-full flex justify-between px-4">
                  <div className="flex space-x-2">
                    <div className="py-1 font-semibold"><p>Enter Name:</p></div>
                    <input
                      ref={searchRef}
                      placeholder="Search here..."
                      className="border border-black rounded-sm w-72 px-2 text-black" type="text"
                      value={searchedValue}
                      onChange={handleSearch}
                    ></input>
                  </div>
                  <button onClick={() => { searchSwitchOff() }} className="bg-red-600 hover:bg-red-500 rounded-md w-20 px-2 py-[2px] font-semibold">Cancel</button>
                </div>
              </div>
            </div>

          </div>
          {/* ------------------------------------------------- Table search Ends here --------------------------------------------- */}

          <div className={`${isSearching ? 'hidden' : 'block'} px-6 py-6 mt-2 bg-white border border-black rounded-md shadow-sm shadow-black`}>
            <div>
              <div className="flex w-full">
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>A/C Type :</p></div>
                  <select name="acType" value={formData.acType} onChange={handleChange} className={`${accountsInputBox} w-56`}>
                    {accountType && accountType.map((item) => (
                      <option key={item.value} value={item.value}>{item.option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>State :</p></div>
                  <select name="state" value={formData.state} onChange={handleChange} className={`${accountsInputBox} w-56`}>
                    <option>New</option>
                  </select>
                </div>
              </div>

              <div className="flex w-full mt-0">
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>Station :</p></div>
                  <select name="station" value={formData.station} onChange={handleChange} className={`${accountsInputBox} w-56`}>
                    <option>New</option>
                  </select>
                </div>

                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>Location :</p></div>
                  <input name="location" value={formData.location} onChange={handleChange} className={`${accountsInputBox} w-56`} placeholder="Location"></input>
                </div>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="w-1/2">
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>A/c Name :</div>
                  <input name="acName" value={formData.acName} onChange={handleChange} className={`${accountsInputBox} w-80`} placeholder=""></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>Mailing Name :</div>
                  <input name="mailingName" value={formData.mailingName} onChange={handleChange} className={`${accountsInputBox} w-80`} placeholder=""></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>GSTIN :</div>
                  <input name="gstin" value={formData.gstin} onChange={handleChange} className={`${accountsInputBox} w-80`} placeholder=""></input>
                </div>
              </div>

              <div className="w-1/2">
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>Address :</div>
                  <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} className={`${accountsInputBox} w-80`} placeholder="Line 1"></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}></div>
                  <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} className={`${accountsInputBox} w-80`} placeholder="Line 2"></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}></div>
                  <input name="addressLine3" value={formData.addressLine3} onChange={handleChange} className={`${accountsInputBox} w-80`} placeholder="Line 3"></input>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>B/H/I/A/C :</div>
                  <input name="bhiac" value={formData.bhiac} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>W/S Status :</div>
                  <input name="wsStatus" value={formData.wsStatus} onChange={handleChange} className={`${accountsInputBox} w-6`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Date From :</div>
                  <input name="dateFrom" type="date" value={formData.dateFrom} onChange={handleChange} className={`${accountsInputBox} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}></div>
                  {/*Empty space here*/}
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Web From :</div>
                  <input name="webFrom" type="date" value={formData.webFrom} onChange={handleChange} className={`${accountsInputBox} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>To Date :</div>
                  <input name="toDate" type="date" value={formData.toDate} onChange={handleChange} className={`${accountsInputBox} w-56`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Lic. From :</div>
                  <input name="licFrom" type="date" value={formData.licFrom} onChange={handleChange} className={`${accountsInputBox} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Lic. To :</div>
                  <input name="licTo" type="date" value={formData.licTo} onChange={handleChange} className={`${accountsInputBox} w-56`} placeholder=""></input>
                </div>
              </div>
            </div>

            <div className="flex w-full mt-6">
              <div className="">
                <div className="flex">
                  <div className={`${accountLabels}`}>Web Backup :</div>
                  <input name="webBackup" value={formData.webBackup} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Ewaybill :</div>
                  <input name="ewaybill" value={formData.ewaybill} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Auto GR No. :</div>
                  <input name="autoGrNo" value={formData.autoGrNo} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
              </div>

              <div className="mr-[9.2rem]">
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>B/D/A :</div>
                  <input name="bda" value={formData.bda} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'B.off. (Y/N/B) :'}</div>
                  <input name="boff" value={formData.boff} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'F.S in Bilty (Y/N) :'}</div>
                  <input name="fromStationInBilty" value={formData.fromStationInBilty} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
              </div>

              <div className="">
                <div className="flex">
                  <div className={`${accountLabels}`}>Multi User :</div>
                  <input name="multiUser" value={formData.multiUser} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Print Developer :</div>
                  <input name="printDeveloper" value={formData.printDeveloper} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Manual Ch. No. :</div>
                  <input name="manualChNo" value={formData.manualChNo} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
              </div>

              <div className=""> 
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>Multi Item :</div>
                  <input name="multiItem" value={formData.multiItem} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>Full Truck Load :</div>
                  <input name="fullTruckLoad" value={formData.fullTruckLoad} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'Ewaybill Api (Y/N):'}</div>
                  <input name="ewaybillApi" value={formData.ewaybillApi} onChange={handleChange} className={`${accountsInputBox} w-6`} ></input>
                </div>
              </div> 
            </div>

            <div className="mt-6">
              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Contact No. :</div>
                  <input name="contactNo" value={formData.contactNo} onChange={handleChange} className={`${accountsInputBox} w-56`} ></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Office Ph. :</div>
                  <input name="officePh" value={formData.officePh} onChange={handleChange} className={`${accountsInputBox} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Resi. :</div>
                  <input name="resi" value={formData.resi} onChange={handleChange} className={`${accountsInputBox}`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Mobile No. :</div>
                  <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} className={`${accountsInputBox} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Fax No. :</div>
                  <input name="faxNo" value={formData.faxNo} onChange={handleChange} className={`${accountsInputBox}`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Email :</div>
                  <input name="domain" value={''} onChange={handleChange} className={`${accountsInputBox} w-80`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Domain :</div>
                  <input name="domain" value={formData.domain} onChange={handleChange} className={`${accountsInputBox} w-80`} ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
