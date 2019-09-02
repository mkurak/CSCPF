<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card flat>
        <v-card-text>
          <v-form ref="profileForm" v-model="formValid" lazy-validation>
            <v-text-field
              v-model="form.Name"
              :label="
                $t(
                  'components.content.profile.profileInformations.template.formInputLabels.name'
                )
              "
              name="profileFormName"
              type="text"
              counter="256"
              :rules="validations.NameValidation"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.Surname"
              :label="
                $t(
                  'components.content.profile.profileInformations.template.formInputLabels.surname'
                )
              "
              name="profileFormSurname"
              type="text"
              counter="256"
              :rules="validations.SurnameValidation"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.ProfileStatusMessage"
              :label="
                $t(
                  'components.content.profile.profileInformations.template.formInputLabels.statusMessage'
                )
              "
              name="profileFormProfileStatusMessage"
              type="text"
              counter="512"
              :rules="validations.ProfileStatusMessageValidation"
              required
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
                  "components.content.profile.profileInformations.template.resetTooltip"
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
                "components.content.profile.profileInformations.template.saveBtnText"
              )
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "../../../plugins/tools";

export default {
  data() {
    return {
      formValid: true,
      sendProcessStatus: false,
      form: {
        Id: 0,
        Name: "",
        Surname: "",
        ProfileStatusMessage: ""
      },
      validations: {
        NameValidation: [
          v =>
            !!v ||
            this.$t(
              "components.content.profile.profileInformations.script.validations.NameValidation.empty"
            ),
          v =>
            v.length <= 256 ||
            this.$t(
              "components.content.profile.profileInformations.script.validations.NameValidation.maxLength"
            )
        ],
        SurnameValidation: [
          v =>
            !!v ||
            this.$t(
              "components.content.profile.profileInformations.script.validations.SurnameValidation.empty"
            ),
          v =>
            v.length <= 256 ||
            this.$t(
              "components.content.profile.profileInformations.script.validations.SurnameValidation.maxLength"
            )
        ],
        ProfileStatusMessageValidation: [
          v =>
            v.length <= 251 ||
            this.$t(
              "components.content.profile.profileInformations.script.validations.ProfileStatusMessageValidation.maxLength"
            )
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["g_session_currentUser"])
  },
  created() {
    this.resetForm();
  },
  methods: {
    formSubmit() {
      if (!this.$refs.profileForm.validate()) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: this.$t(
            "components.content.profile.profileInformations.script.methods.formSubmit.validationErrorMsg"
          )
        });
        return;
      }

      this.sendProcessStatus = true;
      this.$store.commit("m_layout_loading_view", true);
      this.$store.commit(
        "m_layout_loading_msg",
        this.$t(
          "components.content.profile.profileInformations.script.methods.formSubmit.loadingMsg"
        )
      );

      this.$store
        .dispatch("a_session_currentUser_SaveProfileInformations", this.form)
        .then(() => {
          this.$store
            .dispatch("a_session_currentUser_load")
            .then(() => {
              Tools.showSuccessMsg(
                this.$t(
                  "components.content.profile.profileInformations.script.methods.formSubmit.successTitle"
                ),
                this.$t(
                  "components.content.profile.profileInformations.script.methods.formSubmit.successMsg"
                )
              );
              this.resetForm();
              this.sendProcessStatus = false;
              this.$store.commit("m_layout_loading_view", false);
            })
            .catch(err => {
              Tools.showErrorWithApi(
                err,
                null,
                "api.errors.UserManagement.User.ChangeProfileInformations."
              );

              this.sendProcessStatus = false;
              this.$store.commit("m_layout_loading_view", false);
            });
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            null,
            "api.errors.UserManagement.User.ChangeProfileInformations."
          );
          this.sendProcessStatus = false;
          this.$store.commit("m_layout_loading_view", false);
        });
    },
    resetForm() {
      this.form.Id = this.g_session_currentUser.id;
      this.form.Name = this.g_session_currentUser.name;
      this.form.Surname = this.g_session_currentUser.surname;
      this.form.ProfileStatusMessage = this.g_session_currentUser.profileStatusMessage;
    }
  }
};
</script>

<style></style>
