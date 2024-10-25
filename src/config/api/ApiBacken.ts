import axios from "axios";

const ApiBackend = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND,
  headers: {
    "Content-type": "application/json",
  },
});

// interceptors

export { ApiBackend };
