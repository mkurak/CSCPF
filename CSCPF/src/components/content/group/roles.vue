<template>
  <v-card v-show="!sendProcessStatus">
    <v-card-title class="headline">{{
      $t("components.content.groupRoles.template.cardTitle")
    }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-5">
      <v-row fluid>
        <v-col cols="12" v-for="role in g_storages_role_items" :key="role.id">
          <v-checkbox
            v-model="selectedRoles"
            :label="role.roleName"
            :value="role.id"
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
        @click="close"
        :loading="sendProcessStatus"
        >{{ $t("components.content.groupRoles.template.cancelBtnText") }}</v-btn
      >
      <v-btn
        depressed
        color="success"
        :loading="sendProcessStatus"
        @click="save"
        >{{ $t("components.content.groupRoles.template.saveBtnText") }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Tools from "../../../plugins/tools";
import t from "../../../plugins/i18n";

export default {
  data: () => ({
    sendProcessStatus: false,
    selectedRoles: []
  }),
  computed: {
    ...mapGetters(["g_storages_role_items"])
  },
  props: {
    group: {
      type: Object,
      required: false,
      default: null
    }
  },
  methods: {
    init() {
      this.selectedRoles = [];
      if (Tools.isNullOrEmpty(this.group)) return;
      if (this.group.roles.length > 0) {
        this.group.roles.forEach(role => {
          this.selectedRoles.push(role);
        });
      }
    },
    close() {
      this.$store.commit("m_layout_loading_view", false);
      this.sendProcessStatus = false;
      this.$emit("close");
    },
    save() {
      this.$store.commit(
        "m_layout_loading_msg",
        t.t("components.content.groupRoles.script.save.loading")
      );
      this.sendProcessStatus = true;

      Tools.showConfirmMsg(
        t.t("components.content.groupRoles.script.save.confirm.title"),
        t.t("components.content.groupRoles.script.save.confirm.msg"),
        t.t("components.content.groupRoles.script.save.confirm.info")
      ).then(answer => {
        if (!answer) {
          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        } else {
          if (this.selectedRoles.length === 0) {
            Tools.showConfirmMsg(
              t.t(
                "components.content.groupRoles.script.save.confirmZeroSelected.title"
              ),
              t.t(
                "components.content.groupRoles.script.save.confirmZeroSelected.msg"
              ),
              t.t(
                "components.content.groupRoles.script.save.confirmZeroSelected.info"
              )
            ).then(answer => {
              if (!answer) {
                this.$store.commit("m_layout_loading_view", false);
                this.sendProcessStatus = false;
              } else {
                this.saveContinue();
              }
            });
          } else {
            this.saveContinue();
          }
        }
      });
    },
    saveContinue() {
      this.$store
        .dispatch("a_storages_userGroups_saveRoles_api", {
          groupId: this.group.id,
          roles: this.selectedRoles
        })
        .then(() => {
          Tools.showSuccessMsg(
            t.t(
              "components.content.groupRoles.script.saveContinue.success.title"
            ),
            t.t("components.content.groupRoles.script.saveContinue.success.msg")
          );
          this.close();
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            null,
            "api.errors.UserManagement.Group.SaveGroupInRoles."
          );
          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        });
    }
  }
};
</script>

<style></style>
