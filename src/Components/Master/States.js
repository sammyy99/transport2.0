import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'

const States = () => {

  const [state,setState]=useState() // main state data coming in state
  const [searchedStates, setSearchedStates] = useState() // searched states will come inside here to render states in search table
  const [searchedValue,setSearchedValue] = useState('') // used this state variable to store searched value from table inputbox and to send value to backend
  const [stateCount, setStateCount]=useState() // this count is actually total count getting from db records 
  const [stateID, setStateID] = useState(1) // state id for managing record column only 
  const [sid, setSid] = useState()  // we receive sid from db data here
  const [isNewState, setIsNewState] = useState(false) // used as switch of add and then further conditions of textbox
  const [isEditing, setIsEditing]= useState(false) // used as switch of edit and then further conditions of textbox
  const [isSerching, setIsSearching]= useState(false)// used as switch for displaying search table
  const [newStateName, setNewStateName] = useState('') // used for storing and displaying value of new state we typing and adding ---- with out using this typing not possible
  const [newShortName, setNewShortName] = useState('') // used for stroing and displaying value of new sname we typing and adding ---- with out using this typing not possible
  const [editStateName, setEditStateName] = useState() // used for editing the state name and storing the new edited value also displaying ---- with out using this typing not possible
  const [editShortName, setEditShortName] = useState() // used for editing the short name and storing the new edited value also displaying ---- with out using this typing not possible

  const inputRef = useRef(null)
  const searchRef = useRef(null)

 //---------------------------Hooks end--------------------------------

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

  const addStateSwitchOn = ()=>{
      setIsNewState(true);
      inputRef.current.focus();
  }
  const addStateSwitchOff = ()=>{
    setIsNewState(false);
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
        searchRef.current.focus();
  }
  const searchSwitchOff = ()=>{
        setIsSearching(false)
  }

  const checkAddEdit =async ()=>{
    setSid(0)
    try {
    const response = await axios.post('http://localhost:5000/addstate/check',{name:newStateName, id:sid})
    console.log(response)      
    } catch (error) {
      console.log('Error in adding : '+error)
    }
  }

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

  useEffect(()=>{
     getState(stateID)
  },[stateID])

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1110px] ">
        <div className="my-4 text-2xl font-bold text-center">
          States details
        </div>

        <div className="py-4 px-8 border border-black rounded-md">
          <div className="grid grid-cols-3 mt-8 ">
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
              <button className="py-1 px-3 border border-black rounded-md">
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
                <div className="overflow-y-scroll h-[13.5rem]">
                  <table className="w-full">
                    <tbody>
                      {searchedStates && searchedStates.map((row, index) => (
                        <tr key={row.SID} className="border-b">
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
                    onChange={(e) => {
                      const enteredValue = e.target.value.toUpperCase();
                      setSearchedValue(enteredValue)
                      enteredValue && getSearchedStates(enteredValue)
                    }}
                  ></input>
                </div>

                <div className="w-full mt-2">
                  
                  <div className="flex space-x-4 justify-center">
                    <button className="border border-black rounded-md px-2 py-[2px]">Select</button>
                    <button onClick={()=>{searchSwitchOff()}} className="border border-black rounded-md px-2 py-[2px]">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
            {/*------------------------------Table Search ends-----------------------------------*/}

          <div className={`${isSerching?'hidden':'block'} mt-8 px-20 py-6 border border-black rounded-md grid grid-cols-8`}>

            <div className="col-span-2 flex flex-col justify-center">
              <div className="font-semibold mb-2">State Name :</div>
              <div className="font-semibold mb-6">State Name :</div>
              {isNewState||isEditing?(<button onClick={()=>{addStateSwitchOff(); editStateSwitchOff();}} className="py-[2px] w-16 border border-black rounded-md">Back</button>):(
                <div className="font-semibold">Record :</div>
              )}
            </div>
            <div className="col-span-3 flex flex-col justify-center">
              <input
                type="text"
                ref={inputRef}
                className="block border border-black rounded-sm px-2 mb-2 w-full"
                value={isNewState?newStateName:(isEditing?editStateName:(!state ? "" : state.STATE))}
                readOnly={!isNewState && !isEditing}
                onChange={(e)=> isNewState?setNewStateName(e.target.value):(isEditing?setEditStateName(e.target.value):null)}
                onBlur={()=>checkAddEdit()}
              ></input>
              <input
                type="text"
                className="block border border-black rounded-sm px-2 mb-6 w-full"
                value={isNewState?newShortName:(isEditing?editShortName:(!state ? "" : state.SNAME))}
                readOnly={!isNewState && !isEditing}
                onChange={(e)=>isNewState?setNewShortName(e.target.value):(isEditing?setEditShortName(e.target.value):null)}
                onBlur={()=>checkAddEdit()}
              ></input>
              { isNewState || isEditing? (<button className="py-[2px] w-16 border border-black rounded-md">Save</button>) : (
                <div className="font-semibold border px-2 border-black w-1/4">
                {stateID}/{stateCount}
              </div>)}
            </div>
            
          </div>


        </div>
      </div>
    </div>
  );
};

export default States;
