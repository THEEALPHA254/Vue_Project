<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import axiosInstance from '@/services/auth';

const Api = axiosInstance

const props = defineProps({
  all_products: Array
});

const emit = defineEmits(['deleteProduct', 'editProduct']);
const itemsPerPage = ref(5);

const headers = ref([
  { title: 'Product Name', value: 'name' },
  { title: 'SKU', value: 'sku' },
  { title: 'Price', value: 'price' },
  { title: 'Selling Price', value: 'selling_price' },
  { title: 'Description', value: 'description' },
  { title: 'Image', value: 'image' },
  { title: 'Brand', value: 'brand' },
  { title: 'Category', value: 'category' },
  { title: 'Actions', value: 'actions', sortable: false }
]);

function deleteProduct(id) {
  console.log('delete');
  emit('deleteProduct', id);
}

function editProduct(id) {
  console.log('edit product', id);
  emit('editProduct', id);
}

const addToWooCommerce = async (id) => {
  try {
    const product = props.all_products.find(p => p.id === id);
    const response = await Api.post('product_api/add-product/', {
      product: {
        productName:product.productName,
        sku:product.sku,
        price:product.price,
        sellingPrice:product.sellingPrice,
        description:product.description,

        image:[product.image],
        
        selectedBrand:product.selectedBrand,
        selectedCategory:product.selectedCategory,
      }
    });
    console.log('Product added to WooCommerce:', response.data);
    // Optionally, handle success or update UI
  } catch (error) {
    console.error('Error adding product to WooCommerce:', error);
    // Optionally, handle error or show a notification
  }
};


</script>

<template>
    <div class="div">
        <div class="row">
            <div class="col" >
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
                    <v-icon small @click.stop="addToWooCommerce(item.id)">mdi-cart-plus</v-icon>
                </template>
                </v-data-table>
                
            </div>
        </div>
    </div>
  </template>

<style lang="">

</style>