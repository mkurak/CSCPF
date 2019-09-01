import i18n from "../plugins/i18n";

const state = {
  initializer: {
    systemLoadStatus: false,
    loginStatus: false
  }
};

const getters = {
  g_initializer_systemLoadStatus(state) {
    return state.initializer.systemLoadStatus;
  },
  g_initializer_loginStatus(state) {
    return state.initializer.loginStatus;
  }
};

const mutations = {
  m_initializer_systemLoadStatus(state, status) {
    state.initializer.systemLoadStatus = status;
  },
  m_initializer_loginStatus(state, status) {
    state.initializer.loginStatus = status;
  }
};

const actions = {
  a_initializer_start(context) {
    return new Promise(resolve => {
      context.commit(
        "m_layout_loading_msg",
        i18n.t("initializer.start.getToken")
      );

      context
        .dispatch("a_session_loadLocalToken")
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.checkToken")
          );

          return context.dispatch("a_session_token_check");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.loadSettings")
          );

          return context.dispatch("a_settings_loadLocal");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.loadStorageLocalData")
          );

          return context.dispatch("a_storages_storages_loadLocal");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.loadStorageLocalData")
          );

          return context.dispatch("a_storages_storages_loadStartup");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.saveStorageSettingsToLocal")
          );

          return context.dispatch("a_storages_storages_saveLocal");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.loadCurrentUser")
          );

          return context.dispatch("a_session_currentUser_load");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.loadNotifications")
          );

          return context.dispatch("a_notification_items_load");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.takeUsers")
          );

          return context.dispatch("a_socket_users_takeUsers");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.initSocket")
          );

          return context.dispatch("a_socket_init");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.startSocket")
          );

          return context.dispatch("a_socket_start");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);
            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit(
            "m_layout_loading_msg",
            i18n.t("initializer.start.saveSettings")
          );

          return context.dispatch("a_settings_saveLocal");
        })
        .then(() => {
          if (context.getters.g_session_token === null) {
            context.commit("m_layout_drawerStatus", false);
            context.commit("m_layout_appBarNavIconView", false);
            context.commit("m_messages_toolbar_view", false);
            context.commit("m_notification_toolbar_view", false);
            context.commit("m_session_toolbar_currentUserView", false);
            context.commit("m_socketUsers_toolbar_view", false);
            context.commit("m_socket_view", false);

            context.commit("m_initializer_systemLoadStatus", true);
            context.commit("m_initializer_loginStatus", false);

            context.commit("m_layout_loading_view", false);
            resolve();
            return;
          }

          context.commit("m_layout_drawerStatus", true);
          context.commit("m_layout_appBarNavIconView", true);
          context.commit("m_messages_toolbar_view", true);
          context.commit("m_notification_toolbar_view", true);
          context.commit("m_session_toolbar_currentUserView", true);
          context.commit("m_socketUsers_toolbar_view", true);
          context.commit("m_socket_view", true);

          context.commit("m_layout_loading_view", false);

          context.commit("m_initializer_systemLoadStatus", true);
          context.commit("m_initializer_loginStatus", true);

          resolve();
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
