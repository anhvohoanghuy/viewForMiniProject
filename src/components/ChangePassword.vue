<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card shadow" style="max-width: 400px; width: 100%">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Đổi mật khẩu</h2>
        <form @submit.prevent="changePassword">
          <div class="mb-3">
            <label for="currentPassword" class="form-label">Mật khẩu hiện tại</label>
            <input
              type="password"
              id="currentPassword"
              v-model="currentPassword"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="newPassword" class="form-label">Mật khẩu mới</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="form-control"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Đổi mật khẩu</button>
        </form>

        <div v-if="message" :class="messageClass + ' mt-3 p-2 rounded text-center'">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/services/axiosInstance'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const messageClass = ref('')

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Mật khẩu mới không khớp!'
    messageClass.value = 'alert alert-danger'
    return
  }

  try {
    const userId = localStorage.getItem('userId')
    const response = await axiosInstance.patch(`/auth/${userId}/changePassword`, {
      CurrentPassword: currentPassword.value,
      NewPassword: newPassword.value,
    })
    message.value = response.data
    messageClass.value = 'alert alert-success'
  } catch (error) {
    message.value = error.response?.data || 'Đã xảy ra lỗi!'
    messageClass.value = 'alert alert-danger'
  }
}
</script>
