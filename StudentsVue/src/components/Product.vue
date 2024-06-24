<template>
  <v-container>
    <v-form @submit.prevent="saveProduct">
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="productName" label="Product Name"></v-text-field>
          <v-text-field v-model="price" label="Price"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="sku" label="SKU"></v-text-field>
          <v-text-field v-model="sellingPrice" label="Selling Price"></v-text-field>
        </v-col>
      </v-row>
      <v-textarea v-model="description" label="Description"></v-textarea>
      <v-file-input v-model="image" label="Product Image" accept="image/*"></v-file-input>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="selectedBrand"
            label="Brand"
            :items="brands"
            item-title="name"
            item-value="id"
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-autocomplete
            v-model="selectedCategory"
            label="Categories"
            :items="categories"
            item-title="name"
            item-value="id"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-btn color="primary" type="submit">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/Product_Store'; // Adjust path as needed
import axios from 'axios';
import { toast } from 'vue3-toastify';

import useFileUpload from '@/compossibles/fileupload'; // Path to your composable
const { isUploading: isUploadingImages, uploadedFilesUrls: uploadedImageUrls, uploadFiles: uploadImages } = useFileUpload();

const api = axios.create({
  baseURL: 'http://localhost:8000/product_api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

const productStore = useProductStore();

const productName = ref('');
const sku = ref('');
const price = ref('');
const sellingPrice = ref('');
const description = ref('');
const image = ref(null);
const selectedBrand = ref(null);
const selectedCategory = ref(null);

const brands = ref([]);
const categories = ref([]);

const saveProduct = async () => {
  if (!selectedBrand.value || !selectedCategory.value) {
    toast.error('Please select a brand and category.');
    return;
  }
  if (!image.value){
    toast.error('Please upload an image.');
    return;
  }
   await uploadImages([image.value])

   console.log(uploadedImageUrls.value);


  const formData = new FormData();
  formData.append('name', productName.value);
  formData.append('sku', sku.value);
  formData.append('price', price.value);
  formData.append('selling_price', sellingPrice.value);
  formData.append('description', description.value);
  formData.append('image',uploadedImageUrls.value[0]);
  formData.append('brand', selectedBrand.value);
  formData.append('category', selectedCategory.value);

  try {
    const response = await api.post('products/', formData);
    console.log('Product saved:', response.data);
    toast.success('Product saved successfully.');
    resetForm();
  } catch (error) {
    console.error('Error saving product:', error);
    toast.error('Error saving product.');
  }
};

const resetForm = () => {
  productName.value = '';
  sku.value = '';
  price.value = '';
  sellingPrice.value = '';
  description.value = '';
  image.value = null;
  selectedBrand.value = null;
  selectedCategory.value = null;
};

onMounted(async () => {
  await productStore.fetchBrands();
  await productStore.fetchCategories();
  brands.value = productStore.brands;
  categories.value = productStore.categories;

  console.log('Brands:', JSON.stringify(brands.value, null, 2));
  console.log('Categories:', JSON.stringify(categories.value, null, 2));

  if (brands.value.length === 0) {
    console.error('No brands fetched');
  }
  if (categories.value.length === 0) {
    console.error('No categories fetched');
  }
});
</script>

<style scoped>
/* Add scoped styles here */
</style>
