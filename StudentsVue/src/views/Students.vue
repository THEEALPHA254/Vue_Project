<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="all_students.length === 0" type="warning" text>
          Fill the form
        </v-alert>
        <v-alert v-else type="success" text>
          Form successfully filled
        </v-alert>
      </v-col>
      <v-col cols="12">
        <StudentList :all_students="all_students" @deleteStudent="deleteStudent" @editStudent="editStudent" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import StudentList from '@/components/StudentList.vue';
import { useRouter } from 'vue-router';
import { useStudentStore } from '@/stores/counter.js';

let all_students = ref([]);
const router = useRouter();
const studentStore = useStudentStore();

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

async function fetchStudents() {
  try {
    const response = await api.get('students/');
    all_students.value = response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

async function deleteStudent(id) {
  try {
    await api.delete(`student/${id}/`);
    all_students.value = all_students.value.filter(student => student.id !== id);
  } catch (error) {
    console.error('Error deleting student:', error);
  }
}

function editStudent(id) {
  const student = all_students.value.find(student => student.id === id);
  if (student) {
    studentStore.setSelectedStudent(student);
    router.push({ name: 'home' });
  } else {
    console.error('Student not found with id:', id);
  }
}

onMounted(() => {
  fetchStudents();
});
</script>
