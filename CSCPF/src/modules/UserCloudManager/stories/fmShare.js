import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import sha1 from "sha1";

const state = {
  storages: {
    modules: {
      userCloudManager: {
        fmShare: {
          items: []
        }
      }
    }
  }
};

const getters = {
  g_storages_modules_userCloudManager_fmShare_items(state) {
    return state.storages.modules.userCloudManager.fmShare.items;
  }
};

const mutations = {
  m_storages_modules_userCloudManager_fmShare_items(state, items) {
    state.storages.modules.userCloudManager.fmShare.items = items;
  }
};

const actions = {
  a_storages_modules_userCloudManager_fmShare_items_load(context) {
    return new Promise(resolve => {
      let hash = sha1(
        context.rootGetters.g_session_currentUser.id +
          GlobalEnv.hashCodes.modules.userCloudManager.fm.getSharedFiles
      );

      Tools.apiAuthGet(
        GlobalEnv.api.modules.userCloudManager.fm.getSharedFiles +
          "?UserId=" +
          context.rootGetters.g_session_currentUser.id +
          "&Hash=" +
          hash
      )
        .then(data => {
          context.commit(
            "m_storages_modules_userCloudManager_fmShare_items",
            data
          );
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  },
  a_storages_modules_userCloudManager_fmShare_items_socket_add(context) {
    return new Promise(resolve => {
      context
        .dispatch("a_storages_modules_userCloudManager_fmShare_items_load")
        .then(() => {
          resolve();
        });
    });
  },
  a_storages_modules_userCloudManager_fmShare_items_socket_remove(context) {
    return new Promise(resolve => {
      context
        .dispatch("a_storages_modules_userCloudManager_fmShare_items_load")
        .then(() => {
          resolve();
        });
    });
  },
  a_storages_modules_userCloudManager_fmShare_items_clear(context) {
    return new Promise(resolve => {
      context.commit("m_storages_modules_userCloudManager_fmShare_items", []);
      resolve(true);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
