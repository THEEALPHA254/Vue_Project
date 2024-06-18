<!-- AddStudent.vue -->
<template>
  <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="editing_mode" type="info">
            Edit clicked Student
          </v-alert>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="studentName" label="Student Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="course" label="Course" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="department" label="Department"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="Email" required></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <v-btn :color="editing_mode ? 'warning' : 'primary'" type="submit">
            {{ editing_mode ? 'Update' : 'Add Student' }}
          </v-btn>
          <v-btn v-if="editing_mode" color="dark" class="mt-2" @click="discardEdit">
            Discard Edit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
import { useStudentStore } from '@/stores/counter.js'; // Adjust import path as per your actual store path
//import { useRouter } from 'vue-router';

const emit = defineEmits(['addStudent', 'updateStudent']); // Ensure defineEmits is imported

const studentStore = useStudentStore(); // Ensure useStudentStore is correctly imported
//const router = useRouter();

let studentName = ref('');
let course = ref('');
let department = ref('');
let email = ref('');
let editing_mode = ref(false);
let selectedStudent = ref(null);

function submitForm() {
  if (!studentName.value || !course.value || !department.value || !email.value) {
    return alert('Please fill out all required fields');
  }

  const Student = {
    studentName: studentName.value,
    course: course.value,
    department: department.value,
    email: email.value
  };

  if (editing_mode.value) {
    emit('updateStudent', selectedStudent.value.id, Student);
    editing_mode.value = false;
    selectedStudent.value = null;
  } else {
    emit('addStudent', Student);
  }

  resetForm();
}

function setEditStudent(Student) {
  studentName.value = Student.studentName;
  course.value = Student.course;
  department.value = Student.department;
  email.value = Student.email;
  selectedStudent.value = Student;
  editing_mode.value = true;
}

function discardEdit() {
  resetForm();
  editing_mode.value = false;
  selectedStudent.value = null;
}

function resetForm() {
  studentName.value = '';
  course.value = '';
  department.value = '';
  email.value = '';
}

// Watch for changes in the selectedStudent from the store
watch(() => studentStore.selectedStudent, (newStudent) => {
  if (newStudent) {
    setEditStudent(newStudent);
  }
});
</script>
