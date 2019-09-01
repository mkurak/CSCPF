import Vue from "vue";
import Router from "vue-router";
import Store from "./store";
import ProjectRouter from "./project/integration/router";

import HomeView from "./views/home.vue";
import LoginView from "./views/login.vue";
import InitView from "./views/init.vue";
import NotificationsView from "./views/notifications.vue";
import SocketUsersView from "./views/socket-users.vue";
import MessagesView from "./views/messages.vue";
import CurrentUserProfileView from "./views/CurrentUser/profile.vue";
import ProjectRouterLayoutView from "./views/project-router-layout.vue";
import HubView from "./views/hub.vue";
import ChatView from "./components/content/chat/chat.vue";

// User Management Routes
import UserManagementRootView from "./views/userManagement/index.vue";
import UserManagementUsersView from "./views/userManagement/users.vue";
import UserManagementGroupsView from "./views/userManagement/groups.vue";
import UserManagementRolesView from "./views/userManagement/roles.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/init",
      name: "init",
      component: InitView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/notifications",
      name: "notifications",
      component: NotificationsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/socket-users",
      name: "socketUsers",
      component: SocketUsersView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/messages",
      name: "messages",
      component: MessagesView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: ":userId",
          name: "chat",
          component: ChatView
        }
      ]
    },
    {
      path: "/CurrentUser/Profile",
      name: "currentUserProfile",
      component: CurrentUserProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/hub",
      name: "hub",
      component: HubView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/UserManagement",
      name: "userManagement",
      component: UserManagementRootView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "users",
          name: "users",
          component: UserManagementUsersView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "groups",
          name: "groups",
          component: UserManagementGroupsView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "roles",
          name: "rols",
          component: UserManagementRolesView,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/Project",
      name: "project",
      component: ProjectRouterLayoutView,
      meta: {
        requiresAuth: true
      },
      children: ProjectRouter
    }
  ]
});

router.beforeEach((to, from, next) => {
  const path = to.path.toLowerCase();
  if (path === "/init") {
    next();
  } else if (path === "/login") {
    next();
  } else {
    if (!Store.getters.g_initializer_systemLoadStatus) {
      next("/init");
    } else {
      Store.dispatch("a_menu_checkRole").then(() => {
        Store.commit("m_menu_setActive", to.fullPath);

        Store.dispatch(
          "a_storages_storages_clearUnCoverStorageData",
          to.fullPath
        )
          .then(() => {
            return Store.dispatch(
              "a_storages_storages_loadPathStorageData",
              to.fullPath
            );
          })
          .then(() => {
            next();
          });
      });
    }
  }
});

export default router;
