import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { refresh:null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const {refresh, access} = action.payload
            state.refresh = refresh
            state.token = access
        },
        logOut: (state) => {
            state.refresh = null
            state.token = null
        }
    }
})

//add an export of the methods created
export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentRefresh = (state: any) => state.auth.refresh
export const selectCurrentToken = (state: any) => state.auth.token