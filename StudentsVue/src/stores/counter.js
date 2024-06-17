import { ref } from 'vue';
import { defineStore } from 'pinia';



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
    setSelectedStudent(student) {
      this.selectedStudent = student;
    },
    clearSelectedStudent() {
      this.selectedStudent = null;
    }
  }
});