import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '@/components/UserLogin';
import UserRegistration from '@/components/UserRegistration';
import Dashboard from '@/components/Dashboard';
import CreateProject from '@/components/CreateProject';
import ProjectPage from '@/components/ProjectPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'User Login',
    component: UserLogin,
  }, {
    path: '/register',
    name: 'User registration',
    component: UserRegistration,
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
    }
  }, {
    path: '/createproject',
    name: 'Create Project',
    component: CreateProject,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/:id',
    name: 'Project page',
    component: ProjectPage,
    meta: {
      requiresAuth: true,
    }
  },
    ],
});
