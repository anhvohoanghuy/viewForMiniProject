<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <p hidden>{{ id }}</p>

      <h3 class="card-title h5">{{ title }}</h3>

      <p class="card-text mb-2 text-muted">{{ description }}</p>

      <p class="card-text mb-2">
        <small class="text-body-secondary"> Start date: {{ formatDate(startDate) }} </small>
      </p>
      <p class="card-text mb-2">
        <small class="text-body-secondary"> End date: {{ formatDate(endDate) }} </small>
      </p>

      <p class="mb-2">
        <span class="badge bg-info text-dark">Priority: {{ priority }}</span>
      </p>

      <p>
        <span v-if="status === 1" class="badge bg-secondary">Chưa bắt đầu</span>

        <span v-else-if="status === 2" class="badge bg-primary">Đang thực hiện</span>

        <span v-else-if="status === 3" class="badge bg-warning text-dark">Tạm dừng</span>

        <span v-else-if="status === 4" class="badge bg-success">Hoàn thành</span>

        <span v-else-if="status === 5" class="badge bg-danger">Quá hạn</span>
      </p>

      <div class="d-flex gap-2 mt-3">
        <DoneTask :id="id" @done="reload" />
        <router-link class="btn btn-outline-primary btn-sm" :to="'/task/edit/' + id"
          >Edit Task</router-link
        >
        <DeleteTask :id="id" @delete="reload" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DeleteTask from './DeleteTask.vue'
import DoneTask from './DoneTask.vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

// Hàm định dạng ngày
const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}
const router = useRouter()
defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['reload'])
const reload = () => {
  emit('reload')
}
</script>

<style scoped>
.todo-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 300px;
}

.todo-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #333;
}

.todo-description {
  font-size: 1rem;
  margin-bottom: 16px;
  color: #666;
}

.todo-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.todo-button:hover {
  background-color: #0056b3;
}
</style>
