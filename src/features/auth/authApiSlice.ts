import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/jwt/create/",
                method: "POST",
                body: credentials
            })
        }),
        getUserInfo: builder.query({
            query: () => ({
                url:"/auth/users/me/",
                method: "GET"
            })
        }),
        refresh: builder.mutation({
            query: (data) => ({
                url:"/auth/logout/",
                method:"post",
                body: data
            })
        }),
    })
})

export const {
    useLoginMutation,
    useGetUserInfoQuery,
    useRefreshMutation
} = authApiSlice