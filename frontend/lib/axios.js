import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "production" ? "/api/v1" : "http://localhost:3000/api/v1"

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export default api;