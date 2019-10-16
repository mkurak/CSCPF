<template>
  <v-card class="mx-auto" flat width="98%">
    <v-card-text>
      <v-parallax
        :src="
          Tools.getImage(
            GlobalEnv.socketUsers.profileBgPic.path,
            user.profileBgPic,
            GlobalEnv.socketUsers.profileBgPic.default
          )
        "
        height="250"
        dark
      >
        <v-layout align-center column justify-center>
          <v-avatar size="88">
            <v-img
              :src="
                Tools.getImage(
                  GlobalEnv.socketUsers.profilePic.path,
                  user.profilePic,
                  GlobalEnv.socketUsers.profilePic.default
                )
              "
              class="mb-6"
            ></v-img>
          </v-avatar>
          <h3 class="headline mb-2">
            {{ user.name }} {{ user.surname }} ({{ user.userName }})
          </h3>
          <div class="mb-2">{{ user.email }}</div>
          <div class="subheading font-weight-bold">
            {{ user.profileStatusMessage }}
          </div>
        </v-layout>
      </v-parallax>
    </v-card-text>
    <v-divider></v-divider>
    <v-tabs fixed-tabs>
      <v-tab>{{ $t("views.socketUsers.template.tabTitle") }}</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-layout tag="v-card-text" text-left wrap>
              <v-flex tag="strong" xs6 text-right mr-4 mb-2>
                {{ $t("components.content.user.userDetails.template.added") }}
              </v-flex>
              <v-flex xs5>
                {{ user.addingDate | formatDate }}
                ({{ getUser_fullName(user.addingUserId) }})
              </v-flex>
              <v-flex tag="strong" xs6 text-right mr-4 mb-2>
                {{ $t("components.content.user.userDetails.template.updated") }}
              </v-flex>
              <v-flex xs5>
                {{ user.updatingDate | formatDate }}
                ({{ getUser_fullName(user.updatingUserId) }})
              </v-flex>
              <v-flex tag="strong" xs6 text-right mr-4 mb-2>
                {{ $t("components.content.user.userDetails.template.status") }}
              </v-flex>
              <v-flex xs5>
                {{
                  user.status
                    ? $t("views.socketUsers.template.statusTrue")
                    : $t("views.socketUsers.template.statusFalse")
                }}
              </v-flex>
              <v-flex xs12 text-center>
                <br />
                <v-btn outlined color="info" @click="goMessage()">
                  {{
                    $t(
                      "components.content.user.userDetails.template.sendMessageBtnText"
                    )
                  }}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>{{ $t("project.integration.profileViewTabTitle") }}</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <ProjectTabComponent :user="user"></ProjectTabComponent>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import ProjectTabComponent from "@/project/integration/profile-project-view-tab";
import _ from "underscore";
import t from "@/core/plugins/i18n";

export default {
  components: {
    ProjectTabComponent
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    Tools,
    GlobalEnv
  }),
  computed: {
    ...mapGetters(["g_session_tokenUser"])
  },
  methods: {
    getUser_fullName(id) {
      if (id === parseInt(this.g_session_tokenUser.unique_name)) {
        return (
          this.g_session_tokenUser.UserName +
          " " +
          this.g_session_tokenUser.UserSurname
        );
      } else {
        let findIndex = _.findIndex(this.getAllUsers, {
          id: id
        });
        if (findIndex > -1) {
          return this.getAllUsers[findIndex].fullName;
        } else {
          return t.t(
            "views.socketUsers.script.methods.getUser_fullName.unknownUser"
          );
        }
      }
    },
    goMessage() {
      this.$router.push(GlobalEnv.messages.route + "/" + this.user.id);
    }
  }
};
</script>

<style></style>
