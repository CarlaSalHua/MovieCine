import axios from "axios";
import { TMDB_BASE_URL, TMDB_READ_TOKEN, TMDB_API_KEY } from "@env";

const API = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Accept: "application/json",
    ...(TMDB_READ_TOKEN && { Authorization: `Bearer ${TMDB_READ_TOKEN}` }),
  },
  params: TMDB_API_KEY ? { api_key: TMDB_API_KEY } : undefined,
  timeout: 10000,
});

//  Errors interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.status_code;
    const message = error.response?.data?.status_message;

    console.error(`TMDB Error → HTTP ${status} | Code: ${code} | Message: ${message}`);
    return Promise.reject(new Error(message));
  }
);

export default API;