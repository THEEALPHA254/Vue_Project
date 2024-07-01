<!-- Brand.vue -->
<template>
  <v-container>
    <v-form @submit.prevent="saveBrandName">
      <v-text-field v-model="brandName" label="Brand Name"></v-text-field>
      <v-btn color="primary" type="submit">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '../services/auth';
import { toast } from 'vue3-toastify';

const Api = axiosInstance

const brandName = ref('');

const saveBrandName = () => {
  Api.post('product_api/brands/', { name: brandName.value }) // Using the api instance and corrected URL
    .then(response => {
      console.log('Brand saved:', response.data);
      toast.success("New Brand saved Successfully");
      brandName.value = '';
    })
    .catch(error => console.error('Error saving brand:', error));
};

</script>

<style scoped>
/* Add custom styles here */
</style>
