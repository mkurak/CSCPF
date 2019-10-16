import _ from "underscore";
import GlobalEnv from "@/core/constants/global-env";

const state = {
  notification: {
    toolbar: {
      view: false
    },
    items: []
  }
};

const getters = {
  g_notification_toolbar_view(state) {
    return state.notification.toolbar.view;
  },
  g_notification_items(state) {
    return state.notification.items;
  },
  g_notification_items_unViewed(state) {
    return _.where(state.notification.items, {
      viewStatus: false
    });
  }
};

const mutations = {
  m_notification_toolbar_view(state, status) {
    state.notification.toolbar.view = status;
  }
};

const actions = {
  a_notification_items_load(context) {
    return new Promise(resolve => {
      if (context.rootGetters.g_settings_notification_saveLocal) {
        let notificationLocalItems = localStorage.getItem(
          GlobalEnv.system.notificationKey
        );
        if (notificationLocalItems !== null) {
          context.state.notification.items = JSON.parse(notificationLocalItems);
        }
      }

      context.dispatch("a_notification_items_save");

      resolve();
    });
  },
  a_notification_items_add(context, item) {
    return new Promise(resolve => {
      item.id = _.uniqueId();

      context.state.notification.items.unshift(item);

      context.dispatch("a_snackbarMessage_add", {
        color: "success",
        message: item.title
      });

      if (context.rootGetters.g_settings_notification_saveLocal) {
        return context.dispatch("a_notification_items_save");
      }

      resolve();
    });
  },
  a_notification_items_update(context, item) {
    return new Promise(resolve => {
      let findIndex = _.chain(context.state.notification.items)
        .findIndex({
          id: item.id
        })
        .value();

      if (findIndex > -1) {
        context.state.notification.items[findIndex] = item;
      }

      if (context.rootGetters.g_settings_notification_saveLocal) {
        return context.dispatch("a_notification_items_save");
      }

      resolve();
    });
  },
  a_notification_items_remove(context, id) {
    return new Promise(resolve => {
      context.state.notification.items = _.without(
        context.state.notification.items,
        _.findWhere(context.state.notification.items, {
          id: id
        })
      );

      if (context.rootGetters.g_settings_notification_saveLocal) {
        return context.dispatch("a_notification_items_save");
      }

      resolve();
    });
  },
  a_notification_items_save(context) {
    return new Promise(resolve => {
      localStorage.setItem(
        GlobalEnv.system.notificationKey,
        JSON.stringify(context.state.notification.items)
      );

      resolve();
    });
  },
  a_notification_items_viewPointAll(context) {
    return new Promise(resolve => {
      context.state.notification.items.forEach(item => {
        item.viewStatus = true;
      });

      context.dispatch("a_notification_items_save").then(() => {
        resolve();
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
