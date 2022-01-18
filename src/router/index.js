import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import store from '@/store';

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
      component: ManageView,
      meta: {
        requiresAuth: true
      }
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

router.beforeEach((to,from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if(store.$state.userLoggedIn) {
    next();
  } else {
    next({
      name: 'home'
    })
  }
});
export default router
