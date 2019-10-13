import ProjectHashCodes from "../project/integration/project-env-hash-codes";
import ProjectEnv from "../project/integration/project-env";
import ProjectApiUrls from "../project/integration/project-api-urls";

const _productionUrl = "http://localhost:51684"; // "http://localhost:61882"; // 65131
const _developmentUrl = "http://localhost:51684"; //"http://localhost:61882"; // 65131

const globalEnv = {
  system: {
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
    }
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
    titleStateBgColor: "indigo"
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
    }
  },
  ProjectEnv: {
    ...ProjectEnv
  }
};

globalEnv.api.base =
  process.env.NODE_ENV === "production"
    ? _productionUrl + "/api"
    : _developmentUrl + "/api";

globalEnv.socket.url =
  process.env.NODE_ENV === "production"
    ? _productionUrl + "/signalr"
    : _developmentUrl + "/signalr";

globalEnv.socketUsers.profilePic.path =
  process.env.NODE_ENV === "production"
    ? _productionUrl + "/Storage/User/ProfilePics/"
    : _developmentUrl + "/Storage/User/ProfilePics/";

globalEnv.socketUsers.profileBgPic.path =
  process.env.NODE_ENV === "production"
    ? _productionUrl + "/Storage/User/ProfileBgPics/"
    : _developmentUrl + "/Storage/User/ProfileBgPics/";

export default globalEnv;
