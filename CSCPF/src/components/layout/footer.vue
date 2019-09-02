<template>
  <v-footer app>
    <span class="caption">
      <v-btn text small @click="$router.push('/hub')">
        <v-icon>mdi-database</v-icon>
        {{ calcTotalUsing }}
      </v-btn>
    </span>
    <v-divider vertical></v-divider>
    <SocketUpdaterComponent></SocketUpdaterComponent>
    <v-divider vertical></v-divider>
    <v-spacer></v-spacer>
    <span>
      &copy; {{ copyrightYear }}
      <a
        href="https://www.codescientific.com"
        target="_blank"
        title="Code Scientific"
        class="customLink"
        >Code Scientific</a
      >
    </span>
  </v-footer>
</template>

<script>
import sizeOf from "object-sizeof";
import Tools from "../../plugins/tools";

import SocketUpdaterComponent from "./socket-updater";

export default {
  components: {
    SocketUpdaterComponent
  },
  data: () => ({
    copyrightYear: 2019
  }),
  computed: {
    calcTotalUsing: function() {
      let size = Tools.formatBytes(sizeOf(this.$store.state));
      return size;
    }
  },
  mounted() {
    this.copyrightYear = new Date().getFullYear().toString();
  }
};
</script>

<style scoped>
.customLink {
  text-decoration: none;
  color: black;
}

.customLink:hover {
  color: rgb(34, 34, 34);
}
</style>
