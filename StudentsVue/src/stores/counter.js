import { ref } from 'vue';
import { defineStore } from 'pinia';



export const useCounterStore = defineStore('counter', () => {

  let state = ref({
    count: 0
  })
   

  return { state }
});
