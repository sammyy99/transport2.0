import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'

const States = () => {

  const [state,setState]=useState() // main state data coming in state
  const [searchedStates, setSearchedStates] = useState([]) // searched states will come inside here to render states in search table
  const [searchedValue,setSearchedValue] = useState('') // used this state variable to store searched value from table inputbox and to send value to backend
  const [stateCount, setStateCount]=useState() // this count is actually total count getting from db records 
  const [stateID, setStateID] = useState(1) // state id for managing record column only 
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
  const [addStateAllowed, setAddStateAllowed] = useState(null) // to allow newstate to be add or not
  const [addSnameAllowed, setAddnameAllowed] = useState(null) // to allow newsname to be add or not
  
  const inputRef = useRef(null)
  const searchRef = useRef(null)
  //console.log("selected row index "+selectedRowIndex);
  //console.log("Searchedstate length "+searchedStates.length)
    console.log(sid)
    console.log(newStateName)

 //---------------------------Hooks end--------------------------------

 //---------------------------Fetch Functions---------------------------
  const getState = async (id)=>{
      const response = await axios.get(`http://localhost:5000/state/${id}`)
      //console.log(response.data)
      setState(response.data.state[0])
      setSid(response.data.state[0].SID)
      setStateCount(response.data.count[0].record_count)
  }

  const getSearchedStates =async (value)=>{
        const response = await axios.get(`http://localhost:5000/state/searchState/${value}`) 
        setSearchedStates(response.data)
  }
 //---------------------------Fetch Functions---------------------------

 //--------------------------Add and Edit handling----------------------------
 const handleAddStateCheck = async (col)=>{
      const response = await axios.post(`http://localhost:5000/state/addEdit/check`,{localSid:0,name:newStateName,sname:newShortName,typeOf:col})
      console.log(response.data)
      response.data.msg && setDisplayMessageState(response.data.msg)
      response.data.msg && setDisplayMessageSname(response.data.msg)
 }
 const handleEditStateCheck = async (col)=>{
      const response = await axios.post(`http://localhost:5000/state/addEdit/check`,{localSid:sid,name:editStateName,sname:editShortName,typeOf:col,edit:true})
      console.log(response.data)
      response.data.msg && setDisplayMessageState(response.data.msg)
      response.data.msg && setDisplayMessageSname(response.data.msg)
 }
 //--------------------------Add and Edit handling----------------------------

  //--------------------------------Search Handling Functions----------------------
  const handleSearch = (e) => {
    const enteredValue = e.target.value.toUpperCase();
    setSearchedValue(enteredValue)
    enteredValue && getSearchedStates(enteredValue)
    setSelectedRowIndex(0); // setting focused row again first one
  }

  const handleRecordSelection = (row,index)=>{
    setSelectedRowIndex(index) // this is when i click once this handleRecordSelection gets executed so that even on click i get blue highlighted row
    setStateID(row.SID)
    setSid(row.SID)
    console.log('SID '+row.SID)
    console.log('Name '+row.STATE)
  }
  //--------------------------------Search Handling Functions----------------------

  //--------------------------------Switchs functions----------------------------------
  const addStateSwitchOn = ()=>{
      setIsNewState(true);
      inputRef.current.focus();
  }
  const addStateSwitchOff = ()=>{
    setIsNewState(false);
    setNewStateName("")
    setNewShortName("")
  }

  const editStateSwitchOn = ()=>{
       setIsEditing(true)
       setEditStateName(state.STATE)
       setEditShortName(state.SNAME)
  }
  const editStateSwitchOff = ()=>{
       setIsEditing(false)
  }

  const searchSwitchOn = ()=>{
        setIsSearching(true);
        setSearchedValue("")
        setSelectedRowIndex(0)
  }
  const searchSwitchOff = ()=>{
        setIsSearching(false)
  }
  //--------------------------------Switchs functions----------------------------------


  //--------------------------------Arrows buttons functions----------------------------------
  const nextState = ()=>{
    if (stateID<=stateCount-1) {  
      setStateID(stateID+1)
    } else {   
    }       
  }

  const previousState = ()=>{
    if (stateID>=2) {
      setStateID(stateID-1)
    } else {   
    }       
  }

  const lastState=()=>{
    setStateID(stateCount);
  }

  const firstState=()=>{
    setStateID(1)
  }
  //--------------------------------Arrows buttons functions Ends------------------------------

  //--------------------------------Delete functions------------------------------
  const handleDelete = async (id)=>{
    const response = await axios.delete(`http://localhost:5000/state/delete/${id}`)
    console.log(response.data)
    }
  //--------------------------------Delete functions Ends-------------------------


  useEffect(()=>{
    
      getState(stateID);

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
      }
  };
     document.addEventListener('keydown',handleKeyDown)
     return ()=> {
      document.removeEventListener('keydown',handleKeyDown)
     }
  },[stateID,searchedStates.length,selectedRowIndex,searchedStates,isSerching])

  return (
    <div className="w-full flex justify-center">
      <div className="w-[700px] ">
        <div className="my-4 text-2xl font-bold text-center">
          States details
        </div>

        <div className="py-4 px-8 border border-black rounded-md shadow-md shadow-black">
          <div className="grid grid-cols-3 mt-8  font-semibold ">
            <div className="col-span-1 flex  space-x-1">
              <button onClick={()=>{addStateSwitchOn()}} className={`py-1 px-3 border border-black rounded-md ${isNewState?"bg-gray-300":""}`}>
                Add
              </button>
              <button onClick={()=>editStateSwitchOn()} className={`py-1 px-3 border border-black rounded-md ${isEditing?"bg-gray-300":""}`}>
                Edit
              </button>
              <button onClick={()=>{searchSwitchOn()}} className="py-1 px-3 border border-black rounded-md">
                Search
              </button>
            </div>
            <div className="col-span-1 flex justify-center space-x-1">
              <button
                onClick={() => {
                  firstState();
                }}
                className=" border border-black rounded-md w-8 p-1"
              >
                <img alt="" src="/start.svg"></img>
              </button>
              <button
                onClick={() => {
                  previousState();
                }}
                className=" border border-black rounded-md w-8 p-1"
              >
                <img alt="" src="/previous.svg"></img>
              </button>
              <button
                onClick={() => {
                  nextState();
                }}
                className=" border border-black rounded-md w-8 p-1"
              >
                <img alt="" src="/next.svg"></img>
              </button>
              <button
                onClick={() => {
                  lastState();
                }}
                className=" border border-black rounded-md w-8 p-1"
              >
                <img alt="" src="/end.svg"></img>
              </button>
            </div>
            <div className="col-span-1 justify-end flex">
              <button 
              onClick={()=>{handleDelete(sid)}} 
              className="py-1 px-3  rounded-md border border-black ">
                Delete
              </button>
            </div>
          </div>

          {/*------------------------------Table Search-----------------------------------*/}
          <div className={`${isSerching ? 'block' : 'hidden'} w-[30rem] mx-auto rounded-md mt-8 h-80 border border-black`}>

            <div className="h-full flex flex-col justify-between">

              <div className="w-full">
                <div className="flex border-b font-bold border-black">
                  <div className="w-2/3 pl-2 ">State Name</div>
                  <div className="w-1/3 ">State Code</div>
                </div>
                <div className="overflow-y-scroll h-[15.8rem]">
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

              <div className="py-1 border-t border-black">

                <div className="w-full flex space-x-2 justify-center">

                  <div className="py-1 font-semibold"><p>Enter Name:</p></div>
                  <input
                    ref={searchRef}
                    placeholder="Search by state...."
                    className="border border-black rounded-sm py-[2px] px-2" type="text"
                    value={searchedValue}
                    onChange={handleSearch}
                  ></input>                
                   <button onClick={()=>{searchSwitchOff()}} className="border border-black rounded-md px-2 py-[2px]">Cancel</button>

                </div>

              </div>
            </div>

          </div>
            {/*------------------------------Table Search ends-----------------------------------*/}

          <div className={`${isSerching?'hidden':'block'} mt-8 px-20 py-6 border border-black rounded-md grid grid-cols-8`}>

            <div className="col-span-2 flex flex-col justify-center">
              <div className="font-semibold mb-2">State Name :</div>
              <div className="font-semibold mb-6">State Name :</div>
              {isNewState||isEditing?(<button onClick={()=>{addStateSwitchOff(); editStateSwitchOff();}} className="py-[2px] w-16 border border-black rounded-md">Cancel</button>):(
                /*<div className="font-semibold">Record :</div>*/null
              )}
            </div>
            <div className="col-span-5 flex flex-col justify-center">
              <input
                type="text"
                ref={inputRef}
                className="block border border-black rounded-sm px-2 mb-2 w-full"
                value={isNewState?newStateName:(isEditing?editStateName:(!state ? "" : state.STATE))}
                readOnly={!isNewState && !isEditing}
                onChange={(e)=> isNewState?setNewStateName(e.target.value.toUpperCase()):(isEditing?setEditStateName(e.target.value.toUpperCase()):null)}
                onBlur={isNewState && (newStateName !== '')?()=>{handleAddStateCheck("state")}:(isEditing?()=>{handleEditStateCheck("state")}:null)}
              ></input>
              <input
                type="text"
                className="block border border-black rounded-sm px-2 mb-6 w-full"
                value={isNewState?newShortName:(isEditing?editShortName:(!state ? "" : state.SNAME))}
                readOnly={!isNewState && !isEditing}
                onChange={(e)=>isNewState?setNewShortName(e.target.value.toUpperCase()):(isEditing?setEditShortName(e.target.value.toUpperCase()):null)}
                onBlur={isNewState && (newShortName !== '')?()=>{handleAddStateCheck("scode")}:(isEditing?()=>{handleEditStateCheck("scode")}:null)}
              ></input>
              { isNewState || isEditing? (<button className="py-[2px] mb-[0.32rem] w-16 border border-black rounded-md">Save</button>) : (
                /*<div className="font-semibold border px-2 border-black w-1/4">
                {stateID}/{stateCount}
              </div>*/null)}
            </div>
            
          </div>


        </div>
      </div>
    </div>
  );
};

export default States;
