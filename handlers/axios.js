import axios from "axios";
const URL = "https://condomonk.ca/api/";
export const api = axios.create({
  baseURL: URL,
  timeout: 60000,
});
