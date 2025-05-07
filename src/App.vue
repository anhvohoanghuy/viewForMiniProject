<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Logout from './components/Logout.vue'
import { onMounted, onUnmounted, ref } from 'vue'
const isLoggedIn = ref(false)
const checkLogin = () => {
  isLoggedIn.value = !!localStorage.getItem('accessToken')
}
onMounted(() => {
  checkLogin()
})

onUnmounted(() => {})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">MyApp</RouterLink>

      <!-- ADD THIS BUTTON -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/task">Task</RouterLink>
          </li>
        </ul>
        <!-- login,logout -->
        <div class="d-flex">
          <div v-if="!isLoggedIn" class="d-flex">
            <RouterLink class="btn btn-outline-primary me-2" to="/register">Register</RouterLink>
            <RouterLink class="btn btn-outline-primary me-2" to="/login">Login</RouterLink>
          </div>
          <div class="d-flex" v-else>
            <RouterLink class="btn btn-outline-primary me-2" to="/password"
              >Change password</RouterLink
            >
            <Logout @logout="checkLogin" />
          </div>
        </div>
      </div>
    </div>
  </nav>

  <RouterView @login="checkLogin" />
</template>

<style scoped></style>
