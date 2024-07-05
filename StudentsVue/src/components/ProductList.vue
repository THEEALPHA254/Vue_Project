<template>
  <div class="div">
    <div class="row">
      <div class="col">
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="props.all_products"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <input
                  type="checkbox"
                  :id="`product-${item.id}`"
                  :value="item.id"
                  v-model="selectedProducts"
                />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.sku }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.selling_price }}</td>
              <td>{{ item.description }}</td>
              <td>
                <img :src="item.image" alt="product image" width="50" />
              </td>
              <td>{{ item.brand }}</td>
              <td>{{ item.category }}</td>
              <td>
                <v-icon small @click="editProduct(item.id)" class="mr-2">mdi-pencil</v-icon>
                <v-icon small @click.stop="deleteProduct(item.id)">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
        <!-- <button @click="submitForm">Add to WooCommerce</button> -->
        <v-btn color="primary" dark type="submit" @click="submitForm">Add to WooCommerce</v-btn>
        <div v-if="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import axiosInstance from '@/services/auth';
import { toast } from 'vue3-toastify';

const Api = axiosInstance;

const props = defineProps({
  all_products: Array,
});

const emit = defineEmits(['deleteProduct', 'editProduct']);

const itemsPerPage = ref(10);
const selectedProducts = ref([]);
const message = ref('');

const headers = ref([
  { title: 'Select', value: 'select', sortable: false },
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

async function submitForm() {
  try {
    if (selectedProducts.value.length === 0) {
      message.value = 'No products selected.';
      return;
    }
    console.log('Submitting Selected Products:', selectedProducts.value); // Debugging statement
    const response = await Api.post('/product_api/add-product/', { selected_ids: selectedProducts.value });
    console.log('Response:', response.data); // Debugging statement
    toast.success("Product added to woo successfully")
    message.value = response.data.message;
  } catch (error) {
    console.error('There was an error adding the products!', error);
    if (error.response) {
      console.error('Error response:', error.response.data); // Detailed error message
    }
    message.value = 'There was an error adding the products.';
  }
}
</script>

<style>
/* Add your styles here */
</style>
