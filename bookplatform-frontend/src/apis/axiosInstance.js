import axios from "axios";

const BASE_URL = "https://book-platform.onrender.com/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

 const token =  JSON.parse(localStorage.getItem("token"));
 
 export const createAuthorizedRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
});
