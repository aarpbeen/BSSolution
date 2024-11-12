
'use client'
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation';

type Props = {
 children : React.ReactNode;
 requiredRole : string;
}

interface User {
    role: string;
    name: string;
    email: string;
  }
  
  interface AuthState {
    user: User | null;
  }
  
  interface RootState {
    auth: AuthState;  
    
  }
  

const UserProtectedRoute = ({children,requiredRole}:Props) => {
    const {user} = useSelector((state:RootState)=> state.auth)

    useEffect(()=>{
        if(!user){
            return redirect("/")
        }else if (user.role !== requiredRole) {
            return redirect('/unauthorize')
        }
    },[user,requiredRole])

    return user && user.role === requiredRole ? <>{children}</> : null ;


}

export default UserProtectedRoute