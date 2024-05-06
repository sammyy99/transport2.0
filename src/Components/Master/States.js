import React from "react";

const States = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1110px] ">
        <div className="my-4 text-2xl font-bold text-center">States details</div>

        <div className="py-4 px-8 border border-black rounded-md">
          <div className="grid grid-cols-3 mt-8 ">
            <div className="col-span-1 flex  space-x-1">
              <button className="py-1 px-3 border border-black rounded-md">
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
              <button className=" border border-black rounded-md w-8 p-1">
                <img alt="" src="/start.svg"></img>
              </button>
              <button className=" border border-black rounded-md w-8 p-1">
                <img alt="" src="/previous.svg"></img>
              </button>
              <button className=" border border-black rounded-md w-8 p-1">
                <img alt="" src="/next.svg"></img>
              </button>
              <button className=" border border-black rounded-md w-8 p-1">
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
    <div className="font-semibold">Record :</div>
  </div>
  <div className="col-span-3 flex flex-col justify-center">
    <input className="block border border-black rounded-sm px-2 mb-2 w-full" type="text"></input>
    <input className="block border border-black rounded-sm px-2 mb-6 w-full" type="text"></input>
    <div className="font-semibold border px-2 border-black w-1/4">0/0</div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default States;
