'use client'

import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./feature/api/apiSlice"
import authReducer from "./feature/auth/authSlice"

export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
});

