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
              clearable
              type="password"
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

const authStore = useAuthStore();
const router = useRouter();
const form = ref({
  username: '',
  password: '',
});

const login = async () => {
  try {
    await authStore.login(form.value);
    toast.success('Login successful');
    // Optionally redirect to another page after successful login
    router.push('/');
  } catch (error) {
    console.error('Login error:', error);
    console.log(error); // Add this line for debugging
    if (error.detail === 'Invalid credentials') {
      // Redirect to registration page if credentials are not found
      toast.error('Credentials not found. Redirecting to registration page.');
      router.push('/register');
    } else {
      toast.error('Failed to login. Please try again later.');
    }
  }
};

const required = value => !!value || 'Required';
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
