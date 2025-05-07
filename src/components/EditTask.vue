<template>
  <div class="container mt-4">
    <input type="text" :value="id" hidden />

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
    <p v-if="!checkDate" class="card-text mb-2">
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

    <button @click="update" class="btn btn-primary">Update</button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axiosInstance from '@/services/axiosInstance'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const title = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')
const status = ref(0)
const priority = ref(0)
onMounted(async () => {
  const response = await axiosInstance.get(`task/${props.id}`)
  const data = response.data
  title.value = data.title
  description.value = data.description
  startDate.value = data.startDate
  endDate.value = data.endDate
  status.value = data.status
  priority.value = data.priority
})
const checkDate = computed(() => {
  const currentDateTime = new Date()
  const startDateTime = new Date(startDate.value)
  const endDateTime = new Date(endDate.value)
  return startDateTime < endDateTime
})
const update = async () => {
  if (!checkDate.value) {
    alert('Ngày tháng không hợp lệ!')
    return
  }
  const data = {
    title: title.value,
    description: description.value,
    startDate: startDate.value,
    endDate: endDate.value,
    status: status.value,
    priority: priority.value,
  }
  await axiosInstance.put(`task/${props.id}`, data)
  router.push('/task')
}
</script>
