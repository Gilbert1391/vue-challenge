import moment from 'moment';

const state = {
  punches: [],
  punchStatus: null,
};

const getters = {
  punchStatus: (state) => state.punchStatus,
};

const actions = {
  initPunch({ commit }, form) {
    const type = 'Entrada';

    const initPunchTime = moment().format('h:mm:ss a');
    const punch = {
      ...form,
      type,
      initPunchTime,
    };
    commit('setInitPunch', punch);
  },
};

const mutations = {
  setInitPunch: (state, punch) => {
    state.punchStatus = punch.type;
    state.punches.push(punch);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
