// AuthContext.jsx — Global authentication state provider

import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthenticationContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthenticationContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthenticationProvider");
    }
    return context;
};

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token });
        }
        setLoading(false); 
    }, []);


    const login = async (data) => {
        const response = await api.post("/authenticate/login", data);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
    };


    const signup = async (data) => {
        const response = await api.post("/authenticate/signup", data);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
    };


    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthenticationContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};