import Vue from 'vue';
import App from './App';
import { store } from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$apiBaseUrl = 'https://trckr-api.trvlr.ch';

// Auto Login if we have a user object in the local storage.
if (typeof localStorage.trckrCurrentUser !== 'undefined') {
  const currentUser = JSON.parse(localStorage.trckrCurrentUser);

  if (currentUser.hasOwnProperty('username')) {
    store.dispatch({
      type: 'login',
      username:  currentUser.username,
      token: currentUser.token,
    });
  }
}

// Redirect to /login if route requires authentication but we're not logged in.
router.beforeEach(function (to, from, next) {
  const isLoggedIn = store.getters.isLoggedIn;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (to.fullPath === '/') {
    if (isLoggedIn) {
      next('/dashboard');
    } else {
      next('/login');
    }
  } else if (to.fullPath === '/login') {
    if (isLoggedIn) {
      next('/dashboard');
    } else {
      next();
    }
  } else if (to.fullPath === '/logout') {
    store.dispatch({
      type: 'logout',
    });
    next('/');
  } else if (requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

// Create application.
new Vue({
  el: '#app',
  store: store,
  router: router,
  components: { App },
  template: '<App/>',
});
