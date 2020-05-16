const storages = [
  {
    key: "Project_Fm",
    loadActionName: "a_storages_modules_userCloudManager_fm_items_load",
    clearActionName: "a_storages_modules_userCloudManager_fm_items_clear",
    loadStartUp: true,
    coverData: true,
    relationPaths: ["/Modules/UserCloudManager/FileManager/List"],
    getter: "g_storages_modules_userCloudManager_fm_items",
    loadStatus: false,
    ownerSystem: false,
    syncSettings: {
      add: {
        enable: true,
        action: "a_storages_modules_userCloudManager_fm_items_socket_add",
        notify: {
          enable: false,
          title: "",
          desc: "",
          icon: "",
          url: ""
        }
      },
      update: {
        enable: true,
        action: "a_storages_modules_userCloudManager_fm_items_socket_update",
        notify: {
          enable: false,
          title: "",
          desc: "",
          icon: "",
          url: ""
        }
      },
      remove: {
        enable: true,
        action: "a_storages_modules_userCloudManager_fm_items_socket_remove",
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
    key: "Project_FmShare",
    loadActionName: "a_storages_modules_userCloudManager_fmShare_items_load",
    clearActionName: "a_storages_modules_userCloudManager_fmShare_items_clear",
    loadStartUp: true,
    coverData: true,
    relationPaths: ["/Modules/UserCloudManager/FileManager/SharedFiles"],
    getter: "g_storages_modules_userCloudManager_fmShare_items",
    loadStatus: false,
    ownerSystem: false,
    syncSettings: {
      add: {
        enable: true,
        action: "a_storages_modules_userCloudManager_fmShare_items_socket_add",
        notify: {
          enable: true,
          title: "modules.userCloudManager.storage.Project_FmShare.add.title",
          desc: "modules.userCloudManager.storage.Project_FmShare.add.desc",
          icon: "mdi-apps",
          url: "/Modules/UserCloudManager/FileManager/SharedFiles"
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
        enable: true,
        action:
          "a_storages_modules_userCloudManager_fmShare_items_socket_remove",
        notify: {
          enable: true,
          title:
            "modules.userCloudManager.storage.Project_FmShare.remove.title",
          desc: "modules.userCloudManager.storage.Project_FmShare.remove.desc",
          icon: "mdi-apps",
          url: "/Modules/UserCloudManager/FileManager/SharedFiles"
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
  }
];

export default storages;
