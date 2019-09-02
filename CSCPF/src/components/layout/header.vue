<template>
  <v-app-bar app clipped-left clipped-right>
    <v-app-bar-nav-icon
      v-if="g_layout_appBarNavIconView"
      @click.stop="drawerViewStatus = !drawerViewStatus"
    ></v-app-bar-nav-icon>
    <v-img
      :src="GlobalEnv.layout.logoFile.file"
      :max-height="GlobalEnv.layout.logoFile.maxHeight"
      :max-width="GlobalEnv.layout.logoFile.maxWeight"
      class="mr-2"
    ></v-img>
    <v-toolbar-title>{{ GlobalEnv.layout.appName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tooltip v-if="g_notification_toolbar_view" bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
          @click="$router.push(GlobalEnv.notification.route)"
        >
          <v-badge
            v-show="g_notification_items_unViewed.length > 0"
            overlap
            name="fade"
            mode="out-in"
          >
            <template v-slot:badge>{{
              g_notification_items_unViewed.length
            }}</template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-show="g_notification_items_unViewed.length === 0"
            >mdi-bell</v-icon
          >
        </v-btn>
      </template>
      <span>{{ $t("notification.toolbar.tooltip") }}</span>
    </v-tooltip>
    <v-tooltip v-if="g_socketUsers_toolbar_view" bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
          @click="$router.push(GlobalEnv.socketUsers.route)"
        >
          <v-badge v-show="g_socket_users_getOnlineUsers.length > 0" overlap>
            <template v-slot:badge>{{
              g_socket_users_getOnlineUsers.length
            }}</template>
            <v-icon>mdi-account-group</v-icon>
          </v-badge>
          <v-icon v-show="g_socket_users_getOnlineUsers.length === 0"
            >mdi-account-group</v-icon
          >
        </v-btn>
      </template>
      <span>{{ $t("socketUsers.toolbar.tooltip") }}</span>
    </v-tooltip>
    <v-tooltip v-if="g_messages_toolbar_view" bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="$router.push(GlobalEnv.messages.route)">
          <v-badge v-show="g_socket_currentUserNewMessages.length > 0" overlap>
            <template v-slot:badge>{{
              g_socket_currentUserNewMessages.length
            }}</template>
            <v-icon>mdi-forum</v-icon>
          </v-badge>
          <v-icon v-show="g_socket_currentUserNewMessages.length === 0"
            >mdi-forum</v-icon
          >
        </v-btn>
      </template>
      <span>{{ $t("messages.toolbar.tooltip") }}</span>
    </v-tooltip>
    <v-tooltip v-if="g_socket_view" bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="$router.push('/hub')">
          <v-progress-circular
            v-if="!g_socket_status"
            indeterminate
            size="20"
          ></v-progress-circular>
          <v-icon v-else color="green">mdi-wifi</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("socket.toolbar.tooltip") }}</span>
    </v-tooltip>
    <v-tooltip v-if="g_session_toolbar_currentUserView" bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
          @click="currentUserMenuView = !currentUserMenuView"
        >
          <v-avatar size="32px">
            <img
              :src="
                Tools.getImage(
                  GlobalEnv.socketUsers.profilePic.path,
                  g_session_currentUser.profilePic,
                  GlobalEnv.socketUsers.profilePic.default
                )
              "
            />
          </v-avatar>
        </v-btn>
      </template>
      <span
        >{{ g_session_currentUser.name }}
        {{ g_session_currentUser.surname }}</span
      >
    </v-tooltip>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-avatar size="32px">
            <v-img :src="getflag"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="locale in GlobalEnv.system.locales"
          :key="locale.code"
          @click="changeLang(locale)"
        >
          <v-list-item-avatar>
            <v-img :src="'/flags/' + locale.flag" width="32"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ locale.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";

export default {
  data: () => ({
    Tools,
    GlobalEnv
  }),
  computed: {
    ...mapGetters([
      "g_layout_appBarNavIconView",
      "g_notification_toolbar_view",
      "g_notification_items_unViewed",
      "g_socketUsers_toolbar_view",
      "g_messages_toolbar_view",
      "g_socket_view",
      "g_socket_status",
      "g_socket_users_getOnlineUsers",
      "g_socket_currentUserNewMessages",
      "g_session_toolbar_currentUserView",
      "g_session_currentUser",
      "g_session_toolbar_currentUserMenuView",
      "g_layout_drawerStatus"
    ]),
    currentUserMenuView: {
      get() {
        return this.g_session_toolbar_currentUserMenuView;
      },
      set(val) {
        this.$store.commit("m_session_toolbar_currentUserMenuView", val);
      }
    },
    drawerViewStatus: {
      get() {
        return this.g_layout_drawerStatus;
      },
      set(val) {
        this.$store.commit("m_layout_drawerStatus", val);
      }
    },
    getflag() {
      let localLang = localStorage.getItem(GlobalEnv.system.langKey);
      let currentLangCode = "tr";
      let rtn = "turkey.svg";

      if (!Tools.isNullOrEmpty(localLang)) {
        currentLangCode = localLang;
      } else {
        currentLangCode = GlobalEnv.layout.lang.default;
      }

      let findLang = GlobalEnv.system.locales.filter(lang => {
        return lang.code === currentLangCode;
      });
      if (findLang.length > 0) {
        rtn = findLang[0].flag;
      }

      return "/flags/" + rtn;
    }
  },
  methods: {
    changeLang(lang) {
      this.$store.commit("m_layout_loading_view", true);
      localStorage.setItem(GlobalEnv.system.langKey, lang.code);
      window.location.reload();
    }
  }
};
</script>

<style></style>
