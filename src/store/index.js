import Vuex from 'vuex';
import Vue from 'vue';
import punches from './modules/punches';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    punches,
  },
});
