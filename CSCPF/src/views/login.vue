<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >{{ $t("views.login.screenTitle") }}</v-card-title
    >
    <v-layout justify-space-between pa-4>
      <v-flex>
        <v-container fill-height fluid>
          <v-layout align-center justify-center>
            <v-flex md4 sm8 xs12>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark>
                  <v-toolbar-title>{{
                    $t("views.login.template.title")
                  }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="loginForm" v-model="formValid" lazy-validation>
                    <v-text-field
                      v-model="email"
                      :label="this.$t('views.login.template.emailLabel')"
                      name="login"
                      prepend-icon="mdi-email"
                      type="text"
                      counter="256"
                      required
                      :rules="emailValidation"
                      placeholder=" "
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      v-model="pass"
                      :label="this.$t('views.login.template.passLabel')"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      counter="32"
                      required
                      :rules="passValidation"
                      placeholder=" "
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    :loading="sendProcessStatus"
                    :disabled="sendProcessStatus"
                    @click="formSubmit"
                    >{{ $t("views.login.template.enterBtn") }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "../plugins/tools";
import GlobalEnv from "../constants/global-env";
import sha1 from "sha1";

export default {
  data() {
    return {
      GlobalEnv,
      contentViewStatus: false,
      formValid: true,
      sendProcessStatus: false,
      email: "",
      pass: "",
      emailValidation: [
        v => !!v || this.$t("views.login.script.emailValidation.emailEmpty"),
        v =>
          (v && v.length < 256) ||
          this.$t("views.login.script.emailValidation.emailTooLong"),
        v =>
          (v && Tools.validateEmail(v)) ||
          this.$t("views.login.script.emailValidation.emailWrongFormat")
      ],
      passValidation: [
        v => !!v || this.$t("views.login.script.passValidation.passEmpty"),
        v =>
          (v && v.length > 8) ||
          this.$t("views.login.script.passValidation.passTooShort"),
        v =>
          (v && v.length < 32) ||
          this.$t("views.login.script.passValidation.passTooLong"),
        v =>
          (v && Tools.validatePass(v)) ||
          this.$t("views.login.script.passValidation.passWrongFormat")
      ]
    };
  },
  async mounted() {
    await this.$store.dispatch("a_session_logout");
    Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
    localStorage.clear();
  },
  methods: {
    async formSubmit() {
      if (!this.$refs.loginForm.validate()) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: this.$t("views.login.script.formSubmit.unValid")
        });
        return;
      }

      this.sendProcessStatus = true;
      this.$store.commit(
        "m_layout_loading_msg",
        this.$t("views.login.script.formSubmit.loading")
      );

      const sendLoginModel = Tools.modelInjectHash(
        {
          Email: this.email,
          Password: sha1(this.pass + GlobalEnv.hashCodes.Password),
          Device: "EkoFoodVueApp",
          DeviceKey: "EkoFoodVueApp"
        },
        GlobalEnv.hashCodes.UserManagement.Token.CreateToken
      );

      Tools.apiPost(
        GlobalEnv.api.userManagement.token.createToken,
        sendLoginModel
      )
        .then(resp => {
          this.$store.commit("m_session_token", resp);
          this.$store.commit("m_layout_loading_view", true);
          this.$store.dispatch("a_initializer_start").then(() => {
            if (this.$store.getters.g_initializer_loginStatus) {
              let version = JSON.stringify(
                require("../../package.json").projectVersion
              );
              localStorage.setItem("cscpf_version", version);
              this.$router.push("/");
            } else {
              this.sendProcessStatus = false;
            }
          });
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            null,
            "api.errors.UserManagement.Token.CreateToken."
          );

          this.sendProcessStatus = false;
          this.$store.commit("m_layout_loading_view", false);
        });
    }
  }
};
</script>

<style></style>
