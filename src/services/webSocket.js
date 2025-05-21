// src/websocket.js
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let stompClient = null

export function connect(onMessageReceived) {
  const socket = new SockJS('http://localhost:8080/ws') // Điểm kết nối WebSocket ở server
  stompClient = Stomp.over(socket)

  stompClient.connect({}, () => {
    console.log('✅ WebSocket connected')

    // Đăng ký lắng nghe tin nhắn broadcast từ server
    stompClient.subscribe('/topic/private/' + userId, onMessage)
    stompClient.subscribe('/topic/group/' + groupId, onMessage)
  })
}

export function sendMessage(user, content) {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/send-message', {}, JSON.stringify({ user, content }))
  }
}
