import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        state:false,
        data:{
            username:"",
            password:""
        }
    },
    reducers:{
        userInfo:(state,action)=>{
                   state.data = action.payload
        }
    }
})

export default userSlice.reducer;
export const {userInfo} = userSlice.actions;