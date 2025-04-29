<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 400px">
      <h3 class="text-center mb-4">Login</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="userName" class="form-label">User name</label>
          <input type="text" class="form-control" id="userName" v-model="userName" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <p class="text-danger" v-if="err">{{ err }}</p>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../services/axiosInstance.js'
const userName = ref('')
const password = ref('')
const err = ref('')
const router = useRouter()
const emit = defineEmits(['login'])
const handleLogin = async () => {
  try {
    const response = await axiosInstance.post('auth/login', {
      username: userName.value,
      password: password.value,
    })
    if (response.status === 200) {
      // Lưu vào localStorage
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('userId', response.data.userId)
      emit('login')
      router.push('/')
    } else {
      err.value = 'Login failed. Please check your credentials.'
    }
  } catch (error) {
    err.value = 'Login failed. Please check your credentials.'
    console.log('Login error:', error)
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
