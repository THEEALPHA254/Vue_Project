<template>
  

  <div>
    <button class="btn btn-outline-dark" @click="Increment">
        Add 1 
    </button>
  </div>


</template>
<script setup>
import { toast } from 'vue3-toastify';
import { useCounterStore } from '@/stores/counter'


const counterStore = useCounterStore()


function Increment(){
  counterStore.state.count += 1
  toast.success('Added!')
}

</script>
<style>

</style>