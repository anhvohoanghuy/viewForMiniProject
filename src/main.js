import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Import bootstrap JS (nếu cần sử dụng dropdown, modal, toast...)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const app = createApp(App)

app.use(router)

app.mount('#app')
