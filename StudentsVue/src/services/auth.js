import axios from 'axios';

const Api = 'http://localhost:8000/';
const axiosInstance = axios.create({
  baseURL: Api, 
});

// Interceptor to include token in headers
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');

  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});



// Interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log('what')
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await axiosInstance.post('${Api}token/refresh/', {
          refresh: refreshToken,
          
        });
        localStorage.setItem('access_token', response.data.access);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;