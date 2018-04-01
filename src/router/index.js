import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/user-login'
import UserRegistration from '@/components/user-registration'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User Login',
      component: UserLogin
    },
    {
      path: '/user-registration',
      name: 'User Registration',
      component: UserRegistration
    }
  ]
})
