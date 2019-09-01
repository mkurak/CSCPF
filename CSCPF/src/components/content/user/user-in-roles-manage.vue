<template>
  <v-card v-show="!sendProcessStatus">
    <v-card-title class="headline">{{
      $t("components.content.userInRolesManage.template.cardTitle")
    }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-5">
      <p>
        <span class="body-2 font-weight-bold"
          >{{
            $t("components.content.userInRolesManage.template.user")
          }}:&nbsp;</span
        >
        <span class="body-2">{{ giveUserFullName }}</span>
      </p>
      <v-row fluid>
        <v-col cols="12" v-for="role in g_storages_role_items" :key="role.id">
          <v-checkbox
            v-model="selectedRoles"
            :label="role.roleName + (checkGroup(role.id) ? ' (gruptan)' : '')"
            :value="role.id"
            hide-details
            color="primary"
            class="mt-0"
            :disabled="checkGroup(role.id)"
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
        >{{
          $t("components.content.userInRolesManage.template.cancelBtnText")
        }}</v-btn
      >
      <v-btn
        depressed
        color="success"
        :loading="sendProcessStatus"
        @click="save"
        >{{
          $t("components.content.userInRolesManage.template.saveBtnText")
        }}</v-btn
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
    selectedRoles: [],
    selectedRoles2: []
  }),
  computed: {
    ...mapGetters(["g_storages_role_items"]),
    giveUserFullName() {
      return Tools.isNullOrEmpty(this.user)
        ? ""
        : this.user.user.name + " " + this.user.user.surname;
    }
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    }
  },
  methods: {
    init() {
      this.selectedRoles = [];
      if (Tools.isNullOrEmpty(this.user)) return;
      if (this.user.inRoles.length > 0) {
        this.user.inRoles.forEach(role => {
          this.selectedRoles.push(role.roleId);
        });
      }
    },
    close() {
      this.$store.commit("m_layout_loading_view", false);
      this.sendProcessStatus = false;
      this.$emit("close");
    },
    save() {
      this.$store.commit("m_layout_loading_msg", "Kaydediliyor...");
      this.sendProcessStatus = true;

      Tools.showConfirmMsg(
        t.t(
          "components.content.userInRolesManage.script.methods.save.confirm.title"
        ),
        t.t(
          "components.content.userInRolesManage.script.methods.save.confirm.msg"
        ),
        t.t(
          "components.content.userInRolesManage.script.methods.save.confirm.info"
        )
      ).then(answer => {
        if (!answer) {
          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        } else {
          this.selectedRoles.forEach(item => {
            if (!this.checkGroup(item)) {
              this.selectedRoles2.push(item);
            }
          });

          if (this.selectedRoles2.length === 0) {
            Tools.showConfirmMsg(
              t.t(
                "components.content.userInRolesManage.script.methods.save.zeroItemsConfirm.title"
              ),
              t.t(
                "components.content.userInRolesManage.script.methods.save.zeroItemsConfirm.msg"
              ),
              t.t(
                "components.content.userInRolesManage.script.methods.save.zeroItemsConfirm.info"
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
    checkGroup(roleId) {
      if (Tools.isNullOrEmpty(this.user)) return false;
      if (this.user.inRoles.length === 0) return false;

      let find = this.user.inRoles.filter(data => {
        return data.roleId === roleId && data.groupId > 0;
      });

      return find.length > 0;
    },
    saveContinue() {
      this.$store
        .dispatch("a_storages_user_saveUserInRoles_api", {
          userId: this.user.user.id,
          roles: this.selectedRoles2
        })
        .then(() => {
          Tools.showSuccessMsg(
            t.t(
              "components.content.userInRolesManage.script.methods.saveContinue.success.title"
            ),
            t.t(
              "components.content.userInRolesManage.script.methods.saveContinue.success.msg"
            )
          );
          this.close();
        })
        .catch(err => {
          Tools.showErrorWithApi(
            err,
            "components.content.userInRolesManage.script.methods.saveContinue.errorTitle",
            "api.errors.UserManagement.User.SaveUserInRoles."
          );

          this.$store.commit("m_layout_loading_view", false);
          this.sendProcessStatus = false;
        });
    }
  }
};
</script>

<style></style>
