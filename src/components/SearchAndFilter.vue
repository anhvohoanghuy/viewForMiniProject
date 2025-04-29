<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-body">
        <!-- Search Bar -->
        <div class="row g-2 align-items-center mb-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              v-model="searchQuery"
              @input="filterItems"
            />
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" @click="filterItems">Search</button>
          </div>
        </div>

        <!-- Filter Options -->
        <div class="row g-3">
          <div class="col-md-3">
            <label for="status" class="form-label">Trạng thái:</label>
            <select id="status" class="form-select" v-model="selectedStatus" @change="filterItems">
              <option value="">All</option>
              <option value="1">Chưa bắt đầu</option>
              <option value="2">Đang thực hiện</option>
              <option value="3">Tạm dừng</option>
              <option value="4">Hoàn thành</option>
              <option value="5">Quá hạn</option>
            </select>
          </div>

          <div class="col-md-3">
            <label for="priority" class="form-label">Mức độ ưu tiên:</label>
            <select
              id="priority"
              class="form-select"
              v-model="selectedPriority"
              @change="filterItems"
            >
              <option value="">All</option>
              <option value="3">Cao</option>
              <option value="2">Vừa</option>
              <option value="1">Thấp</option>
            </select>
          </div>

          <div class="col-md-3">
            <label for="startDate" class="form-label">Start date:</label>
            <input
              type="date"
              id="startDate"
              class="form-control"
              v-model="selectedStartDate"
              @change="filterItems"
            />
          </div>

          <div class="col-md-3">
            <label for="endDate" class="form-label">End date:</label>
            <input
              type="date"
              id="endDate"
              class="form-control"
              v-model="selectedEndDate"
              @change="filterItems"
            />
          </div>
        </div>

        <!-- Reset button -->
        <div class="mt-4 text-end">
          <button class="btn btn-secondary" @click="resetFilters">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['update:searchResults'])
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedPriority = ref('')
const selectedStartDate = ref('')
const selectedEndDate = ref('')
const filterItems = () => {
  const result = props.items.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = selectedStatus.value
      ? item.status === parseInt(selectedStatus.value)
      : true
    const matchesPriority = selectedPriority.value
      ? item.priority === parseInt(selectedPriority.value)
      : true
    const matchesStartDate = selectedStartDate.value
      ? new Date(item.startDate) >= new Date(selectedStartDate.value)
      : true
    const matchesEndDate = selectedEndDate.value
      ? new Date(item.endDate) <= new Date(selectedEndDate.value)
      : true
    return matchesQuery && matchesStatus && matchesPriority && matchesStartDate && matchesEndDate
  })
  emit('update:searchResults', result)
}
</script>
