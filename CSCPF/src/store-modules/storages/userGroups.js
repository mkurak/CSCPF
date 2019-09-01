import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";
import _ from "underscore";

const state = {
  storages: {
    userGroups: {
      items: []
    }
  }
};

const getters = {
  g_storages_userGroups_items(state) {
    return state.storages.userGroups.items;
  }
};

const mutations = {
  m_storages_userGroups_items(state, items) {
    state.storages.userGroups.items = items;
  },
  m_storages_userGroups_items_add(state, group) {
    state.storages.userGroups.items.push(group);
    state.storages.userGroups.items = _.sortBy(
      state.storages.userGroups.items,
      "groupName"
    ).reverse();
  },
  m_storages_userGroups_items_update(state, group) {
    let findIndex = _.findIndex(state.storages.userGroups.items, {
      id: group.id
    });
    if (findIndex > -1) state.storages.userGroups.items[findIndex] = group;

    state.storages.userGroups.items = _.sortBy(
      state.storages.userGroups.items,
      "groupName"
    ).reverse();
  },
  m_storages_userGroups_items_remove(state, id) {
    let findIndex = _.findIndex(state.storages.userGroups.items, {
      id
    });
    if (findIndex > -1) state.storages.userGroups.items.splice(findIndex, 1);

    state.storages.userGroups.items = _.sortBy(
      state.storages.userGroups.items,
      "groupName"
    ).reverse();
  }
};

const actions = {
  a_storages_userGroups_items_load(context) {
    return new Promise(resolve => {
      Tools.apiAuthGet_withHash_listData(
        GlobalEnv.api.userManagement.group.ListWithDetails,
        null,
        "GroupName asc",
        null,
        null,
        GlobalEnv.hashCodes.UserManagement.Group.ListWithDetails
      )
        .then(data => {
          context.commit("m_storages_userGroups_items", data);
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  },
  a_storages_userGroups_items_clear(context) {
    return new Promise(resolve => {
      context.commit("m_storages_userGroups_items", []);
      resolve(true);
    });
  },
  a_storages_userGroups_save_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.userManagement.group.Save,
        {
          id: payload.id,
          groupName: payload.groupName
        },
        GlobalEnv.hashCodes.UserManagement.Group.Save
      )
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_userGroups_items_changeStatus_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.userManagement.group.ChangeStatus,
        {
          id: payload.id,
          status: payload.status
        },
        GlobalEnv.hashCodes.UserManagement.Group.ChangeStatus
      )
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_userGroups_saveRoles_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.userManagement.group.SaveGroupInRoles,
        {
          groupId: payload.groupId,
          roles: payload.roles.toString()
        },
        GlobalEnv.hashCodes.UserManagement.Group.SaveGroupInRoles
      )
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_userGroups_items_socket_add(context, payload) {
    return new Promise(resolve => {
      context.commit("m_storages_userGroups_items_add", payload.data);
      resolve();
    });
  },
  a_storages_userGroups_items_socket_update(context, payload) {
    return new Promise(resolve => {
      context.commit("m_storages_userGroups_items_update", payload.data);
      resolve();
    });
  },
  a_storages_userGroups_items_socket_remove(context, payload) {
    return new Promise(resolve => {
      if (payload.data) {
        resolve();
        return;
      }

      context.commit("m_storages_userGroups_items_remove", payload.id);
      resolve();
    });
  },
  a_storages_userGroups_items_socket_changeRoles(context, payload) {
    return new Promise(resolve => {
      context.commit("m_storages_userGroups_items_update", payload.data);
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
