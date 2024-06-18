<template>
  <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="editing_mode" type="info">
            Edit clicked Name
          </v-alert>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined"
            v-model="studentName"
            label="Name"
            :error-messages="errors.studentName"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined"
            v-model="contact"
            label="Contact"
            :error-messages="errors.contact"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined"
            v-model="department"
            label="Department"
            :error-messages="errors.department"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined"
            v-model="email"
            label="Email"
            :error-messages="errors.email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="6">
          <v-btn :color="editing_mode ? 'warning' : 'primary'" type="submit">
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
import { useStudentStore } from '@/stores/counter.js';
//import { useRouter } from 'vue-router';

const emit = defineEmits(['addStudent', 'updateStudent']);

const studentStore = useStudentStore();
//const router = useRouter();

const studentName = ref('');
const contact = ref('');
const department = ref('');
const email = ref('');
const editing_mode = ref(false);
const selectedStudent = ref(null);
let errors = ref({
  studentName: [],
  contact: [],
  department: [],
  email: []
});

function validateForm() {
  errors.value.studentName = [];
  errors.value.contact = [];
  errors.value.department = [];
  errors.value.email = [];

  if (studentName.value.length < 2) {
    errors.value.studentName.push('Name needs to be at least 2 characters.');
  }

  if (!contact.value.match(/^\d{9,}$/)) {
    errors.value.contact.push('Phone number needs to be at least 9 digits.');
  }

  if (department.value.length < 2) {
    errors.value.department.push('Department needs to be at least 2 characters.');
  }

  if (!email.value.match(/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i)) {
    errors.value.email.push('Must be a valid e-mail.example@gmail.com');
  }

  return (
    errors.value.studentName.length === 0 &&
    errors.value.contact.length === 0 &&
    errors.value.department.length === 0 &&
    errors.value.email.length === 0
  );
}

function submitForm() {
  if (!validateForm()) {
    return;
  }

  const payload = {
    studentName: studentName.value,
    contact: contact.value,
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
  contact.value = student.contact;
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
  contact.value = '';
  department.value = '';
  email.value = '';
  errors.value = {
    studentName: [],
    contact: [],
    department: [],
    email: []
  };
}

defineExpose({
  setEditStudent
});
// Watch for changes in the selectedStudent from the store
watch(() => studentStore.selectedStudent, (newStudent) => {
  if (newStudent) {
    setEditStudent(newStudent);
  }
});
</script>
