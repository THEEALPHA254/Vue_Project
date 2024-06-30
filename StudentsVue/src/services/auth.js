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

const auth = {
  async register(user) {
    try {
      const response = await axiosInstance.post('register/', {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      return response.data; // Return any relevant data upon successful registration
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Propagate error to handle it further if needed
    }
  },
  
  async login(user) {
    try {
      const response = await axiosInstance.post('login/', {
        username: user.username,
        password: user.password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      return response;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        // Redirect to registration page if credentials are not found
        return { redirectToRegister: true };
      }
      throw error;
    }
  },

  async getUserByUsername(username) {
    try {
      const response = await axiosInstance.get(`users/?username=${username}`);
      return response.data; // Return user data if found
    } catch (error) {
      console.error('Get user by username error:', error);
      throw error;
    }
  }
};

export default auth;
