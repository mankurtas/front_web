import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthorsContext = createContext();

const apiURL = import.meta.env.VITE_API_URL;



export const AuthorsContextProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

 useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${apiURL}authors/view`, {
      withCredentials: true,
    });
        setAuthors(response.data.data); // Adjust if your API wraps this in `.data.data`
      } catch (error) {
        console.error("Failed to fetch authors:", error?.response?.data?.message || error.message);
      }
    };

       fetchAuthors();
  }, []);

    return (
      <	AuthorsContext.Provider value={{ authors, setAuthors }}>
        {children}
      </AuthorsContext.Provider >
    );
  };