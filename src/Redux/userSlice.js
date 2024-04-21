import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        status:false,
        data:{
            username:"",
            password:""
        }
    },
    reducers:{
        userInfo:(state,action)=>{
                   state.data = action.payload
        },
        login:(state,action)=>{
                   state.status=action.payload
        }
    }
})

export default userSlice.reducer;
export const {userInfo, login} = userSlice.actions;