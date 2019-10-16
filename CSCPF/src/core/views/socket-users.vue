<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >{{ $t("views.socketUsers.screenTitle") }}</v-card-title
    >
    <v-layout justify-space-between pa-4>
      <v-flex>
        <v-layout justify-space-between pa-4>
          <v-flex xs3>
            <v-sheet class="pa-4 indigo lighten-3 mr-2">
              <v-text-field
                v-model="search"
                :label="$t('views.socketUsers.template.searchLabel')"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
              ></v-text-field>
            </v-sheet>
            <v-treeview
              :active.sync="active"
              :items="items"
              :open.sync="open"
              :search="search"
              activatable
              color="warning"
              open-on-click
              transition
              item-key="id"
              item-text="fullName"
              return-object
              open-all
            >
              <template v-slot:prepend="{ item, active }">
                <v-avatar
                  v-if="item.id != 'root1' && item.id != 'root2'"
                  size="32px"
                >
                  <img
                    :src="
                      Tools.getImage(
                        GlobalEnv.socketUsers.profilePic.path,
                        item.profilePic,
                        GlobalEnv.socketUsers.profilePic.default
                      )
                    "
                  />
                </v-avatar>
              </template>
            </v-treeview>
          </v-flex>

          <v-divider vertical></v-divider>

          <v-flex d-flex text-center>
            <v-scroll-y-transition mode="out-in">
              <div
                v-if="active.length === 0"
                style="align-self: center; text-align: center; width: 100%;"
              >
                <span
                  class="title grey--text text--lighten-1 font-weight-light"
                  >{{ $t("views.socketUsers.template.selectUserInfo") }}</span
                >
              </div>
              <UserDetailsComponent
                v-else
                :user="active[0]"
              ></UserDetailsComponent>
            </v-scroll-y-transition>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import { mapGetters } from "vuex";
import _ from "underscore";
import t from "@/core/plugins/i18n";

import UserDetailsComponent from "@/core/components/content/user/user-details";

export default {
  components: {
    UserDetailsComponent
  },
  data: () => ({
    contentViewStatus: false,
    active: [],
    avatar: null,
    open: [],
    users: [],
    Tools,
    GlobalEnv,
    search: ""
  }),
  computed: {
    ...mapGetters([
      "g_socket_users_getOnlineUsers",
      "g_socket_users_getOfflineUsers",
      "g_session_tokenUser"
    ]),
    items() {
      return [
        {
          id: "root1",
          fullName: t.t("views.socketUsers.script.computed.items.root1"),
          children: this.g_socket_users_getOnlineUsers
        },
        {
          id: "root2",
          fullName: t.t("views.socketUsers.script.computed.items.root2"),
          children: this.g_socket_users_getOfflineUsers
        }
      ];
    },
    getAllUsers() {
      let arr = this.g_socket_users_getOnlineUsers;
      arr.concat(this.g_socket_users_getOfflineUsers);
      return arr;
    }
  },
  watch: {
    selected: "randomAvatar"
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  },
  methods: {
    getUser_fullName(id) {
      if (id === parseInt(this.g_session_tokenUser.unique_name)) {
        return (
          this.g_session_tokenUser.UserName +
          " " +
          this.g_session_tokenUser.UserSurname
        );
      } else {
        let findIndex = _.findIndex(this.getAllUsers, {
          id: id
        });
        if (findIndex > -1) {
          return this.getAllUsers[findIndex].fullName;
        } else {
          return t.t(
            "views.socketUsers.script.methods.getUser_fullName.unknownUser"
          );
        }
      }
    },
    goMessage() {
      this.$router.push(GlobalEnv.messages.route + "/" + this.active[0].id);
    }
  }
};
</script>

<style></style>
