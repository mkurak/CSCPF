const state = {
  messages: {
    toolbar: {
      view: false
    }
  }
};

const getters = {
  g_messages_toolbar_view(state) {
    return state.messages.toolbar.view;
  }
};

const mutations = {
  m_messages_toolbar_view(state, view) {
    state.messages.toolbar.view = view;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
