<template>
  <v-card v-show="!sendProcessStatus">
    <v-card-title class="headline">{{ headline }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-5">
      <v-form ref="actionForm" v-model="formValid" lazy-validation>
        <v-text-field
          v-model="currentUser.name"
          :label="
            $t('components.content.user.userForm.template.form.labels.name')
          "
          clearable
          :counter="256"
          :rules="validations.nameValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          v-model="currentUser.surname"
          :label="
            $t('components.content.user.userForm.template.form.labels.surname')
          "
          clearable
          :counter="256"
          :rules="validations.surnameValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          v-model="currentUser.userName"
          :label="
            $t('components.content.user.userForm.template.form.labels.userName')
          "
          clearable
          :counter="32"
          :rules="validations.userNameValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          v-model="currentUser.email"
          :label="
            $t('components.content.user.userForm.template.form.labels.email')
          "
          clearable
          :counter="256"
          :rules="validations.emailValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          v-if="showCurrentPassInput"
          v-model="currentUser.currentPass"
          :label="
            $t(
              'components.content.user.userForm.template.form.labels.currentPass'
            )
          "
          clearable
          :counter="32"
          :hint="$t('components.content.user.userForm.template.form.passHint')"
          :type="show.currentPass ? 'text' : 'password'"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          v-model="currentUser.newPass"
          :label="
            $t('components.content.user.userForm.template.form.labels.newPass')
          "
          clearable
          :counter="32"
          :hint="$t('components.content.user.userForm.template.form.passHint')"
          :type="show.newPass ? 'text' : 'password'"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          v-model="currentUser.newPassAgain"
          :label="
            $t(
              'components.content.user.userForm.template.form.labels.newPassAgain'
            )
          "
          clearable
          :counter="32"
          :hint="$t('components.content.user.userForm.template.form.passHint')"
          :type="show.newPassAgain ? 'text' : 'password'"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <ProjectUserForm ref="projectForm" :user="user"></ProjectUserForm>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        depressed
        color="warning"
        :loading="sendProcessStatus"
        @click="close"
      >
        {{ $t("components.content.user.userForm.template.form.cancelBtnText") }}
      </v-btn>
      <v-btn
        depressed
        color="success"
        :loading="sendProcessStatus"
        @click="save"
      >
        {{ $t("components.content.user.userForm.template.form.saveBtnText") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import t from "@/core/plugins/i18n";
import Tools from "@/core/plugins/tools";
import ProjectUserForm from "@/project/integration/project-user-form";
import { mapGetters } from "vuex";

export default {
  components: {
    ProjectUserForm
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({
    show: {
      currentPass: false,
      newPass: false,
      newPassAgain: false
    },
    currentUser: {
      id: 0,
      name: "",
      surname: "",
      userName: "",
      email: "",
      currentPass: "",
      newPass: "",
      newPassAgain: ""
    },
    showCurrentPassInput: false,
    formValid: true,
    sendProcessStatus: true,
    validations: {
      nameValidation: [
        v =>
          !!v ||
          t.t(
            "components.content.user.userForm.script.data.validations.nameValidation.requiredError"
          ),
        v =>
          (v && v.length <= 256) ||
          t.t(
            "components.content.user.userForm.script.data.validations.nameValidation.maxLengthError"
          )
      ],
      surnameValidation: [
        v =>
          !!v ||
          t.t(
            "components.content.user.userForm.script.data.validations.surnameValidation.requiredError"
          ),
        v =>
          (v && v.length <= 256) ||
          t.t(
            "components.content.user.userForm.script.data.validations.surnameValidation.maxLengthError"
          )
      ],
      userNameValidation: [
        v =>
          !!v ||
          t.t(
            "components.content.user.userForm.script.data.validations.userNameValidation.requiredError"
          ),
        v =>
          (v && v.length <= 32) ||
          t.t(
            "components.content.user.userForm.script.data.validations.userNameValidation.maxLengthError"
          )
      ],
      emailValidation: [
        v =>
          !!v ||
          t.t(
            "components.content.user.userForm.script.data.validations.emailValidation.requiredError"
          ),
        v =>
          (v && Tools.validateEmail(v)) ||
          t.t(
            "components.content.user.userForm.script.data.validations.emailValidation.formatError"
          )
      ]
    }
  }),
  computed: {
    ...mapGetters(["g_session_currentUser"]),
    headline() {
      return this.user === null || this.user === undefined
        ? t.t(
            "components.content.user.userForm.script.computed.headline.newFormTitle"
          )
        : t.t(
            "components.content.user.userForm.script.computed.headline.editFormTitle"
          );
    }
  },
  methods: {
    close(saveComplate) {
      this.$store.commit("m_layout_loading_view", false);
      this.$refs.actionForm.reset();

      if (saveComplate === true) {
        if (this.currentUser.id === this.g_session_currentUser.id) {
          Tools.showSuccessMsg(
            t.t(
              "components.content.user.userForm.script.methods.close.success.title"
            ),
            t.t(
              "components.content.user.userForm.script.methods.close.success.msg"
            )
          );
          this.$store.commit("m_storages_backgroundJobCountReset");
          this.$router.push("/login");
        }
      }

      this.currentUser.id = 0;
      this.currentUser.name = "";
      this.currentUser.surname = "";
      this.currentUser.email = "";
      this.currentUser.currentPass = "";
      this.currentUser.newPass = "";
      this.currentUser.newPassAgain = "";

      this.$emit("close");
    },
    save() {
      if (this.currentUser.id === 0) {
        if (!this.save_add_validation()) return;
      } else {
        if (!this.save_update_validation()) return;
      }

      this.sendProcessStatus = true;
      this.$store.commit(
        "m_layout_loading_msg",
        t.t("components.content.user.userForm.script.methods.save.loading")
      );

      if (this.currentUser.id > 0) this.save_update_project();
      else this.save_add_user();
    },
    save_add_validation() {
      if (Tools.isNullOrEmpty(this.currentUser.newPass)) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: t.t(
            "components.content.user.userForm.script.methods.save.passwordErrors.newPassEmpty"
          )
        });
        return false;
      }

      if (Tools.isNullOrEmpty(this.currentUser.newPassAgain)) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: t.t(
            "components.content.user.userForm.script.methods.save.passwordErrors.newPassAgainEmpty"
          )
        });
        return false;
      }

      if (
        !Tools.isNullOrEmpty(this.currentUser.newPass) &&
        !Tools.isNullOrEmpty(this.currentUser.newPassAgain)
      ) {
        if (this.currentUser.newPass !== this.currentUser.newPassAgain) {
          this.$store.dispatch("a_snackbarMessage_add", {
            color: "error",
            message: t.t(
              "components.content.user.userForm.script.methods.save.passwordErrors.newPassAgainWrong"
            )
          });
          return false;
        }
      }

      return true;
    },
    save_update_validation() {
      if (
        Tools.isNullOrEmpty(this.currentUser.currentPass) &&
        (!Tools.isNullOrEmpty(this.currentUser.newPass) ||
          !Tools.isNullOrEmpty(this.currentUser.newPassAgain))
      ) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: t.t(
            "components.content.user.userForm.script.methods.save.passwordErrors.currentPassEmpty"
          )
        });
        return false;
      }

      if (
        !Tools.isNullOrEmpty(this.currentUser.currentPass) &&
        Tools.isNullOrEmpty(this.currentUser.newPass)
      ) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: t.t(
            "components.content.user.userForm.script.methods.save.passwordErrors.newPassEmpty2"
          )
        });
        return false;
      }

      if (
        !Tools.isNullOrEmpty(this.currentUser.currentPass) &&
        Tools.isNullOrEmpty(this.currentUser.newPassAgain)
      ) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: t.t(
            "components.content.user.userForm.script.methods.save.passwordErrors.newPassAgainEmpty2"
          )
        });
        return false;
      }

      if (
        !Tools.isNullOrEmpty(this.currentUser.currentPass) &&
        this.currentUser.newPassAgain !== this.currentUser.newPass
      ) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: t.t(
            "components.content.user.userForm.script.methods.save.passwordErrors.newPassAgainWrong2"
          )
        });
        return false;
      }

      return true;
    },
    save_add_user() {
      this.$store
        .dispatch("a_storages_user_items_add_api", {
          id: 0,
          name: this.currentUser.name,
          surname: this.currentUser.surname,
          userName: this.currentUser.userName,
          email: this.currentUser.email,
          currentPassword: this.currentUser.currentPass,
          newPassword: this.currentUser.newPass
        })
        .then(returnUser => {
          let msg = "";

          if (this.currentUser.id > 0)
            msg = t.t(
              "components.content.user.userForm.script.methods.save.success.msgUpdate"
            );
          else
            msg = t.t(
              "components.content.user.userForm.script.methods.save.success.msg"
            );

          this.$refs.projectForm
            .save(returnUser)
            .then(() => {
              Tools.showSuccessMsg(
                t.t(
                  "components.content.user.userForm.script.methods.save.success.title"
                ),
                msg
              );
              this.close();
            })
            .catch(err => {
              Tools.showErrorMsg(
                t.t(
                  "components.content.user.userForm.script.methods.save.error.title"
                ),
                err
              );
              this.$store.commit("m_layout_loading_view", false);
              this.sendProcessStatus = false;
            });
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.user.userForm.script.methods.save.error.title",
            "api.errors.UserManagement.User.Save."
          );

          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        });
    },
    save_update_project() {
      this.$refs.projectForm
        .save(this.user)
        .then(() => {
          this.save_update_user();
        })
        .catch(err => {
          Tools.showErrorMsg(
            t.t(
              "components.content.user.userForm.script.methods.save.error.title"
            ),
            err
          );
          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        });
    },
    save_update_user() {
      this.$store
        .dispatch("a_storages_user_items_add_api", {
          id: this.currentUser.id,
          name: this.currentUser.name,
          surname: this.currentUser.surname,
          userName: this.currentUser.userName,
          email: this.currentUser.email,
          currentPassword: this.currentUser.currentPass,
          newPassword: this.currentUser.newPass
        })
        .then(() => {
          Tools.showSuccessMsg(
            t.t(
              "components.content.user.userForm.script.methods.save.success.title"
            ),
            t.t(
              "components.content.user.userForm.script.methods.save.success.msgUpdate"
            )
          );
          this.close(true);
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.user.userForm.script.methods.save.error.title",
            "api.errors.UserManagement.User.Save."
          );

          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        });
    },
    init() {
      this.$refs.actionForm.reset();

      if (this.user) {
        this.currentUser.id = this.user.id;
        this.currentUser.name = this.user.name;
        this.currentUser.surname = this.user.surname;
        this.currentUser.userName = this.user.userName;
        this.currentUser.email = this.user.email;

        this.showCurrentPassInput = true;
      } else {
        this.currentUser.id = 0;
        this.currentUser.name = "";
        this.currentUser.surname = "";
        this.currentUser.userName = "";
        this.currentUser.email = "";
        this.currentUser.currentPass = "";
        this.currentUser.newPass = "";
        this.currentUser.newPassAgain = "";

        this.showCurrentPassInput = false;
      }

      this.sendProcessStatus = false;
    }
  }
};
</script>

<style></style>
