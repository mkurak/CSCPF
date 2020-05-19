<template>
  <v-card v-show="!sendProcessStatus">
    <v-card-title class="headline">{{
      $t("components.content.userInGroupsManage.template.cardTitle")
    }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-5">
      <p>
        <span class="body-2 font-weight-bold"
          >{{
            $t("components.content.userInGroupsManage.template.user")
          }}:&nbsp;</span
        >
        <span class="body-2">{{ giveUserFullName }}</span>
      </p>
      <v-row fluid>
        <v-col
          v-for="group in g_storages_userGroups_items"
          :key="group.id"
          cols="12"
        >
          <v-checkbox
            v-model="selectedGroup"
            :label="group.groupName"
            :value="group.id"
            hide-details
            color="primary"
            class="mt-0"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        depressed
        color="warning"
        :loading="sendProcessStatus"
        @click="close"
        >{{
          $t("components.content.userInGroupsManage.template.cancelBtnText")
        }}</v-btn
      >
      <v-btn
        depressed
        color="success"
        :loading="sendProcessStatus"
        @click="save"
        >{{
          $t("components.content.userInGroupsManage.template.saveBtnText")
        }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "@/core/plugins/tools";
import t from "@/core/plugins/i18n";

export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({
    sendProcessStatus: false,
    selectedGroup: []
  }),
  computed: {
    ...mapGetters(["g_storages_userGroups_items"]),
    giveUserFullName() {
      return Tools.isNullOrEmpty(this.user)
        ? ""
        : this.user.user.name + " " + this.user.user.surname;
    }
  },
  methods: {
    init() {
      this.selectedGroup = [];
      if (Tools.isNullOrEmpty(this.user)) return;
      if (this.user.inGroups.length > 0) {
        this.user.inGroups.forEach(data => {
          this.selectedGroup.push(data.groupId);
        });
      }
    },
    close() {
      this.$store.commit("m_layout_loading_view", false);
      this.sendProcessStatus = false;
      this.$emit("close");
    },
    save() {
      Tools.showConfirmMsg(
        t.t(
          "components.content.userInGroupsManage.script.methods.save.processConfirm.title"
        ),
        t.t(
          "components.content.userInGroupsManage.script.methods.save.processConfirm.msg"
        ),
        t.t(
          "components.content.userInGroupsManage.script.methods.save.processConfirm.info"
        )
      ).then(answer => {
        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "components.content.userInGroupsManage.script.methods.save.loading"
          )
        );
        this.sendProcessStatus = true;

        if (answer) {
          if (this.selectedGroup.length === 0) {
            Tools.showConfirmMsg(
              t.t(
                "components.content.userInGroupsManage.script.methods.save.zeroSelectedConfirm.title"
              ),
              t.t(
                "components.content.userInGroupsManage.script.methods.save.zeroSelectedConfirm.msg"
              ),
              t.t(
                "components.content.userInGroupsManage.script.methods.save.zeroSelectedConfirm.info"
              )
            ).then(answer => {
              if (answer) {
                this.saveContinue();
              } else {
                this.$store.commit("m_layout_loading_view", false);
                this.sendProcessStatus = false;
              }
            });
          } else {
            this.saveContinue();
          }
        } else {
          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        }
      });
    },
    saveContinue() {
      this.$store
        .dispatch("a_storages_user_saveUserInGroup_api", {
          userId: this.user.user.id,
          groups: this.selectedGroup
        })
        .then(() => {
          Tools.showSuccessMsg(
            t.t(
              "components.content.userInGroupsManage.script.methods.save.success.title"
            ),
            t.t(
              "components.content.userInGroupsManage.script.methods.save.success.msg"
            )
          );
          this.close();
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.userInGroupsManage.script.methods.save.errorTitle",
            "api.errors.UserManagement.User.SaveUserInGroups."
          );

          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        });
    }
  }
};
</script>

<style></style>
