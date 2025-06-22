import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const userLogin = async (data) => {
  const response = await axios.post(`${apiURL}auth/login`, data, {
    withCredentials: true, 
  });
  return response.data
}