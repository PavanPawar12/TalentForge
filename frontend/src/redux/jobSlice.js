import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState: {
        allJobs:[],
        singleJob: null,
    },
    reducers: {
        setAlljobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        }
    }
});
export const { setAlljobs, setSingleJob}  = jobSlice.actions;
export default jobSlice.reducer;
