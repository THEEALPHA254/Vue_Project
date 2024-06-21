<template>
  <v-sheet rounded>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto px-6 py-8" max-width="344">
          <v-form v-model="form.valid" @submit.prevent="register">
            <v-text-field
              v-model="user.username"
              :readonly="loading"
              :rules="[required]"
              label="Username"
              placeholder="Enter your username"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              :readonly="loading"
              :rules="[required, email]"
              class="mb-2"
              label="Email"
              placeholder="Enter your email"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :readonly="loading"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              clearable
              type="password"
            ></v-text-field>

            <br>

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

<script>
import { reactive, ref } from 'vue';
import AuthService from '../services/auth';
import { toast } from 'vue3-toastify';

export default {
  setup() {
    const user = reactive({
      username: '',
      email: '',
      password: '',
    });

    const form = reactive({
      valid: false,
    });

    const loading = ref(false);

    const required = value => !!value || 'Required';
    const email = value => /.+@.+\..+/.test(value) || 'Email must be valid';

    const register = async () => {
      if (!form.valid) {
        toast.error('Please fill out the form correctly');
        return;
      }

      loading.value = true;
      try {
        const response = await AuthService.register(user);
        console.log('Registration successful:', response.data);
        toast.success('User registered successfully!');
        // Optionally, fetch users after successful registration
      } catch (error) {
        console.error('Registration error:', error);
        if (error.response) {
          console.error('Server Error Status:', error.response.status);
          console.error('Error Data:', error.response.data);
          toast.error(`Registration failed: ${error.response.data.detail}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          toast.error('Registration failed: No response received');
        } else {
          console.error('Request setup error:', error.message);
          toast.error('Registration failed: Request setup error');
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      user,
      form,
      loading,
      required,
      email,
      register,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
