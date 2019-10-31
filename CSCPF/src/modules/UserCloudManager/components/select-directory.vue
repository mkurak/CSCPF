<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <span
            v-if="actionType === 'move' && item.itemType === 'directory'"
            class="font-weight-bold"
          >
            {{
              $t(
                "modules.userCloudManager.components.selectDirectory.template.moveDirectoryTitle"
              )
            }}
          </span>
          <span
            v-if="actionType === 'move' && item.itemType === 'file'"
            class="font-weight-bold"
          >
            {{
              $t(
                "modules.userCloudManager.components.selectDirectory.template.moveFileTitile"
              )
            }}
          </span>
          <span
            v-if="actionType === 'copy' && item.itemType === 'directory'"
            class="font-weight-bold"
          >
            {{
              $t(
                "modules.userCloudManager.components.selectDirectory.template.coptDirectoryTitle"
              )
            }}
          </span>
          <span
            v-if="actionType === 'copy' && item.itemType === 'file'"
            class="font-weight-bold"
          >
            {{
              $t(
                "modules.userCloudManager.components.selectDirectory.template.copyFileTitle"
              )
            }}
          </span>
          <span>{{ sourcePath }}</span>
          <br />
          <span class="font-weight-bold">
            {{
              $t(
                "modules.userCloudManager.components.selectDirectory.template.selectedPathTitile"
              )
            }}
          </span>
          <span>{{ selectedPath }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-treeview
            v-model="selected"
            :active.sync="active"
            :items="items"
            item-key="value"
            item-text="text"
            hoverable
            return-object
            activatable
          >
            <template v-slot:prepend="props">
              <v-icon>
                {{ props.open ? "mdi-folder-open" : "mdi-folder" }}
              </v-icon>
            </template>
          </v-treeview>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="danger" text @click="closeDialog">
        {{
          $t(
            "modules.userCloudManager.components.selectDirectory.template.cancelBtn"
          )
        }}
      </v-btn>
      <v-btn color="primary" text @click="save">
        {{
          $t(
            "modules.userCloudManager.components.selectDirectory.template.saveBtn"
          )
        }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "underscore";
import t from "@/core/plugins/i18n";

export default {
  props: {
    actionType: {
      type: String,
      required: false,
      default: "move"
    },
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    title: t.t(
      "modules.userCloudManager.components.selectDirectory.script.data.defaultTitile"
    ),
    sourcePath: "/",
    selected: [],
    selectedPath: "",
    active: []
  }),
  computed: {
    ...mapGetters(["g_storages_modules_userCloudManager_fm_items"]),
    items() {
      let filteredData = [];
      let bannedId = 0;

      if (this.item.itemType === "directory") bannedId = this.item.value;
      else bannedId = this.item.fileData.directoryId;

      function filterMe(items, focusObj, bannedId) {
        items.forEach(item => {
          if (item.itemType === "directory" && item.value !== bannedId) {
            let cloneItem = _.clone(item);
            cloneItem.children = [];
            focusObj.push(cloneItem);

            if (item.children) {
              filterMe(item.children, cloneItem.children, bannedId);
            }
          }
        });
      }

      filterMe(
        this.g_storages_modules_userCloudManager_fm_items,
        filteredData,
        bannedId
      );

      return filteredData;
    }
  },
  watch: {
    active(n) {
      if (n.length > 0) this.selectedPath = n[0].fullDirectoryPath;
    }
  },
  methods: {
    reset() {
      this.sourcePath = this.item.fullDirectoryPath;
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    save() {
      if (this.active.length === 0) {
        this.$store.dispatch("a_snackbarMessage_add", {
          color: "red",
          message: t.t(
            "modules.userCloudManager.components.selectDirectory.script.methods.save.selectedPathEmptyError"
          )
        });
        return;
      }

      if (this.item.itemType === "directory" && this.actionType === "move")
        this.$emit(
          "actionMoveDirectory",
          this.item.value,
          this.active[0].value
        );

      if (this.item.itemType === "file" && this.actionType === "move")
        this.$emit("actionMoveFile", this.item.value, this.active[0].value);

      if (this.item.itemType === "directory" && this.actionType === "copy")
        this.$emit(
          "actionCopyDirectory",
          this.item.value,
          this.active[0].value
        );

      if (this.item.itemType === "file" && this.actionType === "copy")
        this.$emit("actionCopyFile", this.item.value, this.active[0].value);
    }
  }
};
</script>

<style></style>
