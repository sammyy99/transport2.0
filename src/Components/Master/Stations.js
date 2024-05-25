import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const Stations = () => {

  const [states, setStates] = useState();  // Getting all states along with SID 
  const [sid, setSid] = useState();  // will update the selected SID from dropbox here

  const [stateStations, setStateStations] = useState(); // Getting all states according to state
  const [zid, setZid] = useState(); // will update the ZID of selected distirct here

  const [isAdding, setIsAdding] = useState(false) // used as switch of add 
  const [isEditing, setIsEditing]= useState(false) // used as switch of edit 
  const [isSerching, setIsSearching]= useState(false)// used as switch for search

  const [newStation, setNewStation] = useState('') // updating value of entered new state here
  const [editStation, setEditStation] = useState('') // updating value of entered new state here

  const [selectedRowIndex, setSelectedRowIndex] = useState(0) // will be used for table record navigation
  const [searchedValue, setSearchedValue] = useState('')  // Will be used to store the value entered in search box
  const [searchedStations, setSearchedStations] = useState([])// searched District will be stored in this

  const [selectedStationRecord, setSelectedStationRecord] = useState() // selected Station full record in here
  const [selectedState, setSelectedState] = useState()  // will be stored Selected State
  const [selectedStation, setSelectedStation] = useState()  // will be stored Selected Station

  const [popupMessage, setPopupMessage] = useState("") // to update popup message 
  const [showHidePopup, setShowHidePopup] = useState(false) // to show or hide popup
  const [alertbox,setAlertbox] = useState() // to set color of alertbox on true or false condition

  const inputRef = useRef()
  const searchRef = useRef()

  console.log('SID '+sid)
  console.log('ZID '+zid)
  //console.log(selectedStationRecord)
  console.log(selectedState)
  console.log(selectedStation)


  const getStates = async () => {   // Get all the states
    const response = await axios.get('http://localhost:5000/stations/allstates')
    if (response.status === 200) {
      setStates(response.data)
    } else {
      console.log(response.data.message)
    }
  }

  const getStateStations = async (id)=>{  //Get all the stations according to state
   const response = await axios.get(`http://localhost:5000/stations/statestations/${id}`)
   if (response.status === 200) {
      setStateStations(response.data)
   } else {
      console.log(response.data.message)
   }
  }

  const getAllStations = async ()=>{  // Get all stations 
   const response = await axios.get('http://localhost:5000/stations/allstations')
   if (response.status === 200) {
       setSearchedStations(response.data)
   } else {
      console.log(response.data.message)
   }
  }
  
  const getSearchedStations = async (value)=>{  // Get the searched Stations
    const response = await axios.get(`http://localhost:5000/stations/searched/${value}`)
    if (response.status === 200) {
      setSearchedStations(response.data)
    } else {
      console.log(response.data.message)
    }
  }

  const handleStateSelection = (e)=>{  // to select the SID value from dropbox
    setSid(e.target.value);
    setSelectedState(e.target.options[e.target.selectedIndex].text); // Update selectedState
    !isEditing && setStateStations([])  
    !isEditing && setSelectedStation()  // emptying station when selecting state so that previous state dosent exist for any confusion
    !isEditing && setZid() // clearing any selected ZID so that on every change of state stations gets cleared
  }
  const handleStationSelection = (e)=>{  // to select the ZID value from dropbox
    setZid(e.target.value);
    setSelectedStation(e.target.options[e.target.selectedIndex].text); // Update selectedStation
  }

  const handleRecordSelection = (row,index)=>{  // handling slection fo record with enter as well as click
    setSelectedRowIndex(index) // this is when i click once this handleRecordSelection gets executed so that even on click i get blue highlighted row
    setSelectedStationRecord(row) 
    setSid(row.SID)
    setSelectedState(row.STATE); // Update selectedState
    setZid(row.ZID)
    setSelectedStation(row.DISTRICT); // Update selectedStation
  }

  const handleSearch = (e)=>{  // handling serach input 
     setSearchedValue(e.target.value.toUpperCase());
     searchedValue === '' ? getAllStations():getSearchedStations(searchedValue)
     setSelectedRowIndex(0)
  }

  const handleAdd = async ()=>{
    const response = await axios.post(`http://localhost:5000/stations/add/save`,{state:selectedState,station:newStation,sid:sid})
    setPopupMessage(response.data.msg)
    addSwitchOff()
    await response.data.alert?setAlertbox(true) : setAlertbox(false)  // setting alertbox status true or false so that i can change colors.
    handlePopup()
 }

  const handleEdit = async ()=>{
    const response = await axios.post (`http://localhost:5000/stations/edit/save`,{state:selectedState,station:editStation,zid:zid,sid:sid})
    if (response.status===200) {
      setPopupMessage(response.data.msg)
      editSwitchOff()
      setSelectedStation(editStation)
      await response.data.alert?setAlertbox(true) : setAlertbox(false)  // setting alertbox status true or false so that i can change colors.
      handlePopup()
    } else {
      console.log(response.data.msg)
    }
  }

  const handleDelete = async (id) => {
    const delID = id
    const response = await axios.delete(`http://localhost:5000/stations/delete/${delID}`)
    if (response.status === 200) {
      setStateStations(); // setting this so that on click on delete that row gets removed from there and user have to select new row
      setZid(); // Cleaning ZID so that no conflict occurs after deleting
      setSelectedStation(); // on deleting setting station null so that i see no error if user deletes once.
      setPopupMessage(response.data.msg)
      await response.data.alert ? setAlertbox(true) : setAlertbox(false)  // setting alertbox status true or false so that i can change colors.
      handlePopup()
    } else {
      
    }
  }

  const addSwitchOn = ()=>{
     setIsAdding(true)
     setIsEditing(false)
     setIsSearching(false) 
     setNewStation('')
  }
  const addSwitchOff = ()=>{
    setIsAdding(false)
  }
  const editSwitchOn = ()=>{
    setIsEditing(true)
    setIsAdding(false)
    setIsSearching(false)
    selectedStation&&setEditStation(selectedStation)  // setting textbox with selectedStation value only if it has value
  }
  const editSwitchOff = ()=>{
    setIsEditing(false)
  }
  const searchSwitchOn = ()=>{
    setIsSearching(true)
    setIsAdding(false)
    setIsEditing(false)
    setSearchedValue('')
    setSelectedRowIndex(0)
  }
  const searchSwitchOff = ()=>{
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

  useEffect(() => {
    getStates();

    if (isSerching) {
      searchRef.current?.focus();
  };
    if (isAdding || isEditing) {
    inputRef.current?.focus();
  }

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setSelectedRowIndex((prevIndex) => {
          return prevIndex > 0 ? prevIndex - 1 : 0;
        });
      } else if (event.key === 'ArrowDown') {
        setSelectedRowIndex((prevIndex) => {
          return prevIndex < searchedStations.length - 1 ? prevIndex + 1 : searchedStations.length - 1;
        });
      } else if(event.key === 'Enter'){
        if (searchedStations.length > 0 && selectedRowIndex >= 0) {
          const selectedRow = searchedStations[selectedRowIndex];
          if (selectedRow) {
              handleRecordSelection(selectedRow);
              searchSwitchOff()
          }
      }
      } else if (event.key === 'Escape') {
         searchSwitchOff()
         addSwitchOff()
         editSwitchOff()
         //cleanMessages()
         popupSwitchOff()
      }
  };
     document.addEventListener('keydown',handleKeyDown)
     return ()=> {
      document.removeEventListener('keydown',handleKeyDown)
     }
  }, [sid, stateStations, searchedValue, searchedStations, isSerching, selectedRowIndex, selectedStationRecord,selectedState,selectedStation,isAdding,isEditing])


  return (
    <div className='w-full flex justify-center font-serif'>
      <div className='w-[700px]'>

        <div className='text-center font-bold text-2xl my-4'>Stations Details</div>

        <div className='w-full py-4 px-8 border border-black rounded-md shadow-md shadow-black bg-slate-200'>

          <div className='w-full flex justify-between font-bold'>
            <div className='flex space-x-1'>
              <button className={` ${isAdding?"shadow-md shadow-black":""} py-1 px-3 w-20 bg-green-600 text-white rounded-md transition-all duration-200 hover:bg-green-500 `}
                onClick={addSwitchOn}
              >Add+</button>
              <button className={`${!selectedStation?'bg-gray-400 text-gray-600':'bg-blue-600 hover:bg-blue-500 text-white'} ${isEditing?"shadow-md shadow-black":""} py-1 px-3 w-20  rounded-md transition-all duration-200`}
                onClick={editSwitchOn}
                disabled={!selectedStation?true:false}
              >Edit</button>
              <button className={`${isSerching?"shadow-md shadow-black":""} py-1 px-3 w-20 bg-yellow-500 text-white rounded-md transition-all duration-200 hover:bg-yellow-400`}
                onClick={()=>{searchSwitchOn(); getAllStations();}}
              >Search</button>
            </div>
            <div className='flex justify-end'>
              <button className={`${!selectedStation? 'bg-gray-400 text-gray-600' : 'bg-red-600 hover:bg-red-500'} py-1 px-3 w-20  text-white rounded-md transition-all duration-200 `}
              onClick={()=>{handleDelete(zid)}}
              disabled={!selectedStation?true:false}
              >Delete</button>

            </div>
          </div>

          <div className={`${isSerching?'hidden':'block'} relative w-full mt-4 py-4 px-8 border border-black rounded-md shadow-sm shadow-black bg-white font-bold`}>

          {showHidePopup ? (
              <div className="absolute w-full h-full flex justify-center pr-6 items-center">
                <p className={alertbox ? 'bg-green-400 px-5 py-2 rounded-lg font-semibold' : 'bg-red-400 px-5 py-2 rounded-lg font-semibold'}>
                  {popupMessage}
                </p>
              </div>
            ) : null}

            <div className='w-full flex'>
              <div className='w-1/6 inline-block py-1'>
                State :
              </div>
              <div className='w-2/4 inline-block'>
                <select className='w-full border py-1 px-3 border-black rounded-md'
                  onChange={handleStateSelection}
                  value={selectedState} // Set value to selectedState
                >
                  <option value={''}>{selectedState?selectedState:'Select State'}</option>
                  {states && states.map((state) => {
                    return (<option key={state.SID} value={state.SID}>{state.STATE}</option>)
                  })}
                </select>
              </div>
            </div>

            {isAdding || isEditing ? null : (
              <div className='w-full flex mt-2'>
                <div className='w-1/6 inline-block py-1'>
                  Stations :
                </div>
                <div className='w-2/4 inline-block'>
                  <select className='w-full border py-1 px-3 border-black rounded-md'
                    onChange={handleStationSelection}
                    onFocus={!isEditing && sid?() => { getStateStations(sid)}:null}
                    value={selectedStation} // Set value to selectedStation
                  >
                    <option value={''}>{selectedStation?selectedStation:'Select Station'}</option>
                    {stateStations && stateStations.map((station) => {
                      return (<option key={station.ZID} value={station.ZID}>{station.DISTRICT}</option>)
                    })}
                  </select>
                </div>
              </div>
            )}

            {isAdding || isEditing ? (
              <div className='w-full flex mt-2'>
                <div className='w-1/6 inline-block py-[0.08rem]'>
                  Stations :
                </div>
                <div className='w-2/4 inline-block'>
                  <input className='w-full border py-[0.08rem] px-4 border-black rounded-md'
                  ref={inputRef}
                  value={isAdding? newStation : (isEditing ? editStation : '')}
                  onChange={(e)=>{isAdding?setNewStation(e.target.value.toUpperCase()):setEditStation(e.target.value.toUpperCase())}}
                  >
                  </input>
                </div>
              </div>
            ) : null}

            {isAdding || isEditing ? (
              <div className="w-full mt-2">
                <div className="w-1/6 inline-block"></div>

                <div className="w-2/4 inline-block">

                  <button className="py-[0.15rem] mr-1 w-16 bg-red-600 hover:bg-red-500 text-white  rounded-md"
                    onClick={() => { editSwitchOff(); addSwitchOff(); }}
                  > Cancel
                  </button>

                  <button className={`${isAdding?(newStation === '' || !selectedState ?'bg-gray-400 text-gray-600':'bg-green-600 hover:bg-green-500 text-white'):(isEditing?(editStation===''?'bg-gray-400 text-gray-600':'bg-green-600 hover:bg-green-500 text-white'):'bg-gray-400 text-gray-600')} py-[0.15rem] mr-1 w-16   rounded-md`}
                  disabled={isAdding?(newStation === '' || !selectedState?true:false):(isEditing?(editStation===''?true:false):true)}
                  onClick={isAdding ? ()=>{handleAdd()} : ()=>{handleEdit()}}
                  > Save
                  </button>
                </div>
              </div>) : null}

          </div>

          {/*-------------------------------------------- Table Search ----------------------------------------*/}
          <div className={`${isSerching ? 'block' : 'hidden'} w-[30rem] mx-auto rounded-md mt-8 h-[19rem] shadow-lg shadow-black border-black `}>

            <div className="h-full flex flex-col justify-between">
              <div className="w-full">
                <div className="flex border-b font-bold py-1 border-black bg-slate-700 text-white rounded-t-md">
                  <div className="w-2/4 pl-2 ">Station</div>
                  <div className="w-2/4 ">State</div>
                </div>
                <div className="overflow-y-scroll h-[14.3rem] bg-white">
                  <table className="w-full">
                    <tbody>
                      {searchedStations && searchedStations.map((row, index) => (
                        <tr key={row.ZID}
                          className={`${selectedRowIndex === index ? 'bg-blue-600 text-white' : ''} border-b font-bold hover:cursor-pointer hover:shadow-md`}
                          onClick={()=>{handleRecordSelection(row,index)}}
                          onDoubleClick={() => { searchSwitchOff() }}
                        >
                          <td className="w-2/4 border-r border-black pl-2">{row.DISTRICT}</td>
                          <td className="w-2/4 pl-2">{row.STATE}</td>
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
                      placeholder="Search by station...."
                      className="border border-black rounded-sm px-2 text-black" type="text"
                      value={searchedValue}
                      onChange={handleSearch}
                    ></input>
                  </div>
                  <button onClick={() => { searchSwitchOff() }} className="bg-red-600 hover:bg-red-500 rounded-md w-20 px-2 py-[2px] font-semibold">Cancel</button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Stations
