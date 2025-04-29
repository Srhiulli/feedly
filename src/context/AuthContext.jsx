import {  createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';



const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decode = jwtDecode(token);
                setUser(decode);
            }
            catch {
                localStorage.removeItem('token');
            }
        }
    }, []);

        const login = (token) => {
            localStorage.removeItem('token', token);
            const decode = jwtDecode(token);
            setUser(decode);
        };

        const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        };
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuthContext = () => useContext(AuthContext);

