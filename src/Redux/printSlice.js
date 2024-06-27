import { createSlice } from "@reduxjs/toolkit";

const printSlice = createSlice({

      name:'print',
      initialState:{data:null},
      reducers:{
        printData: (state,action)=>{
          state.data = action.payload
        }
      }
})

export default printSlice.reducer;
export const {printData} = printSlice.actions;