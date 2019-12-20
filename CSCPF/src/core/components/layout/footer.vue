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
    <span style="margin-right: 20px; font-size: 10px">
      {{ getVersionText }}
    </span>
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
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";

import SocketUpdaterComponent from "@/core/components/layout/socket-updater";

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
    },
    getVersionText() {
      let packageData = require("../../../../package.json");
      let cscpfVersion = packageData.version;
      let projectVersion = packageData.projectVersion;

      return "v" + projectVersion + " (core v" + cscpfVersion + ")";
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
