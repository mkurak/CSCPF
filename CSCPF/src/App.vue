<template>
  <v-app>
    <MenuComponent></MenuComponent>
    <CurrentUserMenuComponent></CurrentUserMenuComponent>
    <HeaderComponent></HeaderComponent>
    <v-content>
      <v-scroll-y-transition mode="out-in">
        <router-view />
      </v-scroll-y-transition>
    </v-content>
    <FooterComponent></FooterComponent>
    <LoadingComponent></LoadingComponent>
    <VSnackbarQueue :items="g_snackbarMessages" top></VSnackbarQueue>
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
  mounted() {},
  methods: {}
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
}
</style>
