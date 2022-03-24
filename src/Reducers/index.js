//This folder is to combine all reducers into one file 
import {combineReducers} from "redux"
import posts from "./PostReducers"

export const reducers = combineReducers({posts});