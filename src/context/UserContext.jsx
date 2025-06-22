import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext();

const apiURL = import.meta.env.VITE_API_URL;

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        
      const fethUser = async () => {
        try {
            const response = await axios.get(`${apiURL}auth/me`, {withCredentials: true});
            setUser(response.data.data);
            
        } catch (error) {
            setUser(null);
            console.log(error.response.data.message);
            
        }
      }

      fethUser();
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

