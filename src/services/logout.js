import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const userLogout = async () => {
  const response = await axios.get(`${apiURL}auth/logout`, {
    withCredentials: true,
  });
  console.log(response);

  return response.data;
};
