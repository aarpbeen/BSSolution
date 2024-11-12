
import { apiSlice } from "../api/apiSlice";
import { userLoggedin, userRegistration } from "./authSlice";


// Types for response
interface RegistrationResponse {
    success : boolean;
    message : string;
    activation_token : string
}

interface RegistrationData {
    name : string;
    password : string;
    email : string;
}

export const authApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
             
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activation_token,
                        })
                    );
                } catch (error) {
                    console.log("Error during registration", error);
                }
            },
        }),
        activation : builder.mutation({
            query : ({activation_token, activation_code})=> ({
               url : "activate-user",
               method : "POST",
               body : {
                   activation_token,
                   activation_code,
               }
            })
           }),
           login : builder.mutation({
            query : ({email,password}) => ({
              url : "user-login",
              method : "POST",
              body : {
                email,
                password,
              },
              credentials : 'include' as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedin({
                            token : result.data.accessToken,
                            user : result.data.user,
                        })
                    )
                } catch(error){
                    console.log("Error occured during login", error)
                }
            }
           })
    }),
});


export const {useRegisterMutation, useActivationMutation, useLoginMutation} = authApi
export default authApi