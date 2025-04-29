<template>
  <button class="btn btn-danger btn-sm" @click="deleteTask">Delete</button>
</template>
<script setup>
import axiosInstance from '../services/axiosInstance.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const emit = defineEmits(['delete'])
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const deleteTask = async () => {
  await axiosInstance.delete(`task/${props.id}`)
  emit('delete')
}
</script>
