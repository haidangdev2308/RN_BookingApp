import { configureStore } from "@reduxjs/toolkit";
import SavedReducer from "./SavedReducer";

export default store = configureStore({
    reducer: {
        booking: SavedReducer
    },
});


