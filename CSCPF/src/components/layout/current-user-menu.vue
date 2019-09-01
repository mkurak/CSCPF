<template>
  <v-navigation-drawer
    temporary
    right
    dark
    app
    clipped
    v-model="currentUserMenuView"
  >
    <v-list class="pa-0">
      <v-list-item>
        <v-list-item-avatar>
          <img
            :src="
              Tools.getImage(
                GlobalEnv.socketUsers.profilePic.path,
                g_session_currentUser.profilePic,
                GlobalEnv.socketUsers.profilePic.default
              )
            "
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            >{{ g_session_currentUser.name }}
            {{ g_session_currentUser.surname }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list class="pa-0" dense>
      <v-list-item
        v-for="menu in CurrentUserMenu"
        :key="menu.id"
        @click="currentUserMenuClick(menu)"
      >
        <v-list-item-action>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{
            Tools.checkI18n(menu.title)
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import CurrentUserMenu from "../../data/current-user-menu.json";
import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";

export default {
  data: () => ({
    Tools,
    GlobalEnv,
    CurrentUserMenu
  }),
  computed: {
    ...mapGetters([
      "g_session_currentUser",
      "g_session_toolbar_currentUserMenuView"
    ]),
    currentUserMenuView: {
      get() {
        return this.g_session_toolbar_currentUserMenuView;
      },
      set(val) {
        this.$store.commit("m_session_toolbar_currentUserMenuView", val);
      }
    }
  },
  methods: {
    currentUserMenuClick(menu) {
      switch (menu.url) {
        case "[notifications]":
          this.$router.push("/notifications");
          break;
        case "[messages]":
          this.$router.push("/messages");
          break;
        case "[login]":
          this.$store.dispatch("a_session_logout").then(() => {
            this.$router.push("/login");
          });
          break;
        default:
          this.$router.push(menu.url);
          break;
      }
    }
  }
};
</script>

<style></style>
