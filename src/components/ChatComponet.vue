<template>
  <div class="chat-container">
    <h2>💬 Chat Room (Public)</h2>

    <div class="messages">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <strong>{{ msg.user }}:</strong> {{ msg.content }}
        <span class="timestamp">{{ formatTime(msg.timestamp) }}</span>
      </div>
    </div>

    <div class="input-area">
      <input v-model="input" @keyup.enter="send" placeholder="Nhập tin nhắn..." />
      <button @click="send">Gửi</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { connect, sendMessage } from '../services/webSocket' // Giả sử bạn đã tạo một service cho WebSocket
const messages = ref([])
const input = ref('')
const user = localStorage.getItem('userId') // User tạm (có thể lấy từ auth sau)

onMounted(() => {
  connect((msg) => {
    messages.value.push(msg)
  })
})

function send() {
  if (input.value.trim()) {
    sendMessage(user, input.value.trim())
    input.value = ''
  }
}

function formatTime(timestamp) {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleTimeString()
}
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
}
.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}
.message {
  margin: 8px 0;
}
.timestamp {
  font-size: 0.8rem;
  color: gray;
  margin-left: 8px;
}
.input-area {
  display: flex;
  gap: 8px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 12px;
}
</style>
