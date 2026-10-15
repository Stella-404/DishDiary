import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import type React from "react"


export const PrivateRoutes: React.FC = () => {
    const{isAuthenticated, isLoading} = useAuth();

    if(isLoading)
        return(
            <div>Loading...</div>
        )
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/Login" replace />
    )
}