<template>
  <v-card v-if="contentViewStatus">
    <v-card-title class="indigo white--text headline">{{
      $t("views.hub.template.screenTitle")
    }}</v-card-title>
    <v-layout justify-space-between pa-4>
      <v-flex>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <p>
                <span class="headline"
                  >{{ $t("views.hub.template.statistics.calcTotal") }}:
                  &nbsp;</span
                >
                <span class="headline red--text">{{ calcTotalUsing }}</span>
              </p>
              <p>
                <span class="subtitle-1">{{
                  $t("views.hub.template.statistics.system")
                }}</span>
                <br />
                <v-progress-linear
                  :value="usingBySystemRate"
                  color="purple darken-2"
                  height="25"
                  reactive
                >
                  <template v-slot="{ value }">
                    <strong class="white--text">{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </p>
              <p>
                <span class="subtitle-1">{{
                  $t("views.hub.template.statistics.storages")
                }}</span>
                <br />
                <v-progress-linear
                  :value="usingByStoragesRate"
                  color="purple darken-2"
                  height="25"
                  reactive
                >
                  <template v-slot="{ value }">
                    <strong class="white--text">{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </p>
            </v-col>
            <v-col cols="12">
              <v-alert
                border="bottom"
                colored-border
                type="warning"
                elevation="2"
                >{{ $t("views.hub.template.alertContent") }}</v-alert
              >
            </v-col>
          </v-row>
          <v-row v-for="storage in g_storages_storages" :key="storage.key">
            <v-col cols="12">
              <span class="title">{{ storage.key }}</span>
              <v-divider></v-divider>
              <div v-for="path in storage.relationPaths" :key="path">
                <code>{{ path }}</code>
              </div>
              <div v-if="storage.ownerSystem" class="caption red--text">
                {{ $t("views.hub.template.msgOfOwnerSystem") }}
              </div>
            </v-col>
            <v-row>
              <v-col cols="10">
                <v-row>
                  <v-col cols="12">
                    <v-switch
                      v-model="storage.loadStartUp"
                      :label="
                        $t('views.hub.template.settingsLabels.loadStartup')
                      "
                      hide-details
                      color="success"
                      :disabled="storage.ownerSystem"
                      class="mt-0"
                      :loading="loadingStatus"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12">
                    <v-switch
                      v-model="storage.coverData"
                      :label="$t('views.hub.template.settingsLabels.coverData')"
                      hide-details
                      color="success"
                      :disabled="storage.ownerSystem"
                      class="mt-0"
                      :loading="loadingStatus"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="2" class="text-center">
                <v-progress-circular
                  :rotate="360"
                  :size="100"
                  :width="15"
                  :value="usingTargetStorage(storage.getter)"
                  color="teal"
                  >{{ usingTargetStorage(storage.getter) }}</v-progress-circular
                >
              </v-col>
            </v-row>
          </v-row>
          <v-row>
            <v-col cols="12" class="blue lighten-5 text-right">
              <v-btn
                color="primary"
                size="medium"
                elevation="0"
                @click="applyChanges"
                >Değişiklikleri Kaydet</v-btn
              >
            </v-col>
            <v-col cols="12" class="pt-12">
              <v-divider class="pb-12"></v-divider>
              <div>
                <p class="title">
                  {{ $t("views.hub.template.documentation.q1.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q1.a1") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q2.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q2.a1") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q2.a2") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q3.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q3.a1") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q4.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q4.a1") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q5.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q5.a1") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q6.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q6.a1") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q6.a2") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q7.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q7.a1") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q8.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q8.a1") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q9.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q9.a1") }}
                </p>

                <p class="title">
                  {{ $t("views.hub.template.documentation.q10.q") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q10.a1") }}
                </p>
                <p class="body-2">
                  {{ $t("views.hub.template.documentation.q10.a2") }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "../plugins/tools";
import GlobalEnv from "../constants/global-env";
import { mapGetters } from "vuex";
import sizeOf from "object-sizeof";

export default {
  data: () => ({
    contentViewStatus: false,
    loadingStatus: false
  }),
  computed: {
    ...mapGetters(["g_storages_storages"]),
    calcTotalUsing: function() {
      let size = Tools.formatBytes(sizeOf(this.$store.state));
      return size;
    },
    usingByStoragesSize: function() {
      let storages = this.$store.getters.g_storages_storages;
      let size = 0.0;
      storages.forEach(storage => {
        size += sizeOf(this.$store.getters[storage.getter]);
      });

      return size.toFixed(2);
    },
    usingBySystemSize: function() {
      return (sizeOf(this.$store.state) - this.usingByStoragesSize).toFixed(2);
    },
    usingByStoragesRate: function() {
      let storagesUsing = this.usingByStoragesSize;
      if (storagesUsing > 0) {
        let size = (this.usingByStoragesSize / sizeOf(this.$store.state)) * 100;
        return Math.ceil(size);
      } else {
        return 0;
      }
    },
    usingBySystemRate: function() {
      return Math.ceil(100 - this.usingByStoragesRate);
    },
    usingTargetStorage: function() {
      return getter => {
        let storageSize = sizeOf(this.$store.getters[getter]);
        let rate = Math.ceil((storageSize / this.usingByStoragesSize) * 100);
        return storageSize < 1 ? 0 : rate;
      };
    }
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  },
  methods: {
    applyChanges() {
      this.$store.commit("m_layout_loading_view", true);
      this.$store
        .dispatch("a_storages_storages_saveLocal")
        .then(() => {
          return this.$store.dispatch("a_storages_storages_loadStartup");
        })
        .then(() => {
          return this.$store.dispatch(
            "a_storages_storages_clearUnCoverStorageData"
          );
        })
        .then(() => {
          this.$store.commit("m_layout_loading_view", false);
        });
    }
  }
};
</script>

<style scoped></style>
