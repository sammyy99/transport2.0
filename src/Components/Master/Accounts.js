import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { accountType, help } from "../../Constants/accounts";
import { accountLabels, accountsInputBox, accountsInputActive } from "../../Constants/css";

const Accounts = () => {

  const [selectedFormRecord, setselectedFormRecord] = useState({
    ACCTYPE: "",
    STATE: "",
    DISTRICT: "",
    LOCATION: "",
    ACCNAME: "",
    NAME: "",
    CUSTIN: "",
    ADDRESS: "",
    CSZ: "",
    CSZ1: "",
    BHI: "",
    YN: "",
    PODATE: "",
    FDATE: "",
    TDATE: "",
    DATE: "",
    LDATE: "",
    BACKYN: "",
    EWAYBILL: "",
    AUTOGRNO: "",
    MITEMYN: "",
    MULTIUSER: "",
    DEVPRINT: "",
    MBCHNO: "",
    FTLYN: "",
    BDA: "",
    MBYN: "",
    FSYN: "",
    EWBAPI: "",
    PERSON: "",
    PHOFF: "",
    PHRES: "",
    MOBILENO: "",
    FAXNO: "",
    EMAILID: "",
    DOMAIN: "",
  }); console.log(selectedFormRecord)  // selected account record from table will be updated here

  const [whichSearch, setWhichSearch] = useState('')  // Search table of NAME OR STATION
  const [isSearching, setIsSearching] = useState('');  // search switch
  const [selectedRowIndex, setSelectedRowIndex] = useState(0) // will be used for table record navigation
  const [searchedValue, setSearchedValue] = useState('')  // Will be used to store the value entered in search box
  const [searchedRecords, setsearchedRecords] = useState([])// searched records will be stored in this

  const [helpId, setHelpId] = useState(0); // for getting help id
  const [helpMsg, setHelpMsg] = useState('') // for getting msg

  const [fullScreen, setFullScreen] = useState(false); console.log(fullScreen)

  const searchRef = useRef()
  const divRef = useRef(null);  // Full screen div


  const getAllAccounts = async (order) => {
    const response = await axios.get(`http://localhost:5000/accounts/allaccounts/${order}`);
    setsearchedRecords(response.data);
  };
  const getAccountOnSearch = async (value, type) => {
    const response = await axios.post(`http://localhost:5000/accounts/searchaccounts`, { searchedValue: value, searchBy: type });
    setsearchedRecords(response.data);
  }


  const handleRecordSelection = (row, index) => {  // handling slection fo record with enter as well as click
    setSelectedRowIndex(index) // this is when i click once this handleRecordSelection gets executed so that even on click i get blue highlighted row
    setselectedFormRecord({
      ...row,
      PODATE: formatMSSQLDateToInput(row.PODATE),
      FDATE: formatMSSQLDateToInput(row.FDATE),
      TDATE: formatMSSQLDateToInput(row.TDATE),
      DATE: formatMSSQLDateToInput(row.DATE),
      LDATE: formatMSSQLDateToInput(row.LDATE),
    });
  }


  const handleChange = (e) => {  // for changing value in all fields
    const { name, value } = e.target;
  
    if (['BACKYN', 'EWAYBILL', 'AUTOGRNO', 'MBYN', 'FSYN', 'MULTIUSER', 'DEVPRINT', 'MBCHNO', 'MITEMYN', 'FTLYN', 'EWBAPI'].includes(name)) {
      // Allow only 'Y', 'N', or an empty string
      if (value.toUpperCase() === 'Y' || value.toUpperCase() === 'N' || value === '') {
        setselectedFormRecord({
          ...selectedFormRecord,
          [name]: value.toUpperCase(),
        });
      }
    } else if (name === 'BHI') {
      // Allow only 'B', 'H', 'I', 'A', 'C', or an empty string
      if (['B', 'H', 'I', 'A', 'C', ''].includes(value.toUpperCase())) {
        setselectedFormRecord({
          ...selectedFormRecord,
          [name]: value.toUpperCase(),
        });
      }
    } else if (name === 'YN') {
      // Allow only 'Y', 'N', 'U', 'B', or an empty string
      if (['Y', 'N', 'U', 'B', ''].includes(value.toUpperCase())) {
        setselectedFormRecord({
          ...selectedFormRecord,
          [name]: value.toUpperCase(),
        });
      }
    } else {
      // Handle other fields normally
      setselectedFormRecord({
        ...selectedFormRecord,
        [name]: value.toUpperCase(),
      });
    }
  };   
  const handleSearch = (e) => {  // for searching box
    setSearchedValue(e.target.value.toUpperCase());
    searchedValue === '' ? getAllAccounts(whichSearch) : getAccountOnSearch(searchedValue, whichSearch);
    setSelectedRowIndex(0)
  }
  const handleFocus = (e) => {  // for active box help and bg color 
    const id = parseInt(e.target.id, 10);  // Ensure `id` is an integer if your IDs are numbers
    setHelpId(id);
    setHelpMsg(help[id].msg);
  }


  const searchSwitchOn = () => {
    setIsSearching(true)
    setSearchedValue('')
    setSelectedRowIndex(0)
  }
  const searchSwitchOff = () => {
    setIsSearching(false)
  }


  const toggleFullScreen = () => {   // for full screen
    if (divRef.current) {
      if (!document.fullscreenElement) {
        divRef.current.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
        setFullScreen(true)
      } else {
        document.exitFullscreen();
        setFullScreen(false)
      }
    }
  };

  const formatMSSQLDateToInput = (dateString) => { // Formatting MSSQL Date format to JSX Date format
    if (!dateString) return '';
    return dateString.split('T')[0]; // Extract YYYY-MM-DD part
  };
  
  const formatInputDateToMSSQL = (dateString) => { // Formatting JSX Date format to MSSQL Date format
    if (!dateString) return null;
    return dateString; // YYYY-MM-DD is already in the correct format
  };
  


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
      } else if (event.key === 'Enter') {
        if (searchedRecords.length > 0 && selectedRowIndex >= 0) {
          const selectedRow = searchedRecords[selectedRowIndex];
          if (selectedRow) {
            handleRecordSelection(selectedRow);
            searchSwitchOff()
          }
        }
      } else if (event.key === 'Escape') {
        searchSwitchOff();
        setFullScreen(false); // setting full screen from escape too
        //addSwitchOff()
        //editSwitchOff()
        //cleanMessages()
        //popupSwitchOff()
      }
    };
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearching, selectedRowIndex, searchedRecords, helpId, fullScreen]);


  return (
    <div className={`w-full overflow-y-auto h-full flex justify-center`}>
      <div className={`w-[1330px] my-auto`}>

        <div ref={divRef} className={`font-bold font-sans pt-2 px-4 my-2 border border-black rounded-md  bg-slate-200`}>

          <div className="w-full flex justify-between">
            <div className="flex space-x-1">
              <button className="py-1 px-3 w-20 bg-green-600 text-white rounded-md transition-all duration-200 hover:bg-green-500">Add</button>
              <button className="py-1 px-3 w-20 bg-blue-600 text-white rounded-md transition-all duration-200 hover:bg-blue-500">Edit</button>
              <button className="py-1 px-3 w-20 bg-red-600 text-white rounded-md transition-all duration-200 hover:bg-red-500">Delete</button>
            </div>
            <div className='text-center text-2xl'>Accounts Details</div>
            <div className="flex space-x-1">
              <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600"
                onClick={() => { getAllAccounts('NAME'); searchSwitchOn(); setWhichSearch('NAME'); }}
              >Name</button>
              <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600"
                onClick={() => { getAllAccounts('DISTRICT'); searchSwitchOn(); setWhichSearch('DISTRICT') }}
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
                  </> : <>
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
                          onClick={() => { handleRecordSelection(row, index) }}
                          onDoubleClick={() => { searchSwitchOff() }}
                        >
                          {whichSearch === 'NAME' ? <>
                            <td className="w-6/12 border-r border-black pl-2">{row.NAME}</td>
                            <td className="w-3/12 border-r border-black pl-2">{row.DISTRICT}</td>
                            <td className="w-3/12 pl-2">{row.LOCATION}</td>
                          </> : <>
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
                  <select onFocus={handleFocus} id={0} name="ACCTYPE" value={selectedFormRecord.ACCTYPE} onChange={handleChange} className={`${accountsInputBox} ${helpId === 0 && accountsInputActive} w-56`}>
                    {accountType && accountType.map((item) => (
                      <option key={item.value} value={item.value}>{item.option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>State :</p></div>
                  <select onFocus={handleFocus} id={1} name="state" value={selectedFormRecord.SID} onChange={handleChange} className={`${accountsInputBox} ${helpId === 1 && accountsInputActive} w-56`}>
                    <option>{selectedFormRecord.STATE}</option>
                  </select>
                </div>
              </div>

              <div className="flex w-full mt-0">
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>Station :</p></div>
                  <select onFocus={handleFocus} id={2} name="DISTRICT" value={selectedFormRecord.ZID} onChange={handleChange} className={`${accountsInputBox} ${helpId === 2 && accountsInputActive} w-56`}>
                    <option>{selectedFormRecord.DISTRICT}</option>
                  </select>
                </div>

                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>Location :</p></div>
                  <input onFocus={handleFocus} id={3} name="LOCATION" value={selectedFormRecord.LOCATION} onChange={handleChange} className={`${accountsInputBox} ${helpId === 3 && accountsInputActive} w-56`}></input>
                </div>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="w-1/2">
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>A/c Name :</div>
                  <input onFocus={handleFocus} id={4} name="ACCNAME" value={selectedFormRecord.ACCNAME} onChange={handleChange} className={`${accountsInputBox} ${helpId === 4 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>Mailing Name :</div>
                  <input onFocus={handleFocus} id={5} name="NAME" value={selectedFormRecord.NAME} onChange={handleChange} className={`${accountsInputBox} ${helpId === 5 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>GSTIN :</div>
                  <input onFocus={handleFocus} id={6} name="CUSTIN" value={selectedFormRecord.CUSTIN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 6 && accountsInputActive} w-[75%]`}></input>
                </div>
              </div>

              <div className="w-1/2">
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>Address :</div>
                  <input onFocus={handleFocus} id={7} name="ADDRESS" value={selectedFormRecord.ADDRESS} onChange={handleChange} className={`${accountsInputBox} ${helpId === 7 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}></div>
                  <input onFocus={handleFocus} id={8} name="CSZ" value={selectedFormRecord.CSZ} onChange={handleChange} className={`${accountsInputBox} ${helpId === 8 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}></div>
                  <input onFocus={handleFocus} id={9} name="CSZ1" value={selectedFormRecord.CSZ1} onChange={handleChange} className={`${accountsInputBox} ${helpId === 9 && accountsInputActive} w-[75%]`}></input>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>B/H/I/A/C :</div>
                  <input onFocus={handleFocus} id={10} name="BHI" value={selectedFormRecord.BHI} onChange={handleChange} className={`${accountsInputBox} ${helpId === 10 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>W/S Status :</div>
                  <input onFocus={handleFocus} id={11} name="YN" value={selectedFormRecord.YN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 11 && accountsInputActive} w-6`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Date From :</div>
                  <input onFocus={handleFocus} id={12} name="PODATE" type="date" value={selectedFormRecord.PODATE} onChange={handleChange} className={`${accountsInputBox} ${helpId === 12 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}></div>
                  {/*Empty space here*/}
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Web From :</div>
                  <input onFocus={handleFocus} id={13} name="FDATE" type="date" value={selectedFormRecord.FDATE} onChange={handleChange} className={`${accountsInputBox} ${helpId === 13 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>To Date :</div>
                  <input onFocus={handleFocus} id={14} name="TDATE" type="date" value={selectedFormRecord.TDATE} onChange={handleChange} className={`${accountsInputBox} ${helpId === 14 && accountsInputActive} w-56`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Lic. From :</div>
                  <input onFocus={handleFocus} id={15} name="DATE" type="date" value={selectedFormRecord.DATE} onChange={handleChange} className={`${accountsInputBox} ${helpId === 15 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Lic. To :</div>
                  <input onFocus={handleFocus} id={16} name="LDATE" type="date" value={selectedFormRecord.LDATE} onChange={handleChange} className={`${accountsInputBox} ${helpId === 16 && accountsInputActive} w-56`} placeholder=""></input>
                </div>
              </div>
            </div>

            <div className="flex w-full mt-6">
              <div className="w-1/2 flex">
              <div className="">
                <div className="flex">
                  <div className={`${accountLabels}`}>Web Backup :</div>
                  <input onFocus={handleFocus} id={17} name="BACKYN" value={selectedFormRecord.BACKYN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 17 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Ewaybill :</div>
                  <input onFocus={handleFocus} id={18} name="EWAYBILL" value={selectedFormRecord.EWAYBILL} onChange={handleChange} className={`${accountsInputBox} ${helpId === 18 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Auto GR No. :</div>
                  <input onFocus={handleFocus} id={19} name="AUTOGRNO" value={selectedFormRecord.AUTOGRNO} onChange={handleChange} className={`${accountsInputBox} ${helpId === 19 && accountsInputActive} w-6`} ></input>
                </div>
              </div>

              <div className="">
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>B/D/A :</div>
                  <input onFocus={handleFocus} id={20} name="BDA" value={selectedFormRecord.BDA} onChange={handleChange} className={`${accountsInputBox} ${helpId === 20 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'B.off. (Y/N/B) :'}</div>
                  <input onFocus={handleFocus} id={21} name="MBYN" value={selectedFormRecord.MBYN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 21 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'F.S in Bilty (Y/N) :'}</div>
                  <input onFocus={handleFocus} id={22} name="FSYN" value={selectedFormRecord.FSYN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 22 && accountsInputActive} w-6`} ></input>
                </div>
              </div>
              </div>

              <div className="flex w-1/2">
              <div className="">
                <div className="flex">
                  <div className={`${accountLabels}`}>Multi User :</div>
                  <input onFocus={handleFocus} id={23} name="MULTIUSER" value={selectedFormRecord.MULTIUSER} onChange={handleChange} className={`${accountsInputBox} ${helpId === 23 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Print Developer :</div>
                  <input onFocus={handleFocus} id={24} name="DEVPRINT" value={selectedFormRecord.DEVPRINT} onChange={handleChange} className={`${accountsInputBox} ${helpId === 24 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${accountLabels}`}>Manual Ch. No. :</div>
                  <input onFocus={handleFocus} id={25} name="MBCHNO" value={selectedFormRecord.MBCHNO} onChange={handleChange} className={`${accountsInputBox} ${helpId === 25 && accountsInputActive} w-6`} ></input>
                </div>
              </div>

              <div className="">
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>Multi Item :</div>
                  <input onFocus={handleFocus} id={26} name="MITEMYN" value={selectedFormRecord.MITEMYN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 26 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>Full Truck Load :</div>
                  <input onFocus={handleFocus} id={27} name="FTLYN" value={selectedFormRecord.FTLYN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 27 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex">
                  <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'Ewaybill Api (Y/N):'}</div>
                  <input onFocus={handleFocus} id={28} name="EWBAPI" value={selectedFormRecord.EWBAPI} onChange={handleChange} className={`${accountsInputBox} ${helpId === 28 && accountsInputActive} w-6`} ></input>
                </div>
              </div>
              </div>
            </div>
            

            <div className="mt-6">
              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Contact Person :</div>
                  <input onFocus={handleFocus} id={29} name="PERSON" value={selectedFormRecord.PERSON} onChange={handleChange} className={`${accountsInputBox} ${helpId === 29 && accountsInputActive} w-56`} ></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Office Ph. :</div>
                  <input onFocus={handleFocus} id={30} name="PHOFF" value={selectedFormRecord.PHOFF} onChange={handleChange} className={`${accountsInputBox} ${helpId === 30 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Resi. :</div>
                  <input onFocus={handleFocus} id={31} name="PHRES" value={selectedFormRecord.PHRES} onChange={handleChange} className={`${accountsInputBox} ${helpId === 31 && accountsInputActive}`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Mobile No. :</div>
                  <input onFocus={handleFocus} id={32} name="MOBILENO" value={selectedFormRecord.MOBILENO} onChange={handleChange} className={`${accountsInputBox} ${helpId === 32 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Fax No. :</div>
                  <input onFocus={handleFocus} id={33} name="FAXNO" value={selectedFormRecord.FAXNO} onChange={handleChange} className={`${accountsInputBox} ${helpId === 33 && accountsInputActive}`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Email :</div>
                  <input onFocus={handleFocus} id={34} name="EMAILID" value={selectedFormRecord.EMAILID} onChange={handleChange} className={`${accountsInputBox} ${helpId === 34 && accountsInputActive} w-[75%]`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Domain :</div>
                  <input onFocus={handleFocus} id={35} name="DOMAIN" value={selectedFormRecord.DOMAIN} onChange={handleChange} className={`${accountsInputBox} ${helpId === 35 && accountsInputActive} w-[75%]`} ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full border rounded-md border-black my-1 shadow-sm shadow-black">
            <div className="w-[15%] text-center border-r rounded-l-md border-black py-1 bg-blue-500">HELP</div>
            <div className="w-[70%] px-4 py-1 bg-amber-300">{helpMsg}</div>
            <button onClick={toggleFullScreen} className="py-1 w-[15%] bg-neutral-800 text-white rounded-r-md transition-all duration-200 hover:bg-neutral-600">Full Screen</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Accounts;
