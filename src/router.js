import Vue from 'vue';
import Router from 'vue-router';
import CreateProject from '@/components/CreateProject';
import CreateTask from '@/components/CreateTask';
import Dashboard from '@/components/Dashboard';
import EditProject from '@/components/EditProject';
import ProjectPage from '@/components/ProjectPage';
import TaskPage from '@/components/TaskPage';
import UserLogin from '@/components/UserLogin';
import UserRegistration from '@/components/UserRegistration';


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
    path: '/project/create',
    name: 'Create Project',
    component: CreateProject,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/:projectid',
    name: 'Project page',
    component: ProjectPage,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/:projectid/task/create',
    name: 'Create Task',
    component: CreateTask,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/:projectid/task/:taskid',
    name: 'task page',
    component: TaskPage,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/edit/:projectid',
    name: 'edit project',
    component: EditProject,
    meta: {
      requiresAuth: true,
    }
  },
    ],
});
