import t from "@/core/plugins/i18n";
import projectMenu from "@/project/project-menu";
import GlobalEnv from "@/core/constants/global-env";

const menu = [];

menu.push({
  title: t.t("menu.currentUser.currentUser"),
  icon: "mdi-account",
  role: "",
  roleStatus: true,
  active: false,
  url: "/CurrentUser",
  checkChildRoleForThis: false,
  children: [
    {
      title: t.t("menu.currentUser.profile"),
      url: "/CurrentUser/Profile",
      role: "",
      roleStatus: true
    },
    {
      title: t.t("menu.currentUser.notification"),
      url: "/notifications",
      role: "",
      roleStatus: true
    },
    {
      title: t.t("menu.currentUser.messages"),
      url: "/messages",
      role: "",
      roleStatus: true
    },
    {
      title: t.t("menu.currentUser.logout"),
      url: "/login",
      role: "",
      roleStatus: true
    }
  ]
});

if (GlobalEnv.layout.viewUserManagementMenus) {
  menu.push({
    title: t.t("menu.userManagement.userManagement"),
    icon: "mdi-account-group",
    role: "",
    roleStatus: true,
    active: false,
    url: "/UserManagement",
    checkChildRoleForThis: true,
    children: [
      {
        title: t.t("menu.userManagement.users"),
        url: "/UserManagement/Users",
        role: "Root.UserManagement.User.List",
        roleStatus: true
      },
      {
        title: t.t("menu.userManagement.userGroups"),
        url: "/UserManagement/Groups",
        role: "Root.UserManagement.Group.List",
        roleStatus: true
      },
      {
        title: t.t("menu.userManagement.roles"),
        url: "/UserManagement/Roles",
        role: "Root.UserManagement.Role.List",
        roleStatus: true
      }
    ]
  });
}

const menu2 = [...menu, ...projectMenu];

const moduleMenu = require.context(
  "@/modules",
  true,
  /[A-Za-z0-9-_,\s]+\/module-menu.js$/i
);

if (moduleMenu.length > 0) {
  moduleMenu.keys().forEach(key => {
    moduleMenu(key).default.forEach(mm => {
      menu2.push(mm);
    });
  });
}

export default menu2;
