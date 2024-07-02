<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

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
                </template>
                </v-data-table>
                
            </div>
        </div>
    </div>
  </template>

<style lang="">

</style>