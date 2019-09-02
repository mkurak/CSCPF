<template>
  <v-flex xs9 sm9 md9 lg9 xl9>
    <v-toolbar dark color="blue-grey">
      <v-avatar>
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
      <v-toolbar-title>{{ user.name + " " + user.surname }}</v-toolbar-title>
    </v-toolbar>
    <v-card class="scrollable2" color="blue-grey lighten-5 messagesState">
      <div v-if="user.messages.length > 0">
        <v-layout v-for="msg in user.messages" :key="msg.id">
          <v-flex v-if="!message.ownerMe" xs10 sm10 md10 lg10 xl10 pa-2>
            <v-layout>
              <v-flex pa-1>
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
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 xl12 pa-1>
                <v-card class="rounded-card">
                  <div>{{ msg.message }}</div>
                  <div
                    class="caption font-weight-light font-italic grey--text lighten-1--text"
                  >
                    {{ getDateString(msg) }}
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex
            v-else
            xs10
            sm10
            md10
            lg10
            xl10
            pa-2
            offset-xs2
            offset-sm2
            offset-md2
            offset-lg2
            offset-xl2
          >
            <v-layout>
              <v-flex xs12 sm12 md12 lg12 xl12 pa-1>
                <v-card dark class="rounded-card" color="light-green darken-1">
                  <div>{{ msg.message }}</div>
                  <div class="caption font-weight-light font-italic lime--text">
                    {{ getDateString(msg) }}
                  </div>
                </v-card>
              </v-flex>
              <v-flex pa-1>
                <v-avatar size="32px">
                  <img
                    :src="
                      Tools.getImage(
                        GlobalEnv.socketUsers.profilePic.path,
                        g_session_currentUser.profilePic,
                        GlobalEnv.socketUsers.profilePic.default
                      )
                    "
                  />
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
    <v-card>
      <v-textarea
        v-model="message"
        filled
        :label="this.$t('components.app.chat.template.messageBoxPlaceholder')"
        rows="4"
        solo
        prepend-inner-icon="mdi-message"
        no-resize
        hide-details
        :disabled="messageSending"
        @keyup="watchEnterKey"
      ></v-textarea>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";
import GlobalEnv from "../../../constants/global-env";
import Tools from "../../../plugins/tools";
import { Promise } from "q";

export default {
  data() {
    return {
      GlobalEnv,
      Tools,
      user: {
        messages: []
      },
      message: "",
      messageSending: false
    };
  },
  computed: {
    ...mapGetters([
      "g_socket_users",
      "g_session_currentUser",
      "g_socket_users_getUser"
    ])
  },
  watch: {
    g_socket_users() {
      if (this.g_socket_users.length > 0) {
        this.onLoad();
      }
    },
    $route() {
      this.onLoad();
    }
  },
  mounted() {
    if (this.g_socket_users.length > 0) {
      this.onLoad();
    }
  },
  updated() {
    this.messagesScrollToEnd();
    this.$store.dispatch(
      "a_socket_users_saveViewAllUnViewMessages",
      this.user.id
    );
  },
  methods: {
    onLoad() {
      return new Promise(resolve => {
        this.user = this.g_socket_users_getUser(
          this.$router.currentRoute.params.userId
        );

        this.$store
          .dispatch("a_socket_users_saveViewAllUnViewMessages", this.user.id)
          .then(() => {
            this.messagesScrollToEnd();
            resolve();
          });
      });
    },
    getDateString(message) {
      let date = new Date(message.sendDate);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    sendMessage() {
      this.messageSending = true;
      let data = {
        userId: this.user.id,
        message: this.message
      };

      this.$store
        .dispatch("a_socket_users_sendNewMessage", data)
        .then(() => {
          this.message = "";
          this.messageSending = false;
        })
        .catch(() => {
          this.messageSending = false;
        });
    },
    watchEnterKey(e) {
      if (this.message === "") return;

      if (e.keyCode === 13) this.sendMessage();
    },
    messagesScrollToEnd() {
      let state = document.querySelector(".messagesState");
      let scrollHeight = state.scrollHeight;
      state.scrollTop = scrollHeight;
    }
  }
};
</script>

<style scoped>
.scrollable2 {
  overflow-y: auto;
  height: 65.4vh;
}
.rounded-card {
  border-radius: 10px;
  padding: 10px;
}
</style>
