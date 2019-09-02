import Tools from "../plugins/tools";
import GlobalEnv from "../constants/global-env";
import t from "../plugins/i18n";
import sha1 from "sha1";

const state = {
  session: {
    token: null,
    tokenUser: null,
    toolbar: {
      currentUserView: false,
      currentUserMenuView: false
    },
    currentUser: {
      id: null,
      name: "",
      surname: "",
      profilePic: "default.jpg",
      profileBgPic: "default.jpg",
      profileStatusMessage: "Hello World!",
      userName: null,
      email: null,
      password: null,
      status: null,
      addingDate: null,
      updatingDate: null,
      addingUserId: null,
      updatingUserId: null
    }
  }
};

const getters = {
  g_session_token(state) {
    return state.session.token;
  },
  g_session_tokenUser(state) {
    return state.session.tokenUser;
  },
  g_session_toolbar_currentUserView(state) {
    return state.session.toolbar.currentUserView;
  },
  g_session_toolbar_currentUserMenuView(state) {
    return state.session.toolbar.currentUserMenuView;
  },
  g_session_currentUser(state) {
    return state.session.currentUser;
  }
};

const mutations = {
  m_session_token(state, token) {
    if (token === null) {
      localStorage.removeItem(GlobalEnv.system.tokenKey);
    } else {
      localStorage.setItem(GlobalEnv.system.tokenKey, token);
      const user = JSON.parse(atob(token.split(".")[1]));
      state.session.tokenUser = user;
    }
    state.session.token = token;
  },
  m_session_tokenUser(state, tokenUser) {
    state.session.tokenUser = tokenUser;
  },
  m_session_toolbar_currentUserView(state, status) {
    state.session.toolbar.currentUserView = status;
  },
  m_session_toolbar_currentUserMenuView(state, status) {
    state.session.toolbar.currentUserMenuView = status;
  },
  m_session_currentUser(state, user) {
    state.session.currentUser = user;
  }
};

const actions = {
  a_session_loadLocalToken(context) {
    return new Promise(resolve => {
      let localToken = localStorage.getItem(GlobalEnv.system.tokenKey);

      if (localToken) context.commit("m_session_token", localToken);

      resolve();
    });
  },
  a_session_token_check(context) {
    return new Promise(resolve => {
      Tools.apiAuthGet(GlobalEnv.api.userManagement.token.checkToken)
        .then(() => {
          resolve();
        })
        .catch(() => {
          context.commit("m_session_token", null);
          resolve();
        });
    });
  },
  a_session_logout(context) {
    context.commit("m_layout_drawerStatus", false);
    context.commit("m_layout_appBarNavIconView", false);
    context.commit("m_messages_toolbar_view", false);
    context.commit("m_notification_toolbar_view", false);
    context.commit("m_session_toolbar_currentUserView", false);
    context.commit("m_socketUsers_toolbar_view", false);
    context.commit("m_socket_view", false);
    context.commit("m_socket_status", false);
    context.commit("m_socket_connection", null);
    context.commit("m_socket_users", []);

    context.commit("m_initializer_systemLoadStatus", false);
    context.commit("m_initializer_loginStatus", false);

    context.commit("m_session_token", null);
  },
  a_session_currentUser_load(context) {
    return new Promise(resolve => {
      let userId = context.getters.g_session_tokenUser.unique_name;
      Tools.apiAuthGet_withHash_singleData(
        GlobalEnv.api.userManagement.user.get,
        "Id = " + userId,
        GlobalEnv.hashCodes.UserManagement.User.Get
      )
        .then(data => {
          context.commit("m_session_currentUser", data);
          resolve(true);
        })
        .catch(() => {
          Tools.showErrorMsg(
            t.t("session.a_session_currentUser_load.error.title"),
            t.t("session.a_session_currentUser_load.error.msg")
          );
          resolve(false);
        });
    });
  },
  a_session_currentUser_SaveProfileInformations(context, payload) {
    return Tools.apiAuthPost_withHash(
      GlobalEnv.api.userManagement.user.changeProfileInformations,
      payload,
      GlobalEnv.hashCodes.UserManagement.User.ChangeProfileInformations
    );
  },
  a_session_currentUser_SaveNewProfilePic(context, payload) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append("Id", context.state.session.currentUser.id);
      formData.append("PictureType", "User.ProfilePicture");
      formData.append("Picture", payload);
      formData.append(
        "Hash",
        sha1(
          context.state.session.currentUser.id +
            "User.ProfilePicture" +
            GlobalEnv.hashCodes.UserManagement.User.ChangeProfilePicture
        )
      );
      Tools.apiAuthPostFile(
        GlobalEnv.api.userManagement.user.ChangeProfilePicture,
        formData
      )
        .then(() => {
          context
            .dispatch("a_session_currentUser_load")
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_session_currentUser_SaveNewProfileBgPic(context, payload) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append("Id", context.state.session.currentUser.id);
      formData.append("PictureType", "User.ProfileBgPicture");
      formData.append("Picture", payload);
      formData.append(
        "Hash",
        sha1(
          context.state.session.currentUser.id +
            "User.ProfileBgPicture" +
            GlobalEnv.hashCodes.UserManagement.User.ChangeProfileBgPicture
        )
      );
      Tools.apiAuthPostFile(
        GlobalEnv.api.userManagement.user.ChangeProfileBgPicture,
        formData
      )
        .then(() => {
          context
            .dispatch("a_session_currentUser_load")
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_session_currentUser_ChangePassword(context, payload) {
    payload.UserId = context.state.session.currentUser.id;
    payload.CurrentPass = sha1(
      payload.CurrentPass + GlobalEnv.hashCodes.Password
    );
    payload.NewPass = sha1(payload.NewPass + GlobalEnv.hashCodes.Password);
    payload = Tools.modelInjectHash(
      payload,
      GlobalEnv.hashCodes.UserManagement.User.ChangePassword
    );

    return Tools.apiAuthPost(
      GlobalEnv.api.userManagement.user.ChangePassword,
      payload
    );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
