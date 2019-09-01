import GlobalEnv from "../constants/global-env";

const state = {
  settings: {
    notification: {
      saveLocal: true
    },
    locale: "tr"
  }
};

const getters = {
  g_settings_notification_saveLocal(state) {
    return state.settings.notification.saveLocal;
  }
};

const mutations = {
  m_settings_notification_saveLocal(state, status) {
    state.settings.notification.saveLocal = status;
  }
};

const actions = {
  a_settings_loadLocal(context) {
    return new Promise(resolve => {
      const storagesToLoadSettingsLocal = localStorage.getItem(
        GlobalEnv.system.settingsLocalKey
      );
      if (storagesToLoadSettingsLocal) {
        context.state.settings = JSON.parse(storagesToLoadSettingsLocal);
      }
      resolve();
    });
  },
  a_settings_saveLocal(context) {
    return new Promise(resolve => {
      localStorage.setItem(
        GlobalEnv.system.settingsLocalKey,
        JSON.stringify(context.state.settings)
      );
      resolve();
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
