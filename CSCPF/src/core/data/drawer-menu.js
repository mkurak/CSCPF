import t from "@/core/plugins/i18n";
import projectMenu from "@/project/integration/data/drawer-menu";
import projectEnv from "@/project/integration/project-env";

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

let addUMMenu = true;
if (projectEnv.core && projectEnv.core.layout)
  addUMMenu = projectEnv.core.layout.viewUserManagementMenus;

if (addUMMenu) {
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

export default menu2;
