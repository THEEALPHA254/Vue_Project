import axios from 'axios';

const api = 'http://localhost:8000/api/';
const axiosInstance = axios.create({
  baseURL: api,
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await axiosInstance.post('token/refresh/', {
          refresh: refreshToken,
        });
        localStorage.setItem('access_token', response.data.access);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
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

export default {
  register(user) {
    return axiosInstance.post('register/', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  },

  async login(user) {
    try {
      const response = await axiosInstance.post('login/', {
        username: user.username,
        password: user.password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async getUsers() {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get('users/');
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },
};
