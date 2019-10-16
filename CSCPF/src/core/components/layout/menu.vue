<template>
  <v-navigation-drawer v-model="drawerViewStatus" app clipped fixed>
    <v-list dense>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t("menu.home") }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-for="item in getMenuItems(g_menu_menus)"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in getMenuItems(item.children)"
          :key="subItem.title"
          :to="subItem.url"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["g_layout_drawerStatus", "g_menu_menus"]),
    drawerViewStatus: {
      get() {
        return this.g_layout_drawerStatus;
      },
      set(val) {
        this.$store.commit("m_layout_drawerStatus", val);
      }
    },
    getMenuItems() {
      return menus => {
        return menus.filter(menu => {
          return menu.roleStatus === true;
        });
      };
    }
  }
};
</script>

<style></style>
