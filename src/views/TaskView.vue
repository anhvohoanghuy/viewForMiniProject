<template>
  <div class="about">
    <SearchAndFilter :items="items" @update:searchResults="updateSearchResults" />
    <RouterLink class="btn btn-primary" to="/task/create">Create Task</RouterLink>
    <RenderCard :items="searchResults" @reload="reload" />
  </div>
</template>
<script setup>
import SearchAndFilter from '../components/SearchAndFilter.vue'
import RenderCard from '../components/RenderCard.vue'
import { onMounted, ref } from 'vue'
import axiosInstance from '@/services/axiosInstance'
const items = ref([])
//cập nhật dữ liệu từ backend
const getData = async () => {
  try {
    const response = await axiosInstance.get('task', {
      params: {
        userId: localStorage.getItem('userId'),
      },
    })
    items.value = response.data
    searchResults.value = response.data
  } catch (error) {
    console.log('Error fetching items:', error)
  }
}
onMounted(async () => {
  await getData()
})
const searchResults = ref(items.value)
const updateSearchResults = (results) => {
  searchResults.value = results
}
const reload = () => {
  getData()
}
</script>
<style></style>
