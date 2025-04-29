<template>
  <form @submit.prevent="handleLogout" class="d-flex align-items-center gap-2">
    <input type="text" readonly v-model="refreshToken" hidden />
    <button type="submit" class="btn btn-danger">Logout</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../services/axiosInstance.js'
const router = useRouter()
const refreshToken = localStorage.getItem('refreshToken')
const emit = defineEmits(['logout'])
const handleLogout = async () => {
  try {
    await axiosInstance.post('auth/logout', {
      refreshToken: refreshToken,
      accessToken: localStorage.getItem('accessToken'),
      userId: localStorage.getItem('userId'),
    })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    emit('logout')
    router.push('/login')
  } catch (error) {
    console.log('Logout error:', error)
  }
}
</script>
<style scoped>
/* Add custom styles if needed */
</style>
