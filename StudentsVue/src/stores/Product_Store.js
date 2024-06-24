import { defineStore } from 'pinia';
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000/product_api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    brands: [],
    categories: []
  }),
  actions: {
    async fetchBrands() {
      try {
        const response = await api.get('brands/');
        this.brands = response.data; // Using `this` to refer to the store instance
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await api.get('categories/');
        this.categories = response.data; // Using `this` to refer to the store instance
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
});
