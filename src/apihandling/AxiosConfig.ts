import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: 'https://fakestoreapi.com/products',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // You can add more default headers here
  },
});

// Optional: Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token or other headers if needed
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
