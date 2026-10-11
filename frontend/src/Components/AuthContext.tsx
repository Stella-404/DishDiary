import React, { createContext, useContext, useEffect, useState } from "react";
import { type AuthContextType, type User, type JWT_Token } from "./InterfaceModels";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode }> = ({children}) => {
    const[activeUser, setActiveUser] = useState<User | null>(null)  //the data typeis either 'User' or null and initialinzing with value 'null'
    const[isLoading, setIsLoading]  = useState<boolean>(true);
    const[token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const processToken = (jwtToken: string | null) => {
        // token not found
        if(!jwtToken){
            return false;
        }
        try{
            const decode = jwtDecode<JWT_Token>(jwtToken);
            //checking expiry
            if(decode.exp * 1000 < Date.now() ){
                return false;
            }
            setActiveUser({ name: decode.username, user_id: decode.id })
            return true;
        }catch(error){
            console.log("Token not found. Error: ", error)
            return false;
        }
    }
    // initial authentication onfirst render
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const isValid = processToken(storedToken);
        // if token not valid
        if(!isValid){
            localStorage.removeItem("token");
            setActiveUser(null);
            setToken(null);
        }
        setIsLoading(false);
    }, [])

    const login = (newToken: string) => {
        // checking if the new loggedinuser's token is valid
        const isValid = processToken(newToken);
        if(isValid){
            localStorage.setItem("token", newToken)
            setToken(newToken);
        }
    };
    // removing the token the moment user logs out
    const logout = () => {
        localStorage.removeItem("token");
        setActiveUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
        value={{
            activeUser,
            token,
            isAuthenticated: !!activeUser,
            isLoading,
            login,
            logout,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be within AuthProvider :)");
    }
    return context;
}