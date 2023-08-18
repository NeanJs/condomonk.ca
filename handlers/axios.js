import axios from "axios";
// const URL = "http://localhost:3000/api/";
// const URL = "https://condomonk.ca/api/";
export const api = axios.create({
  baseURL: "/api/",
  timeout: 60000,
});
