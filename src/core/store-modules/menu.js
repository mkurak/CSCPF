import menuDataFile from "@/core/data/drawer-menu";
import tools from "@/core/plugins/tools";

const state = {
  menu: {
    menus: menuDataFile
  }
};
const getters = {
  g_menu_menus(state) {
    return state.menu.menus;
  }
};
const mutations = {
  m_menu_setActive(state, url) {
    state.menu.menus.forEach(menu => {
      menu.active = false;
      if (url === menu.url) {
        menu.active = true;
      } else {
        if (menu.children) {
          menu.children.forEach(childMenu => {
            if (childMenu.url === url) menu.active = true;
          });
        }
      }
    });
  }
};
const actions = {
  a_menu_checkRole(context) {
    return new Promise(resolve => {
      context.getters.g_menu_menus.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(childMenu => {
            childMenu.roleStatus = tools.checkRole(childMenu.role);
          });
        }

        if (menu.role === "" && menu.checkChildRoleForThis) {
          menu.roleStatus =
            menu.children.filter(child => {
              return child.roleStatus === true;
            }).length > 0;
        }
      });
      resolve();
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
