<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
    >
      {{ $t("modules.userCloudManager.views.sharedFiles.template.title") }}
    </v-card-title>
    <v-layout justify-space-between pa-4>
      <v-flex>
        <v-data-table
          :headers="datatable.headers"
          :items="items"
          :search="datatable.search"
          class="elevation-1"
          :loading="datatable.loadingStatus"
          item-key="id"
        >
          <template v-slot:top>
            <v-card flat>
              <v-card-title>
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="datatable.search"
                  append-icon="mdi-database-search"
                  :label="
                    $t(
                      'modules.userCloudManager.views.sharedFiles.template.searchPlaceholder'
                    )
                  "
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
            </v-card>
          </template>
          <template v-slot:item.fileTitle="{ item }">
            <a :href="getFileDownloadUrl(item)" target="_blank">{{
              item.fileTitle
            }}</a>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import { mapGetters } from "vuex";
import t from "@/core/plugins/i18n";

export default {
  data: () => ({
    Tools,
    GlobalEnv,
    contentViewStatus: false,
    datatable: {
      loadingStatus: false,
      headers: [
        {
          text: t.t(
            "modules.userCloudManager.views.sharedFiles.script.data.headers.fileTitle"
          ),
          align: "left",
          sortable: true,
          value: "fileTitle"
        },
        {
          text: t.t(
            "modules.userCloudManager.views.sharedFiles.script.data.headers.fileFullPath"
          ),
          align: "left",
          sortable: true,
          value: "fileFullPath"
        },
        {
          text: t.t(
            "modules.userCloudManager.views.sharedFiles.script.data.headers.fileDescription"
          ),
          align: "left",
          sortable: false,
          value: "fileDescription"
        },
        {
          text: t.t(
            "modules.userCloudManager.views.sharedFiles.script.data.headers.directoryTitle"
          ),
          align: "left",
          sortable: true,
          value: "directoryTitle"
        },
        {
          text: t.t(
            "modules.userCloudManager.views.sharedFiles.script.data.headers.fileSizeTxt"
          ),
          align: "left",
          sortable: true,
          value: "fileSizeTxt"
        },
        {
          text: t.t(
            "modules.userCloudManager.views.sharedFiles.script.data.headers.ownerUserFullName"
          ),
          align: "left",
          sortable: true,
          value: "ownerUserFullName"
        }
      ],
      search: ""
    }
  }),
  computed: {
    ...mapGetters([
      "g_storages_modules_userCloudManager_fmShare_items",
      "g_storages_user_fullName"
    ]),
    items() {
      let list = this.g_storages_modules_userCloudManager_fmShare_items;
      if (list) {
        list.forEach(item => {
          item.fileSizeTxt = Tools.formatBytes(item.fileSize);
          item.ownerUserFullName = this.g_storages_user_fullName(
            item.ownerUserId
          );
        });
      }
      return list;
    }
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  },
  methods: {
    getFileDownloadUrl(item) {
      return Tools.getImage(
        GlobalEnv.modules.userCloudManager.filePath.fm,
        item.filePath,
        null
      );
    }
  }
};
</script>

<style></style>
