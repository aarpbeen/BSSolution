
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedin } from "../auth/authSlice";

export const apiSlice = createApi({
reducerPath : 'api',
baseQuery : fetchBaseQuery({
    baseUrl : process.env.NEXT_PUBLIC_SERVER_URL, 
    credentials : 'include',
}),
endpoints : (builder)=>({
    refreshToken : builder.query({
        query : () => ({
            url : 'refreshToken',
            method : 'GET',
        }),
    }),
    loadUser : builder.query({
        query : ()=> ({
            url : 'me',
            method : 'GET',
            credentials : 'include' as const,
        }),
        async onQueryStarted({queryFulfilled,dispatch}){
            try {
             const result = await queryFulfilled;
             dispatch(
                userLoggedin({
                    token : result.data.accessToken,
                    user : result.data.user,
                })
             )
            }catch(error:unknown){
             console.log("Error occured during login",error)
            }
        }
    })
})
});

export const {useLazyRefreshTokenQuery, useLoadUserQuery} = apiSlice

