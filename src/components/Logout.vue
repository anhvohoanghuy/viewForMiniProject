<template>
  <form @submit.prevent="handleLogout" class="d-flex align-items-center gap-2">
    <input type="text" readonly v-model="refreshToken" hidden />
    <button type="submit" class="btn btn-danger">Logout</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const emit = defineEmits(['logout'])
const handleLogout = async () => {
  try {
    await axios.post('http://localhost:8080/api/auth/logout', {
      refreshToken: localStorage.getItem('refreshToken'),
      accessToken: localStorage.getItem('accessToken'),
      userId: localStorage.getItem('userId'),
    })
  } catch (error) {
    console.log('Logout error:', error)
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    emit('logout')
    router.push('/login')
  }
}
</script>
<style scoped>
/* Add custom styles if needed */
</style>
