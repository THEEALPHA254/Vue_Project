// counter.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
//import axiosInstance from '../services/auth';



// Counter Store
export const useCounterStore = defineStore('counter', () => {
  const state = ref({
    count: 0
  });

  return { state };
});

// Student Store
export const useStudentStore = defineStore('studentStore', () => {
  const state = ref({
    selectedStudent: null
  })

  const setSelectedStudent = (student) => {
    state.value.selectedStudent = student;
  };

  const clearSelectedStudent = () => {
    state.value.selectedStudent = null;
  };

  return {
    state,
    setSelectedStudent,
    clearSelectedStudent
  };
});

// Auth Store
export const useAuthStore = defineStore('auth', ()=>{
  let state = ref({
    user: null,
    isAuthenticated: false,
  })
  
  const isUserLoggedIn = () => {
    return localStorage.getItem('userData')
  }

  let status = isUserLoggedIn()

  if(status == null){
    state.value.isAuthenticated = false
    state.value.user = null
  }else{
    state.value.isAuthenticated = true
    state.value.user = JSON.parse(localStorage.getItem('userData'))
  }

  console.log(isUserLoggedIn())


  return {
    state,
    isUserLoggedIn,
  }
  
 
});
