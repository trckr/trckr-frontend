import Vue from 'vue';

Vue.config.productionTip = false;

global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;
