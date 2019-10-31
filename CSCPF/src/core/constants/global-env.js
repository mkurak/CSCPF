import ProjectHashCodes from "@/project/integration/project-env-hash-codes";
import ProjectEnv from "@/project/integration/project-env";
import ProjectApiUrls from "@/project/integration/project-api-urls";
import ProjectEnvInject from "@/project/integration/global-env-inject";

const moduleEnvs = require.context(
  "@/modules",
  true,
  /[A-Za-z0-9-_,\s]+\/module-env.js$/i
);

const moduleGlobalEnvInjections = require.context(
  "@/modules",
  true,
  /[A-Za-z0-9-_,\s]+\/module-globalEnv-inject.js$/i
);

const moduleHashCodes = require.context(
  "@/modules",
  true,
  /[A-Za-z0-9-_,\s]+\/module-hash-codes.js$/i
);

const moduleApiUrls = require.context(
  "@/modules",
  true,
  /[A-Za-z0-9-_,\s]+\/module-api-urls.js$/i
);

const globalEnv = {
  system: {
    productionUrl: "http://localhost:51684",
    developmentUrl: "http://localhost:51684",
    tokenKey: "cscpf_token",
    settingsLocalKey: "cscpf_settings",
    notificationKey: "cscpf_notifications",
    storagesDataKey: "cscpf_storages",
    langKey: "cscpf_lang",
    intMaxValue: 2147483647,
    locales: [
      {
        code: "tr",
        title: "Türkçe",
        flag: "turkey.svg"
      },
      {
        code: "en",
        title: "English",
        flag: "united-kingdom.svg"
      }
    ]
  },
  api: {
    base: "",
    hubUrl: "",
    userManagement: {
      token: {
        createToken: "/UserManagement/Token/CreateToken",
        checkToken: "/UserManagement/Token/Test"
      },
      user: {
        userListForCurrentUser: "/UserManagement/User/UserListForCurrentUser",
        get: "/UserManagement/User/Get",
        changeProfileInformations:
          "/UserManagement/User/ChangeProfileInformations",
        ChangeProfilePicture: "/UserManagement/User/ChangeProfilePicture",
        ChangeProfileBgPicture: "/UserManagement/User/ChangeProfileBgPicture",
        ChangePassword: "/UserManagement/User/ChangePassword",
        ListWithDetails: "/UserManagement/User/ListWithDetails",
        Save: "/UserManagement/User/Save",
        ChangeStatus: "/UserManagement/User/ChangeStatus",
        SaveUserInGroups: "/UserManagement/User/SaveUserInGroups",
        SaveUserInRoles: "/UserManagement/User/SaveUserInRoles"
      },
      role: {
        list: "/UserManagement/Role/List"
      },
      group: {
        list: "/UserManagement/Group/List",
        ListWithDetails: "/UserManagement/Group/ListWithDetails",
        Save: "/UserManagement/Group/Save",
        ChangeStatus: "/UserManagement/Group/ChangeStatus",
        SaveGroupInRoles: "/UserManagement/Group/SaveGroupInRoles"
      }
    },
    project: {
      ...ProjectApiUrls
    },
    modules: {}
  },
  socket: {
    url: "",
    reconnectDelay: 2000
  },
  layout: {
    logoFile: {
      file: "/img/logo.png",
      maxHeight: 40,
      maxWeight: 250
    },
    appName: "",
    lang: {
      default: "tr",
      fallback: "tr",
      defaultFlag: "turkey.svg"
    },
    defaultSleepDelay: 500,
    copyright: {
      url: "https://www.codescientific.com",
      label: "Code Scientific"
    },
    titleStateBgColor: "indigo",
    viewUserManagementMenus: true,
    menuTopLogo: ""
  },
  notification: {
    route: "/notifications"
  },
  socketUsers: {
    route: "/socket-users",
    profilePic: {
      default: "default.jpg",
      path: ""
    },
    profileBgPic: {
      default: "default.jpg",
      path: ""
    }
  },
  messages: {
    route: "/messages"
  },
  axios: {
    defaultErrorCode: "TechnicalError",
    default400: "Status400",
    default401: "Status401"
  },
  hashCodes: {
    Password: "J7f9WFpxM9WKXkDX",
    UserManagement: {
      Token: {
        CreateToken: "m3yaHMNG8QvuRm01"
      },
      User: {
        Get: "Lm8anAy07W7tjMej",
        ChangeProfileInformations: "FjdubiU2Y9exzAbZ",
        ChangeProfilePicture: "K6mw55Ye9FIxSA74",
        ChangeProfileBgPicture: "Fhw2g5Lo9aAxT96p",
        ChangePassword: "PJI5fzx1FDRPWVzr",
        ListWithDetails: "YwA9YMngpxrN3NWE",
        Save: "4ryfGsRfjaj5rEpE",
        ChangeStatus: "bSpFS3np7GJj2ptf",
        SaveUserInGroups: "c3VMEUVuhkHzkDYe",
        SaveUserInRoles: "JnjnGMAgK9J2qKsQ"
      },
      Role: {
        List: "uXZqgHLSmdR7bCsh"
      },
      Group: {
        List: "uX3pvxrZqUjsVEL7",
        ListWithDetails: "fb2jSx9crqWjBWMD",
        Save: "6vkR9WNNRTaKWVdP",
        ChangeStatus: "Z3ZAVKFeUmd8Zhje",
        SaveGroupInRoles: "eXUhDJBJvPBAyevF"
      }
    },
    Project: {
      ...ProjectHashCodes
    },
    modules: {}
  },
  ProjectEnv: {
    ...ProjectEnv
  },
  modules: {}
};

globalEnv.api.base =
  process.env.NODE_ENV === "production"
    ? globalEnv.system.productionUrl + "/api"
    : globalEnv.system.developmentUrl + "/api";

globalEnv.socket.url =
  process.env.NODE_ENV === "production"
    ? globalEnv.system.productionUrl + "/signalr"
    : globalEnv.system.developmentUrl + "/signalr";

globalEnv.socketUsers.profilePic.path =
  process.env.NODE_ENV === "production"
    ? globalEnv.system.productionUrl + "/Storage/User/ProfilePics/"
    : globalEnv.system.developmentUrl + "/Storage/User/ProfilePics/";

globalEnv.socketUsers.profileBgPic.path =
  process.env.NODE_ENV === "production"
    ? globalEnv.system.productionUrl + "/Storage/User/ProfileBgPics/"
    : globalEnv.system.developmentUrl + "/Storage/User/ProfileBgPics/";

ProjectEnvInject(globalEnv);

const lowerFirstLetter = val => {
  return val.charAt(0).toLowerCase() + val.slice(1);
};

if (moduleEnvs.length > 0) {
  moduleEnvs.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)/i);
    globalEnv.modules[lowerFirstLetter(matched[0])] = moduleEnvs(key).default;
  });
}

if (moduleGlobalEnvInjections.length > 0) {
  moduleGlobalEnvInjections.keys().forEach(key => {
    moduleGlobalEnvInjections(key).default(globalEnv);
  });
}

if (moduleHashCodes.length > 0) {
  moduleHashCodes.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)/i);
    globalEnv.hashCodes.modules[lowerFirstLetter(matched[0])] = moduleHashCodes(
      key
    ).default;
  });
}

if (moduleApiUrls.length > 0) {
  moduleApiUrls.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)/i);
    globalEnv.api.modules[lowerFirstLetter(matched[0])] = moduleApiUrls(
      key
    ).default;
  });
}

export default globalEnv;
