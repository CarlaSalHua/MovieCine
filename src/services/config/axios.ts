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

export default API;