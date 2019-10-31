<template>
  <div>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        :label="
          $t(
            'modules.userCloudManager.components.tree.template.searchPlaceholder'
          )
        "
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
    </v-sheet>
    <v-treeview
      ref="fmTree"
      v-model="selected"
      :active.sync="active"
      :open.sync="open"
      :items="items"
      return-object
      item-key="value"
      item-text="text"
      :search="search"
      activatable
      dense
      hoverable
    >
      <template v-slot:prepend="props">
        <v-icon v-if="props.item.itemType === 'directory'">
          {{ props.open ? "mdi-folder-open" : "mdi-folder" }}
        </v-icon>
        <v-icon v-else>mdi-file-document-outline</v-icon>
      </template>
      <template v-slot:append="props">
        <v-tooltip v-if="props.item.itemType === 'directory'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="success"
              x-small
              v-on="on"
              @click.stop="actionAddDirectory(props.item)"
            >
              <v-icon>mdi-folder-plus</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.addSubDirectoryTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'directory'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="success"
              x-small
              v-on="on"
              @click.stop="actionAddFile(props.item)"
            >
              <v-icon>mdi-file-plus</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.addFileTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'directory'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="warning"
              x-small
              v-on="on"
              @click.stop="actionEditDirectory(props.item)"
            >
              <v-icon>mdi-folder-edit</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.editDirectoryTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'directory'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="primary"
              x-small
              v-on="on"
              @click.stop="actionShareDirectory(props.item)"
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.shareDirectoryTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'directory'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="primary"
              x-small
              v-on="on"
              @click.stop="actionMoveDirectory(props.item)"
            >
              <v-icon>mdi-folder-move</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.moveDirectoryTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'directory'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="primary"
              x-small
              v-on="on"
              @click.stop="actionCopyDirectory(props.item)"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.copyDirectoryTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'directory'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="red"
              x-small
              v-on="on"
              @click.stop="actionRemoveDirectory(props.item)"
            >
              <v-icon>mdi-folder-remove</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.removeDirectoryTitle"
              )
            }}
          </span>
        </v-tooltip>

        <v-tooltip v-if="props.item.itemType === 'file'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="indigo"
              x-small
              :href="getFileDownloadUrl(props.item)"
              target="_blank"
              v-on="on"
            >
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.downloadFileTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'file'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="warning"
              x-small
              v-on="on"
              @click.stop="actionEditFile(props.item)"
            >
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.editFileTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'file'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="primary"
              x-small
              v-on="on"
              @click.stop="actionShareFile(props.item)"
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.shareFileTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'file'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="primary"
              x-small
              v-on="on"
              @click.stop="actionMoveFile(props.item)"
            >
              <v-icon>mdi-file-move</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.moveFileTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'file'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="primary"
              x-small
              v-on="on"
              @click.stop="actionCopyFile(props.item)"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.copyFileTitle"
              )
            }}
          </span>
        </v-tooltip>
        <v-tooltip v-if="props.item.itemType === 'file'" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="red"
              x-small
              v-on="on"
              @click.stop="actionRemoveFile(props.item)"
            >
              <v-icon>mdi-file-remove</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $t(
                "modules.userCloudManager.components.tree.template.removeFileTitle"
              )
            }}
          </span>
        </v-tooltip>
      </template>
      <template v-slot:label="props">
        <div style="cursor: pointer;">{{ props.item.text }}</div>
      </template>
    </v-treeview>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";

export default {
  data: () => ({
    selected: [],
    open: [],
    active: [],
    search: ""
  }),
  computed: {
    ...mapGetters(["g_storages_modules_userCloudManager_fm_items"]),
    items() {
      return this.g_storages_modules_userCloudManager_fm_items;
    }
  },
  watch: {
    search(n) {
      if (n !== null && n !== "") {
        this.treeOpenAll();
      } else {
        this.treeCloseAll();
      }
    },
    active() {
      this.$emit("selectTreeItem", this.active[0]);
    }
  },
  methods: {
    treeOpenAll() {
      Object.keys(this.$refs.fmTree.nodes).forEach(key => {
        this.$refs.fmTree.nodes[key].isOpen = true;
      });
    },
    treeCloseAll() {
      Object.keys(this.$refs.fmTree.nodes).forEach(key => {
        this.$refs.fmTree.nodes[key].isOpen = false;
      });
    },
    actionAddFile(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("newFileAction");
    },
    actionAddDirectory(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("newDirectoryAction");
    },
    actionEditDirectory(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("editDirectoryAction");
    },
    actionEditFile(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("editFileAction");
    },
    actionRemoveDirectory(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("removeDirectoryAction");
    },
    actionRemoveFile(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("removeFileAction");
    },
    actionShareFile(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("shareFileAction");
    },
    actionShareDirectory(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("shareDirectoryAction");
    },
    clearActive() {
      this.active = [];
    },
    getFileDownloadUrl(item) {
      return Tools.getImage(
        GlobalEnv.modules.userCloudManager.filePath.fm,
        item.fileData.path,
        null
      );
    },
    actionMoveDirectory(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("choseDirectoryAction", "move");
    },
    actionMoveFile(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("choseDirectoryAction", "move");
    },
    actionCopyDirectory(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("choseDirectoryAction", "copy");
    },
    actionCopyFile(item) {
      this.active = [];
      this.active.push(item);
      this.$emit("selectTreeItem", item);
      this.$emit("choseDirectoryAction", "copy");
    }
  }
};
</script>

<style></style>
