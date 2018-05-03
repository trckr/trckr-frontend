import Vue from 'vue';
import Router from 'vue-router';

import CreateProject from '@/components/CreateProject';
import CreateTask from '@/components/CreateTask';
import Dashboard from '@/components/Dashboard';
import EditProject from '@/components/EditProject';
import ProjectPage from '@/components/ProjectPage';
import Projects from '@/components/Projects';
import TaskPage from '@/components/TaskPage';
import TimeEntries from '@/components/TimeEntries';
import TimeEntryForm from '@/components/TimeEntryForm';
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
    path: '/project/:projectId',
    name: 'Project page',
    component: ProjectPage,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/:projectId/task/create',
    name: 'Create Task',
    component: CreateTask,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/:projectId/task/:taskId',
    name: 'Task page',
    component: TaskPage,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/project/edit/:projectId',
    name: 'Edit project',
    component: EditProject,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/projects',
    name: 'All projects',
    component: Projects,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/time-entries',
    name: 'All time entries',
    component: TimeEntries,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/time-entry/create',
    name: 'Create time entry',
    component: TimeEntryForm,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/time-entry/:timeEntryId/edit',
    name: 'Edit time entry',
    component: TimeEntryForm,
    meta: {
      requiresAuth: true,
    }
  }]
});
