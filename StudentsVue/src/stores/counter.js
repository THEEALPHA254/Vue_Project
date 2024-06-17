import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
//import { createStore } from 'pinia';
import { CreateStore } from 'pinia';


export const useCounterStore = defineStore('counter', () => {

  let state = ref({
    count: 0
  })
   

  return { state }
});
