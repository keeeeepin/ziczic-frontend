import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8090/api';
const BASE_URL = 'http://localhost:8090/api/';

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('token');
      config.headers['Content-Type'] = 'application/json';
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response
  instance.interceptors.response.use(
    (resp) => {
      return resp;
    },
    (error) => {
      if (error.response?.status == 404) {
        console.log(error.response.data);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultApiInstance = axiosApi(BASE_URL);
