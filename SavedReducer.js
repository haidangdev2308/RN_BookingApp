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
            }
        }
    }
)

export const { savedPlaces } = SavedSlice.actions
export default SavedSlice.reducer