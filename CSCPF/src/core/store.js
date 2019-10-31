import Vue from "vue";
import Vuex from "vuex";

// Modules
import session from "@/core/store-modules/session";
import initializer from "@/core/store-modules/initializer";
import layout from "@/core/store-modules/layout";
import notification from "@/core/store-modules/notification";
import socketUsers from "@/core/store-modules/socket-users";
import messages from "@/core/store-modules/messages";
import socket from "@/core/store-modules/socket";
import snackbar from "@/core/store-modules/snackbar";
import settings from "@/core/store-modules/settings";
import storageManager from "@/core/store-modules/storage-manager";
import menu from "@/core/store-modules/menu";

// Storages
import RoleStorage from "@/core/store-modules/storages/role";
import UserStorage from "@/core/store-modules/storages/user";
import UserGroupsStorage from "@/core/store-modules/storages/userGroups";

// Project Modules
import ProjectModules from "@/project/project-stories";

let moduleStories = {};

const modulesStories = require.context(
  "@/modules",
  true,
  /[A-Za-z0-9-_,\s]+\/module-stories.js$/i
);

if (modulesStories.length > 0) {
  modulesStories.keys().forEach(key => {
    moduleStories = {
      ...moduleStories,
      ...modulesStories(key).default
    };
  });
}

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
    UserGroupsStorage,
    ...ProjectModules,
    ...moduleStories
  }
});
