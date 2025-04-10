// api/auth.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};