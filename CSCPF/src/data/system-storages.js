import ProjectStorages from "../project/integration/project-storages";

const storagesData = [
  {
    key: "UserManagement_Role",
    loadActionName: "a_storages_role_items_load",
    clearActionName: "a_storages_role_items_clear",
    loadStartUp: true,
    coverData: true,
    relationPaths: [],
    getter: "g_storages_role_items",
    loadStatus: false,
    ownerSystem: true,
    syncSettings: {
      add: {
        enable: false,
        action: "",
        notify: {
          enable: false,
          title: "",
          desc: "",
          icon: "",
          url: ""
        }
      },
      update: {
        enable: false,
        action: "",
        notify: {
          enable: false,
          title: "",
          desc: "",
          icon: "",
          url: ""
        }
      },
      remove: {
        enable: false,
        action: "",
        notify: {
          enable: false,
          title: "",
          desc: "",
          icon: "",
          url: ""
        }
      },
      changeRoles: {
        enable: false,
        action: "",
        notify: {
          enable: false,
          title: "",
          desc: "",
          icon: "",
          url: ""
        }
      }
    }
  },
  {
    key: "UserManagement_User",
    loadActionName: "a_storages_user_items_load",
    clearActionName: "a_storages_user_items_clear",
    loadStartUp: true,
    coverData: true,
    relationPaths: [],
    getter: "g_storages_user_items",
    loadStatus: false,
    ownerSystem: true,
    syncSettings: {
      add: {
        enable: true,
        action: "a_storages_user_items_socket_add",
        notify: {
          enable: true,
          title: "storages.user.socketSync.add.title",
          desc: "storages.user.socketSync.add.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Users"
        }
      },
      update: {
        enable: true,
        action: "a_storages_user_items_socket_update",
        notify: {
          enable: true,
          title: "storages.user.socketSync.update.title",
          desc: "storages.user.socketSync.update.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Users"
        }
      },
      remove: {
        enable: true,
        action: "a_storages_user_items_socket_remove",
        notify: {
          enable: true,
          title: "storages.user.socketSync.remove.title",
          desc: "storages.user.socketSync.remove.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Users"
        }
      },
      changeRoles: {
        enable: true,
        action: "a_storages_user_items_socket_changeRoles",
        notify: {
          enable: true,
          title: "storages.user.socketSync.changeRoles.title",
          desc: "storages.user.socketSync.changeRoles.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Users"
        }
      }
    }
  },
  {
    key: "UserManagement_UserGroup",
    loadActionName: "a_storages_userGroups_items_load",
    clearActionName: "a_storages_userGroups_items_clear",
    loadStartUp: true,
    coverData: true,
    relationPaths: [],
    getter: "g_storages_userGroups_items",
    loadStatus: false,
    ownerSystem: true,
    syncSettings: {
      add: {
        enable: true,
        action: "a_storages_userGroups_items_socket_add",
        notify: {
          enable: true,
          title: "storages.userGroups.socketSync.add.title",
          desc: "storages.userGroups.socketSync.add.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Groups"
        }
      },
      update: {
        enable: true,
        action: "a_storages_userGroups_items_socket_update",
        notify: {
          enable: true,
          title: "storages.userGroups.socketSync.update.title",
          desc: "storages.userGroups.socketSync.update.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Groups"
        }
      },
      remove: {
        enable: true,
        action: "a_storages_userGroups_items_socket_remove",
        notify: {
          enable: true,
          title: "storages.userGroups.socketSync.remove.title",
          desc: "storages.userGroups.socketSync.remove.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Groups"
        }
      },
      changeRoles: {
        enable: true,
        action: "a_storages_userGroups_items_socket_changeRoles",
        notify: {
          enable: true,
          title: "storages.userGroups.socketSync.changeRoles.title",
          desc: "storages.userGroups.socketSync.changeRoles.desc",
          icon: "mdi-account-group",
          url: "/UserManagement/Groups"
        }
      }
    }
  },
  ...ProjectStorages
];

export default storagesData;
