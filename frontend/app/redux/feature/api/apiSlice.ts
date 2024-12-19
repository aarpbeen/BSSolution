
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
    async onQueryStarted(_, { queryFulfilled, dispatch }) {
  try {
    const { data } = await queryFulfilled;
    console.log("this is result in loadUser", data);

    dispatch(
      userLoggedin({
        token: data.accessToken,
        user: data.user,
      })
    );
  } catch (error) {
    console.error("Error loading user:", error);
  }
}
    })
})
});

export const {useLazyRefreshTokenQuery, useLoadUserQuery} = apiSlice

