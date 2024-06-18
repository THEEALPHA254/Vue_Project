<!-- AddStudent.vue -->
<template>
  <v-form @submit.prevent="submitForm" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="editing_mode" type="info">
            Edit clicked Student
          </v-alert>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined" v-model="studentName" label="Student Name" :rules="[rules.required]" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined" v-model="course" label="Course" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined" v-model="department" label="Department"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined" v-model="email" label="Email" :rules="[rules.required, rules.email]" required></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="6">
          <v-btn :color="editing_mode ? 'warning' : 'primary'" type="submit" >
            {{ editing_mode ? 'Update' : 'Add Student' }} 
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn v-if="editing_mode" color="dark" class="mt-2" @click="discardEdit">
            Discard Edit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStudentStore } from '@/stores/counter.js'; // Adjust import path as per your actual store path

const emit = defineEmits(['addStudent', 'updateStudent']);

const studentStore = useStudentStore();

const studentName = ref('');
const course = ref('');
const department = ref('');
const email = ref('');
const editing_mode = ref(false);
const selectedStudent = ref(null);

const form = ref(null);

const rules = {
  required: value => !!value || 'Required.',
  email: value => {
    const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
};

function submitForm() {
  if (!form.value.validate()) {
    alert('Please fill out all required fields correctly.');
    return;
  }

  const payload = {
    studentName: studentName.value,
    course: course.value,
    department: department.value,
    email: email.value
  };

  if (editing_mode.value) {
    emit('updateStudent', selectedStudent.value.id, payload);
    editing_mode.value = false;
    selectedStudent.value = null;
  } else {
    emit('addStudent', payload);
  }

resetForm();
}

function setEditStudent(student) {
  studentName.value = student.studentName;
  course.value = student.course;
  department.value = student.department;
  email.value = student.email;
  selectedStudent.value = student;
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
  form.value.resetValidation();
  form.value.reset();
}

// Watch for changes in the selectedStudent from the store
watch(() => studentStore.selectedStudent, (newStudent) => {
  if (newStudent) {
    setEditStudent(newStudent);
  }
});

defineExpose({
  setEditStudent
});
</script>
