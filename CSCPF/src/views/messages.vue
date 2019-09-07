<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      v-resize="onResize"
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >{{ $t("views.messages.screenTitle") }}</v-card-title
    >
    <v-layout justify-space-between pa-4>
      <v-row>
        <v-col
          cols="3"
          :style="{ height: listHeight + 'px', overflow: 'auto' }"
        >
          <HubUserListComponent
            :sub-header="$t('views.messages.template.userListHeader')"
            list-type
            use-active-class
          ></HubUserListComponent>
        </v-col>
        <v-col cols="9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "../plugins/tools";
import GlobalEnv from "../constants/global-env";
import HubUserListComponent from "../components/content/chat/hub-user-list";

export default {
  components: {
    HubUserListComponent
  },
  data: () => ({
    GlobalEnv,
    contentViewStatus: false,
    windowSize: {
      x: 0,
      y: 0
    },
    listHeight: 0
  }),
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      this.listHeight = this.windowSize.y - 200;
    }
  }
};
</script>

<style>
.scrollable {
  overflow-y: auto;
  height: 82vh;
}
</style>
