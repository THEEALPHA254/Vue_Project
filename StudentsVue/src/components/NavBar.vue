<template>
    <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{name: 'home'}">Students App</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" :to="{name: 'home'}">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/students">Student</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/sum">Counter</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!authStore.isAuthenticated" class="nav-link" to="/login">LogIn</router-link>
              <template v-else>
                <span class="nav-link">Welcome, {{ authStore.user.username }}</span>
                <button class="btn btn-outline-danger" @click="logout">Logout</button>
              </template>
            </li>
            <li class="nav-item">
              <router-link v-if="!authStore.isAuthenticated" class="nav-link" to="/register">Register</router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/counter';
  import { RouterLink } from 'vue-router';
  
  const authStore = useAuthStore();
  
  const logout = () => {
    authStore.logout();
    // Optionally redirect to another page after logout
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here if needed */
  </style>
  