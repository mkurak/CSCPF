<template>
  <v-app>
    <menu-component></menu-component>
    <current-user-menu-component></current-user-menu-component>
    <header-component></header-component>
    <v-content>
      <v-scroll-y-transition mode="out-in">
        <router-view />
      </v-scroll-y-transition>
    </v-content>
    <footer-component></footer-component>
    <loading-component></loading-component>
    <v-snackbar-queue :items="g_snackbarMessages" top></v-snackbar-queue>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import MenuComponent from "./components/layout/menu";
import CurrentUserMenuComponent from "./components/layout/current-user-menu";
import HeaderComponent from "./components/layout/header";
import FooterComponent from "./components/layout/footer";
import LoadingComponent from "./components/layout/loading";
import VSnackbarQueue from "./components/app/VSnackbarQueue";

export default {
  components: {
    MenuComponent,
    CurrentUserMenuComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    VSnackbarQueue
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["g_snackbarMessages"])
  },
  methods: {},
  mounted() {}
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
}
</style>
