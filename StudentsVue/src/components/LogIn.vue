<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="user.username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import AuthService from '../services/auth';
import { toast } from 'vue3-toastify';

export default {
  setup() {
    const user = reactive({
      username: '',
      password: '',
    });

    const login = async () => {
      try {
        const response = await AuthService.login(user);
        console.log('Login successful:', response.data);
        toast.success("LogIn successful")
        
        // Optionally, redirect to dashboard or fetch additional data after login
      } catch (error) {
        console.error('Login error:', error);

        if (error.response && error.response.status === 400) {
          toast.error('Invalid username or password');
        } else {
          toast.error('Failed to login. Please try again later.');
        }
      }
    };

    return {
      user,
      login,
    };
  },
};
</script>
