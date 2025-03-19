import axios from 'axios';

import { apiUrl } from '../constant';

const api = axios.create({
  baseURL: apiUrl,
  headers:{
    // 'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    mode: 'no-cors',
    "user_deviceid":localStorage.getItem("user_deviceid"),
    "user_ipaddress":localStorage.getItem("ip"),
    "user_geolocation":localStorage.getItem("user_geolocation")
  }
});

const ApiService = {
  get: (endpoint: any, headers = {}) => api.get(endpoint, { headers }),
  post: (endpoint: any, data: any, headers = {}) => api.post(endpoint, data, { headers }),
  put: (endpoint: any, data: any, headers = {}) => api.put(endpoint, data, { headers }),
  patch: (endpoint: any, data: any, headers = {}) => api.patch(endpoint, data, { headers }),
  deleteWithData: (endpoint: any, data: any) => api.delete(endpoint, data),
  delete: (endpoint: any, headers = {}) => api.delete(endpoint, { headers })
};

// Interceptor to handle 401 errors and show an alert
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error here
      localStorage.clear();
      window.location.reload();

      // alert('Unauthorized: Please login or refresh your session.');
      // window.location("/");
    }
    return Promise.reject(error);
  }
);

export default ApiService;
