import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CategoryContext = createContext();

const apiURL = import.meta.env.VITE_API_URL;



export const CategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}categories/view`);
        setCategory(response.data.data); // Adjust if your API wraps this in `.data.data`
      } catch (error) {
        console.error("Failed to fetch Category:", error?.response?.data?.message || error.message);
      }
    };

       fetchCategories();
  }, []);

    return (
      <CategoryContextProvider value={{ category, setCategory }}>
        {children}
      </CategoryContextProvider >
    );
  };