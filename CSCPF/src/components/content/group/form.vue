<template>
  <v-card v-show="!sendProcessStatus">
    <v-card-title class="headline">{{ headline }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-5">
      <v-form ref="actionForm" v-model="formValid" lazy-validation>
        <v-text-field
          v-model="form.name"
          :label="$t('components.content.groupForm.template.labels.name')"
          clearable
          :counter="256"
          :rules="validations.nameValidation"
          :disabled="sendProcessStatus"
        ></v-text-field>
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
        >{{
          $t("components.content.groupForm.template.btn.cancelBtnText")
        }}</v-btn
      >
      <v-btn
        depressed
        color="success"
        :loading="sendProcessStatus"
        @click="save"
        >{{
          $t("components.content.groupForm.template.btn.saveBtnText")
        }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import t from "../../../plugins/i18n";
import Tools from "../../../plugins/tools";

export default {
  props: {
    group: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({
    overlay: true,
    sendProcessStatus: false,
    headline: t.t("components.content.groupForm.script.data.headline.add"),
    formValid: true,
    validations: {
      nameValidation: [
        v =>
          !!v ||
          t.t(
            "components.content.groupForm.script.data.validations.nameValidation.requiredError"
          ),
        v =>
          (v && v.length <= 256) ||
          t.t(
            "components.content.groupForm.script.data.validations.nameValidation.maxLengthError"
          )
      ]
    },
    form: {
      name: ""
    }
  }),
  computed: {},
  methods: {
    close() {
      this.$store.commit("m_layout_loading_view", false);
      this.sendProcessStatus = false;
      this.form.name = "";
      this.$refs.actionForm.reset();
      this.$emit("close");
    },
    save() {
      if (!this.$refs.actionForm.validate()) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: this.$t(
            "components.content.groupForm.script.methods.save.validationError"
          )
        });
        return;
      }

      this.$store.commit(
        "m_layout_loading_msg",
        this.$t("components.content.groupForm.script.methods.save.loading")
      );

      let data = {};

      if (this.group !== null) data.id = this.group.id;
      else data.id = 0;

      data.groupName = this.form.name;

      this.$store
        .dispatch("a_storages_userGroups_save_api", data)
        .then(() => {
          Tools.showSuccessMsg(
            this.$t(
              "components.content.groupForm.script.methods.save.successTitle"
            ),
            this.$t(
              "components.content.groupForm.script.methods.save.successMsg"
            )
          );
          this.close();
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.groupForm.script.methods.save.errorTitle",
            "api.errors.UserManagement.Group.Save."
          );
          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        });
    },
    init() {
      if (this.group !== null) {
        this.headline = t.t(
          "components.content.groupForm.script.data.headline.edit"
        );
        this.form.name = this.group.groupName;
      } else {
        this.headline = t.t(
          "components.content.groupForm.script.data.headline.add"
        );
      }

      this.$refs.actionForm.reset();
    }
  }
};
</script>

<style></style>
