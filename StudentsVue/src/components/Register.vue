<template>
  <v-sheet rounded>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto px-6 py-8" max-width="344">
          <v-form v-model="form.valid" @submit.prevent="register">
            <v-text-field
              v-model="form.username"
              :rules="[required]"
              label="Username"
              placeholder="Enter your username"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              :rules="[required, email]"
              class="mb-2"
              label="Email"
              placeholder="Enter your email"
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
              :disabled="!form.valid || loading"
              :loading="loading"
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              block
            >
              Register
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import AuthService from '../services/auth';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const form = ref({
  username: '',
  email: '',
  password: '',
});

const loading = ref(false);
const router = useRouter();

const required = value => !!value || 'Required';
const email = value => /.+@.+\..+/.test(value) || 'Email must be valid';
const show1 = ref(false);

const register = async () => {
  if (!form.value.username || !form.value.email || !form.value.password) {
    toast.error('Please fill out all fields');
    return;
  }

  loading.value = true;
  try {
    const response = await AuthService.register(form.value);
    if (response && response.redirectToLogin) {
      router.push('/login');
    } else {
      toast.success('Registration successful');
      form.value.username = '';
      form.value.email = '';
      form.value.password = '';
    }
  } catch (error) {
    console.error('Registration error:', error);
    toast.error('Failed to register. Please try again later.');
  } finally {
    loading.value = false;
  }
};


    
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
