<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      {{
        $t("modules.userCloudManager.components.newFile.template.newFileBtn")
      }}
    </v-card-title>

    <v-card-text class="pt-4">
      <v-form ref="form" v-model="formValid" lazy-validation @submit="save">
        <p>
          <span class="font-weight-bold">
            {{
              $t(
                "modules.userCloudManager.components.newFile.template.currentPathTitle"
              )
            }}
          </span>
          <span>{{ currentDirectory.fullDirectoryPath }}</span>
        </p>
        <v-text-field
          v-model="inputs.title"
          :label="
            $t(
              'modules.userCloudManager.components.newFile.template.titleLabel'
            )
          "
          counter="128"
          :rules="validations.titleValidation"
        ></v-text-field>
        <v-text-field
          v-model="inputs.description"
          :label="
            $t(
              'modules.userCloudManager.components.newFile.template.descriptionLabel'
            )
          "
          counter="512"
        ></v-text-field>
        <v-file-input
          v-model="inputs.file"
          :label="
            $t('modules.userCloudManager.components.newFile.template.fileLabel')
          "
          show-size
          :rules="validations.fileValidation"
        ></v-file-input>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="danger" text @click="closeDialog">
        {{
          $t("modules.userCloudManager.components.newFile.template.cancelBtn")
        }}
      </v-btn>
      <v-btn color="primary" text @click="save">
        {{ $t("modules.userCloudManager.components.newFile.template.saveBtn") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import sha1 from "sha1";
import t from "@/core/plugins/i18n";

export default {
  props: {
    currentDirectory: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    formValid: true,
    inputs: {
      title: null,
      description: null,
      file: undefined
    },
    validations: {
      titleValidation: [
        v =>
          !!v ||
          t.t(
            "modules.userCloudManager.components.newFile.script.data.validations.titleValidation.err1"
          )
      ],
      fileValidation: [
        v =>
          !Tools.isNullOrEmpty(v["name"]) ||
          t.t(
            "modules.userCloudManager.components.newFile.script.data.validations.fileValidation.err1"
          )
      ]
    }
  }),
  computed: {
    ...mapGetters(["g_session_currentUser"])
  },
  methods: {
    clearForm() {
      this.inputs.title = "";
      this.inputs.description = "";
      this.inputs.file = undefined;
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
            "modules.userCloudManager.components.newFile.script.methods.save.formInvalidMsg"
          )
        });
        return;
      }

      this.$store.commit(
        "m_layout_loading_msg",
        t.t(
          "modules.userCloudManager.components.newFile.script.methods.save.loading"
        )
      );

      let formData = new FormData();
      formData.append("UserId", this.g_session_currentUser.id);
      formData.append("DirectoryId", this.currentDirectory.directoryData.id);
      formData.append("Title", this.inputs.title);
      formData.append("Description", this.inputs.description);
      formData.append("File", this.inputs.file);

      let hashString = "";
      hashString += this.g_session_currentUser.id;
      hashString += this.currentDirectory.directoryData.id;
      hashString += this.inputs.title;
      hashString += this.inputs.description;
      hashString += GlobalEnv.hashCodes.modules.userCloudManager.fm.addFile;
      formData.append("hash", sha1(hashString));

      this.$store
        .dispatch(
          "a_storages_modules_userCloudManager_fm_addFile_api",
          formData
        )
        .then(() => {
          Tools.showSuccessMsg(
            t.t(
              "modules.userCloudManager.components.newFile.script.methods.save.successTitle"
            ),
            t.t(
              "modules.userCloudManager.components.newFile.script.methods.save.successMsg"
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
