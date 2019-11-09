import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import List from './views/List.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: List,
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  store.commit('setRouteLoading', true);
  next();
});

router.afterEach(() => {
  NProgress.done();
  store.commit('setRouteLoading', false);
});

export default router;
