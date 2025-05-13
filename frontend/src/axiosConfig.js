import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor to handle HTML responses
instance.interceptors.response.use(
  (response) => {
    if (response.headers['content-type']?.includes('text/html')) {
      throw new Error('Received HTML instead of JSON');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;