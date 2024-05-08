import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'

const States = () => {

  const [state,setState]=useState()
  const [stateCount, setStateCount]=useState()
  const [stateID, setStateID] = useState(1)
  const [SID, setSID] = useState()
  const [isNewState, setIsNewState] = useState(false)
  const [newStateName, SetNewStateName] = useState('')
  const [newShortName, setNewShortName] = useState('')

  const inputRef = useRef(null)
 
  const getState = async (id)=>{
      const response = await axios.get(`http://localhost:5000/state/${id}`)
      //console.log(response.data)
      setState(response.data.state[0])
      setSID(response.data.state[0].SID)
      setStateCount(response.data.count[0].record_count)
  }

  const addStateSwitchOn = ()=>{
      setIsNewState(true);
      inputRef.current.focus();
  }

  const addStateSwitchOff = ()=>{
    setIsNewState(false);
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
              <button onClick={()=>{addStateSwitchOn()}} className="py-1 px-3 border border-black rounded-md">
                Add
              </button>
              <button className="py-1 px-3 border border-black rounded-md">
                Edit
              </button>
              <button className="py-1 px-3 border border-black rounded-md">
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

          <div className="mt-8 px-20 py-6 border border-black rounded-md grid grid-cols-8">
            <div className="col-span-2 flex flex-col justify-center">
              <div className="font-semibold mb-2">State Name :</div>
              <div className="font-semibold mb-6">State Name :</div>
              {isNewState?(<button onClick={()=>{addStateSwitchOff()}} className="py-[2px] w-16 border border-black rounded-md">Back</button>):(
                <div className="font-semibold">Record :</div>
              )}
            </div>
            <div className="col-span-3 flex flex-col justify-center">
              <input
                type="text"
                ref={inputRef}
                className="block border border-black rounded-sm px-2 mb-2 w-full"
                value={isNewState?newStateName:(!state ? "" : state.STATE)}
                readOnly={!isNewState}
                onChange={(e)=> isNewState && SetNewStateName(e.target.value)}
              ></input>
              <input
                type="text"
                className="block border border-black rounded-sm px-2 mb-6 w-full"
                value={isNewState?newShortName:(!state ? "" : state.SNAME)}
                readOnly={!isNewState}
                onChange={(e)=>isNewState && setNewShortName(e.target.value)}
              ></input>
              { isNewState ? (<button className="py-[2px] w-16 border border-black rounded-md">Save</button>) : (
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
