<script setup>
import Login from '../components/Login.vue'
const emit = defineEmits(['login'])

const onLoginSuccess = () => {
  emit('login')
}
</script>

<template>
  <main>
    <Login @login="onLoginSuccess" />
  </main>
</template>
