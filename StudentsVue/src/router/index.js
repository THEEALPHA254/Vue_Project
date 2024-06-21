import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Summarry from '@/views/Summarry.vue'
import Sum from '@/views/Sum.vue'
import Students from '@/views/Students.vue'
import Register from '@/components/Register.vue'
import LogIn from '@/components/LogIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/sum",
      name: "sum",
      component: Sum,
    },
    {
      path: "/summary",
      name: "summary",
      component: Summarry,
    },
    {
      path: "/students",
      name: "students",
      component: Students,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: LogIn,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
   
  ]
})

export default router
