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
    /**
     * on login the token and the username are pushed into the local store
     * @param state
     * @param username
     * @param token
     */
    login(state, { username, token }) {
      state.currentUser = {
        username: username,
        token: token,
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
