import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue';
import PageNotFound from '@/views/PageNotFound.vue';

const routes = [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'about',
      path: '/about',
      component: AboutView
    },
    {
      name: 'manage',
      path: '/manage',
      component: ManageView
    },
    {
      path: '/manage-music',
      redirect: {name: 'manage'}
    },
    {
      path: '/:catchAll(.*)*',
      component: PageNotFound
    }
    
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

export default router
