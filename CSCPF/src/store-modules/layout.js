import t from "../plugins/i18n";
import Tools from "../plugins/tools";

const state = {
  layout: {
    drawerStatus: false,
    appBarNavIconView: false,
    loading: {
      view: false,
      msg: t.t("layout.loading.defaultLoadingMsg")
    }
  }
};

const getters = {
  g_layout_drawerStatus(state) {
    return state.layout.drawerStatus;
  },
  g_layout_appBarNavIconView(state) {
    return state.layout.appBarNavIconView;
  },
  g_layout_loading_view(state) {
    return state.layout.loading.view;
  },
  g_layout_loading_msg(state) {
    return state.layout.loading.msg;
  }
};

const mutations = {
  m_layout_drawerStatus(state, status) {
    state.layout.drawerStatus = status;
  },
  m_layout_appBarNavIconView(state, status) {
    state.layout.appBarNavIconView = status;
  },
  m_layout_loading_view(state, status) {
    state.layout.loading.view = status;
    if (!status)
      state.layout.loading.msg = t.t("layout.loading.defaultLoadingMsg");
  },
  m_layout_loading_msg(state, msg) {
    state.layout.loading.view = true;
    state.layout.loading.msg = Tools.checkI18n(msg);
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
