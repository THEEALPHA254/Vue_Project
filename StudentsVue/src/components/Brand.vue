<!-- Brand.vue -->
<template>
  <v-container>
    <v-form @submit.prevent="saveBrandName">
      <v-text-field v-model="brandName" label="Brand Name"></v-text-field>
      <v-btn color="primary" type="submit">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';


const api = axios.create({
  baseURL: 'http://localhost:8000/product_api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  data() {
    return {
      brandName: ''
    };
  },
  methods: {
    saveBrandName() {
      api.post('brands/', { name: this.brandName }) // Using the api instance and corrected URL
        .then(response => {
          console.log('Brand saved:', response.data);
          toast.success("New Brand saved Successfully")
          this.brandName = '';
        })
        .catch(error => console.error('Error saving brand:', error));
    }
  }

  
};
</script>

<style scoped>
/* Add custom styles here */
</style>
