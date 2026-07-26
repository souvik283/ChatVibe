import axios from "axios"

 const axiosInstance = axios.create({
  // baseURLL: import.meta.env.MODE === "development" ? "http://localhost:2000/api" : "/api",
  baseURL: "http://localhost:2000/api",
  withCredentials: true,
})

export default axiosInstance