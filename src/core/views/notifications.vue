<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >{{ $t("views.notifications.template.screenTitle") }}</v-card-title
    >
    <v-layout justify-space-between pa-4>
      <v-flex xs12>
        <v-list three-line>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in g_notification_items"
              :key="i"
              @click.stop="goUrl(item.url)"
            >
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ tools.checkI18n(item.title) }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  tools.checkI18n(item.content)
                }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{
                  item.addDate | formatDate
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon @click.stop="remove(item.id)">
                      <v-icon color="red" v-on="on">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>
                    {{ $t("views.notifications.template.removeTooltip") }}
                  </span>
                </v-tooltip>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    GlobalEnv,
    contentViewStatus: false,
    tools: Tools
  }),
  computed: {
    ...mapGetters(["g_notification_items"])
  },
  async mounted() {
    this.$store.commit("m_layout_loading_view", true);
    await this.$store.dispatch("a_notification_items_viewPointAll");
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
    this.$store.commit("m_layout_loading_view", false);
  },
  async updated() {
    await this.$store.dispatch("a_notification_items_viewPointAll");
  },
  methods: {
    remove(id) {
      this.$store.dispatch("a_notification_items_remove", id);
    },
    goUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style></style>
