<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card flat>
        <v-card-text class="text-xs-center">
          <v-btn color="success" @click="profilePicSelect">
            <v-icon left dark>mdi-cloud-upload</v-icon>
            {{
              $t(
                "components.content.profile.profileImages.template.profilePicChangeBtn"
              )
            }}
          </v-btn>
          <v-btn
            color="info pulse"
            v-if="currentProfilePicFile != ''"
            @click="saveNewProfilePic"
          >
            <v-icon left dark>mdi-content-save</v-icon>
            {{
              $t(
                "components.content.profile.profileImages.template.profilePicSaveBtn"
              )
            }}
          </v-btn>
          <input
            type="file"
            style="display: none"
            ref="profilePicFI"
            accept="image/*"
            @change="onProfilePicChange"
          />
          <v-img
            :src="currentProfilePicUrl"
            :lazy-src="currentProfilePicUrl"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
          <br />
          <br />
          <br />
          <v-btn color="success" @click="profileBgPicSelect">
            <v-icon left dark>mdi-cloud-upload</v-icon>
            {{
              $t(
                "components.content.profile.profileImages.template.profileBgPicChangeBtn"
              )
            }}
          </v-btn>
          <v-btn
            color="info pulse"
            v-if="currentProfileBgPicFile != ''"
            @click="saveNewProfileBgPic"
          >
            <v-icon left dark>mdi-content-save</v-icon>
            {{
              $t(
                "components.content.profile.profileImages.template.profileBgPicSaveBtn"
              )
            }}
          </v-btn>
          <input
            type="file"
            style="display: none"
            ref="profileBgPicFI"
            accept="image/*"
            @change="onProfileBgPicChange"
          />
          <v-img
            :src="currentProfileBgPicUrl"
            :lazy-src="currentProfileBgPicUrl"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import GlobalEnv from "../../../constants/global-env";
import Tools from "../../../plugins/tools";

export default {
  data() {
    return {
      currentProfilePicName: "",
      currentProfilePicUrl: "",
      currentProfilePicFile: "",
      currentProfileBgPicName: "",
      currentProfileBgPicUrl: "",
      currentProfileBgPicFile: ""
    };
  },
  computed: {
    ...mapGetters(["g_session_currentUser"])
  },
  methods: {
    profilePicSelect() {
      this.$refs.profilePicFI.click();
    },
    profileBgPicSelect() {
      this.$refs.profileBgPicFI.click();
    },
    onProfilePicChange(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.currentProfilePicName = files[0].name;
        if (this.currentProfilePicName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.currentProfilePicUrl = fr.result;
          this.currentProfilePicFile = files[0];
        });
      }
    },
    saveNewProfilePic() {
      this.$store.commit("m_layout_loading_view", true);
      this.$store.commit(
        "m_layout_loading_msg",
        this.$t(
          "components.content.profile.profileImages.script.methods.saveNewProfilePic.loading"
        )
      );
      this.$store
        .dispatch(
          "a_session_currentUser_SaveNewProfilePic",
          this.currentProfilePicFile
        )
        .then(() => {
          this.currentProfilePicName = "";
          this.currentProfilePicUrl = Tools.getImage(
            GlobalEnv.socketUsers.profilePic.path,
            this.g_session_currentUser.profilePic,
            GlobalEnv.socketUsers.profilePic.default
          );
          this.currentProfilePicFile = "";

          this.$store.commit("m_layout_loading_view", false);
          Tools.showSuccessMsg(
            this.$t(
              "components.content.profile.profileImages.script.methods.saveNewProfilePic.successTitle"
            ),
            this.$t(
              "components.content.profile.profileImages.script.methods.saveNewProfilePic.successMsg"
            )
          );
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.profile.profileImages.script.methods.saveNewProfilePic.errorTitle",
            "api.errors.UserManagement.User.ChangeProfilePicture."
          );
          this.$store.commit("m_layout_loading_view", false);
        });
    },
    onProfileBgPicChange(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.currentProfileBgPicName = files[0].name;
        if (this.currentProfileBgPicName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.currentProfileBgPicUrl = fr.result;
          this.currentProfileBgPicFile = files[0];
        });
      }
    },
    saveNewProfileBgPic() {
      this.$store.commit("m_layout_loading_view", true);
      this.$store.commit(
        "m_layout_loading_msg",
        this.$t(
          "components.content.profile.profileImages.script.methods.saveNewProfileBgPic.loading"
        )
      );
      this.$store
        .dispatch(
          "a_session_currentUser_SaveNewProfileBgPic",
          this.currentProfileBgPicFile
        )
        .then(() => {
          this.currentProfileBgPicName = "";
          this.currentProfileBgPicUrl = Tools.getImage(
            GlobalEnv.socketUsers.profileBgPic.path,
            this.g_session_currentUser.profileBgPic,
            GlobalEnv.socketUsers.profileBgPic.default
          );
          this.currentProfileBgPicFile = "";

          this.$store.commit("m_layout_loading_view", false);
          Tools.showSuccessMsg(
            this.$t(
              "components.content.profile.profileImages.script.methods.saveNewProfileBgPic.successTitle"
            ),
            this.$t(
              "components.content.profile.profileImages.script.methods.saveNewProfileBgPic.successMsg"
            )
          );
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.profile.profileImages.script.methods.saveNewProfileBgPic.errorTitle",
            "api.errors.UserManagement.User.ChangeProfileBgPicture."
          );
          this.$store.commit("m_layout_loading_view", false);
        });
    }
  },
  watch: {
    g_session_currentUser() {
      this.currentProfilePicUrl = Tools.getImage(
        GlobalEnv.socketUsers.profilePic.path,
        this.g_session_currentUser.profilePic,
        GlobalEnv.socketUsers.profilePic.default
      );
      this.currentProfileBgPicUrl = Tools.getImage(
        GlobalEnv.socketUsers.profileBgPic.path,
        this.g_session_currentUser.profileBgPic,
        GlobalEnv.socketUsers.profileBgPic.default
      );
    }
  },
  created() {
    this.currentProfilePicUrl = Tools.getImage(
      GlobalEnv.socketUsers.profilePic.path,
      this.g_session_currentUser.profilePic,
      GlobalEnv.socketUsers.profilePic.default
    );
    this.currentProfileBgPicUrl = Tools.getImage(
      GlobalEnv.socketUsers.profileBgPic.path,
      this.g_session_currentUser.profileBgPic,
      GlobalEnv.socketUsers.profileBgPic.default
    );
  }
};
</script>

<style></style>
