import ManagerView from "@/modules/UserCloudManager/views/manager";
import ListView from "@/modules/UserCloudManager/views/list";
import SharedFilesView from "@/modules/UserCloudManager/views/sharedFiles";

const routes = [
  {
    path: "FileManager",
    name: "userCloudManager_fileManager",
    component: ManagerView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "List",
        name: "userCloudManager_fileManager_list",
        component: ListView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "SharedFiles",
        name: "userCloudManager_fileManager_sharedFiles",
        component: SharedFilesView,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
