<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12">
          <v-alert v-if="editing_mode" type="info">
            Edit clicked Name
          </v-alert>
        </v-col>

        <v-col cols="6">
          <v-text-field 
          v-model="productName" 
          label="Product Name"
          placeholder="Product" 
          type="text"
          :rules="[required]"
          ></v-text-field>
          <v-text-field 
          v-model="price" 
          label="Price"
          :rules="[required]"
          prefix="KES"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field 
          v-model="sku" 
          label="SKU"
          placeholder="#P000" 
          type="text"
          :rules="[required]"
          ></v-text-field>
          <v-text-field 
          v-model="sellingPrice" 
          label="Selling Price"
          :rules="[required]"
          prefix="KES"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-textarea 
        v-model="description" 
        label="Description"
        placeholder="Product" 
        type="text"
        :rules="[required]"
      ></v-textarea>
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
      <v-row class="mt-4">
        <v-col cols="6">
          <v-btn :color="editing_mode ? 'warning' : 'primary'" type="submit">
            {{ editing_mode ? 'Update' : 'Add Product' }}
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn v-if="editing_mode" color="dark" class="mt-2" @click="discardEdit">
            Discard Edit
          </v-btn>
        </v-col>
      </v-row>
     </v-form> 
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useProductStore } from '@/stores/Product_Store' // Adjust path as needed
import { toast } from 'vue3-toastify'
import useFileUpload from '@/compossibles/fileupload' // Path to your composable

const { isUploading: isUploadingImages, uploadedFilesUrls: uploadedImageUrls, uploadFiles: uploadImages } = useFileUpload()

const productStore = useProductStore()

const productName = ref('')
const sku = ref('')
const price = ref('')
const sellingPrice = ref('')
const description = ref('')
const image = ref([])
const selectedBrand = ref(null)
const selectedCategory = ref(null)
const brands = ref([])
const categories = ref([])
const editing_mode = ref(false)
const selectedProduct = ref(null)

const emit = defineEmits(['addProduct', 'updateProduct'])

async function submitForm() {
  if (!selectedBrand.value || !selectedCategory.value) {
    toast.error('Please select a brand and category.')
    return
  }
  if (!image.value) {
    toast.error('Please upload an image.')
    return
  }
  await uploadImages([image.value])
  console.log(uploadedImageUrls.value)

  const formData = new FormData()
  formData.append('name', productName.value)
  formData.append('sku', sku.value)
  formData.append('price', price.value)
  formData.append('selling_price', sellingPrice.value)
  formData.append('description', description.value)
  formData.append('image', uploadedImageUrls.value[0])
  formData.append('brand', selectedBrand.value)
  formData.append('category', selectedCategory.value)

  if (editing_mode.value) {
    emit('updateProduct', selectedProduct.value.id, formData)
    editing_mode.value = false
    selectedProduct.value = null
  } else {
    emit('addProduct', formData)
  }

  resetForm()
}

async function setEditProduct(product) {
  productName.value = product.productName;
  sku.value = product.sku;
  price.value = product.price;
  sellingPrice.value = product.sellingPrice;
  description.value = product.description;

  image.value = [product.image];

  selectedBrand.value = product.selectedBrand;
  selectedCategory.value = product.selectedCategory;
  selectedProduct.value = product;
  editing_mode.value = true;
}

function discardEdit() {
  resetForm()
  editing_mode.value = false
  selectedProduct.value = null
}

function resetForm() {
  productName.value = ''
  sku.value = ''
  price.value = ''
  sellingPrice.value = ''
  description.value = ''
  image.value = null
  selectedBrand.value = null
  selectedCategory.value = null
}

onMounted(async () => {
  await productStore.fetchBrands()
  await productStore.fetchCategories()
  brands.value = productStore.brands
  categories.value = productStore.categories

  console.log('Brands:', JSON.stringify(brands.value, null, 2))
  console.log('Categories:', JSON.stringify(categories.value, null, 2))

  if (brands.value.length === 0) {
    console.error('No brands fetched')
  }
  if (categories.value.length === 0) {
    console.error('No categories fetched')
  }
})

const required = (value) => !!value || 'Required'

defineExpose({
  setEditProduct
})

watch(() => productStore.state.selectedProduct, (newProduct) => {
  if (newProduct) {
    setEditProduct(newProduct)
  }
})
</script>

<style scoped>
/* Add scoped styles here */
</style>
