const state = {
  socketUsers: {
    toolbar: {
      view: false
    }
  }
};

const getters = {
  g_socketUsers_toolbar_view(state) {
    return state.socketUsers.toolbar.view;
  }
};

const mutations = {
  m_socketUsers_toolbar_view(state, view) {
    state.socketUsers.toolbar.view = view;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
