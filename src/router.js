import Vue from 'vue';
import Router from 'vue-router';
import { store } from './store';
import UserLogin from '@/components/UserLogin';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'User Login',
    component: UserLogin,
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/logout',
    name: 'User Logout',
    meta: {
      requiresAuth: true,
    },
  }],
});
