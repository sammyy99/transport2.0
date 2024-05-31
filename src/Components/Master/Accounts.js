import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { accountType, help } from "../../Constants/accounts";
import { accountLabels, accountsInputBox, accountsInputActive, disabledButton } from "../../Constants/css";
import { backendIP } from "../../Constants/main";

const Accounts = () => {
  const [selectedFormRecord, setselectedFormRecord] = useState({
    WEBID: 0,
    SID: null,
    ZID: null,
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
  }); // console.log(selectedFormRecord)  // selected account record from table will be updated here

  const [states,setStates] = useState();
  const [stations,setStations] = useState();

  const [whichSearch, setWhichSearch] = useState('')  // Search table of NAME OR STATION
  const [isSearching, setIsSearching] = useState('');  // search switch
  const [selectedRowIndex, setSelectedRowIndex] = useState(0) // will be used for table record navigation
  const [searchedValue, setSearchedValue] = useState('')  // Will be used to store the value entered in search box
  const [searchedRecords, setsearchedRecords] = useState([])// searched records will be stored in this

  const [isAdding, setIsAdding] = useState(false) // used as switch of add 
  const [isEditing, setIsEditing] = useState(false) // used as switch of edit 

  const [helpId, setHelpId] = useState(null); // for getting help id
  const [helpMsg, setHelpMsg] = useState('') // for getting msg

  const [fullScreen, setFullScreen] = useState(false); //console.log(fullScreen)

  const [popupMessage, setPopupMessage] = useState("") // to update popup message 
  const [showHidePopup, setShowHidePopup] = useState(false) // to show or hide popup
  const [alertbox,setAlertbox] = useState() // to set color of alertbox on true or false condition

  const searchRef = useRef()
  const divRef = useRef(null);  // Full screen div
  const accTypeRef = useRef();
  const stateRef = useRef();
  const stationRef = useRef();
  const accountNameRef = useRef();
  const saveRef = useRef();


  const getAllAccounts = async (order) => {
    try {
      const response = await axios.get(`${backendIP}/accounts/allaccounts/${order}`);
      setsearchedRecords(response.data);
    } catch (error) {
      console.log(error)
    }
  };
  const getAccountOnSearch = async (value, type) => {
    try {
      const response = await axios.post(`${backendIP}/accounts/searchaccounts`, { searchedValue: value, searchBy: type });
      setsearchedRecords(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  const getStates = async()=>{
    try {
      const response = await axios.get(`${backendIP}/accounts/getstates`)
      setStates(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  const getStations = async(sid)=>{
    try {
      const response = await axios.get(`${backendIP}/accounts/getstations/${sid}`)
      setStations(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleStationValidation = async()=>{  // Station Validations
    try {
      const response = await axios.post(`${backendIP}/accounts/validation/station`,{sid:selectedFormRecord.SID,zid:selectedFormRecord.ZID})
      setPopupMessage(response.data.msg)
      await response.data.alert ? setAlertbox(true) : setAlertbox(false)  // setting alertbox status true or false so that i can change colors.
      if (response.data.alert === false) {
        handlePopup();
        stateRef.current.focus()
      }else{
        popupSwitchOff();
      }
    } catch (error) {
      console.log(error)
    }
  }
  const accountNameValidation = async (data) => {
    try {
      if (data.ACCNAME.trim() === '') {
        setAlertbox(false)
        setPopupMessage('Account name cannot be blank')
        handlePopup();
        accountNameRef.current.focus()
      } else {
        if (isAdding) {
          const response = await axios.post(`${backendIP}/accounts/validation/accountname`, { name: data.ACCNAME, webid: 0 })
          setPopupMessage(response.data.msg)
          setAlertbox(response.data.alert)
          if (response.data.alert === false) {
            handlePopup();
            accountNameRef.current.focus()
          } else {
            popupSwitchOff();
          }
        } else {
          const response = await axios.post(`${backendIP}/accounts/validation/accountname`, { name: data.ACCNAME, webid: data.WEBID })
          setPopupMessage(response.data.msg)
          setAlertbox(response.data.alert)
          if (response.data.alert === false) {
            handlePopup();
            accountNameRef.current.focus()
          } else {
            popupSwitchOff();
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async(data) =>{  //Handling saving of Record and this data argument holds the most recent change done by harami user(changed value and clicked on save)
    try {
      const formData = {...data,
        PODATE: formatInputDateToMSSQL(data.PODATE),
        FDATE: formatInputDateToMSSQL(data.FDATE),
        TDATE: formatInputDateToMSSQL(data.TDATE),
        DATE: formatInputDateToMSSQL(data.DATE),
        LDATE: formatInputDateToMSSQL(data.LDATE),
      }
      //console.log(formData)
      if (formData.ACCTYPE.trim() === '' || formData.ACCNAME.trim() === '' || formData.STATE.trim() === '' || formData.DISTRICT.trim() === '') {
        setAlertbox(false)
        setPopupMessage('Fill all the mandatory fields before saving the record')
        handlePopup();
        accTypeRef.current.focus()
      } else {
        accountNameValidation(formData) // Have to call this here because of harami user changing the value after on blur validation and direct click on submit 
        if (alertbox === true) {  // Saving and editing of data will only be done if alert status is true on checking/calling accountNameValidation
          if (isAdding) {
            const response = await axios.post(`${backendIP}/accounts/add/submit`, {data:formData});
            setPopupMessage(response.data.msg);
            setAlertbox(response.data.alert);
            handlePopup();
            accTypeRef.current.focus();
            response.data.alert && addSwitchOff();
          } else {
            const response = await axios.post(`${backendIP}/accounts/edit/submit`, {data:formData});
            setPopupMessage(response.data.msg);
            setAlertbox(response.data.alert);
            handlePopup();
            accTypeRef.current.focus();
            response.data.alert && editSwitchOff();
          }
        } else {

        }
      }    
    } catch (error) {
      console.log(error)
    }
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
      }else if (name === 'BDA') {
        // Allow only 'B', 'H', 'I', 'A', 'C', or an empty string
        if (value.toUpperCase() === 'B' || value.toUpperCase() === 'D' || value === 'D' || value === '') {
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
      } else if (name === 'ACCTYPE' || name === 'STATE' || name === 'DISTRICT') {
        if (name === 'ACCTYPE') {
          setselectedFormRecord({ ...selectedFormRecord, ACCTYPE: e.target.options[e.target.selectedIndex].text });
        }
        if (name === 'STATE') {
          setselectedFormRecord({ ...selectedFormRecord, SID: value, STATE: e.target.options[e.target.selectedIndex].text });
        }
        if (name === 'DISTRICT') {
          setselectedFormRecord({ ...selectedFormRecord, ZID: value, DISTRICT: e.target.options[e.target.selectedIndex].text });
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
    isAdding && e.target.click();
  }

  //---------------------------------------------------Switches-------------------------------------------------------------//
  const addSwitchOn = () => {
    setselectedFormRecord({
      WEBID: 0,
      SID: null,
      ZID: null,
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
    }); // setting all the key values to empty just like before
    setStates();
    setStations();
    setIsAdding(true)
    setIsEditing(false)
    setIsSearching(false)
  }
  const addSwitchOff = () => {
    setIsAdding(false)
    setHelpId(null)
  }
  const editSwitchOn = () => {
    setIsEditing(true)
    setIsAdding(false)
    setIsSearching(false)
    //selectedStation && setEditStation(selectedStation)  // setting textbox with selectedStation value only if it has value
  }
  const editSwitchOff = () => {
    setIsEditing(false)
    setHelpId(null)
  }
  const searchSwitchOn = () => {
    setIsSearching(true)
    setSearchedValue('')
    setSelectedRowIndex(0)
  }
  const searchSwitchOff = () => {
    setIsSearching(false)
  }
  const popupSwitchOn = () => {
    setShowHidePopup(true)
  }
  const popupSwitchOff = () => {
    setShowHidePopup(false)
  }
  const handlePopup = () => {
    popupSwitchOn()
    setTimeout(() => {
      popupSwitchOff()
    }, 3000)
  }
  //---------------------------------------------------Switches-------------------------------------------------------------//


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
    return new Date(dateString).toISOString().slice(0, 10); // Ensures YYYY-MM-DD format
  };


  const handleSubmitKeyPress = (event) => {  // Calling this outside because of state issues on saving current data
    if (event.key === 'F2') {
      if ((isAdding || isEditing) && saveRef.current) {
        saveRef.current.click();
      }}
  };
const handleEnterKeyDown = (event) => {  // Event listener for Enter key navigation between input fields
  if (!isSearching && event.key === 'Enter') {
    event.preventDefault();
    const formElements = Array.from(divRef.current.querySelectorAll('input, select'));
    const index = formElements.indexOf(document.activeElement);
    if (index > -1 && index < formElements.length - 1) {
      formElements[index + 1].focus();
    }
  }
};

  useEffect(() => {
    if (isSearching) {
      searchRef.current?.focus();
    }
    if (isAdding || isEditing) {
      accTypeRef.current.focus();
    }
  
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
        if (isSearching) {
          if (searchedRecords.length > 0 && selectedRowIndex >= 0) {
            const selectedRow = searchedRecords[selectedRowIndex];
            if (selectedRow) {
              handleRecordSelection(selectedRow);
              searchSwitchOff();
            }
          }
        }
      } else if (event.key === 'Escape') {
        searchSwitchOff();
        setFullScreen(false); // setting full screen from escape too
        addSwitchOff();
        editSwitchOff();
        //cleanMessages()
        popupSwitchOff();
      } 
    };
  
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleSubmitKeyPress);  // exception for submit  key
    document.addEventListener('keydown', handleEnterKeyDown);   // exception for navigation on enter
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleSubmitKeyPress); // exception for submit key
      document.removeEventListener('keydown', handleEnterKeyDown);  // exception for navigation on enter
    };
  }, [isSearching, isAdding, isEditing, selectedRowIndex, searchedRecords, fullScreen]);  


  return (
    <div className={`w-full overflow-y-auto h-full flex justify-center`}>
      <div className={`w-[1330px] my-auto`}>

        <div ref={divRef} className={`relative font-bold font-sans pt-2 px-4 my-2 border border-black rounded-md  bg-slate-200`}>

          <div className="w-full flex justify-between">
          {isAdding||isEditing ? (
            <div className="w-1/3 flex space-x-1">
            <button className="py-1 px-3 w-44 bg-red-600 hover:bg-red-500 text-white rounded-md "
            onClick={()=>{addSwitchOff();editSwitchOff();}}
            >Cancel = Escape</button>
            <button className="py-1 px-3 w-44 bg-green-600 hover:bg-green-500 text-white rounded-md "
            ref={saveRef}
            onClick={()=>{handleSubmit(selectedFormRecord);}}
            >Save = Page Down</button>
            </div>)
            :(
              <div className="w-1/3 flex space-x-1">
              <button className={`py-1 px-3 w-20 ${isAdding?"shadow-md shadow-black":""} bg-green-600 hover:bg-green-500 text-white rounded-md `} 
              onClick={addSwitchOn}
              >Add</button>
              <button className={`py-1 px-3 w-20 ${isEditing?"shadow-md shadow-black":""} ${selectedFormRecord.WEBID === 0? disabledButton:'bg-blue-600 hover:bg-blue-500 text-white'}  rounded-md `}
              onClick={editSwitchOn}
              disabled={selectedFormRecord.WEBID === 0?true:false}
              >Edit</button>
              <button className={`${selectedFormRecord.WEBID === 0?disabledButton:(isAdding || isSearching ? disabledButton : 'bg-red-600 hover:bg-red-500 text-white')} py-1 px-3 w-20  rounded-md transition-all duration-200`}
              disabled={selectedFormRecord.WEBID === 0?true:(isAdding || isSearching ? true : false)}
              >Delete</button>
            </div>
            )}

            <div className='w-1/3 text-center text-2xl'>Accounts Details</div>
            
            <div className="w-1/3 flex justify-end space-x-1">
              <button className="py-1 px-3 w-20 bg-neutral-800 text-white rounded-md transition-all duration-200 hover:bg-neutral-600"
                onClick={() => { getAllAccounts('ACCNAME'); searchSwitchOn(); setWhichSearch('ACCNAME'); }}
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
                  {whichSearch === 'ACCNAME' ? <>
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
                          {whichSearch === 'ACCNAME' ? <>
                            <td className="w-6/12 border-r border-black pl-2">{row.ACCNAME}</td>
                            <td className="w-3/12 border-r border-black pl-2">{row.DISTRICT}</td>
                            <td className="w-3/12 pl-2">{row.LOCATION}</td>
                          </> : <>
                            <td className="w-3/12 border-r border-black pl-2">{row.DISTRICT}</td>
                            <td className="w-6/12 border-r border-black pl-2">{row.ACCNAME}</td>
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
          {showHidePopup ? (
              <div className="absolute w-full h-full flex justify-center pr-6 items-center">
                <p className={alertbox ? 'bg-green-500 px-5 py-2 rounded-lg font-bold text-white' : 'bg-red-500 px-5 py-2 rounded-lg font-bold text-white'}>
                  {popupMessage}
                </p>
              </div>
            ) : null}
          {/*--------------------------------------------------------------------------------------------------------------------------*/}
          <div className={`${isSearching ? 'hidden' : 'block'} px-6 py-6 mt-2 bg-white border border-black rounded-md shadow-sm shadow-black`}>
            <div>
              <div className="flex w-full">
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>A/C Type <span className="text-red-600">*</span> :</p></div>
                  <select ref={accTypeRef} onFocus={handleFocus} id={0} name="ACCTYPE" value={selectedFormRecord.ACCTYPE} onChange={handleChange}  
                  disabled={!isAdding && !isEditing} 
                  className={`${accountsInputBox} ${helpId === 0 && accountsInputActive} w-56`}>
                      <option value={selectedFormRecord.ACCTYPE}>{selectedFormRecord.ACCTYPE}</option>
                    {accountType && accountType.map((item) => (
                      <option key={item.value} value={item.value}>{item.option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>State <span className="text-red-600">*</span> :</p></div>
                  <select onFocus={(e)=>{handleFocus(e);getStates();}} id={1} ref={stateRef}
                   value={selectedFormRecord.SID} name="STATE" onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 1 && accountsInputActive} w-56`}>
                    <option value={selectedFormRecord.SID}>{selectedFormRecord.STATE}</option>
                    {states && states.map((row)=>{
                      return <option key={row.SID} value={row.SID} >{row.STATE}</option>
                    })}
                  </select>
                </div>
              </div>

              <div className="flex w-full mt-0">
                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>Station <span className="text-red-600">*</span> :</p></div>
                  <select onFocus={(e) => { handleFocus(e); selectedFormRecord.SID && getStations(selectedFormRecord.SID); }} onBlur={handleStationValidation}
                    ref={stationRef} id={2} value={selectedFormRecord.ZID} name="DISTRICT" onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 2 && accountsInputActive} w-56`}>
                    <option value={selectedFormRecord.ZID}>{selectedFormRecord.DISTRICT}</option>
                    {stations && stations.map((row) => {
                      return <option key={row.ZID} value={row.ZID}>{row.DISTRICT}</option>
                    })}
                  </select>
                </div>

                <div className="flex w-1/2">
                  <div><p className={`${accountLabels}`}>Location :</p></div>
                  <input onFocus={handleFocus} id={3} name="LOCATION" value={selectedFormRecord.LOCATION} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 3 && accountsInputActive} w-56`}></input>
                </div>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="w-1/2">
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>A/c Name <span className="text-red-600">*</span> :</div>
                  <input onFocus={handleFocus} onBlur={()=>{accountNameValidation(selectedFormRecord)}} id={4} ref={accountNameRef} name="ACCNAME" 
                  value={selectedFormRecord.ACCNAME} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 4 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>Mailing Name :</div>
                  <input onFocus={handleFocus} id={5} name="NAME" value={selectedFormRecord.NAME} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 5 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>GSTIN :</div>
                  <input onFocus={handleFocus} id={6} name="CUSTIN" value={selectedFormRecord.CUSTIN} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 6 && accountsInputActive} w-[75%]`}></input>
                </div>
              </div>

              <div className="w-1/2">
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}>Address :</div>
                  <input onFocus={handleFocus} id={7} name="ADDRESS" value={selectedFormRecord.ADDRESS} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 7 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}></div>
                  <input onFocus={handleFocus} id={8} name="CSZ" value={selectedFormRecord.CSZ} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 8 && accountsInputActive} w-[75%]`}></input>
                </div>
                <div className="flex mt-0">
                  <div className={`${accountLabels}`}></div>
                  <input onFocus={handleFocus} id={9} name="CSZ1" value={selectedFormRecord.CSZ1} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 9 && accountsInputActive} w-[75%]`}></input>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>B/H/I/A/C :</div>
                  <input onFocus={handleFocus} id={10} name="BHI" value={selectedFormRecord.BHI} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 10 && accountsInputActive} w-6`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>W/S Status :</div>
                  <input onFocus={handleFocus} id={11} name="YN" value={selectedFormRecord.YN} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 11 && accountsInputActive} w-6`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Date From :</div>
                  <input onFocus={handleFocus} id={12} name="PODATE" type="date" value={selectedFormRecord.PODATE} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 12 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}></div>
                  {/*Empty space here*/}
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Web From :</div>
                  <input onFocus={handleFocus} id={13} name="FDATE" type="date" value={selectedFormRecord.FDATE} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 13 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>To Date :</div>
                  <input onFocus={handleFocus} id={14} name="TDATE" type="date" value={selectedFormRecord.TDATE} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 14 && accountsInputActive} w-56`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Lic. From :</div>
                  <input onFocus={handleFocus} id={15} name="DATE" type="date" value={selectedFormRecord.DATE} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 15 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Lic. To :</div>
                  <input onFocus={handleFocus} id={16} name="LDATE" type="date" value={selectedFormRecord.LDATE} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 16 && accountsInputActive} w-56`} placeholder=""></input>
                </div>
              </div>
            </div>

            <div className="flex w-full mt-6">
              <div className="w-1/2 flex">
                <div className="">
                  <div className="flex">
                    <div className={`${accountLabels}`}>Web Backup :</div>
                    <input onFocus={handleFocus} id={17} name="BACKYN" value={selectedFormRecord.BACKYN} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 17 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${accountLabels}`}>Ewaybill :</div>
                    <input onFocus={handleFocus} id={18} name="EWAYBILL" value={selectedFormRecord.EWAYBILL} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 18 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${accountLabels}`}>Auto GR No. :</div>
                    <input onFocus={handleFocus} id={19} name="AUTOGRNO" value={selectedFormRecord.AUTOGRNO} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 19 && accountsInputActive} w-6`} ></input>
                  </div>
                </div>

                <div className="">
                  <div className="flex">
                    <div className={`${'w-[10.5rem] text-right mr-2'}`}>B/D/A :</div>
                    <input onFocus={handleFocus} id={20} name="BDA" value={selectedFormRecord.BDA} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 20 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'B.off. (Y/N/B) :'}</div>
                    <input onFocus={handleFocus} id={21} name="MBYN" value={selectedFormRecord.MBYN} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 21 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'F.S in Bilty (Y/N) :'}</div>
                    <input onFocus={handleFocus} id={22} name="FSYN" value={selectedFormRecord.FSYN} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 22 && accountsInputActive} w-6`} ></input>
                  </div>
                </div>
              </div>

              <div className="flex w-1/2">
                <div className="">
                  <div className="flex">
                    <div className={`${accountLabels}`}>Multi User :</div>
                    <input onFocus={handleFocus} id={23} name="MULTIUSER" value={selectedFormRecord.MULTIUSER} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 23 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${accountLabels}`}>Print Developer :</div>
                    <input onFocus={handleFocus} id={24} name="DEVPRINT" value={selectedFormRecord.DEVPRINT} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 24 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${accountLabels}`}>Manual Ch. No. :</div>
                    <input onFocus={handleFocus} id={25} name="MBCHNO" value={selectedFormRecord.MBCHNO} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 25 && accountsInputActive} w-6`} ></input>
                  </div>
                </div>

                <div className="">
                  <div className="flex">
                    <div className={`${'w-[10.5rem] text-right mr-2'}`}>Multi Item :</div>
                    <input onFocus={handleFocus} id={26} name="MITEMYN" value={selectedFormRecord.MITEMYN} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 26 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${'w-[10.5rem] text-right mr-2'}`}>Full Truck Load :</div>
                    <input onFocus={handleFocus} id={27} name="FTLYN" value={selectedFormRecord.FTLYN} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 27 && accountsInputActive} w-6`} ></input>
                  </div>
                  <div className="flex">
                    <div className={`${'w-[10.5rem] text-right mr-2'}`}>{'Ewaybill Api (Y/N):'}</div>
                    <input onFocus={handleFocus} id={28} name="EWBAPI" value={selectedFormRecord.EWBAPI} onChange={handleChange} disabled={!isAdding && !isEditing}
                    className={`${accountsInputBox} ${helpId === 28 && accountsInputActive} w-6`} ></input>
                  </div>
                </div>
              </div>
            </div>


            <div className="mt-6">
              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Contact Person :</div>
                  <input onFocus={handleFocus} id={29} name="PERSON" value={selectedFormRecord.PERSON} onChange={handleChange} disabled={!isAdding && !isEditing}
                   className={`${accountsInputBox} ${helpId === 29 && accountsInputActive} w-56`} ></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Office Ph. :</div>
                  <input onFocus={handleFocus} id={30} name="PHOFF" value={selectedFormRecord.PHOFF} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 30 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Resi. :</div>
                  <input onFocus={handleFocus} id={31} name="PHRES" value={selectedFormRecord.PHRES} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 31 && accountsInputActive}`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Mobile No. :</div>
                  <input onFocus={handleFocus} id={32} name="MOBILENO" value={selectedFormRecord.MOBILENO} onChange={handleChange} disabled={!isAdding && !isEditing} 
                  className={`${accountsInputBox} ${helpId === 32 && accountsInputActive} w-56`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Fax No. :</div>
                  <input onFocus={handleFocus} id={33} name="FAXNO" value={selectedFormRecord.FAXNO} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 33 && accountsInputActive}`}></input>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Email :</div>
                  <input onFocus={handleFocus} id={34} name="EMAILID" value={selectedFormRecord.EMAILID} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 34 && accountsInputActive} w-[75%]`} ></input>
                </div>
                <div className="flex w-1/2 mt-0">
                  <div className={`${accountLabels}`}>Domain :</div>
                  <input onFocus={handleFocus} id={35} name="DOMAIN" value={selectedFormRecord.DOMAIN} onChange={handleChange} disabled={!isAdding && !isEditing}
                  className={`${accountsInputBox} ${helpId === 35 && accountsInputActive} w-[75%]`} ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full border rounded-md border-black my-1 shadow-sm shadow-black">
            <div 
            className={`${isAdding?'bg-green-600 text-white':(isEditing?"bg-blue-600 text-white":'bg-stone-400')} w-[15%] text-center border-r rounded-l-md border-black py-1 `}
            >
              {isAdding?'ADDING':(isEditing?"EDITING":'HELP')}</div>
            <div className="w-[70%] px-4 py-1 bg-amber-300">{helpId===null?'Information for respective fields will be displayed on Adding or Editing.':helpMsg}</div>
            <button onClick={toggleFullScreen} className="py-1 w-[15%] bg-neutral-800 text-white rounded-r-md transition-all duration-200 hover:bg-neutral-600">Full Screen</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Accounts;