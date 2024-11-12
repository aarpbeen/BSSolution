
'use client'
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation';

type Props = {
 children : React.ReactNode;
 requiredRole : string;
}

const UserProtectedRoute = ({children,requiredRole}:Props) => {
    const {user} = useSelector((state:any)=> state.auth)

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