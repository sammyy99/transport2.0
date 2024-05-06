//-----------------------------------------------------------------------------------------------------------------------1st desgin
/*const [states, setStates] = useState();
  const [statesList, setStatesList] = useState()
  const [showAddRow, setShowAddRow] = useState(false)

  const search = useRef()

  const addRow = ()=>{
    setShowAddRow(true)
  } 

  const hideAddRow = ()=>{
    setShowAddRow(!showAddRow)
  }

  const getStates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/states");
      setStates(response.data);
      setStatesList(response.data)
      //console.log("DB data fetched")
    } catch (error) {
      console.log("Error in fetching data " + error);
    }
  };

  const searchedStates = ()=>{
     const searchedStates = states.filter((result)=>{
     return result.STATE.toLowerCase().includes(search.current.value.toLowerCase())
    })
     setStatesList(searchedStates)
  }

  useEffect(() => {
    getStates();
  }, []);


  return (
    <div className="w-[80%] h-full mx-auto">
      <div className="text-2xl text-center my-4 py-2 font-bold">States</div>

      <div className="h-[65%] text-center overflow-y-auto border border-black shadow-md shadow-gray-600 rounded-md">
        <div className="flex sticky top-0 z-10 w-full border-b border-black bg-slate-600 text-white py-1">
          <div className="w-[40%] my-auto">Search</div>
          <div className="w-[40%] px-16">
            <input
              ref={search}
              onChange={()=>{searchedStates()}}
              className="w-full px-4 py-1 rounded-md text-black"
              type="text"
              placeholder="Type here..."
            ></input>
          </div>
          <div className="w-[20%]">
            <button onClick={()=>{addRow()}} className="mx-auto px-3 py-1 rounded-md bg-green-600">
              Add +
            </button>
          </div>
        </div>

        <div className="flex sticky top-[2.55rem] z-10 w-full border-b border-black bg-slate-600 text-white py-2">
          <div className="w-[40%]">State Name</div>
          <div className="w-[40%]">State Code</div>
          <div className="w-[20%]">Edit</div>
        </div>
        
        <div className={`${showAddRow?'block':'hidden'} flex sticky top-[5.10rem] py-1 bg-slate-200`}>
          <div className="w-[40%] px-16"><input className="w-full border border-gray-500 py-1 px-4 rounded-md text-center" type="text" placeholder="Enter State Name.."></input></div>
          <div className="w-[40%] px-16"><input className="w-full border border-gray-500 py-1 px-4 rounded-md text-center" type="text" placeholder="Enter State Code.."></input></div>
          <div className="w-[20%] flex justify-center space-x-2">
            <button><img className="w-8 hover:cursor-pointer bg-white rounded-md" alt="" src='/tick.svg'></img></button>
            <button onClick={()=>{hideAddRow()}}><img className="w-8 hover:cursor-pointer bg-white rounded-md" alt="" src='/cross.svg'></img></button>
          </div>
        </div>

        <div className="py-2">
          {!statesList? null : (statesList.map((row) => {
            return (
              <div key={row.SID} className="flex w-full border-b py-1">
                <div className="w-[40%]">{row.STATE}</div>
                <div className="w-[40%]">{row.SNAME}</div>
                <div className="w-[20%]"></div>
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
*/
//----------------------------------------------------------------------------First design