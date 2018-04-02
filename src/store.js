import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: {},
  },
  getters: {
    isLoggedIn(state) {
      if (Object.keys(state.currentUser).length === 0 && state.currentUser.constructor === Object) {
        return false;
      }

      return true;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
  mutations: {
    login(state, { username, password }) {
      state.currentUser = {
        id: 1,
        username: username,
      };

      localStorage.trckrCurrentUser = JSON.stringify(state.currentUser);
    },
    logout(state) {
      state.currentUser = {};

      localStorage.trckrCurrentUser = JSON.stringify(state.currentUser);
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
});
