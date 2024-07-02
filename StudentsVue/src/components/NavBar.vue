<template>
  <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">Students App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.name === 'home' }" aria-current="page" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.name === 'students' }" aria-current="page" :to="{ name: 'students' }">Student</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.name === 'sum' }" aria-current="page"  :to="{ name: 'sum' }">Counter</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.name === 'productView' }" aria-current="page"  :to="{ name: 'productsView' }">Product</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">

          <li class="nav-item ms-auto">
            <template v-if="!isAuthenticated">
              <button class="btn btn-outline-success" @click="handleLoginOrRegister">LogIn/Register</button>
            </template>
            <template v-else>
              <span class="nav-link">Welcome, {{ user ? user.username : 'User' }}</span>
              <button class="btn btn-outline-danger" @click="logout">Logout</button>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/counter'; // Ensure this is the correct path to your authStore
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Use computed properties to reactively get the authentication state and user information
const isAuthenticated = computed(() => authStore.state.isAuthenticated);
const user = computed(() => authStore.state.user);

const handleLoginOrRegister = () => {
  if (isAuthenticated.value) {
    // User is authenticated, redirect to another route
    router.push('/'); // Example redirection
  } else {
    // User is not authenticated, redirect to login page
    router.push('/login');
  }
};

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('userData')

  authStore.state.user = null
  authStore.state.isAuthenticated = false


  // Optionally redirect to another page after logout
  router.push({name: 'login'})
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
