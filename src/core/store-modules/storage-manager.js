import SystemStorages from "@/core/data/system-storages";
import GlobalEnv from "@/core/constants/global-env";
import _ from "underscore";
import Tools from "@/core/plugins/tools";
import t from "@/core/plugins/i18n";

const state = {
  storages: {
    storages: [...SystemStorages],
    backgroundJobCount: 0
  }
};

const getters = {
  g_storages_storages(state) {
    return state.storages.storages;
  },
  g_storages_backgroundJobCount(state) {
    return state.storages.backgroundJobCount;
  }
};

const mutations = {
  m_storages_storages_addRange(state, storages) {
    state.storages.storages = storages;
  },
  m_storages_backgroundJobCount(state, val) {
    state.storages.backgroundJobCount += val;
  },
  m_storages_backgroundJobCountReset(state) {
    state.storages.backgroundJobCount = 0;
  }
};

const actions = {
  a_storages_storages_saveLocal(context) {
    return new Promise(resolve => {
      localStorage.setItem(
        GlobalEnv.system.storagesDataKey,
        JSON.stringify(context.getters.g_storages_storages)
      );

      resolve(true);
    });
  },
  a_storages_storages_loadLocal(context) {
    return new Promise(resolve => {
      let localData = localStorage.getItem(GlobalEnv.system.storagesDataKey);
      if (localData) {
        let convertObj = JSON.parse(localData);
        convertObj.forEach(data => {
          data.loadStatus = false;
        });
        context.commit("m_storages_storages_addRange", convertObj);
      }

      resolve(true);
    });
  },
  async a_storages_storages_loadStartup(context) {
    if (context.getters.g_storages_storages.length === 0) {
      return;
    }

    for (let i = 0; i < context.getters.g_storages_storages.length; i++) {
      context.commit("m_layout_loading_view", true);
      await context.dispatch(
        context.getters.g_storages_storages[i].clearActionName
      );
      context.commit("m_layout_loading_view", false);
    }

    let findStorages = context.getters.g_storages_storages.filter(storage => {
      return storage.loadStartUp === true;
    });

    let initDataActions = [];

    for (let i = 0; i < findStorages.length; i++) {
      let findedStorage = findStorages[i];
      context.commit("m_layout_loading_msg", findedStorage.loadingText ?? "");
      await context.dispatch(findedStorage.loadActionName, {});
      initDataActions.push(findedStorage.initDataActionName);
      findStorages[i].loadStatus = true;
    }

    context.commit(
      "m_layout_loading_msg",
      t.t("storeModules.defaultInitMessage")
    );
    if (initDataActions && initDataActions.length > 0) {
      for (let i = 0; i < initDataActions.length; i++) {
        if (initDataActions[i]) await context.dispatch(initDataActions[i]);
      }
    }

    context.commit("m_layout_loading_view", false);
  },
  async a_storages_storages_clearUnCoverStorageData(
    context,
    currentRouterPath
  ) {
    if (context.getters.g_storages_storages.length === 0) {
      return;
    }

    let foundStorages = context.getters.g_storages_storages.filter(storage => {
      return storage.coverData === false;
    });

    context.commit("m_layout_loading_view", true);

    for (let i = 0; i < foundStorages.length; i++) {
      if (foundStorages[i].relationPaths.length === 0) {
        await context.dispatch(foundStorages[i].clearActionName);
        foundStorages[i].loadStatus = false;
      } else {
        let target = true;
        foundStorages[i].relationPaths.forEach(path => {
          if (currentRouterPath === path) target = false;
        });

        if (target) {
          await context.dispatch(foundStorages[i].clearActionName);
          foundStorages[i].loadStatus = false;
        }
      }
    }

    context.commit("m_layout_loading_view", false);
  },
  async a_storages_storages_loadPathStorageData(context, payload) {
    if (context.getters.g_storages_storages.length === 0) {
      return;
    }

    context.commit("m_layout_loading_view", true);

    let foundStorages = context.getters.g_storages_storages.filter(storage => {
      return storage.coverData === false && storage.loadStatus == false;
    });

    let storagesForInit = [];

    for (let i = 0; i < foundStorages.length; i++) {
      let target = false;

      foundStorages[i].relationPaths.forEach(path => {
        if (payload.path === path) target = true;
      });

      if (foundStorages[i].relationPathsNames) {
        foundStorages[i].relationPathsNames.forEach(name => {
          if (payload.name === name) target = true;
        });
      }

      if (target) {
        context.commit(
          "m_layout_loading_msg",
          foundStorages[i].loadingText ?? ""
        );
        await context.dispatch(foundStorages[i].loadActionName, {});
        foundStorages[i].loadStatus = true;
        storagesForInit.push(foundStorages[i].initDataActionName);
      }
    }

    context.commit(
      "m_layout_loading_msg",
      t.t("storeModules.defaultInitMessage")
    );
    if (storagesForInit.length > 0) {
      for (let i = 0; i < storagesForInit.length; i++) {
        if (storagesForInit[i]) await context.dispatch(storagesForInit[i]);
      }
    }

    context.commit("m_layout_loading_view", false);
  },
  async a_storages_storages_getData(context, storageKey, payload) {
    context.commit("m_layout_loading_view", true);

    if (context.getters.g_storages_storages.length === 0) {
      context.commit("m_layout_loading_view", false);
      return [];
    }

    let findStorage = context.getters.g_storages_storages.filter(storage => {
      return storage.key === storageKey;
    });
    let foundStorage = null;
    if (findStorage.length > 0) foundStorage = findStorage[0];

    if (foundStorage === null) return [];

    if (!foundStorage.loadStatus) {
      context.commit("m_layout_loading_msg", foundStorage.loadingText ?? "");
      await context.dispatch(foundStorage.loadActionName, payload);
      foundStorage.loadStatus = true;
      context.commit("m_layout_loading_view", false);
      return context.getters[foundStorage.getter];
    }

    context.commit("m_layout_loading_view", false);

    return [];
  },
  async a_storages_syncSocket(context, payload) {
    context.commit("m_storages_backgroundJobCount", 1);

    if (context.getters.g_storages_storages.length === 0) {
      context.commit("m_storages_backgroundJobCount", -1);
      return;
    }

    let findIndex = _.findIndex(context.getters.g_storages_storages, {
      key: payload.key
    });
    if (findIndex === -1) {
      context.commit("m_storages_backgroundJobCount", -1);
      return;
    }

    let targetStorage = context.getters.g_storages_storages[findIndex];
    let userFullName = "";

    if (parseInt(payload.userId) > 0) {
      userFullName = context.rootGetters.g_storages_user_fullName(
        payload.userId
      );
    }

    switch (payload.processType) {
      case "add":
        if (targetStorage.syncSettings.add.enable)
          context
            .dispatch(targetStorage.syncSettings.add.action, payload)
            .then(() => {
              context.commit("m_storages_backgroundJobCount", -1);
              if (
                targetStorage.syncSettings.add.notify.enable &&
                payload.userId !== context.rootGetters.g_session_currentUser.id
              ) {
                context.dispatch("a_notification_items_add", {
                  title: t.t(targetStorage.syncSettings.add.notify.title, {
                    user: userFullName,
                    name: Tools.checkI18n(payload.name)
                  }),
                  content: t.t(targetStorage.syncSettings.add.notify.desc, {
                    user: userFullName,
                    name: Tools.checkI18n(payload.name)
                  }),
                  addDate: Tools.convertToJSONDate(new Date()),
                  icon: targetStorage.syncSettings.add.notify.icon,
                  url: targetStorage.syncSettings.add.notify.url,
                  viewDate: null,
                  ReadDate: null,
                  viewStatus: false,
                  readStatus: false
                });
              }
            });
        else context.commit("m_storages_backgroundJobCount", -1);
        break;
      case "update":
        if (targetStorage.syncSettings.update.enable)
          context
            .dispatch(targetStorage.syncSettings.update.action, payload)
            .then(() => {
              context.commit("m_storages_backgroundJobCount", -1);
              if (
                targetStorage.syncSettings.update.notify.enable &&
                payload.userId !== context.rootGetters.g_session_currentUser.id
              ) {
                context.dispatch("a_notification_items_add", {
                  title: t.t(targetStorage.syncSettings.update.notify.title, {
                    user: userFullName,
                    name: Tools.checkI18n(payload.name)
                  }),
                  content: t.t(targetStorage.syncSettings.update.notify.desc, {
                    user: userFullName,
                    name: Tools.checkI18n(payload.name)
                  }),
                  addDate: Tools.convertToJSONDate(new Date()),
                  icon: targetStorage.syncSettings.update.notify.icon,
                  url: targetStorage.syncSettings.update.notify.url,
                  viewDate: null,
                  ReadDate: null,
                  viewStatus: false,
                  readStatus: false
                });
              }
            });
        else context.commit("m_storages_backgroundJobCount", -1);
        break;
      case "remove":
        if (targetStorage.syncSettings.remove.enable)
          context
            .dispatch(targetStorage.syncSettings.remove.action, payload)
            .then(() => {
              context.commit("m_storages_backgroundJobCount", -1);
              if (
                targetStorage.syncSettings.remove.notify.enable &&
                payload.userId !== context.rootGetters.g_session_currentUser.id
              ) {
                context.dispatch("a_notification_items_add", {
                  title: t.t(targetStorage.syncSettings.remove.notify.title, {
                    user: userFullName,
                    name: Tools.checkI18n(payload.name)
                  }),
                  content: t.t(targetStorage.syncSettings.remove.notify.desc, {
                    user: userFullName,
                    name: Tools.checkI18n(payload.name)
                  }),
                  addDate: Tools.convertToJSONDate(new Date()),
                  icon: targetStorage.syncSettings.remove.notify.icon,
                  url: targetStorage.syncSettings.remove.notify.url,
                  viewDate: null,
                  ReadDate: null,
                  viewStatus: false,
                  readStatus: false
                });
              }
            });
        else context.commit("m_storages_backgroundJobCount", -1);
        break;
      case "changeRoles":
        if (targetStorage.syncSettings.changeRoles.enable)
          context
            .dispatch(targetStorage.syncSettings.changeRoles.action, payload)
            .then(() => {
              context.commit("m_storages_backgroundJobCount", -1);
              if (
                targetStorage.syncSettings.changeRoles.notify.enable &&
                payload.userId !== context.rootGetters.g_session_currentUser.id
              ) {
                context.dispatch("a_notification_items_add", {
                  title: t.t(
                    targetStorage.syncSettings.changeRoles.notify.title,
                    {
                      user: userFullName,
                      name: Tools.checkI18n(payload.name)
                    }
                  ),
                  content: t.t(
                    targetStorage.syncSettings.changeRoles.notify.desc,
                    {
                      user: userFullName,
                      name: Tools.checkI18n(payload.name)
                    }
                  ),
                  addDate: Tools.convertToJSONDate(new Date()),
                  icon: targetStorage.syncSettings.changeRoles.notify.icon,
                  url: targetStorage.syncSettings.changeRoles.notify.url,
                  viewDate: null,
                  ReadDate: null,
                  viewStatus: false,
                  readStatus: false
                });
              }
            });
        else context.commit("m_storages_backgroundJobCount", -1);
        break;
    }

    context.commit("m_layout_loading_view", true);
    await context.dispatch(targetStorage.initDataActionName);
    context.commit("m_layout_loading_view", false);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
