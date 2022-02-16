import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue';
import SongView from '@/views/SongView.vue';
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
      component: AboutView,
      meta: {
        requiresAuth: true
      }
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
      name: 'song',
      path: '/song/:id',
      component: SongView
    },
    {
      path: '/:catchAll(.*)*',
      component: PageNotFound
    }  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'text-yellow-200'
})

router.beforeEach((to,from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if(store.state.userLoggedIn) {
    next();
  } else {
    next({
      name: 'home'
    })
  }
});
export default router
