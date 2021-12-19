import axios from 'axios';
import qs from 'qs';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8079/',
  timeout: 10000,
    paramsSerializer: params => {
        return qs.stringify(params)
    }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {...config.headers, Authorization: token};
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
