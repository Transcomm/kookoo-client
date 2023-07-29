import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerUserApiSlice = createApi({
    reducerPath: "registerUser",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://kookooo-80d647fc56ab.herokuapp.com",
    }),
    tagTypes: ["register"],
    endpoints: (builder) => ({
        userData: builder.mutation({
            query: (userDetails) => ({
                url: "/promotiondata/create/",
                method: "post",
                body: userDetails
            })
        }),
        sendResetEmail: builder.mutation({
            query: (email) => ({
                url:"/auth/users/reset_password/",
                method:"post",
                body: email
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url:"/auth/users/reset_password_confirm/",
                method:"post",
                body: data
            })
        }),
    })
})

export const {
    useUserDataMutation,
    useSendResetEmailMutation,
    useResetPasswordMutation
} = registerUserApiSlice