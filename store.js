import { configureStore, combineReducers } from "@reduxjs/toolkit";
import SavedReducer from "./SavedReducer";
import BookReducer from "./BookReducer";

const rootReducer = combineReducers({
    booking: BookReducer,
    saving: SavedReducer,
});

export default store = configureStore({
    reducer: rootReducer,
});


