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
      <v-file-input v-model="image" label="Product Image"></v-file-input>
      <v-row>
        <v-col cols="6">
          <v-select v-model="selectedBrand" :items="brands" item-text="name" item-value="id" label="Brand"></v-select>
        </v-col>
        <v-col cols="6">
          <v-select v-model="selectedCategory" :items="categories" item-text="name" item-value="id" label="Category"></v-select>
        </v-col>
      </v-row>
      <v-btn color="primary" type="submit">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/Product_Store'; // Adjust path as needed
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/product_api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  name: 'Product',
  setup() {
    const productStore = useProductStore();

    const productName = ref('');
    const sku = ref('');
    const price = ref('');
    const sellingPrice = ref('');
    const description = ref('');
    const image = ref(null);
    const selectedBrand = ref(null);
    const selectedCategory = ref(null);

    const brands = productStore.brands;
    const categories = productStore.categories;

    const saveProduct = async () => {
      const formData = new FormData();
      formData.append('name', productName.value);
      formData.append('sku', sku.value);
      formData.append('price', price.value);
      formData.append('selling_price', sellingPrice.value);
      formData.append('description', description.value);
      formData.append('image', image.value);
      formData.append('brand', selectedBrand.value);
      formData.append('category', selectedCategory.value);

      try {
        const response = await api.post('products/', formData);
        console.log('Product saved:', response.data);
        resetForm();
      } catch (error) {
        console.error('Error saving product:', error);
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

    // Fetch brands and categories on component mount
    onMounted(() => {
      productStore.fetchBrands();
      productStore.fetchCategories();
    });

    return {
      productName,
      sku,
      price,
      sellingPrice,
      description,
      image,
      selectedBrand,
      selectedCategory,
      brands,
      categories,
      saveProduct
    };
  }
};
</script>

<style scoped>
/* Add scoped styles here */
</style>
