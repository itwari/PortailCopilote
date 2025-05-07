// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:5000", // Assure-toi que ce port correspond bien à ton backend
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiClient;
