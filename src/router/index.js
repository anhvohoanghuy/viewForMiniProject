import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import EditTask from '@/components/EditTask.vue'
import CreateTask from '@/components/CreateTask.vue'
import DeleteTask from '@/components/DeleteTask.vue'
import Register from '@/components/Register.vue'
import ChangePassword from '@/components/ChangePassword.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/task',
      name: 'task',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TaskView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/task/edit/' + ':id',
      name: 'edit',
      props: true,
      component: EditTask,
    },
    {
      path: '/task/create/',
      name: 'Create',
      component: CreateTask,
    },
    {
      path: '/register/',
      name: 'Register',
      component: Register,
    },
    {
      path: '/password/',
      name: 'change-password',
      component: ChangePassword,
    },
  ],
})

export default router
