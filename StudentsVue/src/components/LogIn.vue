<template>
  <v-sheet rounded>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto px-6 py-8" max-width="344">
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="user.username"
              :rules="[required]"
              label="Username"
              placeholder="Enter your username"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              clearable
              type="password"
            ></v-text-field>

            <v-btn
              :disabled="loading"
              :loading="loading"
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              block
            >
              Login
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/counter';
import { toast } from 'vue3-toastify';

export default {
  setup() {
    const authStore = useAuthStore();
    const user = reactive({
      username: '',
      password: '',
    });

    const login = async () => {
      try {
        await authStore.login(user);
        toast.success('Login successful');
        // Optionally redirect to another page after successful login
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Failed to login. Please try again later.');
      }
    };

    const required = value => !!value || 'Required';

    return {
      user,
      login,
      required,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
