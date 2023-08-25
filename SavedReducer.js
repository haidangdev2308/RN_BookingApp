import { createSlice } from "@reduxjs/toolkit"; // phương thức định nghĩa reducer và action

// Hàm so sánh hai đối tượng place
const isEqual = (place1, place2) => {
    // Đặt điều kiện so sánh tùy theo cấu trúc dữ liệu của bạn
    return place1.name === place2.name; // Ví dụ: so sánh theo trường id
};
export const SavedSlice = createSlice(
    {
        name: "saving",
        initialState: {
            saving: [],
        },
        reducers: {
            startSaving: (state, action) => {
                const placeToSave = action.payload;
                state.saving.push(placeToSave); // Thêm vào mảng saving
            },
            deleteSaving: (state, action) => {
                const placeToStopSaving = action.payload;
                state.saving = state.saving.filter(place => !isEqual(place, placeToStopSaving));
            },
            resetSaving: (state) => {
                state.saving = [];
            },
        }
    }
)

export const { startSaving, deleteSaving, resetSaving } = SavedSlice.actions
export default SavedSlice.reducer