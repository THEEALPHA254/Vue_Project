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
            <router-link class="nav-link active" aria-current="page" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'students' }">Student</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'sum' }">Counter</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'product' }">Product</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item ms-auto">
            <template v-if="!authStore.isAuthenticated">
              <button class="btn btn-outline-success" @click="handleLoginOrRegister">LogIn/Register</button>
            </template>
            <template v-else>
              <span class="nav-link">Welcome, {{ authStore.user.username }}</span>
              <button class="btn btn-outline-danger" @click="logout">Logout</button>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/counter';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLoginOrRegister = () => {
  if (authStore.isAuthenticated) {
    // User is authenticated, redirect to another route
    router.push('dashboard'); // Example redirection
  } else {
    // User is not authenticated, redirect to register page
    router.push('/login');
  }
};

const logout = () => {
  authStore.logout();
  // Optionally redirect to another page after logout
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>


