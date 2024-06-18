<!-- StudentList.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  all_students: Array
});

const emit = defineEmits(['deleteStudent', 'editStudent']);

function deleteStudent(id) {
  // Emit delete event to parent
  console.log('delete');
  emit('deleteStudent', id);
}

function editStudent(id) {
  console.log('edit student', id);

  // Emit edit event to parent
  emit('editStudent', id);
}
</script>


<template>
    <div>
        <div class="card my-3" v-for="Student in all_students" :key="Student.id">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <span>{{ Student.studentName }} | {{ Student.course }} | {{ Student.department }} | {{ Student.email }}</span>
                    <div>
                        <i class="fa-solid fa-edit me-4" @click="editStudent(Student.id)"></i>
                        <i class="fa-solid fa-trash " @click.stop="deleteStudent(Student.id)"></i>
                    </div>
    
                </div>
            </div>
    </div>
    </div>
</template>

<style lang="">

</style>