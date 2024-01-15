import { combineReducers } from "@reduxjs/toolkit";
import hotelReducer from "./hotel.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    hotelReducer,
    userReducer
})

export default rootReducer