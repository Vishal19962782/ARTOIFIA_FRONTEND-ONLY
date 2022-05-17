import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./PostSlice"
import userReducer from "./Userslice"
export const store=configureStore({
    reducer:{
        posts:postReducer,
        users:userReducer
    }

})