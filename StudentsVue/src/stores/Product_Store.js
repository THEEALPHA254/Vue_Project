import { defineStore } from 'pinia';
import axiosInstance from '@/services/auth';
import { ref } from 'vue';

const Api = axiosInstance;

export const useProductStore = defineStore('productStore', () => {
  const brands = ref([]);
  const categories = ref([]);

  const fetchBrands = async () => {
    try {
      const response = await Api.get('product_api/brands/');
      brands.value = response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await Api.get('product_api/categories/');
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const state = ref({
    selectedProduct: null
  })

  const setSelectedProduct = (product) => {
    state.value.selectedProduct = product;
  };
  const clearSelectedProduct= () => {
    state.value.selectedProduct = null;
  };


  return {
    state,
    brands,
    categories,
    fetchBrands,
    fetchCategories,
    setSelectedProduct,
    clearSelectedProduct
  };
});
