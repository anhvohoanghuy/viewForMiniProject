<template>
  <button class="btn btn-success btn-sm" @click="markAsDone">Done Task</button>
</template>
<script setup>
import axiosInstance from '../services/axiosInstance.js'
const emit = defineEmits(['done'])
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const markAsDone = async () => {
  await axiosInstance.patch(`task/${props.id}/status`, null, {
    params: {
      id: props.id,
      status: 4,
    },
  })
  emit('done')
}
</script>
