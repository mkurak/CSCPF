<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card flat>
        <v-card-text>
          <v-form ref="changePasswordForm" v-model="formValid" lazy-validation>
            <v-text-field
              v-model="form.CurrentPass"
              :label="
                $t(
                  'components.content.profile.passwordChange.template.currentPassLabel'
                )
              "
              name="changePasswordFormCurrentPass"
              counter="32"
              :rules="validations.CurrentPassValidation"
              :hint="
                $t(
                  'components.content.profile.passwordChange.template.currentPassHint'
                )
              "
              :append-icon="showCurrentPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showCurrentPass ? 'text' : 'password'"
              required
              @click:append="showCurrentPass = !showCurrentPass"
            ></v-text-field>
            <v-text-field
              v-model="form.NewPass"
              :label="
                $t(
                  'components.content.profile.passwordChange.template.newPassLabel'
                )
              "
              name="changePasswordFormNewPass"
              counter="32"
              :rules="validations.NewPassValidation"
              :hint="
                $t(
                  'components.content.profile.passwordChange.template.newPassHint'
                )
              "
              :append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showNewPass ? 'text' : 'password'"
              required
              @click:append="showNewPass = !showNewPass"
            ></v-text-field>
            <v-text-field
              v-model="form.NewPassAgain"
              :label="
                $t(
                  'components.content.profile.passwordChange.template.newPass2Label'
                )
              "
              name="changePasswordFormNewPassAgain"
              counter="32"
              :rules="validations.NewPassAgainValidation"
              :hint="
                $t(
                  'components.content.profile.passwordChange.template.newPass2Hint'
                )
              "
              :append-icon="showNewPassAgain ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showNewPassAgain ? 'text' : 'password'"
              required
              @click:append="showNewPassAgain = !showNewPassAgain"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon class="my-0" @click="resetForm" v-on="on">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>
              {{
                $t(
                  "components.content.profile.passwordChange.template.resetFormButtonText"
                )
              }}
            </span>
          </v-tooltip>
          <v-btn
            color="primary"
            :loading="sendProcessStatus"
            :disabled="sendProcessStatus"
            text
            @click="formSubmit"
          >
            {{
              $t(
                "components.content.profile.passwordChange.template.updatePasswordBtnText"
              )
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Tools from "@/core/plugins/tools";

export default {
  data() {
    return {
      formValid: true,
      sendProcessStatus: false,
      form: {
        CurrentPass: "",
        NewPass: "",
        NewPassAgain: ""
      },
      validations: {
        CurrentPassValidation: [
          v =>
            !!v ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.CurrentPassValidation.empty"
            ),
          v =>
            Tools.validatePass(v) ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.CurrentPassValidation.wrongType"
            ),
          v =>
            v.length >= 8 ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.CurrentPassValidation.minLength"
            ),
          v =>
            v.length <= 32 ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.CurrentPassValidation.maxLength"
            )
        ],
        NewPassValidation: [
          v =>
            !!v ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassValidation.empty"
            ),
          v =>
            Tools.validatePass(v) ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassValidation.wrongType"
            ),
          v =>
            v.length >= 8 ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassValidation.minLength"
            ),
          v =>
            v.length <= 32 ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassValidation.maxLength"
            )
        ],
        NewPassAgainValidation: [
          v =>
            !!v ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassAgainValidation.empty"
            ),
          v =>
            Tools.validatePass(v) ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassAgainValidation.wrongType"
            ),
          v =>
            v.length >= 8 ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassAgainValidation.minLength"
            ),
          v =>
            v.length <= 32 ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassAgainValidation.maxLength"
            ),
          v =>
            v == this.form.NewPass ||
            this.$t(
              "components.content.profile.passwordChange.script.validations.NewPassAgainValidation.equal"
            )
        ]
      },
      showCurrentPass: false,
      showNewPass: false,
      showNewPassAgain: false
    };
  },
  methods: {
    resetForm() {
      this.form.CurrentPass = "";
      this.form.NewPass = "";
      this.form.NewPassAgain = "";
    },
    formSubmit() {
      if (!this.$refs.changePasswordForm.validate()) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: this.$t(
            "components.content.profile.passwordChange.script.methods.formSubmit.unValid"
          )
        });
        return;
      }

      this.sendProcessStatus = true;
      this.$store.commit("m_layout_loading_view", true);
      this.$store.commit(
        "m_layout_loading_msg",
        this.$t(
          "components.content.profile.passwordChange.script.methods.formSubmit.loading"
        )
      );

      const sendData = {
        UserId: 0,
        CurrentPass: this.form.CurrentPass,
        NewPass: this.form.NewPass
      };

      this.$store
        .dispatch("a_session_currentUser_ChangePassword", sendData)
        .then(() => {
          Tools.showSuccessMsg(
            this.$t(
              "components.content.profile.passwordChange.script.methods.formSubmit.successTitle"
            ),
            this.$t(
              "components.content.profile.passwordChange.script.methods.formSubmit.successMsg"
            )
          );
          this.$store.commit("m_layout_loading_view", false);
          this.$store.dispatch("a_session_logout").then(() => {
            this.$router.push("/login");
          });
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.profile.passwordChange.script.methods.formSubmit.errorTitle",
            "api.errors.UserManagement.User.ChangePassword."
          );
          this.sendProcessStatus = false;
          this.$store.commit("m_layout_loading_view", false);
        });
    }
  }
};
</script>

<style></style>
