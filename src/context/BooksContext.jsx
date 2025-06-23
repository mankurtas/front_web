import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BooksContext = createContext();

const apiURL = import.meta.env.VITE_API_URL;

export const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${apiURL}books/view`);
        setBooks(response.data.data); // Adjust if your API wraps this in `.data.data`
      } catch (error) {
        console.error("Failed to fetch books:", error?.response?.data?.message || error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
