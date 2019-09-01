import Vue from "vue";
import Vuex from "vuex";

// Modules
import session from "./store-modules/session";
import initializer from "./store-modules/initializer";
import layout from "./store-modules/layout";
import notification from "./store-modules/notification";
import socketUsers from "./store-modules/socket-users";
import messages from "./store-modules/messages";
import socket from "./store-modules/socket";
import snackbar from "./store-modules/snackbar";
import settings from "./store-modules/settings";
import storageManager from "./store-modules/storage-manager";
import menu from "./store-modules/menu";

// Storages
import RoleStorage from "./store-modules/storages/role";
import UserStorage from "./store-modules/storages/user";
import UserGroupsStorage from "./store-modules/storages/userGroups";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    session,
    initializer,
    layout,
    notification,
    socketUsers,
    messages,
    socket,
    snackbar,
    settings,
    storageManager,
    menu,
    RoleStorage,
    UserStorage,
    UserGroupsStorage
  }
});
