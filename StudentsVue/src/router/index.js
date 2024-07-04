// index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Summarry from '@/views/Summarry.vue'
import Sum from '@/views/Sum.vue'
import Students from '@/views/Students.vue'
import Register from '@/components/Register.vue'
import LogIn from '@/components/LogIn.vue'
import Products from '@/views/Products.vue'
import Category from '@/components/Category.vue'
import Brand from '@/components/Brand.vue'
import ProductView from'@/views/ProductView.vue'
import WooProduct from '@/views/AddProductWoo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireLogin: true
      }
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
      meta: {
        requireLogin: true
      }
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
      meta: {
        redirectIfLoggedIn: true
      }
    },
    {
      path: "/products",
      name: "products",
      component: Products,
      meta: {
        requireLogin: true
      }
    },
    {
      path: "/productsView",
      name: "productsView",
      component: ProductView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: "/category",
      name: "category",
      component: Category,
      meta: {
        requireLogin: true
      }
    },
    {
      path: "/brand",
      name: "brand",
      component: Brand,
      meta: {
        requireLogin: true
      }
    },
    {
      path: "/WooProduct",
      name: "WooProduct",
      component: WooProduct,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requireLogin: true
      }
    },
   
  ]
})


router.beforeEach((to, _, next)=>{
  console.log('me')

  const isUserLoggedIn = () => {
    return localStorage.getItem('userData')
  }

  let status = isUserLoggedIn()

  if(!status && to.meta.requireLogin == true){
    next({ name: 'login'})
  }
  
  console.log(to.meta.redirectIfLoggedIn);
  if(to.meta.redirectIfLoggedIn == true && status){
    next({ name: 'home' })
  }
  
  return next()



})
export default router
