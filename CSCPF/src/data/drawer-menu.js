import t from "../plugins/i18n";
import projectMenu from "../project/integration/data/drawer-menu";

const menu = [
  {
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
        url: "/logout",
        role: "",
        roleStatus: true
      }
    ]
  },
  {
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
  },
  ...projectMenu
];

export default menu;
