<!-- HomeView.vue -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AddStudent ref="addstudentref" @addStudent="addStudent" @updateStudent="updateStudent" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddStudent from '@/components/AddStudent.vue';
import { toast } from 'vue3-toastify';
import { useStudentStore } from '@/stores/counter';
import axiosInstance from '@/services/auth';

let all_students = ref([]);
const addstudentref = ref(null);
const studentStore = useStudentStore();

const Api = axiosInstance

async function fetchStudents() {
  try {
    const response = await Api.get('api/students/');
    if (Array.isArray(response.data)) {
      console.log('Fetched students', response.data);
      all_students.value = response.data;
    } else {
      console.error('Unexpected API response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching students:');
  }
}


async function addStudent(Student) {
  try {
    Api.post('api/students/', Student).then((response)=>{
      fetchStudents()
      toast.success('Student added successfully');
    }).catch((err)=>{
      toast.error('Failed to add student');
    })
  } catch (error) {
    console.error('Error adding Student:', error.response ? error.response.data : error.message);
  }
}


async function updateStudent(id, updatedStudent) {
  try {
    await Api.put(`api/student/${id}/`, updatedStudent);
    fetchStudents();
    toast.success('Student updated successfully');
  } catch (error) {
    console.error('Error updating Student:', error.response ? error.response.data : error.message);
  }
}


onMounted(() => {
  fetchStudents();

  if (studentStore.selectedStudent) {
    setTimeout(()=>{

      addstudentref.value.setEditStudent(studentStore.selectedStudent);
      studentStore.clearSelectedStudent();
    },1000)
  }
});
</script>
