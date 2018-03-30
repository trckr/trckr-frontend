import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/user-login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User Login',
      component: UserLogin
    }
  ]
})
