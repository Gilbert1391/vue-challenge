import Vuex from 'vuex';
import Vue from 'vue';
import punch from './modules/punches';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    punch,
  },
});
