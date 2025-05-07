<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="mb-4 text-center">Đăng ký tài khoản</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" class="form-control" v-model="username" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" v-model="password" required />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              class="form-control"
              v-model="confirmPassword"
              required
            />
          </div>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Mật khẩu không khớp!'
    return
  }

  try {
    const response = await axios.post('http://localhost:8080/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })

    if (response.status === 200) {
      router.push('/login')
    } else {
      errorMessage.value = 'Đăng ký thất bại!'
    }
  } catch (error) {
    errorMessage.value = 'Đã xảy ra lỗi trong quá trình đăng ký!'
  }
}
</script>
