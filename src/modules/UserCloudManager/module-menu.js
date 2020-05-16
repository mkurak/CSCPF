import t from "@/core/plugins/i18n";

const menu = [
  {
    title: t.t("modules.userCloudManager.menu.root.title"),
    icon: "mdi-cloud",
    role: "",
    roleStatus: true,
    active: false,
    checkChildRoleForThis: true,
    url: "/Modules/UserCloudManager",
    children: [
      {
        title: t.t("modules.userCloudManager.menu.root.list.title"),
        icon: "",
        role: "Root.Module.UserCloudManager.FileManager",
        roleStatus: true,
        active: false,
        url: "/Modules/UserCloudManager/FileManager/List"
      },
      {
        title: t.t("modules.userCloudManager.menu.root.sharedFiles.title"),
        icon: "",
        role: "Root.Module.UserCloudManager.FileManager",
        roleStatus: true,
        active: false,
        url: "/Modules/UserCloudManager/FileManager/SharedFiles"
      }
    ]
  }
];

export default menu;
