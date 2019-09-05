<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >{{ $t("views.CurrentUser.Profile.screenTitle") }}</v-card-title
    >
    <v-layout justify-space-between pa-4>
      <v-flex>
        <v-parallax
          height="350"
          :src="
            Tools.getImage(
              GlobalEnv.socketUsers.profileBgPic.path,
              g_session_currentUser.profileBgPic,
              GlobalEnv.socketUsers.profileBgPic.default
            )
          "
        >
          <v-layout column justify-center align-center>
            <v-avatar size="200px">
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
            <h1 class="display-2 font-weight-thin mb-3">
              {{ g_session_currentUser.name }}
              {{ g_session_currentUser.surname }}
            </h1>
            <h4 class="subheading">
              {{ g_session_currentUser.profileStatusMessage }}
            </h4>
          </v-layout>
        </v-parallax>
        <v-container fluid>
          <v-tabs fixed-tabs>
            <v-tab>
              {{ $t("views.CurrentUser.Profile.tabs.profileInformations") }}
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <InformationsComponent></InformationsComponent>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab>{{ $t("views.CurrentUser.Profile.tabs.images") }}</v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <ImagesComponent></ImagesComponent>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab>{{ $t("views.CurrentUser.Profile.tabs.changePass") }}</v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <ChangePasswordComponent></ChangePasswordComponent>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab>{{ $t("project.integration.profileEditTabTitle") }}</v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <ProjectProfileTab></ProjectProfileTab>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";

import InformationsComponent from "../../components/content/profile/profile-informations";
import ImagesComponent from "../../components/content/profile/profile-images";
import ChangePasswordComponent from "../../components/content/profile/password-change";
import ProjectProfileTab from "../../project/integration/profile-project-tab";

export default {
  components: {
    InformationsComponent,
    ImagesComponent,
    ChangePasswordComponent,
    ProjectProfileTab
  },
  data: () => ({
    contentViewStatus: false,
    Tools,
    GlobalEnv
  }),
  computed: {
    ...mapGetters(["g_session_currentUser"])
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  }
};
</script>

<style></style>
