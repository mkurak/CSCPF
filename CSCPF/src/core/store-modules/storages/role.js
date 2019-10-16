import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import _ from "underscore";

const state = {
  storages: {
    role: {
      items: []
    }
  }
};

const getters = {
  g_storages_role_items(state) {
    return state.storages.role.items;
  }
};

const mutations = {
  m_storages_role_items(state, items) {
    state.storages.role.items = items;
  },
  m_storages_role_items_add(state, role) {
    state.storages.role.items.push(role);
  },
  m_storages_role_items_update(state, role) {
    let findIndex = _.findIndex(state.storages.role.items, {
      id: role.id
    });
    if (findIndex > -1) state.storages.role.items[findIndex] = role;
  },
  m_storages_role_items_remove(state, id) {
    let findIndex = _.findIndex(state.storages.role.items, {
      id
    });
    if (findIndex > -1) state.storages.role.items.splice(findIndex, 1);
  }
};

const actions = {
  a_storages_role_items_load(context) {
    return new Promise(resolve => {
      Tools.apiAuthGet_withHash_listData(
        GlobalEnv.api.userManagement.role.list,
        null,
        "RoleName asc",
        null,
        null,
        GlobalEnv.hashCodes.UserManagement.Role.List
      )
        .then(data => {
          context.commit("m_storages_role_items", data);
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  },
  a_storages_role_items_clear(context) {
    return new Promise(resolve => {
      context.commit("m_storages_role_items", []);
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
