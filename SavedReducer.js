import { createSlice } from "@reduxjs/toolkit"; // phương thức định nghĩa reducer và action
export const SavedSlice = createSlice(
    {
        name: "booking",
        initialState: {
            booking: [],
        },
        reducers: {
            savedPlaces: (state, action) => {
                state.booking.push({ ...action.payload })
            },
            resetBooking: (state) => {
                state.booking = [];
            },
        }
    }
)

export const { savedPlaces, resetBooking } = SavedSlice.actions
export default SavedSlice.reducer