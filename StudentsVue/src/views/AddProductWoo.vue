<template>
    <div class="div">
      <div class="row">
        <div class="col">
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="props.all_products"
            item-value="name"
            show-select
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editProduct(item.id)" class="mr-2">mdi-pencil</v-icon>
              <v-icon small @click.stop="deleteProduct(item.id)">mdi-delete</v-icon>
              <v-icon small @click.stop="selectProduct(item.id)">mdi-cart-plus</v-icon>
            </template>
          </v-data-table>
          <button @click="submitForm">Add Selected Products to WooCommerce</button>
          <div v-if="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import axiosInstance from '@/services/auth';
  
  const Api = axiosInstance;
  
  const props = defineProps({
    all_products: Array,
  });
  
  const emit = defineEmits(['deleteProduct', 'editProduct']);
  
  const itemsPerPage = ref(10);
  const selectedProducts = ref([]);
  const message = ref('');
  
  const headers = ref([
    { title: 'Product Name', value: 'name' },
    { title: 'SKU', value: 'sku' },
    { title: 'Price', value: 'price' },
    { title: 'Selling Price', value: 'selling_price' },
    { title: 'Description', value: 'description' },
    { title: 'Image', value: 'image' },
    { title: 'Brand', value: 'brand' },
    { title: 'Category', value: 'category' },
    { title: 'Actions', value: 'actions', sortable: false },
  ]);
  
  function deleteProduct(id) {
    console.log('delete');
    emit('deleteProduct', id);
  }
  
  function editProduct(id) {
    console.log('edit product', id);
    emit('editProduct', id);
  }
  
  function selectProduct(id) {
    const index = selectedProducts.value.indexOf(id);
    if (index === -1) {
      selectedProducts.value.push(id);
    } else {
      selectedProducts.value.splice(index, 1);
    }
    console.log(selectProduct.value);
  }
  
  async function submitForm() {
    try {
      const response = await Api.post('/product_api/add-product/', { selected_ids: selectedProducts.value });
      message.value = response.data.message;
    } catch (error) {
      console.error('There was an error adding the products!', error);
      message.value = 'There was an error adding the products.';
    }
  }
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  