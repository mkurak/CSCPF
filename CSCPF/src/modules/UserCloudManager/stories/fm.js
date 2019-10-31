import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import sha1 from "sha1";
import _ from "underscore";
import ModuleTools from "@/modules/UserCloudManager/plugins/module-tools";

const state = {
  storages: {
    modules: {
      userCloudManager: {
        fm: {
          items: [],
          itemsLoading: false
        }
      }
    }
  }
};

const getters = {
  g_storages_modules_userCloudManager_fm_items(state) {
    return state.storages.modules.userCloudManager.fm.items;
  },
  g_storages_modules_userCloudManager_fm_items_itemsLoading(state) {
    return state.storages.modules.userCloudManager.fm.itemsLoading;
  }
};

const mutations = {
  m_storages_modules_userCloudManager_fm_items(state, items) {
    items = ModuleTools.fmClearEmptyChildrenProperty(items);
    items = ModuleTools.fmDirectoryCalcCountFileAndSize(items);
    state.storages.modules.userCloudManager.fm.items = items;
  },
  m_storages_modules_userCloudManager_fm_items_add(state, payload) {
    let findDirectory = null;
    if (payload.itemType === "file") {
      findDirectory = Tools.findObjDeep(
        state.storages.modules.userCloudManager.fm.items,
        {
          itemType: "directory",
          value: payload.fileData.directoryId
        }
      );
    } else if (payload.itemType === "directory") {
      findDirectory = Tools.findObjDeep(
        state.storages.modules.userCloudManager.fm.items,
        {
          itemType: "directory",
          value: payload.directoryData.parentDirectoryId
        }
      );
    }

    if (!Tools.isNullOrEmpty(findDirectory)) {
      if (Tools.isNullOrEmpty(findDirectory.children))
        findDirectory.children = [];

      findDirectory.children.push(payload);
      findDirectory.children = _(findDirectory.children)
        .chain()
        .sortBy(function(item) {
          return item.text;
        })
        .sortBy(function(item) {
          return item.itemType;
        })
        .value();
    } else if (payload.itemType === "directory") {
      state.storages.modules.userCloudManager.fm.items.push(payload);
      state.storages.modules.userCloudManager.fm.items = _(
        state.storages.modules.userCloudManager.fm.items
      )
        .chain()
        .sortBy(function(item) {
          return item.text;
        })
        .sortBy(function(item) {
          return item.itemType;
        })
        .value();
    }
  },
  m_storages_modules_userCloudManager_fm_items_update(state, payload) {
    let findParentDirectory = null;
    let findTargetDirectory = null;
    let findTargetFile = null;

    if (payload.itemType === "directory") {
      findParentDirectory = Tools.findObjDeep(
        state.storages.modules.userCloudManager.fm.items,
        {
          itemType: "directory",
          value: payload.directoryData.parentDirectoryId
        }
      );

      findTargetDirectory = Tools.findObjDeep(
        state.storages.modules.userCloudManager.fm.items,
        {
          itemType: "directory",
          value: payload.directoryData.id
        }
      );
    } else if (payload.itemType === "file") {
      findParentDirectory = Tools.findObjDeep(
        state.storages.modules.userCloudManager.fm.items,
        {
          itemType: "directory",
          value: payload.fileData.directoryId
        }
      );

      findTargetFile = Tools.findObjDeep(
        state.storages.modules.userCloudManager.fm.items,
        {
          itemType: "file",
          value: payload.value
        }
      );
    }

    if (!Tools.isNullOrEmpty(findTargetDirectory))
      Object.assign(findTargetDirectory, payload);

    if (!Tools.isNullOrEmpty(findTargetFile))
      Object.assign(findTargetFile, payload);

    if (Tools.isNullOrEmpty(findParentDirectory)) {
      state.storages.modules.userCloudManager.fm.items = _(
        state.storages.modules.userCloudManager.fm.items
      )
        .chain()
        .sortBy(function(item) {
          return item.text;
        })
        .sortBy(function(item) {
          return item.itemType;
        })
        .value();
    } else {
      findParentDirectory.children = _(findParentDirectory.children)
        .chain()
        .sortBy(function(item) {
          return item.text;
        })
        .sortBy(function(item) {
          return item.itemType;
        })
        .value();
    }
  },
  m_storages_modules_userCloudManager_fm_items_remove(state, payload) {
    if (payload.itemType === "directory") {
      if (!Tools.isNullOrEmpty(payload.directoryData.parentDirectoryId)) {
        let findParentDirectory = null;
        findParentDirectory = Tools.findObjDeep(
          state.storages.modules.userCloudManager.fm.items,
          {
            itemType: "directory",
            value: payload.directoryData.parentDirectoryId
          }
        );

        if (findParentDirectory) {
          findParentDirectory.children = _.without(
            findParentDirectory.children,
            _.findWhere(findParentDirectory.children, {
              value: payload.value,
              itemType: payload.itemType
            })
          );
        }
      } else {
        state.storages.modules.userCloudManager.fm.items = _.without(
          state.storages.modules.userCloudManager.fm.items,
          _.findWhere(state.storages.modules.userCloudManager.fm.items, {
            value: payload.value,
            itemType: payload.itemType
          })
        );
      }
    } else {
      let findDirectory = Tools.findObjDeep(
        state.storages.modules.userCloudManager.fm.items,
        {
          itemType: "directory",
          value: payload.fileData.directoryId
        }
      );

      if (findDirectory) {
        findDirectory.children = _.without(
          findDirectory.children,
          _.findWhere(findDirectory.children, {
            value: payload.value,
            itemType: "file"
          })
        );
      }
    }
  },
  m_storages_modules_userCloudManager_fm_items_itemsLoading(state, status) {
    state.storages.modules.userCloudManager.fm.itemsLoading = status;
  }
};

const actions = {
  a_storages_modules_userCloudManager_fm_items_load(context) {
    return new Promise(resolve => {
      context.commit(
        "m_storages_modules_userCloudManager_fm_items_itemsLoading",
        true
      );

      let hash = sha1(
        context.rootGetters.g_session_currentUser.id +
          GlobalEnv.hashCodes.modules.userCloudManager.fm.fmTreeItems
      );

      Tools.apiAuthGet(
        GlobalEnv.api.modules.userCloudManager.fm.fmTreeItems +
          "?UserId=" +
          context.rootGetters.g_session_currentUser.id +
          "&Hash=" +
          hash
      )
        .then(data => {
          context.commit("m_storages_modules_userCloudManager_fm_items", data);
          context.commit(
            "m_storages_modules_userCloudManager_fm_items_itemsLoading",
            false
          );
          resolve(true);
        })
        .catch(() => {
          context.commit(
            "m_storages_modules_userCloudManager_fm_items_itemsLoading",
            false
          );
          resolve(false);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_items_socket_add(context) {
    return context.dispatch(
      "a_storages_modules_userCloudManager_fm_items_load"
    );
  },
  a_storages_modules_userCloudManager_fm_items_socket_update(context) {
    return context.dispatch(
      "a_storages_modules_userCloudManager_fm_items_load"
    );
  },
  a_storages_modules_userCloudManager_fm_items_socket_remove(context) {
    return context.dispatch(
      "a_storages_modules_userCloudManager_fm_items_load"
    );
  },
  a_storages_modules_userCloudManager_fm_items_clear(context) {
    return new Promise(resolve => {
      context.commit("m_storages_modules_userCloudManager_fm_items", []);
      resolve(true);
    });
  },
  a_storages_modules_userCloudManager_fm_addFile_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPostFile(
        GlobalEnv.api.modules.userCloudManager.fm.addFile,
        payload
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_addDirectory_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.addDirectory,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.addDirectory
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_updateDirectory_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.updateDirectory,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.updateDirectory
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_updateFile_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.updateFile,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.updateFile
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_removeDirectory_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.changeStatusDirectory,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.changeStatusDirectory
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_removeFile_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.changeStatusFile,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.changeStatusFile
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_shareFile_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.shareFile,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.shareFile
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_shareDirectory_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.shareDirectory,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.shareDirectory
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_moveDirectory_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.moveDirectory,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.moveDirectory
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_moveFile_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.moveFile,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.moveFile
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_copyDirectory_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.copyDirectory,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.copyDirectory
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_storages_modules_userCloudManager_fm_copyFile_api(context, payload) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthPost_withHash(
        GlobalEnv.api.modules.userCloudManager.fm.copyFile,
        payload,
        GlobalEnv.hashCodes.modules.userCloudManager.fm.copyFile
      )
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
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
