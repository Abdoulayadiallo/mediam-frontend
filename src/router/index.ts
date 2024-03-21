import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewArticle from '@/views/Article/ViewArticle.vue'
import ViewLogin from '@/views/Login/ViewLogin.vue'
import ViewSignUp from '@/views/SignUp/ViewSignUp.vue'
import ViewAddArticle from '@/views/AddArticle/ViewAddArticle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ViewArticle
    },
    {
      path: '/login',
      name: 'login',
      component: ViewLogin
    },
    {
      path: '/signup',
      name: 'signup',
      component: ViewSignUp
    },
    {
      path: '/add-article',
      name: 'addarticle',
      component: ViewAddArticle
      // meta: {
      //   requiresAuth: true // Add meta field to indicate protected route
      // }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      // User is authenticated, proceed to the route
      next()
    } else {
      // User is not authenticated, redirect to login
      next('/login')
    }
  } else {
    // Non-protected route, allow access
    next()
  }
})

export default router