import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const userSignUp = async (data) => {
  const response = await axios.post(`${apiURL}auth/register`, data, {
    withCredentials: true,
  });
  return response.data;
};
