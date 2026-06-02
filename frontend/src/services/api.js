import axios from "axios";

export const BASE_URL = "http://10.18.138.230:8000"; // 👈 add this

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


export default API;