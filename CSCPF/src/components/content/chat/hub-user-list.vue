<template>
  <v-list subheader>
    <v-subheader>{{ subHeader }}</v-subheader>
    <v-list-item
      v-for="user in getList"
      :key="user.id"
      two-line
      :to="{ name: 'chat', params: { userId: user.id } }"
      :active-class="useActiveClass ? 'light-green lighten-4' : ''"
    >
      <v-list-item-avatar>
        <v-avatar size="32px">
          <img
            :src="
              Tools.getImage(
                GlobalEnv.socketUsers.profilePic.path,
                user.profilePic,
                GlobalEnv.socketUsers.profilePic.default
              )
            "
          />
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          {{ user.name + " " + user.surname }}
        </v-list-item-title>
        <v-list-item-subtitle>{{
          getLastMessageContent(user.messages)
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action v-if="countNewMsg(user.messages) > 0">
        <v-badge overlap color="red">
          <template v-slot:badge>
            <span>{{ countNewMsg(user.messages) }}</span>
          </template>
          <v-icon color="blue">mdi-chat</v-icon>
        </v-badge>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "underscore";
import GlobalEnv from "../../../constants/global-env";
import Tools from "../../../plugins/tools";

export default {
  data() {
    return {
      GlobalEnv,
      Tools
    };
  },
  props: {
    subHeader: {
      type: String,
      required: true
    },
    listType: {
      type: String,
      required: true
    },
    useActiveClass: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    ...mapGetters([
      "g_socket_users_getOnlineUsers",
      "g_socket_users_getOfflineUsers",
      "g_socket_users_sortedLastMsg"
    ]),
    getList() {
      let list = [];
      switch (this.listType) {
        case "online":
          list = this.g_socket_users_getOnlineUsers;
          break;
        case "offline":
          list = this.g_socket_users_getOfflineUsers;
          break;
        default:
          list = this.g_socket_users_sortedLastMsg;
      }

      return list;
    }
  },
  methods: {
    countNewMsg(payload) {
      if (payload.length === 0) return 0;

      let findNewMessages = payload.filter(message => {
        return message.viewStatus === false;
      });

      return findNewMessages.length;
    },
    getLastMessageContent(payload) {
      return payload.length > 0 ? _.last(payload).message : "";
    }
  }
};
</script>

<style></style>
