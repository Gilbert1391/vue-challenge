import moment from 'moment';

const state = {
  punches: [],
  currentPunchStatus: null,
  initPunchDate: null,
  employeeName: null,
  breakCounter: 0,
  lunchCounter: 0,
};

const getters = {
  getCurrentPunchStatus: (state) => state.currentPunchStatus,
  getInitPunchDate: (state) => state.initPunch,
  getBreakCounter: (state) => state.breakCounter,
  getLunchCounter: (state) => state.lunchCounter,
};

const actions = {
  initPunch({ commit }, form) {
    const { employeeName, date } = form;

    commit('SET_INIT_PUNCH_DATE', date);
    commit('SET_EMPLOYEE_NAME', employeeName);
  },

  addPunch({ commit, rootState }, type) {
    const time = moment().format('h:mm:ss a');

    const punch = {
      date: rootState.punch.initPunchDate,
      employeeName: rootState.punch.employeeName,
      type,
      time,
    };

    commit('SET_CURRENT_PUNCH_STATUS', type);
    commit('ADD_PUNCH', punch);
  },

  incrementBreakCounter({ commit }) {
    commit('INCREMENT_BREAKS_COUNTER');
  },
  incrementLunchCounter({ commit }) {
    commit('INCREMENT_LUNCH_COUNTER');
  },
};

const mutations = {
  SET_CURRENT_PUNCH_STATUS: (state, status) => (state.currentPunchStatus = status),
  SET_EMPLOYEE_NAME: (state, name) => (state.employeeName = name),
  SET_INIT_PUNCH_DATE: (state, date) => (state.initPunchDate = date),
  ADD_PUNCH: (state, punch) => state.punches.push(punch),
  INCREMENT_BREAKS_COUNTER: (state) => ++state.breakCounter,
  INCREMENT_LUNCH_COUNTER: (state) => ++state.lunchCounter,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
