<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>{{
      currentFile.text
    }}</v-card-title>

    <v-card-text class="pt-4">
      <v-form ref="form" v-model="formValid" lazy-validation @submit="save">
        <p>
          <span class="font-weight-bold">
            {{
              $t(
                "modules.userCloudManager.components.editFile.template.currentPathTitle"
              )
            }}
          </span>
          <span>{{ currentFile.fullDirectoryPath }}</span>
        </p>
        <v-text-field
          v-model="inputs.title"
          :label="
            $t(
              'modules.userCloudManager.components.editFile.template.titleLabel'
            )
          "
          counter="128"
          :rules="validations.titleValidation"
        ></v-text-field>
        <v-text-field
          v-model="inputs.description"
          :label="
            $t(
              'modules.userCloudManager.components.editFile.template.descriptionLabel'
            )
          "
          counter="512"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="danger" text @click="closeDialog">
        {{
          $t("modules.userCloudManager.components.editFile.template.cancelBtn")
        }}
      </v-btn>
      <v-btn color="primary" text @click="save">
        {{
          $t("modules.userCloudManager.components.editFile.template.saveBtn")
        }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "@/core/plugins/tools";
import t from "@/core/plugins/i18n";

export default {
  props: {
    currentFile: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    formValid: true,
    inputs: {
      title: null,
      description: null
    },
    validations: {
      titleValidation: [
        v =>
          !!v ||
          t.t(
            "modules.userCloudManager.components.editFile.data.validations.err1"
          )
      ]
    }
  }),
  computed: {
    ...mapGetters(["g_session_currentUser"])
  },
  methods: {
    loadForm() {
      this.inputs.title = this.currentFile.fileData.title;
      this.inputs.description = this.currentFile.fileData.description;
    },
    clearForm() {
      this.inputs.title = "";
      this.inputs.description = "";
      this.$refs.form.reset();
    },
    closeDialog() {
      this.clearForm();
      this.$emit("closeDialog");
    },
    save() {
      if (!this.$refs.form.validate()) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "error",
          message: t.t(
            "modules.userCloudManager.components.editFile.script.methods.save.formInvalidMsg"
          )
        });
        return;
      }

      this.$store.commit(
        "m_layout_loading_msg",
        t.t(
          "modules.userCloudManager.components.editFile.script.methods.save.loading"
        )
      );

      let sendData = {
        id: this.currentFile.value,
        title: this.inputs.title,
        description: this.inputs.description
      };

      this.$store
        .dispatch(
          "a_storages_modules_userCloudManager_fm_updateFile_api",
          sendData
        )
        .then(() => {
          Tools.showSuccessMsg(
            t.t(
              "modules.userCloudManager.components.editFile.script.methods.save.successTitle"
            ),
            t.t(
              "modules.userCloudManager.components.editFile.script.methods.save.successMsg"
            )
          );

          this.$store.commit("m_layout_loading_view", false);
          this.closeDialog();
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            null,
            "modules.userCloudManager.apiErrors.fm."
          );
          this.$store.commit("m_layout_loading_view", false);
        });
    }
  }
};
</script>

<style></style>
