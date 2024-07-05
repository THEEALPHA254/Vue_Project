<!-- Students.vue -->
<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="all_products.length === 0" type="warning" text>
            Please add a product
          </v-alert>
          <v-alert v-else type="success" text>
            Select a Product to add it to Woo!
          </v-alert>
        </v-col>
        <v-col cols="12">
          <ProductList :all_products="all_products" @deleteProduct="deleteProduct" @editProduct="editProduct" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ProductList from '@/components/ProductList.vue';
  import { useRouter } from 'vue-router';
  import { useProductStore } from '@/stores/Product_Store.js';
  import { toast } from 'vue3-toastify';
  import axiosInstance from '../services/auth';
  
  
  let all_products = ref([]);
  const router = useRouter();
  const productStore = useProductStore();
  
  const Api = axiosInstance
  
  async function fetchProducts() {
    try {
      const response = await Api.get('product_api/products/');
      all_products.value = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  async function deleteProduct(id) {
    try {
      await Api.delete(`product_api/product/${id}/`);
      all_products.value = all_products.value.filter(product => product.id !== id);
      toast.warn("Products deleted!!")
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  
  function editProduct(id) {
    const product = all_products.value.find(product => product.id === id);
    if (product) {
      productStore.setSelectedProduct(product);
      console.log('editing product')
      router.push({ name: 'productsView' });
    } else {
      console.error('Products not found with id:', id);
    }
  }
  
  onMounted(() => {
    fetchProducts();
  });
  </script>
  