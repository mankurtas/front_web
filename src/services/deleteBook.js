import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const deleteBook = async (id) => {
  const response = await axios.delete(`${apiURL}books/${id}`, {
    withCredentials: true,
  });
  return response.data;
};