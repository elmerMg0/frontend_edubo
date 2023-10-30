import axios from "axios";
const APIURL = import.meta.env.VITE_REACT_APP_API_URL

export const API = axios.create({
    baseURL: APIURL  
})

