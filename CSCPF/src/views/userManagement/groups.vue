<template>
  <div>
    <v-card v-if="contentViewStatus">
      <v-card-title
        :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >
        {{ $t("views.userManagement.groups.template.screenTitle") }}
        <v-spacer></v-spacer>
        <v-btn
          v-if="Tools.checkRole('Root.UserManagement.Group.Add')"
          class="ma-2 white--text"
          color="success"
          elevation="0"
          @click="newItem"
          >{{ $t("views.userManagement.groups.template.addNewBtnText") }}</v-btn
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
            item-key="id"
            :expanded.sync="datatable.expanded"
          >
            <template v-slot:expanded-item="props">
              <td :colspan="props.headers.length">
                <v-layout class="justify-space-between pa-2">
                  <v-flex d-flex text-center pa-6>
                    <v-tabs fixed-tabs>
                      <v-tab>{{
                        $t(
                          "views.userManagement.groups.template.detailSlot.tabs.details"
                        )
                      }}</v-tab>
                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-layout tag="v-card-text" text-left wrap>
                              <v-flex tag="strong" xs6 text-right mr-4 mb-2
                                >Eklenme:</v-flex
                              >
                              <v-flex xs5>
                                {{ props.item.addingDate | formatDate }}
                                ({{ getUserFullName(props.item.addingUserId) }})
                              </v-flex>
                              <v-flex tag="strong" xs6 text-right mr-4 mb-2
                                >Son Güncelleme:</v-flex
                              >
                              <v-flex xs5>
                                {{ props.item.updatingDate | formatDate }}
                                ({{
                                  getUserFullName(props.item.updatingUserId)
                                }})
                              </v-flex>
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                      <v-tab>{{
                        $t(
                          "views.userManagement.groups.template.detailSlot.tabs.roles"
                        )
                      }}</v-tab>
                      <v-tab-item class="pa-6">
                        <v-row fluit>
                          <v-col
                            v-for="role in getGroupRoles(props.item)"
                            :key="role.id"
                            cols="3"
                            class="text-left"
                          >
                            <v-icon>mdi-security</v-icon>
                            {{ role.roleName }}
                          </v-col>
                        </v-row>
                      </v-tab-item>
                      <v-tab>{{
                        $t(
                          "views.userManagement.groups.template.detailSlot.tabs.users"
                        )
                      }}</v-tab>
                      <v-tab-item class="pa-6">
                        <v-row fluit>
                          <v-col
                            v-for="user in getGroupUsers(props.item)"
                            :key="user.user.id"
                            cols="3"
                          >
                            <v-card class="mx-auto" max-width="434" tile>
                              <v-img
                                height="100%"
                                :src="
                                  Tools.getImage(
                                    GlobalEnv.socketUsers.profileBgPic.path,
                                    user.user.profileBgPic,
                                    GlobalEnv.socketUsers.profileBgPic.default
                                  )
                                "
                              >
                                <v-row align="end" class="fill-height">
                                  <v-col
                                    align-self="start"
                                    class="pa-0"
                                    cols="12"
                                  >
                                    <v-avatar
                                      class="profile"
                                      color="grey"
                                      size="164"
                                      tile
                                    >
                                      <v-img
                                        :src="
                                          Tools.getImage(
                                            GlobalEnv.socketUsers.profilePic
                                              .path,
                                            user.user.profilePic,
                                            GlobalEnv.socketUsers.profilePic
                                              .default
                                          )
                                        "
                                      ></v-img>
                                    </v-avatar>
                                  </v-col>
                                  <v-col class="py-0">
                                    <v-list-item color="rgba(0, 0, 0, .4)" dark>
                                      <v-list-item-content>
                                        <v-list-item-title class="title">{{
                                          user.user.name +
                                            " " +
                                            user.user.surname
                                        }}</v-list-item-title>
                                        <v-list-item-subtitle>{{
                                          user.user.userName
                                        }}</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{
                                          user.user.profileStatusMessage
                                        }}</v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-img>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-tab-item>
                    </v-tabs>
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
                    append-icon="mdi-database-search"
                    :label="
                      $t(
                        'views.userManagement.groups.template.searchPlaceholder'
                      )
                    "
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
              </v-card>
            </template>
            <template v-slot:item.groupName="{ item }">{{
              item.groupName
            }}</template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip
                v-if="Tools.checkRole('Root.UserManagement.Group.Update')"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon small class="mr-2" v-on="on" @click="editItem(item)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>
                  {{ $t("views.userManagement.groups.template.editLabel") }}
                </span>
              </v-tooltip>
              <v-tooltip
                v-if="Tools.checkRole('Root.UserManagement.Group.ChangeRoles')"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon small class="mr-2" v-on="on" @click="editRoles(item)"
                    >mdi-security</v-icon
                  >
                </template>
                <span>
                  {{
                    $t("views.userManagement.groups.template.changeRolesLabel")
                  }}
                </span>
              </v-tooltip>
              <v-tooltip
                v-if="Tools.checkRole('Root.UserManagement.Group.ChangeStatus')"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon small class="mr-2" v-on="on" @click="deleteItem(item)"
                    >mdi-delete</v-icon
                  >
                </template>
                <span>
                  {{ $t("views.userManagement.groups.template.removeLabel") }}
                </span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
    <v-dialog v-model="editDialogView" max-width="600" persistent scrollable>
      <FormComponent
        ref="formComp"
        :group="currentGroup"
        @close="closeFormDialog"
      ></FormComponent>
    </v-dialog>
    <v-dialog v-model="rolesDialogView" max-width="600" persistent scrollable>
      <RolesComponent
        ref="rolesComp"
        :group="currentGroup"
        @close="closeRolesDialog"
      ></RolesComponent>
    </v-dialog>
  </div>
</template>

<script>
import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";
import { mapGetters } from "vuex";
import t from "../../plugins/i18n";
import { setTimeout } from "timers";

import FormComponent from "../../components/content/group/form";
import RolesComponent from "../../components/content/group/roles";

export default {
  components: {
    FormComponent,
    RolesComponent
  },
  data: () => ({
    Tools,
    GlobalEnv,
    contentViewStatus: false,
    datatable: {
      expanded: [],
      loadingStatus: false,
      headers: [
        {
          text: t.t(
            "views.userManagement.groups.script.data.datatable.headers.name"
          ),
          align: "left",
          sortable: true,
          value: "groupName"
        },
        {
          text: t.t(
            "views.userManagement.groups.script.data.datatable.headers.actions"
          ),
          align: "center",
          sortable: false,
          value: "actions"
        }
      ],
      search: ""
    },
    editDialogView: false,
    currentGroup: null,
    rolesDialogView: false
  }),
  computed: {
    ...mapGetters([
      "g_storages_userGroups_items",
      "g_storages_user_getUser",
      "g_storages_role_items"
    ]),
    items() {
      return this.g_storages_userGroups_items;
    },
    getUserFullName() {
      return id => {
        let user = this.g_storages_user_getUser(id);
        return user.user.name + " " + user.user.surname;
      };
    },
    getGroupRoles() {
      return group => {
        let roles = [];
        group.roles.forEach(role => {
          let findRole = this.g_storages_role_items.filter(roleItem => {
            return roleItem.id === role;
          });

          if (findRole.length > 0) {
            roles.push(findRole[0]);
          }
        });

        return roles;
      };
    },
    getGroupUsers() {
      return group => {
        let users = [];
        group.users.forEach(user => {
          let getUser = this.g_storages_user_getUser(user);
          if (!Tools.isNullOrEmpty(getUser.user))
            users.push(this.g_storages_user_getUser(user));
        });
        return users;
      };
    }
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  },
  methods: {
    newItem() {
      this.editDialogView = true;
      setTimeout(() => {
        this.$refs.formComp.init();
      }, 200);
    },
    editItem(item) {
      this.editDialogView = true;
      this.currentGroup = item;
      setTimeout(() => {
        this.$refs.formComp.init();
      }, 200);
    },
    editRoles(item) {
      this.rolesDialogView = true;
      this.currentGroup = item;
      setTimeout(() => {
        this.$refs.rolesComp.init();
      }, 200);
    },
    deleteItem(item) {
      Tools.showConfirmMsg(
        t.t(
          "views.userManagement.groups.script.methods.deleteItem.confirm.title"
        ),
        t.t(
          "views.userManagement.groups.script.methods.deleteItem.confirm.msg"
        ),
        t.t(
          "views.userManagement.groups.script.methods.deleteItem.confirm.info"
        )
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "views.userManagement.groups.script.methods.deleteItem.loadingMsg"
          )
        );
        this.$store
          .dispatch("a_storages_userGroups_items_changeStatus_api", {
            id: item.id,
            status: false
          })
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "views.userManagement.groups.script.methods.deleteItem.success.title"
              ),
              t.t(
                "views.userManagement.groups.script.methods.deleteItem.success.msg"
              )
            );
            this.$store.commit("m_layout_loading_view", false);
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              "views.userManagement.groups.script.methods.deleteItem.errorTitle",
              "api.errors.UserManagement.User.ChangeStatus."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    },
    closeFormDialog() {
      this.editDialogView = false;
    },
    closeRolesDialog() {
      this.rolesDialogView = false;
    }
  }
};
</script>

<style></style>
