import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'

const States = () => {

  const [state,setState]=useState() // main state data coming in state
  const [searchedStates, setSearchedStates] = useState([]) // searched states will come inside here to render states in search table
  const [searchedValue,setSearchedValue] = useState('') // used this state variable to store searched value from table inputbox and to send value to backend
 
  const [sid, setSid] = useState()  // we receive sid from db data here
  const [isNewState, setIsNewState] = useState(false) // used as switch of add and then further conditions of textbox
  const [isEditing, setIsEditing]= useState(false) // used as switch of edit and then further conditions of textbox
  const [isSerching, setIsSearching]= useState(false)// used as switch for displaying search table

  const [selectedRowIndex, setSelectedRowIndex] = useState(0); // used for navigating inside table

  const [newStateName, setNewStateName] = useState('') // used for storing and displaying value of new state we typing and adding ---- with out using this typing not possible
  const [newShortName, setNewShortName] = useState('') // used for stroing and displaying value of new sname we typing and adding ---- with out using this typing not possible
  const [editStateName, setEditStateName] = useState() // used for editing the state name and storing the new edited value also displaying ---- with out using this typing not possible
  const [editShortName, setEditShortName] = useState() // used for editing the short name and storing the new edited value also displaying ---- with out using this typing not possible

  const [displayMessageState, setDisplayMessageState]=useState("") // to display State check messages
  const [displayMessageSname, setDisplayMessageSname]=useState("") // to display Sname check messages
  const [addEditStateAllowed, setAddEditStateAllowed] = useState(null) // to allow newstate to be add or not
  const [addEditSnameAllowed, setAddEditnameAllowed] = useState(null) // to allow newsname to be add or not
  const [popupMessage, setPopupMessage] = useState("") // to update popup message 
  const [showHidePopup, setShowHidePopup] = useState(false) // to show or hide popup

  const [alertbox,setAlertbox] = useState() // to set color of alertbox on true or false condition
  
  const inputRef = useRef(null)
  const searchRef = useRef(null)
  const saveRef = useRef(null)
  //console.log("selected row index "+selectedRowIndex);
  //console.log("Searchedstate length "+searchedStates.length)
    console.log(sid)
    console.log(newStateName)
    console.log(popupMessage)

 //---------------------------Hooks end--------------------------------

 //---------------------------Fetch Functions---------------------------
  const getState = async ()=>{
      const response = await axios.get(`http://localhost:5000/allstate`)
       setSearchedStates(response.data)
  }

  const getSearchedStates =async (value)=>{
        const response = await axios.get(`http://localhost:5000/state/searchState/${value}`) 
        setSearchedStates(response.data)
  }
 //---------------------------Fetch Functions---------------------------

 //--------------------------Add and Edit handling----------------------------
 const handleAddStateCheck = async (col)=>{
      const response = await axios.post(`http://localhost:5000/state/addEdit/check`,{localSid:0,name:newStateName,sname:newShortName,typeOf:col})
      //console.log(response.data)
      if (col==="state") {
        response.data.msg && setDisplayMessageState(response.data.msg)
        setAddEditStateAllowed(response.data.allowed)
      } else if (col==="scode") {
        response.data.msg && setDisplayMessageSname(response.data.msg)
        setAddEditnameAllowed(response.data.allowed)
        if(addEditStateAllowed && addEditSnameAllowed)saveRef.current.focus(); // to redirect to save button on loosing focus from scode field
      }    
 }
 const handleEditStateCheck = async (col)=>{
      const response = await axios.post(`http://localhost:5000/state/addEdit/check`,{localSid:sid,name:editStateName,sname:editShortName,typeOf:col,edit:true})
      //console.log(response.data)
      if (col==="state") {
        response.data.msg && setDisplayMessageState(response.data.msg)
        setAddEditStateAllowed(response.data.allowed)
      } else if (col==="scode") {
        response.data.msg && setDisplayMessageSname(response.data.msg)
        setAddEditnameAllowed(response.data.allowed)
        if(addEditStateAllowed && addEditSnameAllowed)saveRef.current.focus(); // to redirect to save button on loosing focus from scode field
      }
 }
 const cleanMessages = ()=>{
    setDisplayMessageState('')
    setDisplayMessageSname('')
 }

 const handleSaveOnAdd = async ()=>{
  
    const response = await axios.post(`http://localhost:5000/state/add/save`,{state:newStateName,sname:newShortName})
    setPopupMessage(response.data.msg)
    addStateSwitchOff()
    await response.data.alert?setAlertbox(true) : setAlertbox(false)  // setting alertbox status true or false so that i can change colors.
    handlePopup()
 }

 const handleSaveOnEdit = async () =>{
  const response = await axios.post(`http://localhost:5000/state/edit/save`,{state:editStateName,sname:editShortName,sid:sid})
  setPopupMessage(response.data.msg);
  editStateSwitchOff();
  await response.data.alert?setAlertbox(true) : setAlertbox(false)  // setting alertbox status true or false so that i can change colors.
  handlePopup();
 }
 //--------------------------Add and Edit handling----------------------------

  //--------------------------------Search Handling Functions----------------------
  const handleSearch = (e) => {
    setSearchedValue(e.target.value.toUpperCase())
    searchedValue !==''? getSearchedStates(searchedValue):getState()  // if is there any searched value by typing then getSearchedStates() otherwise getstate()
    setSelectedRowIndex(0); // setting focused row again first one
  }

  const handleRecordSelection = (row,index)=>{
    setSelectedRowIndex(index) // this is when i click once this handleRecordSelection gets executed so that even on click i get blue highlighted row
    setState(row) 
    setSid(row.SID)
    console.log('SID '+row.SID)
    console.log('Name '+row.STATE)
  }
  //--------------------------------Search Handling Functions----------------------

  //--------------------------------Switchs functions----------------------------------
  const addStateSwitchOn = ()=>{
      setIsNewState(true);
      editStateSwitchOff();
      searchSwitchOff();
      inputRef.current.focus();
  }
  const addStateSwitchOff = ()=>{
    setIsNewState(false);
    setNewStateName("")
    setNewShortName("")
    cleanMessages();
  }

  const editStateSwitchOn = ()=>{
       setIsEditing(true)
       addStateSwitchOff();
       searchSwitchOff();
       setEditStateName(state.STATE)
       setEditShortName(state.SNAME)
       inputRef.current.focus();
  }
  const editStateSwitchOff = ()=>{
       setIsEditing(false)
       cleanMessages();
  }

  const searchSwitchOn = ()=>{
        setIsSearching(true);
        setSearchedValue('')             // to clear searched value
        addStateSwitchOff();
        editStateSwitchOff()
        setSelectedRowIndex(0)
  }
  const searchSwitchOff = ()=>{
        setIsSearching(false)
        cleanMessages();
  }

  const popupSwitchOn = ()=>{
        setShowHidePopup(true)
  }
  const popupSwitchOff = ()=>{
        setShowHidePopup(false)
  }
  const handlePopup = ()=>{
          popupSwitchOn()
        setTimeout(()=>{
          popupSwitchOff()
        },3000)
  }
  //--------------------------------Switchs functions----------------------------------


  //--------------------------------Delete functions------------------------------
  const handleDelete = async (id)=>{
    const delID = id
    setState(); // setting this so that on click on delete that row gets removed from there and user have to select new row
    const response = await axios.delete(`http://localhost:5000/state/delete/${delID}`)
    setPopupMessage(response.data.msg)
    await response.data.alert?setAlertbox(true) : setAlertbox(false)  // setting alertbox status true or false so that i can change colors.
    handlePopup()
    }
  //--------------------------------Delete functions Ends-------------------------


  useEffect(()=>{
    
     if (isSerching) {
      searchRef.current?.focus();
  };

     const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setSelectedRowIndex((prevIndex) => {
          return prevIndex > 0 ? prevIndex - 1 : 0;
        });
      } else if (event.key === 'ArrowDown') {
        setSelectedRowIndex((prevIndex) => {
          return prevIndex < searchedStates.length - 1 ? prevIndex + 1 : searchedStates.length - 1;
        });
      } else if(event.key === 'Enter'){
        if (searchedStates.length > 0 && selectedRowIndex >= 0) {
          const selectedRow = searchedStates[selectedRowIndex];
          if (selectedRow) {
              handleRecordSelection(selectedRow);
              searchSwitchOff()
          }
      }
      } else if (event.key === 'Escape') {
         searchSwitchOff()
         addStateSwitchOff()
         editStateSwitchOff()
         cleanMessages()
         popupSwitchOff()
      }
  };
     document.addEventListener('keydown',handleKeyDown)
     return ()=> {
      document.removeEventListener('keydown',handleKeyDown)
     }
  },[searchedStates.length,selectedRowIndex,searchedStates])

  return (
    <div className="w-full flex justify-center">
      <div className="w-[700px] ">
        <div className="my-4 text-2xl font-bold text-center">
          States details
        </div>

        <div className="py-4 px-8 border border-black rounded-md shadow-md shadow-black bg-slate-200">

          <div className="mt-4  font-bold flex justify-between">

            <div className="col-span-1 flex  space-x-1">
              <button onClick={()=>{addStateSwitchOn()}} 
              className={`py-1 px-3 w-20 bg-green-600 text-white rounded-md transition-all duration-200 hover:bg-green-500 ${isNewState?"shadow-md shadow-black":""}`}>
                Add+
              </button>
              <button onClick={()=>editStateSwitchOn()} 
              className={`py-1 px-3 w-20 rounded-md transition-all duration-200 ${isEditing?"shadow-md shadow-black":""} ${!state?'bg-gray-400 border-none text-gray-200 cursor-not-allowed pointer-events-none':'bg-blue-600 text-white hover:bg-blue-500'}`}>
                Edit
              </button>
              <button onClick={()=>{getState();searchSwitchOn();}} 
              className={`py-1 px-3 w-20 rounded-md bg-yellow-500 hover:bg-yellow-400 text-white transition-all duration-200 ${isSerching?'shadow-md shadow-black':''}`}>
                Search
              </button>
            </div>
            <div className="justify-end flex">
              <button 
              onClick={()=>{handleDelete(sid)}} 
              className={`${isSerching || isNewState || isEditing || !state?'bg-gray-400 border-none text-gray-200 cursor-not-allowed pointer-events-none':'bg-red-600 hover:bg-red-500 text-white'} py-1 px-3 w-20 rounded-md`} >
                Delete
              </button>
            </div>

          </div>

          {/*------------------------------Table Search-----------------------------------*/}
          <div className={`${isSerching ? 'block' : 'hidden'} w-[30rem] mx-auto rounded-md mt-8 h-[19rem] border-l-2 border-r-2 border-black `}>

            <div className="h-full flex flex-col justify-between">

              <div className="w-full">
                <div className="flex border-b font-bold py-1 border-black bg-slate-700 text-white rounded-t-md">
                  <div className="w-2/3 pl-2 ">State Name</div>
                  <div className="w-1/3 ">State Code</div>
                </div>
                <div className="overflow-y-scroll h-[14.3rem] bg-white">
                  <table className="w-full">
                    <tbody>
                      {searchedStates && searchedStates.map((row, index) => (
                        <tr key={row.SID} 
                        className={`${selectedRowIndex===index?'bg-blue-600 text-white':''} border-b font-bold hover:cursor-pointer hover:shadow-md`}
                        onClick={()=>{handleRecordSelection(row,index)}}
                        onDoubleClick={()=>{searchSwitchOff()}}
                        >
                          <td className="w-2/3 border-r border-black pl-2">{row.STATE}</td>
                          <td className="w-1/3 pl-2">{row.SNAME}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="py-1 border-t border-black bg-slate-700 rounded-b-md text-white">

                <div className="w-full flex justify-between px-4">
                  <div className="flex space-x-2">
                  <div className="py-1 font-semibold"><p>Enter Name:</p></div>
                  <input
                    ref={searchRef}
                    placeholder="Search by state...."
                    className="border border-black rounded-sm px-2 text-black" type="text"
                    value={searchedValue}
                    onChange={handleSearch}
                  ></input>   
                  </div>             
                   <button onClick={()=>{searchSwitchOff()}} className="bg-red-600 hover:bg-red-500 rounded-md w-20 px-2 py-[2px] font-semibold">Cancel</button>

                </div>

              </div>
            </div>

          </div>
            {/*------------------------------Table Search ends-----------------------------------*/}

          <div className={`${isSerching?'hidden':'block'} relative mt-4 px-4 py-4 shadow-sm shadow-black w-full border border-black bg-white rounded-md`}>
            
            {showHidePopup ? (
              <div className="absolute w-full h-full flex justify-center pr-6 items-center">
                <p className={alertbox ? 'bg-green-400 px-5 py-2 rounded-lg font-semibold' : 'bg-red-400 px-5 py-2 rounded-lg font-semibold'}>
                  {popupMessage}
                </p>
              </div>
            ) : null}

            <div className="w-full">
              <div className="w-1/5 inline-block">
                <div className="font-semibold ">State Name :</div>
              </div>
              <div className="w-2/4 inline-block">
                <input
                  type="text"
                  ref={inputRef}
                  className="block border border-black rounded-sm px-2  w-full"
                  value={isNewState ? newStateName : (isEditing ? editStateName : (state ? state.STATE:''))}
                  readOnly={!isNewState && !isEditing}
                  onChange={(e) => isNewState ? setNewStateName(e.target.value.toUpperCase()) : (isEditing ? setEditStateName(e.target.value.toUpperCase()) : null)}
                  onBlur={isNewState && (newStateName !== '') ? () => { handleAddStateCheck("state") } : (isEditing ? () => { handleEditStateCheck("state") } : null)}
                ></input>
              </div>
              <div className="inline-block">
                <div className={`${addEditStateAllowed?'text-green-600 pl-2 text-sm':'text-red-600 pl-2 text-sm'}`}>{displayMessageState}</div>
              </div>
            </div>

            <div className="w-full my-2">
              <div className="w-1/5 inline-block">
                <div className="font-semibold ">State Code :</div>
              </div>
              <div className="w-2/4 inline-block">
              <input
                type="text"
                className="block border border-black rounded-sm px-2  w-full"
                value={isNewState ? newShortName : (isEditing ? editShortName : (state ? state.SNAME:''))}
                readOnly={!isNewState && !isEditing}
                onChange={(e)=>isNewState?setNewShortName(e.target.value.toUpperCase()):(isEditing?setEditShortName(e.target.value.toUpperCase()):null)}
                onBlur={isNewState && (newShortName !== '')?()=>{handleAddStateCheck("scode")}:(isEditing?()=>{handleEditStateCheck("scode")}:null)}
              ></input>
              </div>
              <div className="inline-block">
                <div className={`${addEditSnameAllowed?'text-green-600 pl-2 text-sm':'text-red-600 pl-2 text-sm'}`}>{displayMessageSname}</div>
              </div>
            </div>

            {isNewState || isEditing?(<div className="w-full">

              <div className="w-1/5 inline-block"></div>

              <div className="w-2/4 inline-block">

                <button 
                  onClick={()=>{addStateSwitchOff(); editStateSwitchOff(); cleanMessages();}} 
                  className="py-[0.15rem] mr-1 w-16 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md">Cancel
                </button>

                <button
                  ref={saveRef}
                  onClick={isNewState ? () => { handleSaveOnAdd() } : () => { handleSaveOnEdit() }}
                  className={`${( isNewState ?  
                    (addEditStateAllowed ? ((newStateName === '' || newShortName === '') ? false : true) : false) 
                  : (addEditSnameAllowed ? ((editStateName === '' || editShortName === '') ? false : true) : false)
                  ) ? 'text-white bg-green-600 hover:bg-green-500 ' : 'bg-gray-400 border-none text-gray-200 cursor-not-allowed pointer-events-none'} py-[0.15rem] w-16 font-semibold rounded-md`}>
                  Save
                </button>
              </div>

            </div>):null}
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default States;
