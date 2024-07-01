<!-- Category.vue -->
<template>
    <v-container>
      <v-form @submit.prevent="saveCategory">
        <v-text-field v-model="categoryName" label="Category Name"></v-text-field>
        <v-btn color="primary" type="submit">Save</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axiosInstance from '@/services/auth';
  import { toast } from 'vue3-toastify';
  
  const Api = axiosInstance
  
  export default {
    data() {
      return {
        categoryName: ''
      };
      
    },
    methods: {
      saveCategory() {
        Api.post('product_api/categories/', { name: this.categoryName }) // Using the api instance and corrected URL
          .then(response => {
            console.log('Category saved:', response.data);
            toast.success('Category saved successfully!');
            this.categoryName = '';
          })
          .catch(error => console.error('Error saving category:', error));
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  
