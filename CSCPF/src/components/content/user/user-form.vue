<template>
  <v-card v-show="!sendProcessStatus">
    <v-card-title class="headline">{{ headline }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-5">
      <v-form ref="actionForm" v-model="formValid" lazy-validation>
        <v-text-field
          :label="
            $t('components.content.user.userForm.template.form.labels.name')
          "
          clearable
          :counter="256"
          v-model="currentUser.name"
          :rules="validations.nameValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          :label="
            $t('components.content.user.userForm.template.form.labels.surname')
          "
          clearable
          :counter="256"
          v-model="currentUser.surname"
          :rules="validations.surnameValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          :label="
            $t('components.content.user.userForm.template.form.labels.userName')
          "
          clearable
          :counter="32"
          v-model="currentUser.userName"
          :rules="validations.userNameValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          :label="
            $t('components.content.user.userForm.template.form.labels.email')
          "
          clearable
          :counter="256"
          v-model="currentUser.email"
          :rules="validations.emailValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          :label="
            $t(
              'components.content.user.userForm.template.form.labels.currentPass'
            )
          "
          clearable
          :counter="32"
          :hint="$t('components.content.user.userForm.template.form.passHint')"
          :type="show.currentPass ? 'text' : 'password'"
          v-model="currentUser.currentPass"
          v-if="showCurrentPassInput"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          :label="
            $t('components.content.user.userForm.template.form.labels.newPass')
          "
          clearable
          :counter="32"
          :hint="$t('components.content.user.userForm.template.form.passHint')"
          :type="show.newPass ? 'text' : 'password'"
          v-model="currentUser.newPass"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <v-text-field
          :label="
            $t(
              'components.content.user.userForm.template.form.labels.newPassAgain'
            )
          "
          clearable
          :counter="32"
          :hint="$t('components.content.user.userForm.template.form.passHint')"
          :type="show.newPassAgain ? 'text' : 'password'"
          v-model="currentUser.newPassAgain"
          :disabled="sendProcessStatus"
        ></v-text-field>
        <project-user-form :user="user" ref="projectForm"></project-user-form>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        depressed
        color="warning"
        @click="close"
        :loading="sendProcessStatus"
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
import t from "../../../plugins/i18n";
import Tools from "../../../plugins/tools";
import ProjectUserForm from "../../../project/integration/project-user-form";

export default {
  components: {
    ProjectUserForm
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
  props: {
    user: Object,
    default: null
  },
  computed: {
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
    close() {
      this.$store.commit("m_layout_loading_view", false);
      this.$refs.actionForm.reset();
      this.$emit("close");
    },
    save() {
      if (this.currentUser.id === 0) {
        if (Tools.isNullOrEmpty(this.currentUser.newPass)) {
          this.$store.dispatch("a_snackbarMessage_add", {
            color: "error",
            message: t.t(
              "components.content.user.userForm.script.methods.save.passwordErrors.newPassEmpty"
            )
          });
          return;
        }

        if (Tools.isNullOrEmpty(this.currentUser.newPassAgain)) {
          this.$store.dispatch("a_snackbarMessage_add", {
            color: "error",
            message: t.t(
              "components.content.user.userForm.script.methods.save.passwordErrors.newPassAgainEmpty"
            )
          });
          return;
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
            return;
          }
        }
      } else {
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
          return;
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
          return;
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
          return;
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
          return;
        }
      }

      this.sendProcessStatus = true;
      this.$store.commit(
        "m_layout_loading_msg",
        t.t("components.content.user.userForm.script.methods.save.loading")
      );

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
            .save()
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
