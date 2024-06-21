// counter.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '../services/auth';


export const useCounterStore = defineStore('counter', () => {

  let state = ref({
    count: 0
  })
   

  return { state }
});

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    selectedStudent: null
  }),
  actions: {
    setSelectedStudent(Student) {
      this.selectedStudent = Student;
    },
    clearSelectedStudent() {
      this.selectedStudent = null;
    }
  }
});


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await AuthService.login(credentials);
        this.user = response.data.user; // Assuming your login response includes user details
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      // Implement logout functionality if needed
      this.user = null;
      this.isAuthenticated = false;
    },

    async register(userDetails) {
      try {
        const response = await AuthService.register(userDetails);
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
});
