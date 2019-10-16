<template>
  <div>
    <v-card v-if="contentViewStatus">
      <v-card-title
        :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >
        {{ $t("views.userManagement.users.template.screenTitle") }}
        <v-spacer></v-spacer>
        <v-btn
          v-if="Tools.checkRole('Root.UserManagement.User.Add')"
          class="ma-2 white--text"
          color="success"
          elevation="0"
          @click="newItem"
          >{{ $t("views.userManagement.users.template.addNewBtnText") }}</v-btn
        >
      </v-card-title>
      <v-layout justify-space-between pa-4>
        <v-flex>
          <v-data-table
            :headers="datatable.headers"
            :items="items"
            :search="datatable.search"
            class="elevation-1"
            :loading="datatable.loadingStatus"
            multi-sort
            show-expand
            item-key="user.id"
            :expanded.sync="datatable.expanded"
          >
            <template v-slot:expanded-item="props">
              <td :colspan="props.headers.length">
                <v-layout class="justify-space-between pa-2">
                  <v-flex d-flex text-center>
                    <UserDetailsComponent
                      :user="props.item.user"
                    ></UserDetailsComponent>
                  </v-flex>
                </v-layout>
              </td>
            </template>
            <template v-slot:top>
              <v-card flat>
                <v-card-title>
                  <div class="flex-grow-1"></div>
                  <v-text-field
                    v-model="datatable.search"
                    append-icon="mdi-account-search"
                    :label="
                      $t(
                        'views.userManagement.users.script.data.datatable.searchPlaceholder'
                      )
                    "
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
              </v-card>
            </template>
            <template v-slot:item.name="{ item }">{{
              item.user.name
            }}</template>
            <template v-slot:item.surname="{ item }">{{
              item.user.surname
            }}</template>
            <template v-slot:item.userName="{ item }">{{
              item.user.userName
            }}</template>
            <template v-slot:item.email="{ item }" class="text-truncate">{{
              item.user.email
            }}</template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip
                v-if="Tools.checkRole('Root.UserManagement.User.Update')"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon small class="mr-2" v-on="on" @click="editItem(item)"
                    >mdi-account-edit</v-icon
                  >
                </template>
                <span>
                  {{
                    $t(
                      "views.userManagement.users.template.datatable.editLabel"
                    )
                  }}
                </span>
              </v-tooltip>
              <v-tooltip
                v-if="Tools.checkRole('Root.UserManagement.User.UserInGroup')"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    class="mr-2"
                    v-on="on"
                    @click="manageUserInGroups(item)"
                    >mdi-account-group</v-icon
                  >
                </template>
                <span>
                  {{
                    $t(
                      "views.userManagement.users.template.datatable.manageUserInGroup"
                    )
                  }}
                </span>
              </v-tooltip>
              <v-tooltip
                v-if="Tools.checkRole('Root.UserManagement.User.ChangeRoles')"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    class="mr-2"
                    v-on="on"
                    @click="manageUserInRoles(item)"
                    >mdi-security</v-icon
                  >
                </template>
                <span>
                  {{
                    $t(
                      "views.userManagement.users.template.datatable.manageUserInRoles"
                    )
                  }}
                </span>
              </v-tooltip>
              <v-tooltip
                v-if="Tools.checkRole('Root.UserManagement.User.ChangeStatus')"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon small class="mr-2" v-on="on" @click="deleteItem(item)"
                    >mdi-delete</v-icon
                  >
                </template>
                <span>
                  {{
                    $t(
                      "views.userManagement.users.template.datatable.removeLabel"
                    )
                  }}
                </span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
    <v-dialog v-model="userFormDialog" max-width="600" persistent scrollable>
      <UserFormComponent
        ref="userFormComp"
        :user="currentUser"
        @close="closeDialog"
      ></UserFormComponent>
    </v-dialog>
    <v-dialog
      v-model="userInGroupsDialog"
      max-width="600"
      persistent
      scrollable
    >
      <UserInGroupsManageComponent
        ref="userInGroupsManageComp"
        :user="currentUser"
        @close="closeUserInGroupsDialog"
      ></UserInGroupsManageComponent>
    </v-dialog>
    <v-dialog v-model="userInRolesDialog" max-width="600" persistent scrollable>
      <UserInRolesManageComponent
        ref="userInRolesManageComp"
        :user="currentUser"
        @close="closeUserInRolesDialog"
      ></UserInRolesManageComponent>
    </v-dialog>
  </div>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import { mapGetters } from "vuex";
import t from "@/core/plugins/i18n";
import UserDetailsComponent from "@/core/components/content/user/user-details";
import UserFormComponent from "@/core/components/content/user/user-form";
import UserInGroupsManageComponent from "@/core/components/content/user/user-in-groups-manage";
import UserInRolesManageComponent from "@/core/components/content/user/user-in-roles-manage";
import { setTimeout } from "timers";

export default {
  components: {
    UserDetailsComponent,
    UserFormComponent,
    UserInGroupsManageComponent,
    UserInRolesManageComponent
  },
  data: () => ({
    GlobalEnv,
    Tools,
    contentViewStatus: false,
    datatable: {
      expanded: [],
      loadingStatus: false,
      headers: [
        {
          text: t.t(
            "views.userManagement.users.script.data.datatable.headers.name"
          ),
          align: "left",
          sortable: true,
          value: "user.name"
        },
        {
          text: t.t(
            "views.userManagement.users.script.data.datatable.headers.surname"
          ),
          align: "left",
          sortable: true,
          value: "user.surname"
        },
        {
          text: t.t(
            "views.userManagement.users.script.data.datatable.headers.userName"
          ),
          align: "left",
          sortable: true,
          value: "user.userName"
        },
        {
          text: t.t(
            "views.userManagement.users.script.data.datatable.headers.email"
          ),
          align: "left",
          sortable: true,
          value: "user.email"
        },
        {
          text: t.t(
            "views.userManagement.users.script.data.datatable.headers.actions"
          ),
          align: "center",
          sortable: false,
          value: "actions"
        }
      ],
      search: ""
    },
    userFormDialog: false,
    currentUser: null,
    userInGroupsDialog: false,
    userInRolesDialog: false
  }),
  computed: {
    ...mapGetters(["g_storages_user_items", "g_storages_user_fullName"]),
    items() {
      return this.g_storages_user_items;
    }
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  },
  methods: {
    editItem(item) {
      this.currentUser = item.user;
      this.userFormDialog = true;
      this.formInit();
    },
    deleteItem(item) {
      Tools.showConfirmMsg(
        t.t(
          "views.userManagement.users.script.methods.deleteItem.confirm.title"
        ),
        t.t("views.userManagement.users.script.methods.deleteItem.confirm.msg"),
        t.t("views.userManagement.users.script.methods.deleteItem.confirm.info")
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          t.t("views.userManagement.users.script.methods.deleteItem.loadingMsg")
        );
        this.$store
          .dispatch("a_storages_user_items_changeStatus_api", {
            id: item.user.id,
            status: false
          })
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "views.userManagement.users.script.methods.deleteItem.success.title"
              ),
              t.t(
                "views.userManagement.users.script.methods.deleteItem.success.msg"
              )
            );
            this.$store.commit("m_layout_loading_view", false);
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              "views.userManagement.users.script.methods.deleteItem.errorTitle",
              "api.errors.UserManagement.User.ChangeStatus."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    },
    newItem() {
      this.currentUser = null;
      this.userFormDialog = true;
      this.formInit();
    },
    closeDialog() {
      this.userFormDialog = false;
      this.currentUser = null;
    },
    formInit() {
      setTimeout(() => {
        this.$refs.userFormComp.init();
      }, 200);
    },
    closeUserInGroupsDialog() {
      this.currentUser = null;
      this.userInGroupsDialog = false;
      this.manageUserInGroupsInit();
    },
    manageUserInGroups(item) {
      this.currentUser = item;
      this.userInGroupsDialog = true;
      this.manageUserInGroupsInit();
    },
    manageUserInGroupsInit() {
      setTimeout(() => {
        this.$refs.userInGroupsManageComp.init();
      }, 200);
    },
    closeUserInRolesDialog() {
      this.currentUser = null;
      this.userInRolesDialog = false;
      this.manageUserInRolesInit();
    },
    manageUserInRolesInit() {
      setTimeout(() => {
        this.$refs.userInRolesManageComp.init();
      }, 200);
    },
    manageUserInRoles(item) {
      this.currentUser = item;
      this.userInRolesDialog = true;
      this.manageUserInRolesInit();
    }
  }
};
</script>

<style></style>
