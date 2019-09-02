<template>
  <v-card v-if="contentViewStatus">
    <v-card-title class="indigo white--text headline">{{
      $t("views.messages.screenTitle")
    }}</v-card-title>
    <v-layout justify-space-between pa-4>
      <v-flex d-flex xs3 sm3 md3 lg3 xl3>
        <v-card class="scrollable" style="width: 100%;">
          <HubUserListComponent
            :sub-header="$t('views.messages.template.userListHeader')"
            list-type
            use-active-class
          ></HubUserListComponent>
        </v-card>
      </v-flex>
      <router-view></router-view>
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
    contentViewStatus: false
  }),
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  }
};
</script>

<style>
.scrollable {
  overflow-y: auto;
  height: 82vh;
}
</style>
