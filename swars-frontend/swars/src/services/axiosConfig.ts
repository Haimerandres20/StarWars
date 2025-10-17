
import axios from 'axios';


const baseDomain: string = import.meta.env.VITE_APP_BASE_URL ;
const baseUrl: string = `${baseDomain}`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access') || '';
    if (accessToken && config.headers) {
      config.headers.Authorization = `JWT ${accessToken}`;  
    }
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login'; 
      } else if (error.response.status === 403) {
   
        console.error('Sin permisos para esta operación');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;