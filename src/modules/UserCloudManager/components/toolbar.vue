<template>
  <v-row>
    <v-col cols="12">
      <v-btn
        small
        color="success"
        depressed
        :disabled="getDisabled_addNewFile"
        @click="goNewFile"
      >
        <v-icon left>mdi-file-plus</v-icon>
        {{
          $t(
            "modules.userCloudManager.components.toolbar.template.addNewFileTitle"
          )
        }}
      </v-btn>
      <v-btn
        small
        color="success"
        class="ml-2"
        depressed
        :disabled="getDisabled_addNewDirectory"
        @click="goNewDirectory"
      >
        <v-icon left>mdi-folder-plus</v-icon>
        {{
          $t(
            "modules.userCloudManager.components.toolbar.template.addNewDirectoryTitle"
          )
        }}
      </v-btn>
    </v-col>
    <v-col cols="8" class="text-right"> </v-col>
  </v-row>
</template>

<script>
import Tools from "@/core/plugins/tools";

export default {
  props: {
    currentDirectory: {
      type: Object,
      required: false,
      default: null
    },
    currentFile: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({}),
  computed: {
    getDisabled_addNewFile() {
      return Tools.isNullOrEmpty(this.currentDirectory);
    },
    getDisabled_addNewDirectory() {
      return !Tools.isNullOrEmpty(this.currentFile);
    }
  },
  methods: {
    goNewFile() {
      this.$emit("newFileAction");
    },
    goNewDirectory() {
      this.$emit("newDirectoryAction");
    }
  }
};
</script>

<style></style>
