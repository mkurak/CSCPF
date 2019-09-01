import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import GlobalEnv from "../constants/global-env";
import Tools from "../plugins/tools";
import i18n from "../plugins/i18n";
import _ from "underscore";
import Router from "../router";
import ProjectHubKeys from "../project/integration/project-hub-keys";

const hubKeys = [
  {
    key: "GiveConnectedUsersList",
    action: "a_socket_users_TakeFirstConnectedUsers"
  },
  {
    key: "ConnectedNewClient",
    action: "a_socket_users_setOnline"
  },
  {
    key: "DisconnectedClient",
    action: "a_socket_users_setOffline"
  },
  {
    key: "UserManagement.UserMessageService.ViewedMessage",
    action: "a_socket_users_viewedMessage"
  },
  {
    key: "UserManagement.UserMessageService.NewMessage",
    action: "a_socket_users_comeNewMessage"
  },
  {
    key: "HubNotifiy",
    action: "a_notification_items_add"
  },
  {
    key: "HubSyncData",
    action: "a_storages_syncSocket"
  },
  ...ProjectHubKeys
];

const state = {
  socket: {
    view: false,
    status: false,
    connection: null,
    users: []
  }
};

const getters = {
  g_socket_view(state) {
    return state.socket.view;
  },
  g_socket_status(state) {
    return state.socket.status;
  },
  g_socket_connections(state) {
    return state.socket.connection;
  },
  g_socket_users(state) {
    return state.socket.users;
  },
  g_socket_users_getOnlineUsers(state) {
    let list = state.socket.users.filter(user => {
      return user.online === true;
    });

    let listSort = _.sortBy(list, "lastMessage");

    return listSort.reverse();
  },
  g_socket_users_getOfflineUsers(state) {
    let list = state.socket.users.filter(user => {
      return user.online === false;
    });

    let listSort = _.sortBy(list, "lastMessage");

    return listSort.reverse();
  },
  g_socket_users_sortedLastMsg(state) {
    let listSort = _.sortBy(state.socket.users, "lastMessage");

    return listSort.reverse();
  },
  g_socket_users_getUser(state) {
    return userId => {
      return _.chain(state.socket.users)
        .filter(function(user) {
          return user.id == userId;
        })
        .first()
        .value();
    };
  },
  g_socket_currentUserNewMessages(state) {
    let rtn = [];

    if (state.socket.users.length === 0) return [];

    state.socket.users.forEach(user => {
      if (user.messages.length > 0) {
        user.messages.forEach(message => {
          if (!message.viewStatus) rtn.push(message);
        });
      }
    });

    if (rtn.length > 0) {
      rtn = _.chain(rtn)
        .sortBy("sendDate")
        .reverse()
        .value();
    }

    return rtn;
  }
};

const mutations = {
  m_socket_view(state, view) {
    state.socket.view = view;
  },
  m_socket_status(state, status) {
    state.socket.status = status;
  },
  m_socket_connection(state, payload) {
    state.socket.connection = payload;
  },
  m_socket_users(state, users) {
    state.socket.users = users;
  }
};

const actions = {
  a_socket_init(context) {
    return new Promise(resolve => {
      if (context.state.socket.connection !== null) {
        resolve();
        return;
      }

      context.state.socket.connection = new HubConnectionBuilder()
        .withUrl(`${GlobalEnv.socket.url}/GlobalHub`, {
          accessTokenFactory: () => context.getters.g_session_token
        })
        .configureLogging(LogLevel.Error)
        .build();

      context.state.socket.connection.onclose(() => {
        context.dispatch("a_socket_start");
        return;
      });

      hubKeys.forEach(item => {
        context.state.socket.connection.on(item.key, data => {
          context.dispatch(item.action, data);
        });
      });

      resolve();
    });
  },
  a_socket_start(context) {
    return new Promise(resolve => {
      context.state.socket.connection
        .start()
        .then(() => {
          context.commit("m_socket_status", true);
        })
        .catch(err => {
          console.error(err);
          context.commit("m_socket_status", false);
          setTimeout(() => {
            context.dispatch("a_socket_start");
          }, GlobalEnv.socket.reconnectDelay);
        });

      resolve();
    });
  },
  a_socket_Invoke(context, payload) {
    return new Promise((resolve, reject) => {
      context.state.socket.connection
        .invoke("InComingClientData", {
          ModuleName: payload.moduleName,
          DataKey: payload.dataKey,
          DataJsonString: JSON.stringify(payload.data)
        })
        .then(res => {
          if (res.error.status) {
            console.error(res);
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  a_socket_users_takeUsers(context) {
    return new Promise((resolve, reject) => {
      Tools.apiAuthGet(GlobalEnv.api.userManagement.user.userListForCurrentUser)
        .then(res => {
          const list = res;
          list.forEach(user => {
            user.online = false;
            user.fullName = user.name + " " + user.surname;
          });

          context.dispatch("a_socket_users", list);

          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  a_socket_users_TakeFirstConnectedUsers(context, payload) {
    return new Promise(resolve => {
      if (payload.length === 0) return;

      payload.forEach(user => {
        let findIndex = _.findIndex(context.state.socket.users, {
          id: user.id
        });
        if (findIndex > -1) context.state.socket.users[findIndex].online = true;
      });

      resolve();
    });
  },
  a_socket_users(context, payload) {
    return new Promise(resolve => {
      let newList = [];
      payload.forEach(user => {
        if (
          user.id !==
          parseInt(context.rootGetters.g_session_tokenUser.unique_name)
        )
          newList.push(user);
      });
      context.state.socket.users = newList;

      resolve();
    });
  },
  a_socket_users_setOnline(context, payload) {
    return new Promise(resolve => {
      let findIndex = _.findIndex(context.state.socket.users, {
        id: payload.id
      });
      if (findIndex > -1) {
        context.state.socket.users[findIndex].online = true;
        context.dispatch("a_snackbarMessage_add", {
          color: "",
          message: i18n.t("socket.actions.a_socket_users_setOnline.msg", {
            userName:
              context.state.socket.users[findIndex].name +
              " " +
              context.state.socket.users[findIndex].surname
          })
        });
      }

      resolve();
    });
  },
  a_socket_users_setOffline(context, payload) {
    return new Promise(resolve => {
      let findIndex = _.findIndex(context.state.socket.users, {
        id: payload.id
      });
      if (findIndex > -1) {
        context.state.socket.users[findIndex].online = false;
        context.dispatch("a_snackbarMessage_add", {
          color: "",
          message: i18n.t("socket.actions.a_socket_users_setOffline.msg", {
            userName:
              context.state.socket.users[findIndex].name +
              " " +
              context.state.socket.users[findIndex].surname
          })
        });
      }

      resolve();
    });
  },
  a_socket_users_saveViewAllUnViewMessages(context, payload) {
    return new Promise(resolve => {
      let user = context.getters.g_socket_users_getUser(payload);
      if (user) {
        if (user.messages) {
          user.messages.forEach(message => {
            if (!message.viewStatus) {
              context.dispatch("a_socket_Invoke", {
                moduleName: "UserManagement",
                dataKey: "ChatViewMessage",
                data: {
                  UserId: user.id,
                  MessageId: message.id
                }
              });
            }
          });
        }
      }
      resolve();
    });
  },
  a_socket_users_viewedMessage(context, payload) {
    return new Promise(resolve => {
      let findUser = _.chain(context.state.socket.users)
        .where({
          id: payload.fromUserId
        })
        .first()
        .value();
      if (findUser) {
        let findMessage = _.chain(findUser.messages)
          .where({
            id: payload.messageId
          })
          .first()
          .value();
        if (findMessage) {
          findMessage.viewStatus = true;
          findMessage.viewDate = payload.viewDate;
        }
      }

      resolve();
    });
  },
  a_socket_users_sendNewMessage(context, payload) {
    return new Promise((resolve, reject) => {
      let data = {
        FromUserId: parseInt(
          context.rootGetters.g_session_tokenUser.unique_name
        ),
        ToUserId: payload.userId,
        Message: payload.message
      };

      context
        .dispatch("a_socket_Invoke", {
          moduleName: "UserManagement",
          dataKey: "AddNewMessage",
          data
        })
        .then(() => {
          resolve();
        })
        .catch(() => {
          context.dispatch("a_snackbarMessage_add", {
            color: "error",
            message: i18n.t("socket.actions.a_socket_users_sendNewMessage.err")
          });

          reject();
        });
    });
  },
  a_socket_users_comeNewMessage(context, payload) {
    return new Promise(resolve => {
      let meSender = false;
      if (
        payload.fromUserId ===
        parseInt(context.rootGetters.g_session_tokenUser.unique_name)
      ) {
        meSender = true;
      }

      let user = {};

      if (meSender) {
        user = _.chain(context.state.socket.users)
          .where({
            id: payload.toUserId
          })
          .first()
          .value();
      } else {
        user = _.chain(context.state.socket.users)
          .where({
            id: payload.fromUserId
          })
          .first()
          .value();
      }

      let pushModel = {
        id: payload.messageId,
        ownerMe: meSender,
        message: payload.message,
        viewStatus: meSender,
        sendDate: payload.sendDate,
        viewDate: payload.sendDate
      };

      user.messages.push(pushModel);

      let viewNotify = true;

      if (meSender) viewNotify = false;

      if (Router.currentRoute.name === "chat")
        if (Router.currentRoute.params.userId === payload.fromUserId)
          viewNotify = false;

      if (viewNotify) {
        context.dispatch("a_snackbarMessage_add", {
          color: "success",
          message: i18n.t("socket.actions.a_socket_users_comeNewMessage.info", {
            user: user.name + " " + user.surname
          })
        });
      }

      resolve();
    });
  },
  a_socket_Invoke_GetConnectedUsersList(context) {
    return new Promise(resolve => {
      context.state.socket.connection
        .invoke("GetConnectedUsersList")
        .then(res => {
          context
            .dispatch("a_socket_users_TakeFirstConnectedUsers", res)
            .then(() => {
              resolve(true);
            });
        })
        .catch(err => {
          console.log(err);
          resolve(false);
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
