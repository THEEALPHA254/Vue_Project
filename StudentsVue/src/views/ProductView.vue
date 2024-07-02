<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Product ref="addProductref" @addProduct="addProduct" @updateProduct="updateProduct" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Product from '@/components/Product.vue';
import { toast } from 'vue3-toastify';
import { useProductStore } from '@/stores/Product_Store';
import axiosInstance from '@/services/auth';

let all_products = ref([]);
const addProductref = ref(null);
const productStore = useProductStore();

const Api = axiosInstance

async function fetchProducts() {
  try {
    const response = await Api.get('product_api/products/');
    if (Array.isArray(response.data)) {
      console.log('Fetched products', response.data);
      all_products.value = response.data;
    } else {
      console.error('Unexpected API response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching products:');
  }
}


async function addProduct(Product) {
  try {
    Api.post('product_api/products/', Product).then((response)=>{
      fetchProducts()
      toast.success('Product added successfully');
    }).catch((err)=>{
      toast.error('Failed to add products');
    })
  } catch (error) {
    console.error('Error adding Product:', error.response ? error.response.data : error.message);
  }
}


async function updateProduct(id, updatedProduct) {
  try {
    await Api.put(`product_api/product/${id}/`, updatedProduct);
    fetchProducts();
    toast.success('Product updated successfully');
  } catch (error) {
    console.error('Error updating Product:', error.response ? error.response.data : error.message);
  }
}


onMounted(() => {
  fetchProducts();

  if (productStore.state.selectedProduct) {
    setTimeout(()=>{

      addProductref.value.setEditProduct(productStore.state.selectedProduct);
      productStore.clearSelectedProduct();
    },1000)
  }
});
</script>
