<template>
  <form @submit.prevent="add">
    <div class="container mt-4">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input type="text" id="title" v-model="title" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <input type="text" id="description" v-model="description" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Start Date:</label>
        <input
          type="datetime-local"
          id="startDate"
          v-model="startDate"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="endDate" class="form-label">End Date:</label>
        <input type="datetime-local" id="endDate" v-model="endDate" class="form-control" required />
      </div>

      <p v-if="checkDate" class="card-text mb-2">
        <small class="text-danger"> ngày tháng không hợp lệ </small>
      </p>

      <div class="mb-3">
        <label for="status" class="form-label">Status:</label>
        <select id="status" v-model.number="status" class="form-select">
          <option value="1">Chưa hoàn thành</option>
          <option value="2">Đang thực hiện</option>
          <option value="3">Tạm dừng</option>
          <option value="4">Hoàn thành</option>
          <option value="5">Quá hạn</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="priority" class="form-label">Priority:</label>
        <select id="priority" v-model.number="priority" class="form-select">
          <option value="1">Thấp</option>
          <option value="2">Vừa</option>
          <option value="3">Cao</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </div>
  </form>
</template>
<script setup>
import { ref, computed } from 'vue'
import axiosInstance from '@/services/axiosInstance'
import { useRouter } from 'vue-router'
const currentDateTime = new Date().toISOString().slice(0, 16) // "yyyy-mm-ddTHH:mm"
const router = useRouter()
const title = ref('')
const description = ref('')
const startDate = ref(currentDateTime)
const endDate = ref(currentDateTime)
const status = ref(1)
const priority = ref(1)
const checkDate = computed(() => {
  const currentDateTime = new Date().toISOString().slice(0, 16) // "yyyy-mm-ddTHH:mm"
  return (
    startDate.value < currentDateTime ||
    endDate.value < currentDateTime ||
    startDate.value > endDate.value
  )
})
const add = async () => {
  if (!checkDate.value) {
    alert('Ngày tháng không hợp lệ!')
    return
  }
  const response = await axiosInstance.post('task', {
    title: title.value,
    description: description.value,
    startDate: startDate.value,
    endDate: endDate.value,
    status: status.value,
    priority: priority.value,
    userId: localStorage.getItem('userId'),
  })
  if (response.status === 201) {
    console.log('Task updated successfully')
    router.push('/task')
  } else {
    console.error('Failed to update task')
  }
}
</script>
