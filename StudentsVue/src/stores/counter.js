// counter.js
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
    setSelectedStudent(Student) {
      this.selectedStudent = Student;
    },
    clearSelectedStudent() {
      this.selectedStudent = null;
    }
  }
});