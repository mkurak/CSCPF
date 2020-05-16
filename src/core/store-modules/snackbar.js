import { uniqueId, findIndex } from "underscore";

const state = {
  snackbarMessages: []
};
const getters = {
  g_snackbarMessages(state) {
    return state.snackbarMessages;
  }
};
const mutations = {};
const actions = {
  a_snackbarMessage_add({ state }, payload) {
    state.snackbarMessages.push({
      id: uniqueId("item_"),
      color: payload.color,
      message: payload.message
    });
  },
  a_snackbarMessage_remove({ state }, id) {
    const index = findIndex(state.snackbarMessages, {
      id: id
    });
    if (index !== -1) {
      state.snackbarMessages.splice(index, 1);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
