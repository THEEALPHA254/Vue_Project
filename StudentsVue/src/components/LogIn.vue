<template>
  <v-sheet rounded>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto px-6 py-8" max-width="344">
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="form.username"
              :rules="[required]"
              label="Username"
              placeholder="Enter your username"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
               @click:append="show1 = !show1"
              clearable
              
            ></v-text-field>

            <v-btn
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              block
            >
              Login
            </v-btn>

            <v-divider class="my-4"></v-divider> <!-- Add a divider for spacing -->

            <v-btn
              :to="{ name: 'register' }"
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              block
              >
              SigIn
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/counter';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import axios from 'axios';
import axiosInstance from '@/services/auth';


const authStore = useAuthStore();
const router = useRouter();
const form = ref({
  username: '',
  password: '',
});

const show1 = ref(false);
const required = value => !!value || 'Required';

const login = async () => {
  try {

    try {
      const response = await axiosInstance.post('api/login/', form.value);

      console.log(response);


      localStorage.setItem('access_token', response.data.Details.access);
      localStorage.setItem('refresh_token', response.data.Details.refresh);
      localStorage.setItem('userData', JSON.stringify(response.data.Details.user))

      authStore.state.user = response.data.Details.user
      authStore.state.isAuthenticated = true
      
      router.push({name: 'home'}).then(()=>{
        toast.success('Login successful');
      })


      return response;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        return { redirectToRegister: true };
      }
      throw error;
    }
  } catch (error) {
    console.error('Login error:', error);
    if (error.response?.data?.detail === 'Invalid credentials') {
      toast.error('Credentials not found. Redirecting to registration page.');
      router.push('/register');
    } else {
      toast.error('Failed to login. Please try again later.');
    }
  }
};




</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
