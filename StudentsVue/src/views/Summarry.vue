<template>


  <div>
      Your count is {{ counterStore.state.count }}
  </div>



</template>
<script setup>
import { useCounterStore } from '@/stores/counter'


const counterStore = useCounterStore()


</script>
<style>

</style>