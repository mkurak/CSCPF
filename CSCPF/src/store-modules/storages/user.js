import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";
import t from "../../plugins/i18n";
import sha1 from "sha1";

const state = {
  storages: {
    user: {
      items: []
    }
  }
};

const getters = {
  g_storages_user_items(state) {
    return state.storages.user.items;
  },
  g_storages_user_getUser(state) {
    return id => {
      let find = state.storages.user.items.filter(item => {
        return item.user.id === id;
      });

      if (find.length > 0) return find[0];
      else return t.t("storages.user.g_storages_user_getUser.notFoundText");
    };
  },
  g_storages_user_fullName(state) {
    return id => {
      let find = state.storages.user.items.filter(item => {
        return item.user.id === id;
      });

      if (find.length > 0)
        return find[0].user.name + " " + find[0].user.surname;
      else return t.t("storages.user.g_storages_user_fullName.notFoundText");
    };
  }
};

const mutations = {
  m_storages_user_items(state, items) {
    state.storages.user.items = items;
  },
  m_storages_user_items_add(state, user) {
    state.storages.user.items.push(user);
  },
  m_storages_user_items_update(state, user) {
    state.storages.user.items = [
      ...state.storages.user.items.filter(
        element => element.user.id !== user.user.id
      ),
      user
    ];
  },
  m_storages_user_items_remove(state, id) {
    let targetIndex = -1;
    for (let i = 0; i < state.storages.user.items.length; i++) {
      let item = state.storages.user.items[i];
      if (item.user.id === id) targetIndex = i;
    }

    if (targetIndex > -1) state.storages.user.items.splice(targetIndex, 1);
  }
};

const actions = {
  a_storages_user_items_load(context) {
    return new Promise(resolve => {
      Tools.apiAuthGet_withHash_listData(
        GlobalEnv.api.userManagement.user.ListWithDetails,
        null,
        null,
        null,
        null,
        GlobalEnv.hashCodes.UserManagement.User.ListWithDetails
      )
        .then(data => {
          context.commit("m_storages_user_items", data);
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  },
  a_storages_user_items_clear(context) {
    return new Promise(resolve => {
      context.commit("m_storages_user_items", []);
      resolve(true);
    });
  },
  a_storages_user_items_add_api(context, data) {
    return new Promise((resolve, reject) => {
      if (data.currentPassword !== "")
        data.currentPassword = sha1(
          data.currentPassword + GlobalEnv.hashCodes.Password
        );

      if (data.newPassword !== "")
        data.newPassword = sha1(
          data.newPassword + GlobalEnv.hashCodes.Password
        );

      Tools.apiAuthPost_withHash(
        GlobalEnv.api.userManagement.user.Save,
        data,
        GlobalEnv.hashCodes.UserManagement.User.Save
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_user_items_changeStatus_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.userManagement.user.ChangeStatus,
        {
          id: payload.id,
          status: payload.status
        },
        GlobalEnv.hashCodes.UserManagement.User.ChangeStatus
      )
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_user_saveUserInGroup_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.userManagement.user.SaveUserInGroups,
        {
          userId: payload.userId,
          groups: payload.groups.toString()
        },
        GlobalEnv.hashCodes.UserManagement.User.SaveUserInGroups
      )
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_user_saveUserInRoles_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.userManagement.user.SaveUserInRoles,
        {
          userId: payload.userId,
          roles: payload.roles.toString()
        },
        GlobalEnv.hashCodes.UserManagement.User.SaveUserInRoles
      )
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_user_items_socket_add(context, payload) {
    return new Promise(resolve => {
      context.commit("m_storages_user_items_add", payload.data);

      context
        .dispatch("a_socket_users_takeUsers")
        .then(() => {
          return context.dispatch("a_socket_Invoke_GetConnectedUsersList");
        })
        .then(() => {
          resolve();
        });
    });
  },
  a_storages_user_items_socket_update(context, payload) {
    return new Promise(resolve => {
      context.commit("m_storages_user_items_update", payload.data);

      context
        .dispatch("a_socket_users_takeUsers")
        .then(() => {
          return context.dispatch("a_socket_Invoke_GetConnectedUsersList");
        })
        .then(() => {
          resolve();
        });
    });
  },
  a_storages_user_items_socket_remove(context, payload) {
    return new Promise(resolve => {
      context.commit("m_storages_user_items_remove", payload.id);

      context
        .dispatch("a_socket_users_takeUsers")
        .then(() => {
          return context.dispatch("a_socket_Invoke_GetConnectedUsersList");
        })
        .then(() => {
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
