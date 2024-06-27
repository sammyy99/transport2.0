import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import printSlice from "./printSlice"

const appstore = configureStore(
    {
        reducer:{
          user: userSlice,
          print: printSlice
        }
    }
)

export default appstore;