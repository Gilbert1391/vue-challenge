import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import store from './store';
import InitPunch from './components/InitPunch';
import Punches from './components/Punches';
import PunchHistory from './components/PunchHistory';
import PunchDiary from './components/PunchDiary';

Vue.config.productionTip = false;

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: InitPunch,
    },
    {
      path: '/ponches',
      component: Punches,
    },
    {
      path: '/historial',
      component: PunchHistory,
    },
    {
      path: '/diario',
      component: PunchDiary,
    },
  ],
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
