import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../../features/auth/authSlice"

//create a base query
const baseQuery = fetchBaseQuery({
    baseUrl: "https://kookooo-80d647fc56ab.herokuapp.com",
    // credentials: "include",
    prepareHeaders: (headers, {getState}:any) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    }
}) 

const baseQueryWithReauth = async(args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 401){
        //console.log("Sending refresh token")

        const refresh = api.getState().auth.refresh
        //Send refersh token to get new access token
        const refreshResult = await baseQuery({url:'/auth/jwt/refresh/', method:'POST', body:{refresh}}, api, extraOptions)
        //console.log(refreshResult);

        if(refreshResult?.data){

            //store the new token
            api.dispatch(setCredentials({...refreshResult.data, refresh}))

            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else{
            api.dispatch(logOut())
        }
    }
    return result;
} 

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes:['apis'],
    endpoints: () =>   ({})  //we will have extended slices here
})