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
        :href="GlobalEnv.layout.copyright.url"
        target="_blank"
        :title="GlobalEnv.layout.copyright.label"
        class="customLink"
        >{{ GlobalEnv.layout.copyright.label }}</a
      >
    </span>
  </v-footer>
</template>

<script>
import sizeOf from "object-sizeof";
import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";

import SocketUpdaterComponent from "./socket-updater";

export default {
  components: {
    SocketUpdaterComponent
  },
  data: () => ({
    GlobalEnv,
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
