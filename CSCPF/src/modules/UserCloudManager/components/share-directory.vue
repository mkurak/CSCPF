<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      {{ currentDirectory.text }}
    </v-card-title>

    <v-card-text class="pt-4">
      <v-form ref="form" @submit="save">
        <p>
          <span class="font-weight-bold">
            {{
              $t(
                "modules.userCloudManager.components.shareDirectory.template.currentPathTitle"
              )
            }}
          </span>
          <span>{{ currentDirectory.fullDirectoryPath }}</span>
        </p>
        <v-select
          v-model="inputs.selectedGroups"
          :items="getUserGroupItems"
          attach
          chips
          :label="
            $t(
              'modules.userCloudManager.components.shareDirectory.template.sharedUserGroupsTitle'
            )
          "
          multiple
          item-text="groupName"
          item-value="id"
        ></v-select>
        <v-select
          v-model="inputs.selectedUsers"
          :items="getUserItems"
          attach
          chips
          :label="
            $t(
              'modules.userCloudManager.components.shareDirectory.template.sharedUsersTitle'
            )
          "
          multiple
          item-text="fullName"
          item-value="user.id"
        ></v-select>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="danger" text @click="closeDialog">
        {{
          $t(
            "modules.userCloudManager.components.shareDirectory.template.cancelBtn"
          )
        }}
      </v-btn>
      <v-btn color="primary" text @click="save">
        {{
          $t(
            "modules.userCloudManager.components.shareDirectory.template.saveBtn"
          )
        }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "@/core/plugins/tools";
import _ from "underscore";
import t from "@/core/plugins/i18n";

export default {
  props: {
    currentDirectory: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    inputs: {
      selectedGroups: [],
      selectedUsers: []
    }
  }),
  computed: {
    ...mapGetters([
      "g_session_currentUser",
      "g_storages_userGroups_items",
      "g_storages_user_items"
    ]),
    getUserGroupItems() {
      return _.sortBy(this.g_storages_userGroups_items, "groupName");
    },
    getUserItems() {
      let list = [];
      this.g_storages_user_items.forEach(user => {
        if (user.user.id === this.g_session_currentUser.id) return;
        user.fullName = user.user.name + " " + user.user.surname;
        list.push(user);
      });
      list = _.sortBy(list, "fullName");
      return list;
    }
  },
  methods: {
    loadForm() {},
    clearForm() {
      setTimeout(() => {
        this.inputs.selectedGroups = [];
        this.inputs.selectedUsers = [];

        if (this.currentDirectory.shared.groups.length > 0) {
          this.currentDirectory.shared.groups.forEach(item => {
            this.inputs.selectedGroups.push(item.sharedGroupId);
          });
        }

        if (this.currentDirectory.shared.users.length > 0) {
          this.currentDirectory.shared.users.forEach(item => {
            this.inputs.selectedUsers.push(item.sharedUserId);
          });
        }
      }, 100);
    },
    closeDialog() {
      this.clearForm();
      this.$emit("closeDialog");
    },
    save() {
      this.$store.commit(
        "m_layout_loading_msg",
        t.t(
          "modules.userCloudManager.components.shareDirectory.script.methods.save.loading"
        )
      );

      let sendData = {
        directoryId: this.currentDirectory.value,
        sharedUserIds: this.inputs.selectedUsers.toString(),
        sharedGroupIds: this.inputs.selectedGroups.toString()
      };

      this.$store
        .dispatch(
          "a_storages_modules_userCloudManager_fm_shareDirectory_api",
          sendData
        )
        .then(() => {
          Tools.showSuccessMsg(
            t.t(
              "modules.userCloudManager.components.shareDirectory.script.methods.save.successTitle"
            ),
            t.t(
              "modules.userCloudManager.components.shareDirectory.script.methods.save.successMsg"
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
